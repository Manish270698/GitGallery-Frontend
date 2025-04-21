import {
  ArrowLeftEndOnRectangleIcon,
  Bars3BottomLeftIcon,
  PowerIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeRepo } from "../utils/repoSlice";
import { motion } from "framer-motion";
import axios from "axios";
import { addCurrentRepo, removeCurrentRepo } from "../utils/currentRepoSlice";
import { addCurrentUser, removeCurrentUser } from "../utils/currrentUserSlice";
import { InstructionsContext } from "./context/InstructionsContext";

const Navbar = () => {
  const user = useSelector((store) => store.currentUser);
  const loggedInUser = useSelector((store) => store.user);
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { view, setView } = useContext(InstructionsContext);

  const navRef = useRef(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/signout", {}, { withCredentials: true });
      navigate("/login");
      dispatch(removeUser());
      dispatch(removeRepo());
      dispatch(removeCurrentRepo());
      dispatch(removeCurrentUser());
    } catch (err) {
      navigate("/error");
    }
  };

  const handleOutsideClick = (e) => {
    setToggle(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`nav z-10 flex top-0 text-[#f0f6fc] fixed w-screen justify-between items-center px-10 lg:px-20 py-2 lg:py-5 ${
        location.pathname === "/"
          ? "bg-[#07024d]"
          : "bg-[#010409] border-b-[0.5px] border-[#4f5154]"
      } backdrop-blur-md`}
    >
      <div className="hidden lg:flex sm:relative flex-1  justify-start">
        <div>
          {user?.currentName
            ? user?.currentName?.substring(0, 20)
            : user?.currentUserName?.substring(0, 20)}
        </div>
      </div>
      <div className="sm:relative flex-1 flex justify-start lg:hidden">
        <div>
          {user?.currentName
            ? user?.currentName?.substring(0, 20)
            : user?.currentUserName?.substring(0, 20)}
        </div>
      </div>
      <motion.div
        className="flex-1 text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5, ease: "backInOut" }}
      >
        <div className="relative mx-auto text-2xl lg:text-3xl font-extrabold">
          <Link
            to={`${
              loggedInUser?.name && !location.pathname.includes("shared")
                ? "/repos"
                : "/"
            }`}
          >
            GitGallery
          </Link>
        </div>
      </motion.div>
      <div className="hidden flex-1 lg:flex justify-end cursor-pointer">
        <ul className="flex justify-between gap-10">
          {(location.pathname === "/repos" ||
            location.pathname === "/preview") && (
            <li className="hover:underline underline-offset-4 hover:text-yellow-600">
              <QuestionMarkCircleIcon
                title="How does it work?"
                className="size-8"
                onClick={() => setView(!view)}
              />
            </li>
          )}
          {loggedInUser?.name && !location.pathname.includes("shared") ? (
            <li
              className="hover:underline underline-offset-4 hover:text-red-600"
              onClick={handleLogout}
            >
              <Link title="logout" to="/login">
                <PowerIcon className="size-6 lg:size-8" />
              </Link>
            </li>
          ) : (
            !location.pathname.includes("shared") && (
              <li className="hover:underline underline-offset-4">
                <Link to="/login">Login or Signup</Link>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="lg:hidden flex-1 items-center gap-4 flex justify-end relative z-20 cursor-pointer">
        {" "}
        {(location.pathname === "/repos" ||
          location.pathname === "/preview") && (
          <QuestionMarkCircleIcon
            title="How does it work?"
            className="size-6 lg:size-8 hover:text-yellow-600"
            onClick={() => setView(!view)}
          />
        )}
        {toggle && !location.pathname.includes("shared") ? (
          <Bars3BottomLeftIcon
            className="size-6 lg:size-8"
            onClick={handleToggle}
          />
        ) : (
          !location.pathname.includes("shared") && (
            <XMarkIcon className="size-6 lg:size-8" onClick={handleToggle} />
          )
        )}
        {!toggle ? (
          <ul className="absolute z-50 top-10 text-right bg-[#0d1117] rounded-md p-2 border-[0.5px] border-[#465a7e]/40">
            {loggedInUser?.name ? (
              <li
                className="hover:underline underline-offset-4 hover:text-red-600"
                onClick={handleLogout}
              >
                <Link to="/login">Logout</Link>
              </li>
            ) : (
              <li className="hover:underline underline-offset-4">
                <Link to="/login">Login or Signup</Link>
              </li>
            )}
          </ul>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
