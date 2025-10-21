import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import QuizCard from "@/components/QuizCard";
import AdBanner from "@/components/AdBanner";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";
import { loadAllQuizzes, QuizData } from "@/lib/quizLoader";
import personalityThumb from '@assets/generated_images/성격_퀴즈_섬네일_이미지_c75d527d.png';
import aiThumb from '@assets/generated_images/AI_퀴즈_섬네일_이미지_cae3c536.png';

interface QuizCardData {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
}

const thumbnailMap: Record<string, string> = {
  "1": personalityThumb,
  "kvibe": personalityThumb,
  "k-vibe": personalityThumb,
  "2": aiThumb,
};

function QuizCardWithCount({ quiz }: { quiz: QuizData }) {
  const { language } = useLanguage();
  const [, navigate] = useLocation();
  
  const cardData: QuizCardData = {
    id: quiz.id,
    title: quiz.title[language] || quiz.title.ko,
    description: quiz.description[language] || quiz.description.ko,
    category: quiz.category?.[language] || quiz.category?.ko || "Quiz",
    thumbnail: thumbnailMap[quiz.id] || personalityThumb,
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${quiz.id}`);
  };

  return <QuizCard {...cardData} onStart={handleStartQuiz} />;
}

export default function HomePage() {
  const { t } = useLanguage();
  
  const { data: quizzes = [], isLoading } = useQuery<QuizData[]>({
    queryKey: ['quizzes'],
    queryFn: loadAllQuizzes,
  });

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
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading quizzes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {quizzes.map((quiz, index) => (
              <div key={quiz.id}>
                <QuizCardWithCount quiz={quiz} />
                
                {index === 3 && (
                  <div className="md:col-span-2 lg:col-span-3 my-4">
                    <AdBanner slot="homepage-middle" format="horizontal" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <AdBanner slot="homepage-bottom" format="horizontal" />
        </div>
      </div>
    </div>
  );
}
