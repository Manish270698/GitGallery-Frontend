import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <nav className="top-12 lg:top-16 fixed w-screen backdrop-blur-md bg-[#0d1117] pb-4">
      <ul className="flex pt-3 lg:pt-5">
        <li className="flex-1 flex justify-center">
          <Link
            to="/repos"
            className={`${
              path === "/repos" ? "underline underline-offset-4" : ""
            }`}
            title="repositories"
          >
            REPOS
          </Link>
        </li>
        <li className="flex-1 flex justify-center border-l-2 text-[#f0f6fc]">
          <Link
            to="/preview"
            className={`${
              path === "/preview" ? "underline underline-offset-4" : ""
            }`}
            title="preview"
          >
            PREVIEW
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
