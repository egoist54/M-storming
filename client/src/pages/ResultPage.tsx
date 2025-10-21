import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ResultCard from "@/components/ResultCard";
import ShareButtons from "@/components/ShareButtons";
import AdBanner from "@/components/AdBanner";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { loadQuizById } from "@/lib/quizLoader";
import { useQuizParticipants } from "@/hooks/useFirebaseCounter";
import { useLanguage } from "@/contexts/LanguageContext";
import positiveResult from '@assets/generated_images/긍정적_결과_이미지_42ed835e.png';

function calculateResult(quizData: any, answers: string[]) {
  if (quizData.id === "kvibe") {
    const dimensions: Record<string, number> = { E: 0, S: 0, T: 0, J: 0, A: 0 };
    
    answers.forEach((answerId, index) => {
      const question = quizData.questions[index];
      const answer = question.answers.find((a: any) => a.id === answerId);
      if (answer && typeof answer.score === 'string') {
        dimensions[answer.score] = (dimensions[answer.score] || 0) + 1;
      }
    });

    const mbtiType = 
      (dimensions.E > quizData.questions.filter((q: any) => q.dimension === 'E').length / 2 ? 'E' : 'I') +
      (dimensions.S > quizData.questions.filter((q: any) => q.dimension === 'S').length / 2 ? 'S' : 'N') +
      (dimensions.T > quizData.questions.filter((q: any) => q.dimension === 'T').length / 2 ? 'T' : 'F') +
      (dimensions.J > quizData.questions.filter((q: any) => q.dimension === 'J').length / 2 ? 'J' : 'P') +
      (dimensions.A > quizData.questions.filter((q: any) => q.dimension === 'A').length / 2 ? 'A' : 'T');

    return quizData.results[mbtiType] || Object.values(quizData.results)[0];
  }

  const totalScore = answers.reduce((sum, answerId, index) => {
    const question = quizData.questions[index];
    const answer = question.answers.find((a: any) => a.id === answerId);
    return sum + (answer ? (typeof answer.score === 'number' ? answer.score : 1) : 0);
  }, 0);

  const avgScore = totalScore / answers.length;
  const resultKey = avgScore > 1.5 ? 'neutral' : 'positive';
  return quizData.results[resultKey] || Object.values(quizData.results)[0];
}

export default function ResultPage() {
  const [, params] = useRoute("/result/:id");
  const quizId = params?.id || "1";
  const { language } = useLanguage();
  const { count } = useQuizParticipants(quizId);
  
  const answersParam = new URLSearchParams(window.location.search).get('answers');
  const answers = answersParam ? answersParam.split(',') : [];

  const { data: quizData, isLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => loadQuizById(quizId),
    enabled: !!quizId,
  });

  const handleBack = () => {
    window.location.href = '/';
  };

  const handleRetry = () => {
    window.location.href = `/quiz/${quizId}`;
  };

  if (isLoading || !quizData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading result...</p>
      </div>
    );
  }

  const resultData = calculateResult(quizData, answers);
  const title = resultData.title[language] || resultData.title.ko;
  const description = resultData.description[language] || resultData.description.ko;
  const category = quizData.category[language] || quizData.category.ko;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="gap-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </Button>

          <Button
            variant="outline"
            onClick={handleRetry}
            className="gap-2"
            data-testid="button-retry"
          >
            <RotateCcw className="w-4 h-4" />
            다시 하기
          </Button>
        </div>

        <ResultCard
          title={title}
          description={description}
          image={resultData.image || positiveResult}
          participantCount={count}
          category={category}
        />

        <div className="max-w-md mx-auto">
          <ShareButtons 
            title={title}
            description={description}
          />
        </div>

        <AdBanner slot="result-bottom" format="horizontal" />

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            data-testid="button-other-quizzes"
          >
            다른 퀴즈 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
