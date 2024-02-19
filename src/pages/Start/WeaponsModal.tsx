import { WeaponInUse } from "../../lib/types";

type Props = {
  addWeaponFromList: (newWeapon: WeaponInUse) => void;
};

const weapons: WeaponInUse[] = [
  {
    name: "Glock 18c",
    rounds: 17,
    magazines: 1,
  },
  {
    name: "HK416",
    rounds: 30,
    magazines: 1,
  },
  {
    name: "M4",
    rounds: 30,
    magazines: 1,
  },
];

const WeaponsModal = ({ addWeaponFromList }: Props) => {
  const closeModal = () => {
    //@ts-expect-error it does exist :)
    document.querySelector("#close-button")!.click();
  };

  const add = (v: WeaponInUse) => {
    addWeaponFromList(v);
    closeModal();
  };

  return (
    <dialog id="weapons-modal" className="modal">
      <div className="flex flex-col modal-box gap-y-2">
        <h3 className="text-lg font-bold">Wybierz broń</h3>
        <div className="flex flex-col gap-2">
          {weapons.map((v, i) => (
            <div key={i} className="flex items-center justify-between gap-x-2">
              <p>
                {v.name} mający {v.rounds} pocisków
              </p>
              <button onClick={() => add(v)} className="btn btn-secondary">
                Dodaj
              </button>
            </div>
          ))}
        </div>
        <button className="btn" onClick={closeModal}>
          Zamknij
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id="close-button">close</button>
      </form>
    </dialog>
  );
};

export default WeaponsModal;
