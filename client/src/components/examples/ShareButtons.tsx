import ShareButtons from '../ShareButtons';
import { Toaster } from "@/components/ui/toaster";

export default function ShareButtonsExample() {
  return (
    <>
      <div className="max-w-md">
        <ShareButtons 
          title="나는 외향적인 리더 유형!" 
          description="당신도 테스트해보세요!"
        />
      </div>
      <Toaster />
    </>
  );
}
