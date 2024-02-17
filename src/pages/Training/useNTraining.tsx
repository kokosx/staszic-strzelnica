import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetContext } from "../../SetProvider";

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
  let weapons = ctx!.activeSet!.weapons;
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
      const target = getRandomTarget(MAX_TARGETS);
      rounds.push({ shots: toFire, target });
    }

    return rounds;
  };

  useEffect(() => {
    if (!ctx || !ctx.activeSet) {
      navigate("/");
    } else {
      setLoading(false);

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
      }
    }
  }, [ctx, navigate]);

  useEffect(() => {}, []);

  return { loading };
};
