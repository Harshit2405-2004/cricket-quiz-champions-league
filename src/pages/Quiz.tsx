
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import QuizCard, { QuizQuestion } from "@/components/QuizCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

// Sample quiz data - in a real app this would come from an API
const sampleQuizzes: QuizQuestion[] = [
  {
    id: 1,
    question: "Which team has won the most IPL titles?",
    options: ["Chennai Super Kings", "Mumbai Indians", "Royal Challengers Bangalore", "Kolkata Knight Riders"],
    correctAnswer: 1,
    tags: ["IPL", "History"]
  },
  {
    id: 2,
    question: "Who holds the record for the highest individual score in IPL history?",
    options: ["Virat Kohli", "Chris Gayle", "AB de Villiers", "Brendon McCullum"],
    correctAnswer: 1,
    tags: ["IPL", "Records", "Batting"]
  },
  {
    id: 3,
    question: "Which bowler has taken the most wickets in IPL history?",
    options: ["Lasith Malinga", "Yuzvendra Chahal", "Dwayne Bravo", "Harbhajan Singh"],
    correctAnswer: 0,
    tags: ["IPL", "Records", "Bowling"]
  },
  {
    id: 4,
    question: "Which player has hit the most sixes in IPL history?",
    options: ["MS Dhoni", "Rohit Sharma", "Chris Gayle", "AB de Villiers"],
    correctAnswer: 2,
    tags: ["IPL", "Records", "Batting"]
  },
  {
    id: 5,
    question: "Which team won the first ever IPL tournament in 2008?",
    options: ["Chennai Super Kings", "Rajasthan Royals", "Delhi Daredevils", "Kolkata Knight Riders"],
    correctAnswer: 1,
    tags: ["IPL", "History"]
  },
];

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState(5);
  const { toast } = useToast();

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    
    if (currentQuestionIndex < sampleQuizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleQuizComplete = () => {
    // Reset quiz state
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setQuizCompleted(false);
    
    // Decrease attempts
    setAttemptsRemaining(attemptsRemaining - 1);
  };

  // Calculate score
  const calculateScore = () => {
    const baseScore = correctAnswers * 10;
    const bonusScore = correctAnswers === sampleQuizzes.length ? 20 : 0;
    return baseScore + bonusScore;
  };

  useEffect(() => {
    if (quizCompleted) {
      const totalScore = calculateScore();
      const bonusText = correctAnswers === sampleQuizzes.length ? " (including perfect quiz bonus!)" : "";
      
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

        {/* Quiz Status and Attempts */}
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

        {quizStarted && !quizCompleted && (
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <Progress value={(currentQuestionIndex / sampleQuizzes.length) * 100} />
              <div className="mt-2 text-sm text-muted-foreground text-center">
                Question {currentQuestionIndex + 1} of {sampleQuizzes.length}
              </div>
            </div>
            
            <QuizCard 
              question={sampleQuizzes[currentQuestionIndex]}
              onAnswer={handleAnswer}
              currentQuestionNumber={currentQuestionIndex + 1}
              totalQuestions={sampleQuizzes.length}
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
                  You got {correctAnswers} out of {sampleQuizzes.length} correct
                </p>
                
                {correctAnswers === sampleQuizzes.length && (
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
