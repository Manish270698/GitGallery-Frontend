import React, { useState } from "react";
import SearchRepo from "./SearchRepo";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import RepoCard from "./RepoCard";
import Profile from "./Profile";
import { PlusIcon } from "@heroicons/react/24/outline";
import { addCurrentRepo } from "../utils/currentRepoSlice";
import { CurrentContext } from "./context/CurrentContext";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Instructions from "./Instructions";

const Repos = () => {
  const dispatch = useDispatch();
  const repoData = useSelector((store) => store?.currentRepo);
  const loggedInUser = useSelector((store) => store?.user);
  const user = useSelector((store) => store?.currentUser);
  const [topSkillset, setTopSkillset] = useState([]);
  const [name, setName] = useState(null);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, touchSensor);

  // Function to add a new repo
  const handleAddNewRepo = () => {
    const newRepo = {
      _id: Date.now(),
      userId: loggedInUser.id,
      repoName: "New Repository",
      repositoryLink: "",
      deployedLink: "",
      description: "",
      repoSkills: [],
      visible: true,
      position: 1,
      stars: 0,
    };
    dispatch(addCurrentRepo([newRepo, ...repoData]));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return; // Prevent errors if dragging outside the list

    if (active.id !== over.id) {
      const oldIndex = repoData.findIndex((repo) => repo._id === active.id);
      const newIndex = repoData.findIndex((repo) => repo._id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newCards = arrayMove(repoData, oldIndex, newIndex);
        dispatch(addCurrentRepo(newCards));
      }
    }
  };

  return (
    <div className="bg-[#0d1117] min-h-screen">
      <Menu />
      <CurrentContext.Provider
        value={{ topSkillset, setTopSkillset, name, setName }}
      >
        <SearchRepo />
        <Instructions />
        {user?.currentName && <Profile />}
      </CurrentContext.Provider>
      {user?.currentName && (
        <div className="bg-[#0d1117] min-h-screen flex flex-col items-center pb-2 overflow-clip">
          <div className="w-[90%] md:w-[65%] xl:w-[55%] bg-[#010409] border-2 border-[#7c8493]/40 flex flex-col gap-4 rounded-2xl p-2 lg:p-4">
            {loggedInUser && (
              <button
                title="Add new repository"
                className="flex rounded-full justify-center items-center hover:bg-blue-600 bg-blue-950 text-white px-4 py-2 mb-2 w-fit h-fit"
                onClick={handleAddNewRepo}
              >
                <PlusIcon className="size-5" />
              </button>
            )}

            {repoData ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={repoData?.map((repo) => repo._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {repoData
                    ? repoData.map((data) => (
                        <RepoCard key={data._id} data={data} />
                      ))
                    : ""}
                </SortableContext>
              </DndContext>
            ) : repoData ? (
              repoData.map((data) => <RepoCard key={data?._id} data={data} />)
            ) : (
              ""
            )}
          </div>

          {/* <div className="flex-shrink-0 h-16 bg-[#0d1117]"></div> */}
        </div>
      )}
    </div>
  );
};

export default Repos;
