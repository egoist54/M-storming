import QuizProgress from '../QuizProgress';

export default function QuizProgressExample() {
  return (
    <div className="w-full max-w-md space-y-6">
      <QuizProgress current={1} total={10} />
      <QuizProgress current={5} total={10} />
      <QuizProgress current={10} total={10} />
    </div>
  );
}
