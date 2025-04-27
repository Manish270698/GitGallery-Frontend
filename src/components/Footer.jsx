import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation(); // Get the current path
  const isRootPage = location.pathname === "/"; // Check if it's the root page

  return (
    <div className={`${!isRootPage ? "bg-[#0D1117]" : ""} text-[#f0f6fc] py-8`}>
      <div className="my-6 border-t border-[#5e5f61]"></div>
      {/* Footer Content */}
      <div className="px-4 mx-auto flex justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col space-y-4">
          <Link
            to="/about"
            className="hover:text-white text-sm lg:text-md text-[#5e5f61]"
          >
            About Us
          </Link>
          <Link
            to="/privacy-policy"
            className="hover:text-white text-sm lg:text-md text-[#5e5f61]"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="hover:text-white text-sm lg:text-md text-[#5e5f61]"
          >
            Terms & Conditions
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex flex-col space-y-4 text-right">
          <Link
            to="/donate"
            className="hover:text-white text-sm lg:text-md text-[#5e5f61]"
          >
            Donate
          </Link>
          <Link
            to="/contact"
            className="hover:text-white text-sm lg:text-md text-[#5e5f61]"
          >
            Contact Us
          </Link>
          <Link
            to="/faq"
            className="hover:text-white text-sm lg:text-md text-[#5e5f61]"
          >
            FAQ
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-4 text-center text-sm text-[#5e5f61] flex-col items-center justify-center">
        <div className="">
          Made by <span className="font-bold">Manish.</span>
        </div>
        <div className="">
          © {new Date().getFullYear()} GitGallery. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
