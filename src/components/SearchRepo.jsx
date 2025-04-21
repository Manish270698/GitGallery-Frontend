import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentRepo } from "../utils/currentRepoSlice";
import { useNavigate } from "react-router-dom";
import { addCurrentUser } from "../utils/currrentUserSlice";
import { addRepo } from "../utils/repoSlice";
import { CurrentContext } from "./context/CurrentContext";

const SearchRepo = () => {
  const loggedInUser = useSelector((store) => store?.user);
  const user = useSelector((store) => store?.currentUser);
  const repo = useSelector((store) => store?.repo);
  const currentRepo = useSelector((store) => store?.currentRepo);

  const [currentName, setCurrentName] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { topSkillset, name, setName, setTopSkillset } =
    useContext(CurrentContext);

  // Function to reset data
  const handleReset = (e) => {
    e.preventDefault();
    try {
      dispatch(addCurrentRepo(repo));
      dispatch(
        addCurrentUser({
          currentName: loggedInUser?.name,
          currentEmailId: loggedInUser?.emailId,
          currentTopSkills: loggedInUser?.skills,
        })
      );
      setName(loggedInUser?.name);
      setTopSkillset(loggedInUser?.skills);
      setCurrentName(loggedInUser?.githubUserName || "");
    } catch (err) {
      navigate("/error");
    }
  };

  // Function to fetch user repositories
  const getData = async () => {
    try {
      const repoData = await axios.get(`${BASE_URL}/user/${currentName}/view`, {
        withCredentials: true,
      });

      if (repoData.data.data.length === 0) {
        alert(`No public repositories found for username: ${currentName}`);
        return;
      }

      // Add position as array index
      const reposWithPosition = repoData.data.data.map((repo, index) => ({
        ...repo,
        position: index, // Assign position as array index
      }));

      dispatch(addCurrentRepo(reposWithPosition));
      console.log(currentName, name);
      dispatch(
        addCurrentUser({
          currentName:
            loggedInUser?.name?.length > 0 ? loggedInUser?.name : currentName,
          currentEmailId: loggedInUser?.emailId,
          currentTopSkills: topSkillset,
        })
      );
      setError(null);
    } catch (err) {
      const errorMsg = err?.response?.data?.ERROR || "An error occurred.";
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  // Handle form submission
  const handleGo = async (e) => {
    e.preventDefault();
    if (!currentName || currentName.trim() === "") {
      alert("Invalid GitHub username!");
      return;
    }
    await getData();
  };

  // Handle saving profile data
  const handleSave = async (e) => {
    e.preventDefault();
    await document.activeElement.blur();
    try {
      const data = [
        [
          {
            name: user.currentName,
            skills: user.currentTopSkills,
          },
        ],
        currentRepo.map(
          (
            {
              userId,
              repoName,
              repositoryLink,
              deployedLink,
              description,
              repoSkills,
              stars,
              visible,
              position,
            },
            index
          ) => ({
            userId: loggedInUser.id,
            repoName: repoName ?? "",
            repositoryLink: repositoryLink ?? "",
            deployedLink: deployedLink ?? "",
            description: description ?? "",
            repoSkills: repoSkills ?? [],
            stars: stars ?? 0,
            visible: visible ?? false,
            position: index ?? null,
          })
        ),
      ];

      const response = await axios.post(
        `${BASE_URL}/profile/loggedIn/${loggedInUser.id}/save`,
        { data },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      alert(err?.response?.data?.ERROR || "Failed to update profile.");
    }
  };

  // Ensure input field doesn't get reset unexpectedly
  // useEffect(() => {
  //   if (!currentName) {
  //     setCurrentName(user?.currentGithubUserName || "");
  //   }
  // }, [user?.currentGithubUserName]);

  return (
    <div className="bg-[#0d1117]">
      <div className="pt-28 lg:pt-36 px-10 lg:px-20 mx-auto w-[90%] lg:w-[60%] flex flex-col justify-center items-center">
        <div className="block">
          <form className="flex flex-wrap mx-auto justify-center items-center gap-4">
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
              onClick={handleGo}
              className="bg-[#238636] hover:bg-[#165120] py-2 px-4 text-white rounded-md"
              title="Go"
            >
              Go
            </button>
            {loggedInUser && (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-[#2450b6] hover:bg-[#213f7b] py-2 px-4 text-white rounded-md"
                  title="Save"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-[#ca7d25] hover:bg-[#b05c32] py-2 px-4 text-white rounded-md"
                  title="Reset"
                >
                  Reset
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchRepo;
