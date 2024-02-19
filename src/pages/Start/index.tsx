import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { type FormEvent } from "react";
import { WeaponInUse } from "../../lib/types";
import { SetContext } from "../../SetProvider";
import WeaponsModal from "./WeaponsModal";

const Start = () => {
  const [targets, setTargets] = useState(2);
  const [weapons, setWeapons] = useState<WeaponInUse[]>([]);
  const activeSet = useContext(SetContext);

  const navigate = useNavigate();

  const changeTargets = (sign: "-" | "+") => {
    if (isTargetChangeUnvailable(sign)) {
      return;
    }
    if (sign === "+") {
      setTargets((prev) => prev + 1);
      return;
    }
    setTargets((prev) => prev - 1);
  };
  const isTargetChangeUnvailable = (sign: "-" | "+") => {
    if (sign === "+") {
      return targets + 1 > 5;
    }
    return targets - 1 < 2;
  };

  const addNewWeapon = () => {
    setWeapons((prev) => [
      ...prev,
      { magazines: 1, name: `Nowa broń ${prev.length + 1}`, rounds: 15 },
    ]);
  };

  const addWeaponFromList = (newWeapon: WeaponInUse) => {
    setWeapons((prev) => [...prev, newWeapon]);
  };

  const deleteWeapon = (index: number) => {
    setWeapons((prev) => prev.filter((_, i) => i !== index));
  };

  const updateWeaponsName = (index: number, value: string) => {
    const weapon = weapons[index];
    weapon.name = value;
    setWeapons((weapons) => weapons.map((_, i) => (i === index ? weapon : _)));
  };
  const updateWeaponsAmmo = (
    index: number,
    value: string,
    field: keyof Pick<WeaponInUse, "magazines" | "rounds">
  ) => {
    const weapon = weapons[index];
    weapon[field] = Number(value);

    setWeapons((weapons) => weapons.map((_, i) => (i === index ? weapon : _)));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    //Validate data

    //
    activeSet!.setActiveSet({ targets, weapons });
    navigate("/training");
  };

  const openWeaponsModal = () => {
    //@ts-expect-error exists cause of daisyui
    document.getElementById("weapons-modal")!.showModal();
  };

  return (
    <div className="container flex items-center justify-center min-h-screen mx-auto ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <h2 className="text-3xl font-semibold text-center">
          Rozpocznij trening
        </h2>
        <p>Ilość tarcz:</p>
        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={() => changeTargets("-")}
            disabled={isTargetChangeUnvailable("-")}
            className="btn btn-square"
          >
            <IconMinus />
          </button>
          <p className="my-auto text-center">{targets}</p>
          <button
            type="button"
            onClick={() => changeTargets("+")}
            disabled={isTargetChangeUnvailable("+")}
            className="btn btn-square"
          >
            <IconPlus />
          </button>
        </div>
        <p>Bronie:</p>
        <div className="w-full overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Naboje</th>
                <th className="w-6">Magazynki</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {weapons.map((weapon, i) => (
                <tr key={i}>
                  <td>
                    <input
                      onChange={(e) => updateWeaponsName(i, e.target.value)}
                      value={weapon.name}
                      type="text"
                      className="w-24 text-xs md:text-sm md:w-36 input input-sm"
                    />
                  </td>
                  <td>
                    <input
                      value={weapon.rounds}
                      onChange={(e) =>
                        updateWeaponsAmmo(i, e.target.value, "rounds")
                      }
                      type="text"
                      className="w-12 input input-sm"
                    />
                  </td>
                  <td>
                    <input
                      value={weapon.magazines}
                      onChange={(e) =>
                        updateWeaponsAmmo(i, e.target.value, "magazines")
                      }
                      type="text"
                      className="w-12 input input-sm"
                    />
                  </td>
                  <td>
                    <button onClick={() => deleteWeapon(i)} type="button">
                      <IconX className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-x-2 ">
          <button onClick={addNewWeapon} type="button" className="w-1/2 btn">
            Dodaj broń
          </button>
          <button
            onClick={openWeaponsModal}
            type="button"
            className="w-1/2 btn"
          >
            Dodaj z listy
          </button>
        </div>
        <button type="submit" className="btn btn-primary">
          Rozpocznij
        </button>
      </form>
      <WeaponsModal addWeaponFromList={addWeaponFromList} />
    </div>
  );
};

export default Start;
