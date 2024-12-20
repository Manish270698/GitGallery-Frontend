import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopSkillsContext } from "./Repos";

const Profile = () => {
  const dispatch = useDispatch();
  const repoData = useSelector((store) => store?.currentRepo);
  const user = useSelector((store) => store?.currentUser);
  const stars = repoData?.reduce((acc, data) => acc + data.stars, 0);

  const [username, setUsername] = useState(user?.currentName);
  const [topSkills, setTopSkills] = useState(user?.currentTopSkills);
  const [nameVis, setNameVis] = useState(true);
  const [skillsVis, setSkillsVis] = useState(true);

  const { topSkillset, setTopSkillset } = useContext(TopSkillsContext);

  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const newSkills = e.target.value.split(",").map((skill) => skill.trim());
    setTopSkills(newSkills);
    setTopSkillset(newSkills);
    console.log("topSkillset: ", topSkillset);
  };

  const handleOutsideClick = (e) => {
    // Check if the click happened outside the form
    if (formRef.current && !formRef.current.contains(e.target)) {
      setNameVis(true);
      setSkillsVis(true);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setUsername(user?.currentName);
    setTopSkills(user?.currentTopSkills);
    setTopSkillset(user?.currentTopSkills);
  }, [user]);

  return (
    <div className="profile bg-[#0d1117] flex justify-center pt-10 pb-4">
      <form
        ref={formRef}
        className="flex flex-col w-[90%] md:w-[65%] xl:w-[55%] border-2 border-[#7c8493] rounded-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          setNameVis(true);
          setSkillsVis(true);
        }}
      >
        <div className="flex items-center gap-7 flex-1 justify-between bg-[#010409] px-6 py-3 lg:px-8 lg:py-4 rounded-t-2xl">
          {!nameVis && (
            <input
              id="username"
              name="username"
              type="text"
              className="text-xl rounded-md lg:text-2xl font-bold bg-[#010409] overflow-x-scroll w-[60%]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setNameVis(true)}
            />
          )}
          {nameVis && (
            <span
              className="text-xl lg:text-2xl font-bold bg-[#010409]"
              onClick={() => setNameVis(false)}
            >
              {username}
            </span>
          )}
          <span className="text-base lg:text-lg">
            {" "}
            No. of repositories: {repoData?.length}{" "}
          </span>
          <span className="text-base lg:text-lg">Total stars: {stars}</span>
        </div>
        {!skillsVis && (
          <div className="flex-1 flex flex-wrap px-6 py-3 lg:px-8 gap-2 lg:py-4 rounded-t-2xl text-base lg:text-xl items-center">
            Top Skills:&nbsp;
            <input
              type="text"
              name="topSkills"
              id="topSkills"
              className="text-base border-[1px] py-1 px-3 rounded-xl bg-[#010409]"
              value={topSkills}
              onChange={handleInputChange} // Update state
              onBlur={() => setSkillsVis(true)}
            />
          </div>
        )}
        {skillsVis && (
          <div
            className="flex-1 flex flex-wrap px-6 py-3 lg:px-8 gap-2 lg:py-4 rounded-t-2xl text-base lg:text-xl items-center"
            onClick={() => setSkillsVis(false)}
          >
            Top Skills:&nbsp;
            {user &&
              topSkills?.map((skill, i) => (
                <span
                  className="text-base border-[1px] py-1 px-3 rounded-xl"
                  key={user.id + i}
                >
                  {skill}&nbsp;
                </span>
              ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
