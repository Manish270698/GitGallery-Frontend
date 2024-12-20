import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentRepo } from "../utils/currentRepoSlice";
import { useNavigate } from "react-router-dom";
import { addCurrentUser } from "../utils/currrentUserSlice";
import { TopSkillsContext } from "./Repos";

const SearchRepo = () => {
  const loggedInUser = useSelector((store) => store?.user);
  const user = useSelector((store) => store?.currentUser);
  const [currentName, setCurrentName] = useState(user?.currentGithubUserName);
  const repo = useSelector((store) => store?.repo);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { topSkillset, setTopSkillset } = useContext(TopSkillsContext);

  const handleReset = (e) => {
    try {
      e.preventDefault();
      dispatch(addCurrentRepo(repo));
    } catch (err) {
      navigate("/error");
    }
  };

  const getData = async () => {
    try {
      const repoData = await axios.get(
        BASE_URL + "/user/" + currentName + "/view",
        { withCredentials: true }
      );
      if (repoData.data.data.length === 0)
        return alert(
          "No public repositories found for username: " + currentName
        );
      dispatch(addCurrentRepo(repoData.data.data));
      dispatch(
        addCurrentUser({
          currentGithubUserName: currentName,
          currentName: loggedInUser?.name ? loggedInUser?.name : currentName,
          currentEmailId: loggedInUser?.emailId,
          currentTopSkills: topSkillset,
        })
      );

      setError(null);
    } catch (err) {
      setError(err?.response?.data?.ERROR);
      alert(err?.response?.data?.ERROR);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (currentName === null || currentName === "") {
        return alert("Invalid github username!");
      }
      await getData();
    } catch (err) {
      setError(err?.response?.data?.ERROR);
      alert(error);
    }
  };

  const handleSave = async (e) => {};

  // Synchronize currentUserName with the Redux store
  useEffect(() => {
    setCurrentName(user?.currentGithubUserName || "");
  }, [user?.currentGithubUserName]);

  return (
    <div className="bg-[#0d1117]">
      <div className="pt-28 lg:pt-36 px-10 lg:px-20 mx-auto w-[90%] lg:w-[60%] flex flex-col justify-center items-center ">
        <div className="block">
          <form className="flex flex-wrap  mx-auto justify-center items-center gap-4">
            {/* <label className="mb-2" htmlFor="currentName">
              Github username :
            </label> */}
            <input
              className="bg-[#151b23] p-2 border-[0.5px] border-[#465a7e]/40 w-64 lg:w-80 focus:outline-none rounded-md"
              id="currentName"
              name="currentName"
              type="text"
              onChange={(e) => setCurrentName(e.target.value)}
              value={currentName}
              placeholder="Github username"
              title="github username"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#238636] hover:bg-[#165120] py-2 px-4 text-white rounded-md"
              title="Go"
            >
              Go
            </button>
            <button
              type="submit"
              onClick={handleSave}
              className="bg-[#2450b6] hover:bg-[#213f7b] py-2 px-4 text-white rounded-md"
              title="save"
            >
              Save
            </button>
            {loggedInUser && (
              <button
                type="submit"
                onClick={handleReset}
                className="bg-[#ca7d25] hover:bg-[#b05c32] py-2 px-4 text-white rounded-md"
                title="reset"
              >
                Reset
              </button>
            )}
          </form>
        </div>
        {/* <div className="block mb-4 text-red-500">
        <p>{error}</p>
      </div> */}
      </div>
    </div>
  );
};

export default SearchRepo;
