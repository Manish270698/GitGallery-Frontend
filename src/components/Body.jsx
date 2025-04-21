import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { addRepo } from "../utils/repoSlice";
import { addCurrentRepo } from "../utils/currentRepoSlice";
import { addCurrentUser } from "../utils/currrentUserSlice";
import { InstructionsContext } from "./context/InstructionsContext";

const Body = () => {
  const loggedInUser = useSelector((store) => store?.user);
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState(false);

  const getLoggedData = async () => {
    try {
      const repoData = await axios.get(BASE_URL + "/profile/loggedIn/view", {
        withCredentials: true,
      });
      dispatch(addRepo(repoData.data.data));
      dispatch(addCurrentRepo(repoData.data.data));
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.ERROR);
      console.log("error from body");
      alert(error);
    }
  };

  const fetchUser = async () => {
    if (!path.includes("shared")) {
      try {
        const user = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        console.log("user: ", user);
        await getLoggedData();
        if (user) {
          // const userData = {
          //   id: user.data.user.id,
          //   githubUserName: user.data.user.githubUserName,
          //   name: user.data.user.name,
          //   emailId: user.data.user.emailId,
          //   topSkills: user.data.user.skills,
          // };
          dispatch(addUser(user.data.user));
          dispatch(
            addCurrentUser({
              currentGithubUserName: user.data.user.githubUserName,
              currentName: user.data.user.name,
              currentEmailId: user.data.user.emailId,
              currentTopSkills: user.data.user.skills,
            })
          );
        }
      } catch (err) {
        if (err.status === 401) {
          console.log("path: ", path);
          navigate(path);
        } else {
          navigate("/error");
        }
      }
    }
  };

  useEffect(() => {
    !loggedInUser && fetchUser();
    setPath(location.pathname);
  }, []);
  return (
    <>
      <div
        className="body bg-white text-sm lg:text-base text-[#f0f6fc]"
        onClick={(e) => e.stopPropagation()}
      >
        <InstructionsContext.Provider value={{ view, setView }}>
          <Navbar />
          <ScrollToTop />
          <Outlet />
        </InstructionsContext.Provider>
        <Footer />
      </div>
    </>
  );
};

export default Body;
