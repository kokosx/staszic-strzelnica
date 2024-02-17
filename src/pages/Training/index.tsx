import Targets from "./Targets";
import { useTraining } from "./useTraining";
import Countdown, { CountdownRenderProps } from "react-countdown";

const Training = () => {
  const { loading, targets, currentMessage, currentTarget } = useTraining();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const page = (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-4">
      <h2 className="text-5xl font-semibold">Trening</h2>
      <Targets amount={targets} active={currentTarget} />
      <p>{currentMessage}</p>
    </div>
  );

  const renderer = ({ seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      return page;
    }
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-6xl font-bold animate-pulse">
        {seconds}
      </div>
    );
  };

  return page;
};

export default Training;
