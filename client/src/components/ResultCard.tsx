import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultCardProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  category?: string;
  matchRate?: number;
  username?: string;
}

export default function ResultCard({ 
  title,
  subtitle,
  description, 
  image, 
  category,
  matchRate,
  username
}: ResultCardProps) {
  const { t } = useLanguage();
  const displayTitle = subtitle ? `${title} - ${subtitle}` : title;
  
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
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 space-y-6">
          {category && (
            <Badge variant="secondary" className="text-sm" data-testid="badge-result-category">
              {category}
            </Badge>
          )}

          {username && (
            <p className="text-lg text-muted-foreground" data-testid="text-username">
              {username}{t.common.yourResult}
            </p>
          )}

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary" data-testid="text-result-title">
              {displayTitle}
            </h2>

            <p className="text-lg leading-relaxed text-foreground" data-testid="text-result-description">
              {description}
            </p>
          </div>

          {matchRate !== undefined && (
            <div className="flex items-center justify-center py-6">
              <div className="text-center space-y-2">
                <p className="text-base font-medium text-foreground">{t.common.koreanLifeMatch}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-primary" data-testid="text-match-rate">
                    {matchRate}
                  </span>
                  <span className="text-2xl font-semibold text-primary">%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
