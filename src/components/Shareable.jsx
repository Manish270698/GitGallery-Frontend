import { ClipboardIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Shareable = () => {
  const [clicked, setClicked] = useState(false);
  const [url, setUrl] = useState("");
  const userName = useSelector((store) =>
    store?.user?.id ? store?.user?.id : store?.currentUser?.currentName
  );
  useEffect(() => {
    setUrl(window.location.href + "/" + userName + "/shared");
  }, [userName]);
  return (userName && 
    <div className="pt-28 lg:pt-36 px-10 pb-4 lg:px-20 mx-auto w-[90%] lg:w-[60%] flex justify-center items-center">
      <div className="flex justify-center items-center">
        <input
          className="bg-slate-800 border-2 p-2 rounded-tl-lg rounded-bl-lg focus:outline-none"
          value={url}
        />
        <button
          className={`rounded-tr-lg rounded-br-lg p-2 border-2 ${
            !clicked ? "bg-blue-500" : "bg-blue-600"
          }`}
          onClick={() => {
            navigator.clipboard.writeText(url);
            // alert("Link copied to clipboard!")
          }}
          onMouseDown={() => setClicked(!clicked)}
          onMouseUp={() => setClicked(!clicked)}
        >
          <ClipboardIcon className="size-5 lg:size-6" />
        </button>
      </div>
    </div>
  );
};

export default Shareable;
