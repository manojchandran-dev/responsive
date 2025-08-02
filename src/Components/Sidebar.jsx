import { FaPlay } from "react-icons/fa";
import logo from "../assets/logo.png";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { IoGrid } from "react-icons/io5";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const modules = [
    {
      name: "Sample One",
      icon: <BsFillGrid1X2Fill size={`${isOpen ? "1.25vw" : "1.75vw"}`} />,
    },
    {
      name: "Sample two",
      icon: <IoGrid size={`${isOpen ? "1.25vw" : "1.75vw"}`} />,
    },
    {
      name: "Sample three",
      icon: <TfiLayoutGrid3Alt size={`${isOpen ? "1.25vw" : "1.75vw"}`} />,
    },
  ];
  const navigate = useNavigate();
  const paths = ["/", "/two", "/three"];
  const handleNav = (idx) => navigate(paths[idx] || "/");
  return (
    <aside
      className={`relative bg-gray-800 text-white h-screen transition-all py-[2vh] w-full  duration-500
      ${isOpen ? "w-[15%]" : "w-[5%]"} flex flex-col`}
    >
      <div className="w-full flex justify-center">
        <div className="flex items-center gap-x-[0.5vw]  p-[0.5vw] rounded">
          <img
            src={logo}
            className={`${
              isOpen ? "h-[2.5vw] w-[2.5vw]" : "h-[3.5vw] w-[3.5vw]"
            } object-contain`}
          />
          {isOpen && (
            <label
              className={`text-[1.6vw] font-semibold mt-[-1vh] whitespace-nowrap transition-all duration-500 ease-in-out
    opacity-0 max-w-0 overflow-hidden ${
      isOpen ? "opacity-100 max-w-[200px] " : ""
    }`}
            >
              responsive
            </label>
          )}
        </div>
      </div>
      <div className=" absolute top-[15vh] right-[-1.25vw]">
        <button
          className="flex items-center justify-center h-[3vw] w-[3vw] bg-gradient-to-b rounded-full cursor-pointer "
          style={{
            backgroundImage: `linear-gradient(to bottom, #539C43, #6EAE40, #9CC93B)`,
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaPlay color="white" className="" size={"1.5vw"} />
        </button>
      </div>
      <nav className="flex flex-1 justify-center items-center w-full">
        <div className="flex flex-col gap-[3vh] mt-[-8vh]">
          {modules.map((mod, idx) => (
            <div
              key={idx}
              className="flex items-center p-[0.5vw] hover:bg-gray-700 cursor-pointer transition-all duration-500"
              onClick={() => handleNav(idx)}
            >
              <span className="text-[1.5vw]">{mod.icon}</span>
              <span
                className={`ml-[1vw] text-[1.25vw] whitespace-nowrap transition-all duration-500 ease-in-out origin-left
          ${
            isOpen
              ? "opacity-100 scale-100 w-auto"
              : "opacity-0 scale-0 w-0 overflow-hidden"
          }
        `}
              >
                {mod.name}
              </span>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
