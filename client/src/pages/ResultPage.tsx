import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import ResultCard from "@/components/ResultCard";
import ShareButtons from "@/components/ShareButtons";
import AdBanner from "@/components/AdBanner";
import { ArrowLeft, RotateCcw } from "lucide-react";
import positiveResult from '@assets/generated_images/긍정적_결과_이미지_42ed835e.png';
import neutralResult from '@assets/generated_images/중립적_결과_이미지_505ea5da.png';

//todo: remove mock functionality
const mockResults = {
  "1": {
    title: "밝고 긍정적인 에너지 뿜뿜!",
    description: "당신은 주변 사람들에게 활력을 주는 긍정 에너지의 소유자예요! 어떤 상황에서도 밝은 면을 찾아내고, 다른 사람들을 격려하는 재능이 있어요. 당신과 함께 있으면 모두가 즐거워집니다.",
    image: positiveResult,
    participantCount: 1234,
    category: "성격 유형"
  },
  "2": {
    title: "차분하고 사려 깊은 사색가",
    description: "당신은 깊이 있는 생각과 통찰력을 가진 사람이에요. 급하게 판단하기보다는 여러 관점에서 신중하게 고민하며, 의미 있는 대화를 즐깁니다. 당신의 조언은 항상 가치가 있어요.",
    image: neutralResult,
    participantCount: 2156,
    category: "성격 유형"
  },
  "kvibe": {
    title: "김치찌개 (Kimchi Jjigae) 🌶️",
    description: "당신은 김치찌개처럼 강렬하고 정이 많은 사람이에요! 활발하고 열정적이며, 주변 사람들과의 관계를 소중히 여깁니다. K-Vibe 일치율: 95%",
    image: positiveResult,
    participantCount: 3847,
    category: "K-VIBE"
  }
};

export default function ResultPage() {
  const [, params] = useRoute("/result/:id");
  const quizId = params?.id || "1";
  
  const result = mockResults[quizId as keyof typeof mockResults] || mockResults["1"];

  const handleBack = () => {
    window.location.href = '/';
  };

  const handleRetry = () => {
    window.location.href = `/quiz/${quizId}`;
  };

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
          title={result.title}
          description={result.description}
          image={result.image}
          participantCount={result.participantCount}
          category={result.category}
        />

        <div className="max-w-md mx-auto">
          <ShareButtons 
            title={result.title}
            description={result.description}
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
