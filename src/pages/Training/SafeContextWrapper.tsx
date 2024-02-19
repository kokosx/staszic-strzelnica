import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { SetContext } from "../../SetProvider";
import { useNavigate } from "react-router-dom";

const SafeContextWrapper = ({ children }: PropsWithChildren) => {
  const ctx = useContext(SetContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!ctx?.activeSet || !ctx) {
      navigate("/start");
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    children
  );
};

export default SafeContextWrapper;
