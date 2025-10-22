import { Button } from "@/components/ui/button";
import { Share2, Link2, MessageCircle } from "lucide-react";
import { SiKakaotalk, SiFacebook, SiX } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShareButtonsProps {
  title: string;
  description?: string;
  quizId: string;
  resultImage?: string;
}

export default function ShareButtons({ title, description, quizId, resultImage }: ShareButtonsProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // 공유 링크는 홈페이지 + 퀴즈 파라미터로 설정 (GitHub Pages 404 방지)
  const shareUrl = `${window.location.origin}${import.meta.env.BASE_URL}?quiz=${quizId}`;
  
  // 결과 이미지 절대 URL (Open Graph용)
  const imageUrl = resultImage 
    ? (resultImage.startsWith('http') ? resultImage : `${window.location.origin}${resultImage}`)
    : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: t.share.copied,
        description: t.share.copiedDesc,
      });
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleKakaoShare = () => {
    console.log('Kakao share triggered');
    toast({
      title: t.share.kakao,
      description: "카카오톡으로 공유 기능은 곧 추가될 예정입니다.",
    });
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleTwitterShare = () => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">{t.common.share}</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleKakaoShare}
          className="gap-2 bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#000000] border-0"
          data-testid="button-share-kakao"
        >
          <SiKakaotalk className="w-5 h-5" />
          {t.share.kakao}
        </Button>

        <Button
          onClick={handleFacebookShare}
          className="gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-0"
          data-testid="button-share-facebook"
        >
          <SiFacebook className="w-5 h-5" />
          {t.share.facebook}
        </Button>

        <Button
          onClick={handleTwitterShare}
          variant="outline"
          className="gap-2"
          data-testid="button-share-twitter"
        >
          <SiX className="w-5 h-5" />
          {t.share.twitter}
        </Button>

        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="gap-2"
          data-testid="button-copy-link"
        >
          <Link2 className="w-5 h-5" />
          {t.share.copyLink}
        </Button>
      </div>
    </div>
  );
}
