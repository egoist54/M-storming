import ResultCard from '../ResultCard';
import positiveResult from '@assets/generated_images/긍정적_결과_이미지_42ed835e.png';

export default function ResultCardExample() {
  return (
    <ResultCard
      title="밝고 긍정적인 에너지 뿜뿜!"
      description="당신은 주변 사람들에게 활력을 주는 긍정 에너지의 소유자예요! 어떤 상황에서도 밝은 면을 찾아내고, 다른 사람들을 격려하는 재능이 있어요. 당신과 함께 있으면 모두가 즐거워집니다."
      image={positiveResult}
      participantCount={1234}
      category="성격 유형"
    />
  );
}
