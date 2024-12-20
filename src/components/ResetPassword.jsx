import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const { token } = useParams();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        password === confirmPassword &&
        (password != "") & (confirmPassword !== "")
      ) {
        const data = await axios.patch(
          BASE_URL + "/user/resetpassword/" + token,
          {
            password,
          },
          { withCredentials: true }
        );
        setError(null);
        setResponse(data?.data?.message);
      } else if (password !== confirmPassword) {
        console.log(password, confirmPassword);
        setError("Passwords don't match!");
      }
    } catch (err) {
      setError(err?.response?.data?.ERROR);
    }
  };

  return (
    <div className=" min-h-screen bg-[#0d1117] text-[#f0f6fc]">
      <div className="pt-28 lg:pt-36 flex justify-center ">
        <motion.form
          className="bg-[#151b23] p-8 rounded-xl border-[0.5px] border-[#465a7e]/40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5, ease: "easeIn" }}
        >
          <div className="mb-4 lg:mb-5">
            <label className="block mb-2" htmlFor="username">
              New password*
            </label>
            <input
              id="password"
              name="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="block font-light bg-[#0d1117] p-2 border-text w-96 focus:outline-none rounded-md border-[0.5px] border-[#465a7e]/40"
            ></input>
          </div>
          <div className="mb-4 lg:mb-5">
            <label className="block mb-2" htmlFor="username">
              Repeat password*
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=""
              className="block font-light bg-[#0d1117] p-2 border-text w-96 focus:outline-none rounded-md border-[0.5px] border-[#465a7e]/40"
            ></input>
          </div>
          <div className="mb-4 lg:mb-5 text-red-500 text-sm">
            <p>{error}</p>
          </div>
          <div className="mb-4 lg:mb-5 text-sm">
            <p>{response}</p>
          </div>
          <div className="flex justify-between items-center mb-4 lg:mb-5">
            <motion.button
              className="bg-[#238636] px-4 py-2 rounded-md"
              type="submit"
              onClick={handleSubmit}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Reset password
            </motion.button>
            <p className="text-[#4493f8]">
              <Link to="/login" className="hover:underline underline-offset-4">
                Login
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default ResetPassword;
