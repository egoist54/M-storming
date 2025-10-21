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
  if (quizData.id === "k-vibe") {
    const eiCount = { E: 0, I: 0 };
    const snCount = { S: 0, N: 0 };
    const tfCount = { T: 0, F: 0 };
    const jpCount = { J: 0, P: 0 };
    const atCount = { A: 0, T: 0 };
    
    answers.forEach((dimension, index) => {
      if (!dimension) return;
      
      if (index < 3) {
        if (dimension === 'E' || dimension === 'I') eiCount[dimension]++;
      } else if (index < 6) {
        if (dimension === 'S' || dimension === 'N') snCount[dimension]++;
      } else if (index < 9) {
        if (dimension === 'T' || dimension === 'F') tfCount[dimension]++;
      } else if (index < 12) {
        if (dimension === 'J' || dimension === 'P') jpCount[dimension]++;
      } else if (index < 15) {
        if (dimension === 'A' || dimension === 'T') atCount[dimension]++;
      }
    });

    const mbtiType = 
      (eiCount.E > eiCount.I ? 'E' : 'I') +
      (snCount.S > snCount.N ? 'S' : 'N') +
      (tfCount.T > tfCount.F ? 'T' : 'F') +
      (jpCount.J > jpCount.P ? 'J' : 'P') +
      '-' +
      (atCount.A > atCount.T ? 'A' : 'T');

    const result = quizData.results.find((r: any) => r.type === mbtiType);
    return result || quizData.results[0];
  }

  const totalScore = answers.reduce((sum, answerId, index) => {
    const question = quizData.questions[index];
    const answer = question.options?.find((a: any) => a.dimension === answerId);
    return sum + (answer ? 1 : 0);
  }, 0);

  const avgScore = totalScore / answers.length;
  const resultKey = avgScore > 0.5 ? 'positive' : 'neutral';
  const result = quizData.results.find((r: any) => r.type === resultKey);
  return result || quizData.results[0];
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
  const title = resultData.food?.[language] || resultData.food?.ko || resultData.title?.[language] || resultData.title?.ko || "Result";
  const description = resultData.description[language] || resultData.description.ko;
  const category = quizData.category?.[language] || quizData.category?.ko || "Quiz";

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
