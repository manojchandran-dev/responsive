import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { IoGrid } from "react-icons/io5";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function MobileResponsiveSidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const modules = [
    {
      name: "Sample One",
      icon: <BsFillGrid1X2Fill size={20} />,
      path: "/",
    },
    {
      name: "Sample Two",
      icon: <IoGrid size={20} />,
      path: "/two",
    },
    {
      name: "Sample Three",
      icon: <TfiLayoutGrid3Alt size={20} />,
      path: "/three",
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };
  return (
    <div className="md:hidden block">
      <div className="h-[6.5vh] bg-gray-800 text-white flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-8 w-8 object-contain" />
          <span className="text-lg font-semibold">responsive</span>
        </div>
        <button onClick={() => setDrawerOpen(true)} className="text-white">
          <FaBars size={24} />
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-[70vw] bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 h-[10vh] border-b border-gray-700">
          <span className="text-lg font-bold">Menu</span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-white text-2xl"
          >
            ×
          </button>
        </div>
        <div className="flex flex-col p-4 gap-6 mt-4">
          {modules.map((mod, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded cursor-pointer"
              onClick={() => handleNavigate(mod.path)}
            >
              {mod.icon}
              <span className="text-base">{mod.name}</span>
            </div>
          ))}
        </div>
      </div>
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}
