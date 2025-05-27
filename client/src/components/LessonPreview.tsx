import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LessonPreviewProps {
  onComplete: (lessonId: string, score: number) => void;
}

export default function LessonPreview({ onComplete }: LessonPreviewProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const correctAnswer = "b";
  const question = {
    id: "sample-1",
    text: "What is acceleration?",
    options: [
      { value: "a", text: "The speed of an object" },
      { value: "b", text: "The rate of change of velocity" },
      { value: "c", text: "The distance traveled per unit time" }
    ]
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) {
      alert("Please select an answer first!");
      return;
    }

    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        onComplete("sample-lesson", 100);
      }, 2000);
    }
  };

  return (
    <section className="mb-8">
      <Card className="overflow-hidden">
        <div className="gradient-primary p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Try a Sample Lesson</h3>
              <p className="text-blue-100">Experience QUOMA's interactive learning approach</p>
            </div>
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <i className="fas fa-play text-white text-xl"></i>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-neutral-900 mb-3">Quick Question: {question.text}</h4>
            
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {showFeedback && (
            <div className={`mb-4 p-3 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center">
                <i className={`fas ${isCorrect ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600'} mr-2`}></i>
                <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite right.'}
                </span>
              </div>
              <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect 
                  ? 'Acceleration is indeed the rate of change of velocity.' 
                  : 'Acceleration is the rate of change of velocity, not just speed or distance.'}
              </p>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Button 
              onClick={handleCheckAnswer}
              className="bg-green-600 text-white hover:bg-green-700"
              disabled={showFeedback}
            >
              {showFeedback ? 'Answer Checked' : 'Check Answer'}
            </Button>
            <div className="text-sm text-neutral-500">
              Question 1 of 5
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
