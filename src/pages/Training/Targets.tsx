import TargetIcon from "../../lib/TargetIcon";

type Props = {
  amount: number;
  active?: number | null;
};

const Targets = ({ active, amount }: Props) => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from(Array(amount)).map((_, i) => (
        <TargetIcon
          key={i}
          className={`w-12 h-12 ${
            active === i + 1 ? "fill-red-500" : "fill-white"
          }`}
        />
      ))}
    </div>
  );
};

export default Targets;
