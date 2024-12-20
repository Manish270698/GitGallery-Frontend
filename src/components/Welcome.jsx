import { useSelector } from "react-redux";
import StarsCanvas from "./canvas/Stars";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="relative z-0 min-h-screen bg-gradient-to-b from-[#07024d] from-10% via-[#12026d] via-60% to-[#dbd678] to-100%">
      <div className="welcome pt-28 lg:pt-36 flex justify-center text-3xl md:text-5xl lg:text-6xl font-bold">
        <div className="w-[85%] lg:w-[60%] leading-snug text-center">
          <span className="text-shadow">
            The best way to share your Github profile with the recruiters
          </span>
        </div>
      </div>
      <div className="mt-8 mb-4 lg:mb-5 text-lg md:text-xl flex justify-center">
        <div className="flex flex-wrap gap-8 justify-center items-center w-[85%] lg:w-[60%]">
          <Link to="/repos">
            <button
              className="bg-[#238636] px-6 py-2 lg:px-8 lg:py-3 rounded-md border-[3px] hover:bg-[#165120] border-[#f0f1fc] shadow-3xl"
              type="submit"
            >
              Try yourself
            </button>
          </Link>
          <Link to={user ? "/repos" : "/signup"}>
            <button
              className="px-6 py-2 lg:px-8 lg:py-3 rounded-md bg-[#0c1340] border-[3px] hover:bg-[#251a5b] border-[#f0f1fc] shadow-3xl"
              type="submit"
            >
              Create Account
            </button>
          </Link>
        </div>
      </div>
      <StarsCanvas />
    </div>
  );
};

export default Welcome;
