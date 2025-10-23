import { useQuery } from "@tanstack/react-query";
import { loadQuizById } from "@/lib/quizLoader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResultsGalleryPage() {
  const { language } = useLanguage();
  
  const { data: quizData, isLoading } = useQuery({
    queryKey: ['quiz', 'korea-travel'],
    queryFn: () => loadQuizById('korea-travel'),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-lg">로딩 중...</p>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-lg">데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const results = Object.entries(quizData.results).map(([mbtiType, value]: [string, any]) => ({
    mbtiType,
    destination: value.destination[language] || value.destination.ko,
    title: value.title[language] || value.title.ko,
    description: value.description[language] || value.description.ko,
    image: value.image,
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-center flex-1" data-testid="text-gallery-title">
            한국 여행지 퀴즈 결과 갤러리
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            전체 {results.length}개의 MBTI-AT 여행지 유형
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {results.map((result) => (
            <Card 
              key={result.mbtiType} 
              className="overflow-hidden hover-elevate transition-all"
              data-testid={`card-result-${result.mbtiType.toLowerCase()}`}
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                {result.image ? (
                  <img
                    src={`${import.meta.env.BASE_URL}${result.image.replace(/^\//, '')}`}
                    alt={result.destination}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                      (e.target as HTMLImageElement).alt = '이미지 로드 실패';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    이미지 없음
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* MBTI Type Badge */}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs font-mono" data-testid={`badge-mbti-${result.mbtiType.toLowerCase()}`}>
                    {result.mbtiType}
                  </Badge>
                </div>

                {/* Destination */}
                <h3 className="font-bold text-base leading-tight" data-testid={`text-destination-${result.mbtiType.toLowerCase()}`}>
                  {result.destination}
                </h3>

                {/* Title */}
                <p className="text-sm text-muted-foreground leading-snug" data-testid={`text-title-${result.mbtiType.toLowerCase()}`}>
                  {result.title}
                </p>

                {/* Description Preview */}
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {result.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
