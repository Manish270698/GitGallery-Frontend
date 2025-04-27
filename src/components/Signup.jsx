import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { motion } from "framer-motion";
import { addCurrentUser } from "../utils/currrentUserSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await axios.post(
        BASE_URL + "/signup",
        {
          userName,
          name,
          emailId,
          password,
          skills: skills.split(",").map((skill) => skill.trim()),
        },
        { withCredentials: true }
      );
      dispatch(addUser(data.data.user));
      dispatch(
        addCurrentUser({
          currentName: data?.data?.user?.name,
          currentTopSkills: data?.data?.user?.skills,
        })
      );
      navigate("/repos");
    } catch (err) {
      setError(err?.response?.data?.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc]">
      <div className="pt-28 lg:pt-36 flex justify-center">
        <motion.form
          className="bg-[#151b23] p-8 rounded-xl border-[0.5px] border-[#465a7e]/40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5, ease: "easeIn" }}
        >
          <div className="mb-4 lg:mb-5">
            <label className="block mb-2" htmlFor="username">
              Username *
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder=""
              className="block font-light bg-[#0d1117] p-2 border-text w-96 focus:outline-none rounded-md border-[0.5px] border-[#465a7e]/40"
            ></input>
          </div>
          <div className="mb-4 lg:mb-5">
            <label className="block mb-2" htmlFor="username">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              className="block font-light bg-[#0d1117] p-2 border-text w-96 focus:outline-none rounded-md border-[0.5px] border-[#465a7e]/40"
            ></input>
          </div>
          <div className="mb-4 lg:mb-5">
            <label className="block mb-2" htmlFor="username">
              Email *
            </label>
            <input
              id="emailId"
              name="emailId"
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder=""
              className="block font-light bg-[#0d1117] p-2 border-text w-96 focus:outline-none rounded-md border-[0.5px] border-[#465a7e]/40"
            ></input>
          </div>
          <div className="mb-4 lg:mb-5 block">
            <label className="mb-2 block" htmlFor="password" name="password">
              Password *
            </label>
            <div className="flex items-center w-96 ">
              <input
                id="password"
                type={`${visible ? "text" : "password"}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-[90%] font-light bg-[#0d1117] h-10 p-2 border-text focus:outline-none border-[0.5px] border-[#465a7e]/40 rounded-l-md"
              ></input>
              <div
                className="h-10 w-[10%] border-[0.5px] border-[#465a7e]/40 bg-[#0d1117] rounded-r-md flex items-center justify-center hover:cursor-pointer"
                onClick={handleToggle}
              >
                {visible ? (
                  <EyeIcon className="size-5 lg:size-5" />
                ) : (
                  <EyeSlashIcon className="size-5 lg:size-5" />
                )}
              </div>
            </div>
          </div>
          <div className="mb-4 lg:mb-5">
            <label className="block mb-2" htmlFor="username">
              Top Skills{" "}
              <p className="text-[#a1a6b5] inline-block">(comma separated)</p>
            </label>
            <input
              id="skills"
              name="skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder=""
              className="block font-light bg-[#0d1117] p-2 border-text w-96 focus:outline-none rounded-md border-[0.5px] border-[#465a7e]/40"
            ></input>
          </div>
          <div className="mb-4 lg:mb-5 w-96 overflow-hidden text-red-500 text-sm">
            <p>{error}</p>
          </div>
          <div className="flex justify-between items-center mb-4 lg:mb-5">
            <motion.button
              className="bg-[#238636] px-4 py-2 rounded-md"
              type="submit"
              onClick={handleSubmit}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Create account
            </motion.button>
            <p className="text-[#4493f8]">
              <Link to="/login" className="hover:underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
