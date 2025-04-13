
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GeneratorProps {
  onSuccess?: (count: number) => void;
}

const AdminQuizGenerator = ({ onSuccess }: GeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [count, setCount] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleGenerateQuestions = async () => {
    try {
      setIsGenerating(true);
      setResult(null);
      
      const { data, error } = await supabase.functions.invoke('generate-quiz-questions', {
        body: { count, tags }
      });
      
      if (error) throw error;
      
      setResult({
        success: true,
        message: `Successfully generated ${data.questions.length} new quiz questions!`
      });
      
      if (onSuccess) {
        onSuccess(data.questions.length);
      }
      
    } catch (error) {
      console.error("Error generating questions:", error);
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Failed to generate questions"}`
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate AI Quiz Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Number of questions</label>
          <Input
            type="number"
            min={1}
            max={10}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 5)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Tags (optional)</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add tag (e.g., ipl, player, history)"
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              className="flex-1"
            />
            <Button onClick={handleAddTag} size="sm">Add</Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-2 py-1">
                {tag}
                <span 
                  className="ml-1 cursor-pointer" 
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </span>
              </Badge>
            ))}
          </div>
        </div>
        
        {result && (
          <div className={`p-3 rounded-md ${result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle size={16} className="text-green-600" />
              ) : (
                <span className="text-red-600">⚠️</span>
              )}
              <span>{result.message}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerateQuestions} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Questions...
            </>
          ) : (
            "Generate Questions"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminQuizGenerator;
