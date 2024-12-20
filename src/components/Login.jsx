import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { motion } from "framer-motion";
import { animate } from "motion";
import { addCurrentUser } from "../utils/currrentUserSlice";
import { addRepo } from "../utils/repoSlice";
import { addCurrentRepo } from "../utils/currentRepoSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("Manish270698");
  const [password, setPassword] = useState("Manish@123");
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = await axios.post(
        BASE_URL + "/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      const repoData = await axios.get(BASE_URL + "/profile/loggedIn/view", {
        withCredentials: true,
      });

      dispatch(addUser(user.data.user));
      dispatch(
        addCurrentUser({
          currentGithubUserName: user.data.user.githubUserName,
          currentName: user.data.user.name,
          currentEmailId: user.data.user.emailId,
          currentTopSkills: user.data.user.skills,
        })
      );
      dispatch(addRepo(repoData.data.data));
      dispatch(addCurrentRepo(repoData.data.data));
      navigate("/repos");
    } catch (err) {
      setError(err?.response?.data?.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="pt-28 lg:pt-36 flex justify-center flex-wrap">
        <motion.form
          className="bg-[#151b23] p-4 lg:p-8 rounded-xl border-[0.5px] border-[#465a7e]/40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5, ease: "easeIn" }}
        >
          <div className="mb-4 lg:mb-5">
            <label className="block mb-2" htmlFor="username">
              Github username or email address
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(null);
              }}
              placeholder=""
              className="block font-light bg-[#0d1117] p-2 border-text w-72 lg:w-96 focus:outline-none rounded-md border-[0.5px] border-[#465a7e]/40"
            ></input>
          </div>
          <div className="mb-4 lg:mb-5 block">
            <label className="mb-2 block" htmlFor="password" name="password">
              Password
            </label>
            <div className="flex w-72 lg:w-96 items-center">
              <input
                id="password"
                type={`${visible ? "text" : "password"}`}
                value={password}
                onChange={(e) => {
                  {
                    setPassword(e.target.value);
                    setError(null);
                  }
                }}
                className="w-[90%] font-light bg-[#0d1117] h-10 p-2 border-text focus:outline-none border-[0.5px] border-[#465a7e]/40 rounded-l-md"
              ></input>
              <div
                className="h-10 w-[10%] border-[0.5px] border-[#465a7e]/40 bg-[#0d1117] rounded-r-md flex items-center justify-center hover:cursor-pointer"
                onClick={handleToggle}
              >
                {visible ? (
                  <EyeIcon className="size-4 lg:size-5" />
                ) : (
                  <EyeSlashIcon className="size-4 lg:size-5" />
                )}
              </div>
            </div>
          </div>
          <div className="mb-4 overflow-hidden w-72 lg:w-96 lg:mb-5 text-red-500 text-sm">
            <p className="">{error}</p>
          </div>
          <div className="flex justify-between items-center mb-4 lg:mb-5">
            <motion.button
              className="bg-[#238636] px-4 py-2 rounded-md"
              type="submit"
              onClick={handleSubmit}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Sign in
            </motion.button>
            <p className="text-[#4493f8]">
              New here?{" "}
              <Link to="/signup" className="hover:underline underline-offset-4">
                Create account
              </Link>
            </p>
          </div>
          <div className="inline-block text-[#4493f8]">
            <Link to="/forgotpassword">
              <p className="hover:underline underline-offset-4">
                Forgot Password?
              </p>
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
