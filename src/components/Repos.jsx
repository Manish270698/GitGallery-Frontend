import React, { createContext, useContext, useState } from "react";
import SearchRepo from "./SearchRepo";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import RepoCard from "./RepoCard";
import Profile from "./Profile";

export const TopSkillsContext = createContext();

const Repos = () => {
  const repoData = useSelector((store) => store?.currentRepo);
  const user = useSelector((store) => store?.currentUser);
  const [topSkillset, setTopSkillset] = useState([]);

  return (
    <div className="bg-[#0d1117] min-h-screen">
      <Menu />
      <TopSkillsContext.Provider value={{ topSkillset, setTopSkillset }}>
        <SearchRepo />
        {user?.currentName && <Profile />}
      </TopSkillsContext.Provider>
      {user?.currentName && (
        <div className="bg-[#0d1117] min-h-screen flex flex-col items-center pb-2 overflow-clip">
          <div className="w-[90%] md:w-[65%] xl:w-[55%] bg-[#010409] border-2 border-[#7c8493]/40 flex flex-col gap-4 rounded-2xl p-2 lg:p-4">
            {repoData
              ? repoData.map((data) => <RepoCard key={data._id} data={data} />)
              : ""}
          </div>

          {/* <div className="flex-shrink-0 h-16 bg-[#0d1117]"></div> */}
        </div>
      )}
    </div>
  );
};

export default Repos;
