
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  tags: string[];
}

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
  currentQuestionNumber: number;
  totalQuestions: number;
}

const QuizCard = ({ 
  question, 
  onAnswer, 
  currentQuestionNumber,
  totalQuestions
}: QuizCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const handleOptionSelect = (index: number) => {
    if (showResult) return; // Prevent changing after submission
    setSelectedOption(index);
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    // Add delay before moving to next question
    setTimeout(() => {
      onAnswer(correct);
      setSelectedOption(null);
      setShowResult(false);
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-md cricket-card border-cricket-ipl-purple">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-cricket-ipl-blue text-white">
            Question {currentQuestionNumber}/{totalQuestions}
          </Badge>
          <div className="flex gap-1">
            {question.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <CardTitle className="text-lg mt-2">{question.question}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 mt-2">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`answer-option ${
                selectedOption === index ? "selected" : ""
              } ${
                showResult && index === question.correctAnswer ? "correct" : ""
              } ${
                showResult && selectedOption === index && index !== question.correctAnswer
                  ? "incorrect"
                  : ""
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mr-3">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
                
                {showResult && index === question.correctAnswer && (
                  <CheckCircle className="text-green-600" size={20} />
                )}
                
                {showResult && selectedOption === index && index !== question.correctAnswer && (
                  <XCircle className="text-red-600" size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex-1">
          {showResult && (
            <div className={`text-sm ${isCorrect ? "text-green-600" : "text-red-600"} animate-celebrate`}>
              {isCorrect ? "Correct! +10 points" : "Incorrect! Try again next time."}
            </div>
          )}
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={selectedOption === null || showResult}
          className="cricket-button"
        >
          Submit Answer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
