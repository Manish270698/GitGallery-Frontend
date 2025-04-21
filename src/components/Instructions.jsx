import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { InstructionsContext } from "./context/InstructionsContext";

const Instructions = () => {
  const { view, setView } = useContext(InstructionsContext);
  return (
    <aside className="fixed right-0 w-72">
      <div
        className={`flex flex-row items-center ease duration-500 ${
          view ? "translate-x-0 ml-5 lg:ml-7" : "translate-x-full mr-5 lg:mr-7"
        }`}
      >
        <button
          onClick={() => setView(!view)}
          className="border-y-2 border-l-2 w-5 lg:w-7 rounded-tl-lg rounded-bl-lg py-5 bg-[#010409]"
        >
          {view ? (
            <ChevronDoubleRightIcon className="size-4 lg:size-6" />
          ) : (
            <ChevronDoubleLeftIcon className="size-4 lg:size-6" />
          )}
        </button>

        <div className="flex-1 bg-[#010409] border-y-2 border-l-2 pr-2 pl-10 py-2 rounded-tl-lg rounded-bl-lg">
          <h4 className="font-semibold text-lg lg:text-xl text-[#D1D9E0]">
            How does it work?
          </h4>
          <ul className="text-base lg:text-lg list-disc text-[#9198A1]">
            <li>Double click on any field to edit.</li>
            <li>Drag and drop a card to change its position.</li>
            <li>Login to save your data.</li>
            <li>Get shareable link in preview page.</li>
            <li>Share with recruiters.</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
export default Instructions;
