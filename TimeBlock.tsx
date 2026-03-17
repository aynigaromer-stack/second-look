type TimeBlockProps = {
  firstLook: string;
  secondLook: string;
  days: string;
};

export default function TimeBlock({ firstLook, secondLook, days }: TimeBlockProps) {
  return (
    <div className="time-block">
      <div>First Look &nbsp;{firstLook}</div>
      <div>Second Look &nbsp;{secondLook}</div>
      <div className="time-days">· {days} days ·</div>
    </div>
  );
}
