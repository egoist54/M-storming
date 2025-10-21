import { useState } from "react";
import { useRoute } from "wouter";
import QuizProgress from "@/components/QuizProgress";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

//todo: remove mock functionality - this will be loaded from quizzes data
const mockQuestions = [
  {
    id: "q1",
    question: "주말에 가장 하고 싶은 활동은?",
    answers: [
      { id: "a1", text: "친구들과 함께 밖에 나가서 놀기", score: 1 },
      { id: "a2", text: "집에서 혼자 영화 보거나 책 읽기", score: 2 }
    ]
  },
  {
    id: "q2",
    question: "새로운 프로젝트를 시작할 때 당신은?",
    answers: [
      { id: "a1", text: "세부 계획을 먼저 철저히 세운다", score: 1 },
      { id: "a2", text: "큰 그림만 보고 바로 시작한다", score: 2 }
    ]
  },
  {
    id: "q3",
    question: "의사결정을 할 때 더 중요하게 생각하는 것은?",
    answers: [
      { id: "a1", text: "논리와 객관적 사실", score: 1 },
      { id: "a2", text: "감정과 인간관계", score: 2 }
    ]
  }
];

export default function QuizPage() {
  const [, params] = useRoute("/quiz/:id");
  const quizId = params?.id;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answerId: string) => {
    const newAnswers = [...answers, answerId];
    setAnswers(newAnswers);

    if (currentQuestion < mockQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        window.location.href = `/result/${quizId}?answers=${newAnswers.join(',')}`;
      }, 300);
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="gap-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </Button>
        </div>

        <div className="mb-8">
          <QuizProgress 
            current={currentQuestion + 1} 
            total={mockQuestions.length} 
          />
        </div>

        <QuestionCard
          question={mockQuestions[currentQuestion].question}
          answers={mockQuestions[currentQuestion].answers}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
