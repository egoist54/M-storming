import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import QuizProgress from "@/components/QuizProgress";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { loadQuizById, QuizData } from "@/lib/quizLoader";
import { incrementQuizParticipants } from "@/hooks/useFirebaseCounter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function QuizPage() {
  const [, params] = useRoute("/quiz/:id");
  const quizId = params?.id || "";
  const { language } = useLanguage();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [hasIncremented, setHasIncremented] = useState(false);
  const [username, setUsername] = useState("");
  const [showNameInput, setShowNameInput] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const { data: quiz, isLoading } = useQuery<QuizData>({
    queryKey: ['quiz', quizId],
    queryFn: () => loadQuizById(quizId),
    enabled: !!quizId,
  });

  useEffect(() => {
    const savedUsername = sessionStorage.getItem('quiz-username');
    if (savedUsername) {
      setUsername(savedUsername);
      setShowNameInput(false);
    }
  }, []);

  useEffect(() => {
    if (quiz && !hasIncremented && username) {
      incrementQuizParticipants(quiz.id);
      setHasIncremented(true);
    }
  }, [quiz, hasIncremented, username]);

  const handleNameSubmit = () => {
    if (inputValue.trim()) {
      const trimmedName = inputValue.trim();
      setUsername(trimmedName);
      sessionStorage.setItem('quiz-username', trimmedName);
      setShowNameInput(false);
    }
  };

  const handleAnswer = (answerId: string) => {
    if (!quiz) return;

    const newAnswers = [...answers, answerId];
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
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

  if (isLoading || !quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading quiz...</p>
      </div>
    );
  }

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-2xl">
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

          <Card className="p-8 space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                {quiz.title[language] || quiz.title.ko}
              </h2>
              <p className="text-muted-foreground">
                테스트를 시작하기 전에 이름을 입력해주세요
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="이름 입력"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                className="text-center text-lg"
                data-testid="input-username"
                autoFocus
              />
              <Button
                onClick={handleNameSubmit}
                disabled={!inputValue.trim()}
                className="w-full"
                size="lg"
                data-testid="button-start-quiz"
              >
                시작하기
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const questionText = currentQ.text[language] || currentQ.text.ko;
  const answerOptions = currentQ.options?.map((a: any, index: number) => ({
    id: a.dimension || `option-${index}`,
    text: a.text[language] || a.text.ko,
    score: 1,
  })) || [];

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
            total={quiz.questions.length} 
          />
        </div>

        <QuestionCard
          question={questionText}
          answers={answerOptions}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
