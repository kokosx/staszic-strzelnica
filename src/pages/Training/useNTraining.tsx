import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetContext } from "../../SetProvider";
import { useInterval } from "usehooks-ts";

const MAX_SHOTS = 3;
const MAX_TARGETS = 5;

type TrainingRound = {
  shots: number;
  target: number;
};

type TrainingActivity = {
  weaponIndex: number;
  weaponName: string;
  rounds: TrainingRound[];
};

export const useNTraining = () => {
  const ctx = useContext(SetContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [activities, setActivities] = useState<TrainingActivity[]>([]);

  useEffect(() => {
    if (!ctx || !ctx.activeSet) {
      navigate("/");
    } else {
      console.log("START GENERATING");
      while (weapons.length > 0) {
        //Generate random weapon
        const weaponIndex = randomIndex(weapons.length);
        const weaponsRounds = getTrainingRoundsForWeapon(weaponIndex);
        const currentActivity: TrainingActivity = {
          weaponIndex,
          weaponName: weapons[weaponIndex].name,
          rounds: weaponsRounds,
        };
        trainingActivities.push(currentActivity);
        weapons[weaponIndex].magazines--;
        if (weapons[weaponIndex].magazines === 0) {
          weapons = weapons.filter((_, i) => i !== weaponIndex);
        }
        setActivities(trainingActivities);
        console.log(trainingActivities);
        setLoading(false);
      }
    }
  }, [ctx, navigate]);

  const targets = ctx!.activeSet!.targets;

  let weapons = ctx!.activeSet!.weapons;

  const trainingActivities: TrainingActivity[] = [];

  const randomIndex = (n: number) => {
    return Math.floor(Math.random() * n);
  };

  const getRandomTarget = (n: number) => {
    return Math.floor(Math.random() * n) + 1;
  };

  const generateShots = () => getRandomTarget(MAX_SHOTS);

  const generateShotsToFire = (leftToFire: number) => {
    let nshots = generateShots();

    while (nshots > leftToFire) {
      console.log("generateshots");
      nshots = generateShots();
    }
    return nshots;
  };

  const getTrainingRoundsForWeapon = (weaponIndex: number): TrainingRound[] => {
    let fired = 0;
    const rounds: TrainingRound[] = [];
    while (fired !== weapons[weaponIndex].rounds) {
      console.log("getrounds");
      const leftToFire = weapons[weaponIndex].rounds - fired;
      const toFire = generateShotsToFire(leftToFire);
      fired += toFire;
      const target = getRandomTarget(targets);
      rounds.push({ shots: toFire, target });
    }

    return rounds;
  };

  const [activityIndex, setActivityIndex] = useState(0);
  const [roundIndex, setRoundIndex] = useState(0);

  const getShotsMessage = () => {
    switch (activities[activityIndex].rounds[roundIndex].shots) {
      case 1:
        return "singlet";
      case 2:
        return "dublet";
      case 3:
        return "triplet";
    }
  };

  const getMessage = () => {
    return `Wystrzel ${getShotsMessage()} w tarcze ${
      activities[activityIndex].rounds[roundIndex].target
    }`;
  };

  const [didStart, setDidStart] = useState(false);
  const [didEnd, setDidEnd] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<null | string>(null);
  const [activeTarget, setActiveTarget] = useState(-1);
  const [delay, setDelay] = useState<number | null>(null);

  const startTraining = (delay: number = 3000) => {
    setDelay(delay);
    setDidStart(true);
  };
  const endTraining = () => {
    setDidEnd(true);
  };
  //this sets the delay for interval, if delay is null - interval stops

  useInterval(() => {
    console.log("czemu kurwiszonie nie dzialasz");
    if (activityIndex < activities.length) {
      setActiveTarget(activities[activityIndex].rounds[roundIndex].target);
      setCurrentMessage(getMessage());
      setRoundIndex((p) => p + 1);

      if (roundIndex === activities[activityIndex].rounds.length - 1) {
        setRoundIndex(0);
        setActivityIndex((p) => p + 1);
      }
    } else {
      endTraining();
    }
  }, delay);

  useEffect(() => {
    if (didStart && !didEnd) {
      startTraining();
    }
    if (didStart && didEnd) {
      setDelay(null);
    }
    if (loading) {
      setDelay(null);
    }
  }, [didStart, didEnd, loading]);

  return {
    loading,
    currentMessage,
    didStart,
    didEnd,
    startTraining,
    endTraining,
    activeTarget,
    targets,
  };
};
