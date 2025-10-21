import QuestionCard from '../QuestionCard';

export default function QuestionCardExample() {
  const sampleQuestion = {
    question: "주말에 가장 하고 싶은 활동은?",
    answers: [
      { id: "1", text: "친구들과 함께 밖에 나가서 놀기", score: 1 },
      { id: "2", text: "집에서 혼자 영화 보거나 책 읽기", score: 2 },
      { id: "3", text: "새로운 취미나 기술 배우기", score: 3 },
      { id: "4", text: "가족과 조용히 시간 보내기", score: 4 }
    ]
  };

  return (
    <QuestionCard
      question={sampleQuestion.question}
      answers={sampleQuestion.answers}
      onAnswer={(id) => console.log('Selected answer:', id)}
    />
  );
}
