import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetContext } from "../../SetProvider";
import { useInterval } from "usehooks-ts";

const MAX_SHOTS = 3;
const DEFAULT_DELAY = 5000;

type TrainingRound = {
  shots: number;
  target: number;
};

type TrainingActivity = {
  weaponIndex: number;
  weaponName: string;
  rounds: TrainingRound[];
};

export const useTraining = () => {
  const ctx = useContext(SetContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [activities, setActivities] = useState<TrainingActivity[]>([]);

  useEffect(() => {
    //Setup indices
    const indices: Record<string, number> = {};
    weapons.forEach((v, i) => {
      const ind = indices[v.name];
      if (!ind) {
        indices[v.name] = i;
      }
    });

    while (weapons.length > 0) {
      //Generate random weapon
      const weaponIndex = randomIndex(weapons.length);
      const weaponsRounds = getTrainingRoundsForWeapon(weaponIndex);
      const currentActivity: TrainingActivity = {
        weaponIndex: indices[weapons[weaponIndex].name],
        weaponName: weapons[weaponIndex].name,
        rounds: weaponsRounds,
      };
      trainingActivities.push(currentActivity);
      weapons[weaponIndex].magazines--;
      if (weapons[weaponIndex].magazines === 0) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        weapons = weapons.filter((_, i) => i !== weaponIndex);
      }
      setActivities(trainingActivities);

      setLoading(false);
    }
  }, [ctx, navigate]);

  const speak = (msg: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(msg);

    synth.speak(utterance);
  };

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
      nshots = generateShots();
    }
    return nshots;
  };

  const getTrainingRoundsForWeapon = (weaponIndex: number): TrainingRound[] => {
    let fired = 0;
    const rounds: TrainingRound[] = [];
    while (fired !== weapons[weaponIndex].rounds) {
      const leftToFire = weapons[weaponIndex].rounds - fired;
      const toFire = generateShotsToFire(leftToFire);
      fired += toFire;
      const target = getRandomTarget(targets);
      rounds.push({ shots: toFire, target });
    }

    return rounds;
  };

  const [activityIndex, setActivityIndex] = useState<number>(0);
  //If its 0, weapon has not been set up yet
  const [roundIndex, setRoundIndex] = useState<null | number>(null);

  const getShotsMessage = () => {
    switch (activities[activityIndex!].rounds[roundIndex!].shots) {
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
      activities[activityIndex!].rounds[roundIndex!].target
    }`;
  };

  const getChangeWeaponMessage = (
    differentWeapon: boolean,
    weaponName: string
  ) => {
    if (differentWeapon) {
      return `Zmień broń na ${weaponName}`;
    }
    return `Przeładuj ${weaponName}`;
  };

  const [didStart, setDidStart] = useState(false);
  const [didEnd, setDidEnd] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<null | string>(null);
  const [activeTarget, setActiveTarget] = useState<number | null>(null);
  const [delay, setDelay] = useState<number | null>(null);

  const startTraining = (delay: number = DEFAULT_DELAY) => {
    speak("Przygotuj się");
    setDelay(delay);
    setDidStart(true);
  };
  const endTraining = () => {
    speak("Koniec");
    setDidEnd(true);
    setDelay(null);
  };

  const didWeaponChange = () => {
    if (activityIndex === 0) {
      return true;
    }
    return (
      activities[activityIndex - 1].weaponIndex !==
      activities[activityIndex].weaponIndex
    );
  };

  //this sets the delay for interval, if delay is null - interval stops
  useInterval(() => {
    const ev = new CustomEvent("next-round");
    document.dispatchEvent(ev);
    //TODO: REWRITE CAUSE UGLY
    if (activityIndex < activities.length) {
      if (roundIndex === null) {
        //If its the first round

        //If its not the first round

        const areWeaponsTheSame = didWeaponChange();

        const msg = getChangeWeaponMessage(
          areWeaponsTheSame,
          activities[activityIndex].weaponName
        );
        speak(msg);

        setCurrentMessage(msg);

        //starts with 0
        setRoundIndex(0);
      } else {
        setActiveTarget(activities[activityIndex!].rounds[roundIndex!].target);
        const msg = getMessage();
        speak(msg);
        setCurrentMessage(msg);
        setRoundIndex((p) => p! + 1);

        if (roundIndex === activities[activityIndex!].rounds.length - 1) {
          setRoundIndex(null);
          setActivityIndex((p) => p! + 1);
        }
      }
    } else {
      endTraining();
    }
  }, delay);

  useEffect(() => {
    // if (didStart && !didEnd) {
    //   startTraining();
    // }
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
