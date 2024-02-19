import { useEffect, useState } from "react";
import Targets from "./Targets";
import { useTraining } from "./useTraining";
import { Link } from "react-router-dom";

const Training = () => {
  //const { loading, targets, currentMessage, currentTarget } = useTraining();
  const {
    loading,
    activeTarget,
    currentMessage,
    targets,
    startTraining,
    didEnd,
    didStart,
  } = useTraining();
  const [isChangeMessageShown, setIsChangeMessageShown] = useState(false);

  useEffect(() => {
    document.addEventListener("next-round", () => {
      setIsChangeMessageShown(true);
      setTimeout(() => {
        setIsChangeMessageShown(false);
      }, 500);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-4">
      <h2
        className={`text-5xl font-semibold ease-in-out duration-500 ${
          isChangeMessageShown && "text-red-500"
        }`}
      >
        Trening
      </h2>
      <Targets amount={targets} active={activeTarget} />
      {didStart && !currentMessage && <p>Przygotuj się</p>}
      <p>{currentMessage}</p>
      {didEnd && (
        <>
          <p>Koniec!</p>
          <Link className="btn btn-primary" to="/">
            Strona główna
          </Link>
        </>
      )}
      {!didStart && (
        <button className="btn btn-primary" onClick={() => startTraining()}>
          Start
        </button>
      )}
    </div>
  );
};

export default Training;
