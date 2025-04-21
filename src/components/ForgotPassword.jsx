import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await axios.post(
        BASE_URL + "/user/forgotpassword",
        {
          username,
        },
        { withCredentials: true }
      );
      setError(null);
      setResponse(data?.data?.message);
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
              Username or email address
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              className="bg-[#eb7734] px-4 py-2 rounded-md"
              type="submit"
              onClick={handleSubmit}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Get reset link
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

export default ForgotPassword;
