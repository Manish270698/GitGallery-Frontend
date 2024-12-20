import {
  EyeIcon,
  EyeSlashIcon,
  GlobeAltIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { github } from "../assets/index";
import { useState } from "react";

const RepoCard = ({ data }) => {
  const [visible, setVisible] = useState(data?.visible);

  return (
    <form
      className="flex flex-col border-2 border-[#7c8493] rounded-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        // setNameVis(true);
        // setSkillsVis(true);
      }}
    >
      <div className="card p-2 lg:p-3 flex flex-col bg-[#0d1117] rounded-2xl  cursor-move">
        <div className="flex flex-1 gap-5 justify-between items-center px-6 py-3 lg:px-8 lg:py-4">
          <p className="text-base lg:text-lg w-[60%] overflow-clip font-bold">
            {data?.repoName}
          </p>
          <div className="w-[10%]">
            <a href={data?.deployedLink} target="none" title="deployed link">
              <GlobeAltIcon className="size-6">
                {data?.deployedLink}
              </GlobeAltIcon>
            </a>
          </div>
          <div className="w-[10%]">
            <a
              href={data?.repositoryLink}
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
          </div>
          <div className="w-[10%]">
            <div className="flex gap-1" title="starred">
              <StarIcon className="size-5 lg:size-6 " /> {data?.stars}
            </div>
          </div>
          <div onClick={() => setVisible(!visible)}>
            {visible ? (
              <EyeIcon
                title="visible"
                className="size-5 lg:size-6 cursor-pointer"
              />
            ) : (
              <EyeSlashIcon
                title="invisible"
                className="size-5 lg:size-6 cursor-pointer"
              />
            )}
          </div>
        </div>
        {/* <hr className="w-[95%] text-[#010409] mx-auto px-6 py-3 lg:px-8 gap-2 lg:py-4" /> */}
        <div className="px-6 py-2 lg:px-8">
          Description: {data?.description}
        </div>
        <div className="px-6 py-3 lg:px-8 lg:py-4">
          Skills:{" "}
          {data?.repoSkills?.map((skill) => (
            <span>{skill}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>
    </form>
  );
};

export default RepoCard;
