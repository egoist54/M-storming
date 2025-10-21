import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import QuizProgress from "@/components/QuizProgress";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
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

  const { data: quiz, isLoading } = useQuery<QuizData>({
    queryKey: ['quiz', quizId],
    queryFn: () => loadQuizById(quizId),
    enabled: !!quizId,
  });

  useEffect(() => {
    if (quiz && !hasIncremented) {
      incrementQuizParticipants(quiz.id);
      setHasIncremented(true);
    }
  }, [quiz, hasIncremented]);

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

  const currentQ = quiz.questions[currentQuestion];
  const questionText = currentQ.text[language] || currentQ.text.ko;
  const answerOptions = currentQ.answers.map(a => ({
    id: a.id,
    text: a.text[language] || a.text.ko,
    score: typeof a.score === 'string' ? 1 : a.score,
  }));

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
