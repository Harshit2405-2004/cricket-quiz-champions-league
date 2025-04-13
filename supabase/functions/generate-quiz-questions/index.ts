
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Option {
  [key: string]: string;
}

interface QuizQuestion {
  question_text: string;
  options: Option;
  correct_option: string;
  tags: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the OpenAI API key from environment variable
    const openAiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceRole);
    
    // Parse request body
    const { count = 5, tags = [] } = await req.json().catch(() => ({}));
    
    // Build the prompt with context about cricket
    const prompt = `Generate ${count} unique cricket quiz questions with the following requirements:
    
    1. Each question should have 4 possible answers with exactly one correct answer.
    2. Format each question as a JSON object with the following structure:
       {
         "question_text": "The full question text",
         "options": {
           "a": "First option",
           "b": "Second option",
           "c": "Third option",
           "d": "Fourth option"
         },
         "correct_option": "The letter (a, b, c, or d) of the correct answer",
         "tags": ["tag1", "tag2"]
       }
    3. Questions should be about cricket history, rules, players, statistics, tournaments (especially IPL), and memorable moments.
    4. Ensure the questions are of varying difficulty levels.
    5. For tags, use relevant categories like "ipl", "player", "rules", "history", "stats", etc.
    6. Return the response as a valid JSON array containing ${count} question objects.
    
    ${tags.length > 0 ? `Focus on the following cricket topics: ${tags.join(', ')}.` : ''}`;
    
    console.log('Generating quiz questions with OpenAI');
    
    // Call OpenAI API to generate questions
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a cricket expert who creates quiz questions. Always respond with valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    // Parse OpenAI API response
    const openAIData = await openAIResponse.json();
    if (!openAIData.choices || !openAIData.choices[0]) {
      throw new Error('Invalid response from OpenAI API');
    }

    // Extract generated content and parse JSON
    const generatedContent = openAIData.choices[0].message.content;
    let quizQuestions: QuizQuestion[];
    
    try {
      // OpenAI might wrap the JSON in code blocks, so we need to extract just the JSON part
      const jsonMatch = generatedContent.match(/\[[\s\S]*\]/);
      const jsonString = jsonMatch ? jsonMatch[0] : generatedContent;
      quizQuestions = JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON from OpenAI response:', error);
      console.log('Generated content:', generatedContent);
      throw new Error('Failed to parse OpenAI response as JSON');
    }
    
    console.log(`Successfully generated ${quizQuestions.length} quiz questions`);

    // Insert questions into the database
    const insertPromises = quizQuestions.map(async (question) => {
      const { data, error } = await supabase
        .from('quiz_questions')
        .insert({
          question_text: question.question_text,
          options: question.options,
          correct_option: question.correct_option,
          tags: question.tags,
          source: 'AI'
        });
      
      if (error) {
        console.error('Error inserting question:', error);
        throw error;
      }
      
      return data;
    });
    
    await Promise.all(insertPromises);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully generated and stored ${quizQuestions.length} quiz questions`,
      questions: quizQuestions 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in generate-quiz-questions function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
