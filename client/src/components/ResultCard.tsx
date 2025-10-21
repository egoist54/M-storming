import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

interface ResultCardProps {
  title: string;
  description: string;
  image: string;
  participantCount: number;
  category?: string;
}

export default function ResultCard({ 
  title, 
  description, 
  image, 
  participantCount,
  category 
}: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="overflow-hidden">
        <div className="aspect-square w-full max-w-md mx-auto overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 space-y-6">
          {category && (
            <Badge variant="secondary" className="text-sm" data-testid="badge-result-category">
              {category}
            </Badge>
          )}

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary" data-testid="text-result-title">
              {title}
            </h2>

            <p className="text-lg leading-relaxed text-foreground" data-testid="text-result-description">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground" data-testid="text-result-participants">
              <span className="font-semibold text-foreground">{participantCount.toLocaleString('ko-KR')}명</span>이 이 테스트를 했어요!
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
