import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  onStart?: () => void;
}

export default function QuizCard({
  title,
  description,
  category,
  thumbnail,
  onStart
}: QuizCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-200"
      data-testid="card-quiz"
    >
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs" data-testid="badge-category">
            {category}
          </Badge>
          
          <h3 className="text-xl font-bold leading-tight" data-testid="text-quiz-title">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2" data-testid="text-quiz-description">
            {description}
          </p>
        </div>

        <Button 
          onClick={onStart}
          className="w-full gap-2"
          data-testid="button-start-quiz"
        >
          시작하기
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
