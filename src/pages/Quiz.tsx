import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import QuizCard, { QuizQuestion } from "@/components/QuizCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { quizEvents } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const { toast } = useToast();
  const { profile } = useAuth();

  const { data: attemptsData } = useQuery({
    queryKey: ['attempts', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return { attemptsRemaining: 5 };
      
      const { data } = await supabase
        .from('profiles')
        .select('daily_quiz_count')
        .eq('id', profile.id)
        .single();
      
      return { 
        attemptsRemaining: Math.max(0, 5 - (data?.daily_quiz_count || 0))
      };
    },
    enabled: !!profile?.id,
  });
  
  const attemptsRemaining = attemptsData?.attemptsRemaining || 5;

  const fetchQuizQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('is_active', true)
        .limit(5);
      
      if (error) throw error;
      
      if (data) {
        const formattedQuestions: QuizQuestion[] = data.map(item => {
          const options = item.options as Record<string, string>;
          return {
            id: Number(item.id.replace(/-/g, '').substring(0, 8), 16),
            question: item.question_text,
            options: Object.values(options),
            correctAnswer: Object.keys(options).indexOf(item.correct_option),
            tags: item.tags || []
          };
        });
        
        setQuizQuestions(formattedQuestions);
        return formattedQuestions;
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: "Error",
        description: "Failed to load quiz questions",
        variant: "destructive"
      });
      return [];
    }
  };

  const updateQuizAttemptMutation = useMutation({
    mutationFn: async (params: { 
      score: number, 
      isComplete: boolean, 
      answeredQuestions: number 
    }) => {
      if (!profile?.id) return;
      
      const { score, isComplete, answeredQuestions } = params;
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          daily_quiz_count: (profile.daily_quiz_count || 0) + 1,
          total_points: (profile.total_points || 0) + score,
          last_active_at: new Date().toISOString()
        })
        .eq('id', profile.id);
        
      if (error) throw error;
      
      if (isComplete) {
        const today = new Date().toISOString().split('T')[0];
        
        const { error: leaderboardError } = await supabase
          .from('leaderboard')
          .upsert({
            user_id: profile.id,
            daily_score: score,
            total_score: (profile.total_points || 0) + score,
            date: today
          }, {
            onConflict: 'user_id,date'
          });
          
        if (leaderboardError) console.error('Leaderboard update error:', leaderboardError);
      }
      
      return { success: true };
    },
    onError: (error) => {
      console.error('Error updating quiz attempt:', error);
      toast({
        title: "Error",
        description: "Failed to save your quiz results",
        variant: "destructive"
      });
    }
  });

  const handleStartQuiz = async () => {
    if (attemptsRemaining <= 0) {
      toast({
        title: "No attempts remaining",
        description: "You've used all your quiz attempts for today",
        variant: "destructive"
      });
      return;
    }
    
    const questions = await fetchQuizQuestions();
    
    if (questions.length === 0) {
      toast({
        title: "Error",
        description: "Could not load quiz questions",
        variant: "destructive"
      });
      return;
    }
    
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setQuizCompleted(false);
    quizEvents.startQuiz();
  };

  const handleAnswer = (isCorrect: boolean) => {
    quizEvents.answerQuestion(isCorrect);
    
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleQuizComplete = () => {
    const score = calculateScore();
    
    updateQuizAttemptMutation.mutate({
      score,
      isComplete: true,
      answeredQuestions: quizQuestions.length
    });
    
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    const baseScore = correctAnswers * 10;
    const bonusScore = correctAnswers === quizQuestions.length ? 20 : 0;
    return baseScore + bonusScore;
  };

  useEffect(() => {
    if (quizCompleted) {
      const totalScore = calculateScore();
      const bonusText = correctAnswers === quizQuestions.length ? " (including perfect quiz bonus!)" : "";
      
      quizEvents.completeQuiz(totalScore, correctAnswers);
      
      toast({
        title: "Quiz Completed!",
        description: `You scored ${totalScore} points${bonusText}`,
        duration: 5000,
      });
    }
  }, [quizCompleted]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Daily Cricket Quiz
        </h1>

        <div className="mb-6 flex justify-between items-center max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span className="font-medium">
              Attempts Remaining: {attemptsRemaining}/5
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-cricket-ipl-purple" />
            <span className="font-medium">
              Your Score Today: {quizStarted ? correctAnswers * 10 : 0}
            </span>
          </div>
        </div>

        {!quizStarted && !quizCompleted && (
          <Card className="max-w-md mx-auto cricket-card border-cricket-ipl-blue">
            <CardHeader>
              <CardTitle>Ready to Test Your Cricket Knowledge?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Answer 5 cricket quiz questions and earn points for each correct answer. 
                Get all questions correct for a bonus!
              </p>
              <Button 
                onClick={handleStartQuiz} 
                className="w-full cricket-button"
                disabled={attemptsRemaining <= 0}
              >
                {attemptsRemaining > 0 ? "Start Quiz" : "No Attempts Left Today"}
              </Button>
              
              {attemptsRemaining <= 0 && (
                <p className="mt-4 text-sm text-muted-foreground text-center">
                  Come back tomorrow for more quiz attempts!
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {quizStarted && !quizCompleted && quizQuestions.length > 0 && (
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <Progress value={(currentQuestionIndex / quizQuestions.length) * 100} />
              <div className="mt-2 text-sm text-muted-foreground text-center">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </div>
            </div>
            
            <QuizCard 
              question={quizQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              currentQuestionNumber={currentQuestionIndex + 1}
              totalQuestions={quizQuestions.length}
            />
          </div>
        )}

        {quizCompleted && (
          <Card className="max-w-md mx-auto cricket-card border-cricket-ipl-purple">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="text-cricket-ipl-purple" />
                Quiz Completed!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-cricket-ipl-blue mb-2">
                  {calculateScore()} Points
                </p>
                <p className="text-lg">
                  You got {correctAnswers} out of {quizQuestions.length} correct
                </p>
                
                {correctAnswers === quizQuestions.length && (
                  <div className="mt-4 p-3 bg-accent/20 rounded-md text-sm">
                    <span className="font-bold">Perfect Score Bonus:</span> +20 points!
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleQuizComplete}
                  className="flex-1 cricket-button"
                >
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Quiz;
