import { EyeIcon, EyeSlashIcon, StarIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentRepo } from "../utils/currentRepoSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const RepoCard = ({ data }) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data?._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const currentRepo = useSelector((store) => store.currentRepo);

  const [repoName, setRepoName] = useState(data?.repoName || "");
  const [repositoryLink, setRepositoryLink] = useState(
    data?.repositoryLink || ""
  );
  const [deployedLink, setDeployedLink] = useState(data?.deployedLink || "");
  const [description, setDescription] = useState(data?.description || "");
  const [repoSkills, setRepoSkills] = useState(data?.repoSkills || []);
  const [repoSkillsInput, setRepoSkillsInput] = useState(repoSkills.join(", "));
  const [editField, setEditField] = useState(null);
  const [listenerNeeded, setListenerNeeded] = useState(true);

  const handleSave = (updatedData) => {
    const updatedRepos = currentRepo.map((repo) =>
      repo._id === data._id ? { ...repo, ...updatedData } : repo
    );
    dispatch(addCurrentRepo(updatedRepos));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  useEffect(() => {
    setRepoName(data?.repoName || "");
    setRepositoryLink(data?.repositoryLink || "");
    setDeployedLink(data?.deployedLink || "");
    setDescription(data?.description || "");
    setRepoSkills(data?.repoSkills || []);
    setRepoSkillsInput((data?.repoSkills || []).join(", "));
  }, [data]);

  return (
    <form
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(listenerNeeded ? listeners : {})}
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col border-2 border-[#7c8493] rounded-2xl p-4 bg-[#0d1117] space-y-4 cursor-grab"
    >
      {/* Repo Name */}
      <div className="flex items-center gap-2 w-full">
        <label
          className="text-lg font-bold cursor-pointer flex-1"
          onDoubleClick={() => {
            setEditField("repoName");
            setListenerNeeded(false);
          }}
        >
          {editField === "repoName" ? (
            <input
              className="text-lg font-bold w-full bg-[#0d1117] border-2 rounded-lg px-2"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              onBlur={() => {
                setEditField(null);
                setListenerNeeded(true);
                handleSave({ repoName });
              }}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            repoName
          )}
        </label>
        <div className="flex gap-1 w-[10%]" title="starred">
          <StarIcon className="size-5" /> {data?.stars}
        </div>
        <div
          onMouseEnter={() => setListenerNeeded(false)}
          onMouseLeave={() => setListenerNeeded(true)}
          onClick={(e) => {
            e.stopPropagation();
            const updatedVisibility = !data?.visible;
            handleSave({ visible: updatedVisibility });
          }}
        >
          {data?.visible ? (
            <EyeIcon title="visible" className="size-5 cursor-pointer" />
          ) : (
            <EyeSlashIcon title="invisible" className="size-5 cursor-pointer" />
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex items-start gap-2 w-full">
        <label
          className="font-semibold cursor-pointer whitespace-nowrap"
          onDoubleClick={() => {
            setEditField("description");
            setListenerNeeded(false);
          }}
        >
          Description:
        </label>
        <div className="flex-1">
          {editField === "description" ? (
            <textarea
              className="w-full bg-[#0d1117] border-2 rounded-lg px-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => {
                setEditField(null);
                setListenerNeeded(true);
                handleSave({ description });
              }}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <p
              className="cursor-pointer break-words"
              onDoubleClick={() => {
                setEditField("description");
                setListenerNeeded(false);
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {[
        {
          key: "deployedLink",
          label: "Deployed link",
          state: deployedLink,
          setState: setDeployedLink,
        },
        {
          key: "repositoryLink",
          label: "Github repository link",
          state: repositoryLink,
          setState: setRepositoryLink,
        },
      ].map(({ key, label, state, setState }) => (
        <div key={key} className="flex items-center gap-4 w-full">
          <label
            className="font-semibold cursor-pointer"
            onDoubleClick={() => {
              setEditField(key);
              setListenerNeeded(false);
            }}
          >
            {label}:
          </label>
          {editField === key ? (
            <input
              className="flex-1 min-w-0 bg-[#0d1117] border-2 rounded-lg px-2"
              value={state}
              onChange={(e) => setState(e.target.value)}
              onBlur={() => {
                setEditField(null);
                setListenerNeeded(true);
                handleSave({ [key]: state });
              }}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <p
              className="flex-1 min-w-0 cursor-pointer overflow-hidden text-ellipsis"
              onDoubleClick={() => {
                setEditField(key);
                setListenerNeeded(false);
              }}
            >
              {state}
            </p>
          )}
        </div>
      ))}

      {/* Skills */}
      <div className="flex items-center gap-4 w-full">
        <label
          className="font-semibold cursor-pointer"
          onDoubleClick={() => {
            setRepoSkillsInput(repoSkills.join(", "));
            setEditField("repoSkills");
            setListenerNeeded(false);
          }}
        >
          Skills:
        </label>
        {editField === "repoSkills" ? (
          <input
            className="flex-1 min-w-0 bg-[#0d1117] border-2 rounded-lg px-2"
            value={repoSkillsInput}
            onChange={(e) => setRepoSkillsInput(e.target.value)}
            onBlur={() => {
              const newSkills = repoSkillsInput
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean);
              setRepoSkills(newSkills);
              handleSave({ repoSkills: newSkills });
              setEditField(null);
              setListenerNeeded(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const newSkills = repoSkillsInput
                  .split(",")
                  .map((skill) => skill.trim())
                  .filter(Boolean);
                setRepoSkills(newSkills);
                handleSave({ repoSkills: newSkills });
                setEditField(null);
                setListenerNeeded(true);
              }
            }}
            autoFocus
          />
        ) : (
          <p
            className="flex-1 min-w-0 cursor-pointer overflow-hidden text-ellipsis"
            onDoubleClick={() => {
              setRepoSkillsInput(repoSkills.join(", "));
              setEditField("repoSkills");
              setListenerNeeded(false);
            }}
          >
            {repoSkills.length > 0 ? repoSkills.join(", ") : ""}
          </p>
        )}
      </div>
    </form>
  );
};

export default RepoCard;
