import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VisitorCounterProps {
  count: number;
  label?: string;
}

export default function VisitorCounter({ count, label = "명이 방문했어요" }: VisitorCounterProps) {
  const formattedCount = count.toLocaleString('ko-KR');
  
  return (
    <Badge 
      variant="secondary" 
      className="gap-1.5 px-3 py-1.5"
      data-testid="badge-visitor-count"
    >
      <Users className="w-3.5 h-3.5" />
      <span className="font-semibold">{formattedCount}</span>
      <span className="text-muted-foreground">{label}</span>
    </Badge>
  );
}
