import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ResultCard from "@/components/ResultCard";
import ShareButtons from "@/components/ShareButtons";
import AdBanner from "@/components/AdBanner";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { loadQuizById } from "@/lib/quizLoader";
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
      (eiCount.E >= eiCount.I ? 'E' : 'I') +
      (snCount.S >= snCount.N ? 'S' : 'N') +
      (tfCount.T >= tfCount.F ? 'T' : 'F') +
      (jpCount.J >= jpCount.P ? 'J' : 'P') +
      '-' +
      (atCount.A >= atCount.T ? 'A' : 'T');

    const eiStrength = Math.max(eiCount.E, eiCount.I) / 3 * 100;
    const snStrength = Math.max(snCount.S, snCount.N) / 3 * 100;
    const tfStrength = Math.max(tfCount.T, tfCount.F) / 3 * 100;
    const jpStrength = Math.max(jpCount.J, jpCount.P) / 3 * 100;
    const atStrength = Math.max(atCount.A, atCount.T) / 3 * 100;
    
    const matchRate = Math.round((eiStrength + snStrength + tfStrength + jpStrength + atStrength) / 5);

    const result = quizData.results.find((r: any) => r.type === mbtiType);
    
    return result ? { ...result, matchRate } : { ...quizData.results[0], matchRate };
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
  const [, navigate] = useLocation();
  const quizId = params?.id || "1";
  const { language, t } = useLanguage();
  
  // wouter의 location은 쿼리 파라미터를 포함하지 않으므로 window.location.search 사용
  const answersParam = new URLSearchParams(window.location.search).get('answers');
  const answers = answersParam ? answersParam.split(',') : [];
  const username = sessionStorage.getItem('quiz-username') || "";
  
  console.log('[DEBUG] Answers from URL:', answers);
  console.log('[DEBUG] Query string:', window.location.search);

  const { data: quizData, isLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => loadQuizById(quizId),
    enabled: !!quizId,
  });

  const handleBack = () => {
    navigate('/');
  };

  const handleRetry = () => {
    navigate(`/quiz/${quizId}`);
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
  const matchRate = resultData.matchRate;
  
  const imagePath = resultData.image 
    ? `${import.meta.env.BASE_URL}${resultData.image.replace(/^\//, '')}` 
    : positiveResult;

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
            {t.common.backToList}
          </Button>

          <Button
            variant="outline"
            onClick={handleRetry}
            className="gap-2"
            data-testid="button-retry"
          >
            <RotateCcw className="w-4 h-4" />
            {t.common.retry}
          </Button>
        </div>

        <ResultCard
          title={title}
          description={description}
          image={imagePath}
          category={category}
          matchRate={matchRate}
          username={username}
        />

        <div className="max-w-md mx-auto">
          <ShareButtons 
            title={title}
            description={description}
            quizId={quizId}
            resultImage={imagePath}
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
            {t.common.otherQuizzes}
          </Button>
        </div>
      </div>
    </div>
  );
}
