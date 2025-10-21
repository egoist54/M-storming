import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium" data-testid="text-progress">
          질문 {current} / {total}
        </span>
        <span className="text-muted-foreground">{Math.round(percentage)}%</span>
      </div>
      <Progress value={percentage} className="h-2" data-testid="progress-quiz" />
    </div>
  );
}
