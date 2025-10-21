import VisitorCounter from '../VisitorCounter';

export default function VisitorCounterExample() {
  return (
    <div className="flex flex-col gap-4">
      <VisitorCounter count={12345} />
      <VisitorCounter count={1234} label="명 참여" />
    </div>
  );
}
