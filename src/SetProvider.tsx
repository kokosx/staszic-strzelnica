import {
  createContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { ActiveSet } from "./lib/types";

export const SetContext = createContext<{
  activeSet: ActiveSet | null;
  setActiveSet: Dispatch<SetStateAction<ActiveSet | null>>;
} | null>(null);

const SetProvider = ({ children }: PropsWithChildren) => {
  const [activeSet, setActiveSet] = useState<ActiveSet | null>(null);

  return (
    <SetContext.Provider value={{ activeSet, setActiveSet }}>
      {children}
    </SetContext.Provider>
  );
};

export default SetProvider;
