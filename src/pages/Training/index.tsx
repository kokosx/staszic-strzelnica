import { useEffect, useState } from "react";
import Targets from "./Targets";
import { useTraining } from "./useTraining";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useNTraining } from "./useNTraining";

const Training = () => {
  //const { loading, targets, currentMessage, currentTarget } = useTraining();
  const { loading, activeTarget, currentMessage, targets, startTraining } =
    useNTraining();
  const [isChangeMessageShown, setIsChangeMessageShown] = useState(false);

  useEffect(() => {
    document.addEventListener("training-change", () => {
      setIsChangeMessageShown(true);
      setTimeout(() => {
        setIsChangeMessageShown(false);
      }, 1000);
    });

    return () => {
      document.removeEventListener("training-change", () => {});
    };
  }, []);

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
      <Targets amount={targets} active={activeTarget} />
      <p>{currentMessage}</p>
      {isChangeMessageShown && <p>Zmiana!</p>}
      <button onClick={startTraining}>Start</button>
    </div>
  );

  const renderer = ({ seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      return page;
    }
    return (
      <div className="flex items-center justify-center w-full min-h-screen text-6xl font-bold animate-pulse">
        {seconds}
      </div>
    );
  };

  return page;
};

export default Training;
