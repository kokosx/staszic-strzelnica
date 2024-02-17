import { useCallback, useContext, useEffect, useState } from "react";
import { SetContext } from "../../SetProvider";
import { useNavigate } from "react-router-dom";
import { useInterval } from "usehooks-ts";

export const useTraining = () => {
  const ctx = useContext(SetContext);
  let weapons = ctx!.activeSet!.weapons;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ctx || !ctx.activeSet) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [ctx, navigate]);

  const swap = () => {
    setIsSwapping(true);
    weapons[currentWeaponIndex].magazines--;
    let gotDeleted = false;
    if (weapons[currentWeaponIndex].magazines === 0) {
      gotDeleted = true;
      weapons = weapons.filter((_, i) => i !== currentWeaponIndex);
    }
    const owi = currentWeaponIndex;
    const nwi = getRandomTarget(weapons.length);
    let isSameWeapon = false;
    if (!gotDeleted && owi === nwi) {
      isSameWeapon = true;
    }
    setCurrentWeaponIndex(nwi);
    setCurrentWeapon(weapons[nwi]);
    setCurrentMessage(getSwapMessage(isSameWeapon));
    setIsSwapping(false);
  };

  const getSwapMessage = (isSameWeapon: boolean) => {
    if (isSameWeapon) {
      return `Przeładuj broń`;
    }
    return `Zmień broń na ${currentWeapon.name}`;
  };

  const [isSwapping, setIsSwapping] = useState(false);

  useInterval(() => {
    const isEmpty = shotsFiredFromWeapon === currentWeapon.rounds;

    if (isEmpty) {
      swap();
    } else {
      let nshots = 10000;
      while (nshots > currentWeapon.rounds - shotsFiredFromWeapon) {
        nshots = getRandomTarget(3);
      }
      setToFire(nshots);
      setShotsFiredFromWeapon((prev) => prev + nshots);
      const ntarget = getRandomTarget(ctx!.activeSet!.targets);
      console.log(ntarget);
      setCurrentTarget(ntarget);
      //show message
      setCurrentMessage(getMessage(ntarget));
    }
  }, 3000);

  const getRandomTarget = (n: number) => {
    return Math.floor(Math.random() * n) + 1;
  };

  const [toFire, setToFire] = useState(getRandomTarget(3));
  const [shotsFiredFromWeapon, setShotsFiredFromWeapon] = useState(toFire);

  const getToFireMessage = () => {
    if (toFire === 1) {
      return "singlet";
    }
    if (toFire === 2) {
      return "dublet";
    }
    if (toFire === 3) {
      return "triplet";
    }
  };

  const getRandomIndex = (len: number) => {
    return Math.floor(Math.random() * len);
  };

  const [currentTarget, setCurrentTarget] = useState(
    getRandomTarget(ctx!.activeSet!.targets)
  );

  /** FIXME: ntarget - bez tego nie dziala, powód nieznany, trzeba podać przy rerenderze  */
  const getMessage = (ntarget?: number) => {
    return `Wystrzel ${getToFireMessage()} w tarcze ${
      ntarget ?? currentTarget
    }`;
  };

  const [currentWeaponIndex, setCurrentWeaponIndex] = useState(
    getRandomIndex(weapons.length)
  );
  const [currentWeapon, setCurrentWeapon] = useState(
    weapons[currentWeaponIndex]
  );
  const [currentMessage, setCurrentMessage] = useState(getMessage());

  return {
    loading,
    targets: ctx!.activeSet!.targets,
    currentMessage,
    currentTarget,
  };
};
