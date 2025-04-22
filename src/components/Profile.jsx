import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrentContext } from "./context/CurrentContext";
import { addCurrentUser } from "../utils/currrentUserSlice"; // Import Redux action

const Profile = () => {
  const dispatch = useDispatch();
  const repoData = useSelector((store) => store?.currentRepo);
  const user = useSelector((store) => store?.currentUser);
  const stars = repoData?.reduce((acc, data) => acc + data?.stars, 0);
  const loggedInUser = useSelector((store) => store.user);

  const [username, setUsername] = useState(user?.currentName || "");
  const [topSkills, setTopSkills] = useState(user?.currentTopSkills || []);
  const [nameVis, setNameVis] = useState(true);
  const [skillsVis, setSkillsVis] = useState(true);

  const { setTopSkillset, setName } = useContext(CurrentContext);

  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const newSkills = e.target.value.split(",").map((skill) => skill.trim());
    setTopSkills(newSkills);
    setTopSkillset(newSkills);
  };

  const handleOutsideClick = (e) => {
    if (document.current && !document.current.contains(e.target)) {
      setNameVis(true);
      setSkillsVis(true);
      // saveProfileData(); // Save data when clicking outside
      document.activeElement.blur();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setUsername(user?.currentName || "");
    setTopSkills(user?.currentTopSkills || []);
    setTopSkillset(user?.currentTopSkills || []);
  }, [user]);

  // Function to save profile data
  const saveProfileData = () => {
    dispatch(
      addCurrentUser({ currentName: username, currentTopSkills: topSkills })
    );
  };

  return (
    <div className="profile bg-[#0d1117] flex justify-center pt-10 pb-4">
      <form
        ref={formRef}
        className="flex flex-col w-[90%] md:w-[65%] xl:w-[55%] border-2 border-[#7c8493] rounded-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          setNameVis(true);
          setSkillsVis(true);
          saveProfileData();
        }}
      >
        <div className="flex items-start flex-wrap gap-[2px] lg:gap-[7px] flex-1 w-[100%] justify-between bg-[#010409] px-3 py-2 lg:px-8 lg:py-4 rounded-t-2xl">
          <div
            className={`w-[50%] bg-[#010409] rounded-xl lg:w-[40%] overflow-x-hidden ${
              !nameVis ? "border-[1px]" : ""
            }`}
          >
            {!nameVis && (
              <input
                id="username"
                name="username"
                type="text"
                className="text-xl rounded-xl w-[100%] border-none lg:text-2xl font-bold bg-[#010409]"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setName(e.target.value);
                }}
                onBlur={() => {
                  setNameVis(true);
                  saveProfileData();
                }}
              />
            )}
            {nameVis && (
              <span
                className="text-xl lg:text-2xl font-bold cursor-pointer"
                onClick={() => setNameVis(false)}
              >
                {username}
              </span>
            )}
          </div>
          <span className="text-base overflow-clip w-[24%] lg:text-lg">
            <p className="hidden md:inline-block">No. of repositories:&nbsp;</p>
            <p className="md:hidden inline-block">Repos:&nbsp;</p>
            {repoData?.length}{" "}
          </span>
          <span className="text-base text-center w-[24%] lg:text-lg">
            <p className="hidden md:inline-block">Total stars:&nbsp;</p>
            <p className="md:hidden inline-block">Stars:&nbsp;</p>
            {stars}
          </span>
        </div>
        {!skillsVis && (
          <div className="flex-1 flex flex-wrap px-6 py-3 lg:px-8 gap-2 lg:py-4 rounded-t-2xl text-base lg:text-xl items-center">
            Top Skills:&nbsp;
            <input
              type="text"
              name="topSkills"
              id="topSkills"
              className="text-base border-[1px] py-1 px-3 rounded-xl bg-[#010409]"
              value={topSkills.join(", ")}
              onChange={handleInputChange}
              onBlur={() => {
                setSkillsVis(true);
                saveProfileData();
              }}
            />
          </div>
        )}
        {skillsVis && (
          <div className="flex-1 flex flex-wrap px-6 py-3 lg:px-8 gap-2 lg:py-4 rounded-t-2xl text-base lg:text-xl items-center">
            <p onClick={() => setSkillsVis(false)}>Top Skills:&nbsp;</p>
            {topSkills?.map((skill, i) => (
              <span
                className="text-base border-[1px] w-auto py-1 px-3 rounded-xl cursor-pointer"
                key={i}
                onClick={() => setSkillsVis(false)}
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
