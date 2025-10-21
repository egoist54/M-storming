import QuizCard from '../QuizCard';
import personalityThumb from '@assets/generated_images/성격_퀴즈_섬네일_이미지_c75d527d.png';

export default function QuizCardExample() {
  return (
    <div className="max-w-md">
      <QuizCard
        id="1"
        title="당신의 성격 유형은?"
        description="10가지 질문으로 알아보는 나의 진짜 성격! 친구들과 결과를 비교해보세요."
        category="성격"
        thumbnail={personalityThumb}
        participantCount={5234}
        onStart={() => console.log('Quiz started')}
      />
    </div>
  );
}
