import { GlobeAltIcon, StarIcon } from "@heroicons/react/24/outline";
import { github } from "../assets/index";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import Shareable from "./Shareable";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addRepo } from "../utils/repoSlice";
import { addCurrentRepo } from "../utils/currentRepoSlice";
import { addUser } from "../utils/userSlice";
import { addCurrentUser } from "../utils/currrentUserSlice";

const SharedPreview = () => {
  const { username } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.currentUser);
  const repos = useSelector((store) => store.currentRepo);

  const getRepoData = async () => {
    try {
      const repoData = await axios.get(`${BASE_URL}/user/${username}/view`, {
        withCredentials: true,
      });

      if (repoData.data.data.length === 0) {
        alert(`No public repositories found for username: ${username}`);
        return;
      }

      // Add position as array index
      const reposWithPosition = repoData.data.data.map((repo, index) => ({
        ...repo,
        position: index, // Assign position as array index
      }));

      dispatch(addCurrentRepo(reposWithPosition));
    } catch (err) {
      const errorMsg = err?.response?.data?.ERROR || "An error occurred.";
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await axios.get(`${BASE_URL}/user/${username}/shared`, {
        withCredentials: true,
      });
      if (data.data.data.repoData.length > 0) {
        dispatch(
          addCurrentUser({
            currentName: data.data.data.name,
            currentTopSkills: data.data.data.skills,
          })
        );
        dispatch(addCurrentRepo(data.data.data.repoData));
      }
    } catch (err) {
      if (err.status === 401) {
        navigate(path);
      } else if (err.status === 404) {
        dispatch(
          addCurrentUser({
            currentName: username,
            currentTopSkills: [],
          })
        );
        await getRepoData();
      } else {
        navigate("/error");
      }
    }
  };

  const location = window.location.href;

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="bg-[#0d1117] min-h-screen pt-28 lg:pt-36">
      {user ? (
        <>
          <div className="profile bg-[#0d1117] flex justify-center pb-4">
            <div className="flex flex-col w-[90%] md:w-[65%] xl:w-[55%] border-2 border-[#7c8493] rounded-2xl">
              <div className="flex items-start flex-wrap gap-[2px] lg:gap-[7px] flex-1 w-[100%] justify-between bg-[#010409] px-3 py-2 lg:px-8 lg:py-4 rounded-t-2xl">
                <div className="w-[50%] bg-[#010409] rounded-xl lg:w-[40%] overflow-x-hidden">
                  <span className="text-xl lg:text-2xl font-bold cursor-pointer">
                    {user.currentName}
                  </span>
                </div>
                <span className="text-base overflow-clip w-[24%] lg:text-lg">
                  <p className="hidden md:inline-block">
                    No. of repositories:&nbsp;
                  </p>
                  <p className="md:hidden inline-block">Repos:&nbsp;</p>
                  {repos?.filter((repo) => repo?.visible === true).length}{" "}
                </span>
                <span className="text-base text-center w-[24%] lg:text-lg">
                  <p className="hidden md:inline-block">Total stars:&nbsp;</p>
                  <p className="md:hidden inline-block">Stars:&nbsp;</p>
                  {repos?.reduce((acc, data) => acc + data.stars, 0)}
                </span>
              </div>

              <div className="flex-1 flex flex-wrap px-6 py-3 lg:px-8 gap-2 lg:py-4 rounded-t-2xl text-base lg:text-xl items-center">
                <p>Top Skills:&nbsp;</p>
                {user?.currentTopSkills?.map((skill, i) => (
                  <span
                    className="text-base border-[1px] w-auto py-1 px-3 rounded-xl"
                    key={i}
                  >
                    {skill}&nbsp;
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[#0d1117] min-h-screen flex flex-col items-center pb-2 overflow-clip">
            <div className="w-[90%] md:w-[65%] xl:w-[55%] bg-[#010409] border-2 border-[#7c8493]/40 flex flex-col gap-4 rounded-2xl p-2 lg:p-4">
              {repos?.map(
                (repo) =>
                  repo.visible && (
                    <div
                      key={repo._id}
                      className="flex flex-col border-2 border-[#7c8493] rounded-2xl"
                    >
                      <div className="card px-6 py-3 lg:px-4 flex flex-col bg-[#0d1117] rounded-2xl">
                        <div className="flex flex-1 gap-[2%] justify-between items-center py-2 lg:px-8 lg:py-4">
                          <p className="text-base lg:text-lg w-[59%] break-words font-bold">
                            {repo.repoName}
                          </p>
                          <div className="w-[9%] flex justify-center">
                            {repo.deployedLink && (
                              <a
                                href={repo.deployedLink}
                                target="none"
                                title="deployed link"
                              >
                                <GlobeAltIcon className="size-6">
                                  {repo.deployedLink}
                                </GlobeAltIcon>
                              </a>
                            )}
                          </div>
                          <div className="w-[9%] flex justify-center">
                            {repo.repositoryLink && (
                              <a
                                href={repo.repositoryLink}
                                target="/"
                                title="repository link"
                                className="bg-white w-5 h-5 lg:w-6 lg:h-6 rounded-3xl flex justify-center items-center"
                              >
                                <img
                                  src={github}
                                  alt="repository link"
                                  className="size-5 lg:size-6 "
                                />
                              </a>
                            )}
                          </div>
                          <div className="w-[19%] flex justify-center">
                            <div
                              className="flex gap-1 break-words"
                              title="stars"
                            >
                              {repo?.stars > 0 && (
                                <>
                                  <StarIcon className="size-5 lg:size-6" />
                                  {repo?.stars}
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {repo?.description && (
                          <div className="py-2 lg:px-8 lg:py-4 break-words">
                            {repo?.description}
                          </div>
                        )}

                        {repo?.repoSkills?.length > 0 && (
                          <div className="py-2 lg:px-8 lg:py-4 break-words">
                            Skills:&nbsp;&nbsp;
                            {repo?.repoSkills?.map((skill) => (
                              <span key={skill._id}>
                                <p className="inline font-semibold">{skill}</p>
                                &nbsp;&nbsp;&nbsp;
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="profile bg-[#0d1117] flex justify-center pt-36 pb-4">
          Nohing to show here right now!
        </div>
      )}
    </div>
  );
};

export default SharedPreview;
