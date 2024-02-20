import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-2">
      <h1 className="font-semibold text-center text-primary text-7xl">
        Staszic strzelnica
      </h1>
      <div className="flex flex-col gap-y-2 w-[350px]">
        <Link to="start" className="w-full row-span-2 btn btn-primary">
          Rozpocznij
        </Link>
      </div>
    </div>
  );
};

export default index;
