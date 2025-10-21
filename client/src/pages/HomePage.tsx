import { useQuery } from "@tanstack/react-query";
import QuizCard from "@/components/QuizCard";
import VisitorCounter from "@/components/VisitorCounter";
import AdBanner from "@/components/AdBanner";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";
import personalityThumb from '@assets/generated_images/성격_퀴즈_섬네일_이미지_c75d527d.png';
import aiThumb from '@assets/generated_images/AI_퀴즈_섬네일_이미지_cae3c536.png';

//todo: remove mock functionality
interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  participantCount: number;
}

const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "당신의 성격 유형은?",
    description: "10가지 질문으로 알아보는 나의 진짜 성격! 친구들과 결과를 비교해보세요.",
    category: "성격",
    thumbnail: personalityThumb,
    participantCount: 5234
  },
  {
    id: "2",
    title: "나에게 맞는 AI 도구는?",
    description: "당신의 업무 스타일에 딱 맞는 AI 도구를 찾아드려요. 생산성을 높여보세요!",
    category: "AI",
    thumbnail: aiThumb,
    participantCount: 3847
  },
  {
    id: "kvibe",
    title: "Find Your K-Food Soulmate 🍜",
    description: "15개의 질문으로 나와 닮은 한국 음식 찾기! MBTI-AT 기반 퍼스널 푸드 매칭.",
    category: "K-VIBE",
    thumbnail: personalityThumb,
    participantCount: 8921
  }
];

export default function HomePage() {
  const { t } = useLanguage();
  
  //todo: remove mock functionality
  const { data: totalVisitors = 12345 } = useQuery<number>({
    queryKey: ['/api/visitors/total'],
    enabled: false
  });

  //todo: remove mock functionality
  const { data: quizzes = mockQuizzes } = useQuery<Quiz[]>({
    queryKey: ['/api/quizzes'],
    enabled: false
  });

  const handleStartQuiz = (quizId: string) => {
    console.log('Starting quiz:', quizId);
    window.location.href = `/quiz/${quizId}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-chart-2/10">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">{t.home.badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-main-title">
              {t.home.title} <br className="md:hidden" />
              <span className="text-primary">{t.home.titleHighlight}</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              {t.home.subtitle}
            </p>

            <div className="flex justify-center pt-4">
              <VisitorCounter count={totalVisitors} label={t.common.visitors} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {quizzes.map((quiz, index) => (
            <div key={quiz.id}>
              <QuizCard
                {...quiz}
                onStart={() => handleStartQuiz(quiz.id)}
              />
              
              {index === 3 && (
                <div className="md:col-span-2 lg:col-span-3 my-4">
                  <AdBanner slot="homepage-middle" format="horizontal" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <AdBanner slot="homepage-bottom" format="horizontal" />
        </div>
      </div>
    </div>
  );
}
