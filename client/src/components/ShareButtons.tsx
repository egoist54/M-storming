import { Button } from "@/components/ui/button";
import { Share2, Link2, MessageCircle } from "lucide-react";
import { SiKakaotalk, SiFacebook, SiX } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  title: string;
  description?: string;
}

export default function ShareButtons({ title, description }: ShareButtonsProps) {
  const { toast } = useToast();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "링크 복사 완료!",
        description: "친구들에게 공유해보세요 🎉",
      });
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleKakaoShare = () => {
    console.log('Kakao share triggered');
    toast({
      title: "카카오톡 공유",
      description: "카카오톡으로 공유 기능은 곧 추가될 예정입니다.",
    });
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleTwitterShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">결과 공유하기</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleKakaoShare}
          className="gap-2 bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#000000] border-0"
          data-testid="button-share-kakao"
        >
          <SiKakaotalk className="w-5 h-5" />
          카카오톡
        </Button>

        <Button
          onClick={handleFacebookShare}
          className="gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-0"
          data-testid="button-share-facebook"
        >
          <SiFacebook className="w-5 h-5" />
          페이스북
        </Button>

        <Button
          onClick={handleTwitterShare}
          variant="outline"
          className="gap-2"
          data-testid="button-share-twitter"
        >
          <SiX className="w-5 h-5" />
          트위터
        </Button>

        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="gap-2"
          data-testid="button-copy-link"
        >
          <Link2 className="w-5 h-5" />
          링크 복사
        </Button>
      </div>
    </div>
  );
}
