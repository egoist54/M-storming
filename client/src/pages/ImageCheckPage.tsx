import { useQuery } from "@tanstack/react-query";
import { loadQuizById } from "@/lib/quizLoader";
import { Card } from "@/components/ui/card";

export default function ImageCheckPage() {
  const { data: quizData, isLoading } = useQuery({
    queryKey: ['quiz', 'k-vibe'],
    queryFn: () => loadQuizById('k-vibe'),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">로딩 중...</p>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const results = Object.entries(quizData.results).map(([key, value]: [string, any]) => ({
    type: value.type,
    food: value.food.ko,
    image: value.image,
  }));

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          K-VIBE 음식 이미지 확인 (전체 {results.length}개)
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((result, idx) => (
            <Card key={result.type} className="overflow-hidden">
              <div className="aspect-square bg-muted">
                {result.image ? (
                  <img
                    src={result.image}
                    alt={result.food}
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
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-muted-foreground">
                    {idx + 1}. {result.type}
                  </span>
                </div>
                <h3 className="font-bold text-lg">{result.food}</h3>
                {result.image && (
                  <p className="text-xs text-muted-foreground break-all">
                    {result.image}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
