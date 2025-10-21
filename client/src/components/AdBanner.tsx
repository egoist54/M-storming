import { Card } from "@/components/ui/card";

interface AdBannerProps {
  slot?: string;
  format?: string;
}

export default function AdBanner({ slot = "placeholder", format = "auto" }: AdBannerProps) {
  return (
    <Card className="p-6 bg-muted/30 border-dashed" data-testid="card-ad-banner">
      <div className="flex flex-col items-center justify-center min-h-[120px] space-y-2">
        <div className="text-sm font-medium text-muted-foreground">광고 영역</div>
        <div className="text-xs text-muted-foreground">Google AdSense Slot: {slot}</div>
        <div className="text-xs text-muted-foreground">Format: {format}</div>
      </div>
    </Card>
  );
}
