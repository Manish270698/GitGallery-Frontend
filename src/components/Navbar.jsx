import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeRepo } from "../utils/repoSlice";
import { motion } from "framer-motion";
import axios from "axios";
import { removeCurrentRepo } from "../utils/currentRepoSlice";
import { removeCurrentUser } from "../utils/currrentUserSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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

  return (
    <nav
      className={`nav z-10 flex top-0 text-[#f0f6fc] fixed w-screen justify-between items-center px-10 lg:px-20 py-2 lg:py-5 ${
        location.pathname === "/"
          ? "bg-[#07024d]"
          : "bg-[#010409] border-b-[0.5px] border-[#4f5154]"
      } backdrop-blur-md`}
    >
      <div className="sm:relative flex-1 flex justify-start">
        <div>{user ? user?.name : ""}</div>
      </div>
      <motion.div
        className="flex-1 text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5, ease: "backInOut" }}
      >
        <div className="relative mx-auto text-2xl lg:text-3xl font-extrabold">
          <Link to={`${user.name ? "/repos" : "/"}`}>GitGallery</Link>
        </div>
      </motion.div>
      <div className="hidden flex-1 lg:flex justify-end cursor-pointer">
        <ul className="flex justify-between gap-10">
          {user ? (
            <li className="hover:underline underline-offset-4">Edit</li>
          ) : (
            ""
          )}
          {user ? (
            <li
              className="hover:underline underline-offset-4"
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
      </div>
      <div
        className="lg:hidden flex-1 flex justify-end relative cursor-pointer"
        onClick={handleToggle}
      >
        {toggle ? (
          <Bars3BottomLeftIcon className="size-8" />
        ) : (
          <XMarkIcon className="size-8" />
        )}
        {!toggle ? (
          <ul className="absolute top-10 text-right bg-[#0d1117] rounded-md p-2 border-[0.5px] border-[#465a7e]/40">
            {user ? (
              <li className="hover:underline underline-offset-4 pb-5">Edit</li>
            ) : (
              ""
            )}
            {user ? (
              <li
                className="hover:underline underline-offset-4"
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
