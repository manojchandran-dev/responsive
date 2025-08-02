import { useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import GridSampleOne from "./Components/GridSampleOne";
import GridSampleTwo from "./Components/GridSampleTwo";
import GridSampleThree from "./Components/GridSampleThree";
import { Routes, Route } from "react-router-dom";
import MobileResponsiveSidebar from "./Components/SidebarMobile";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MobileResponsiveSidebar />

      <div className="flex md:flex-row flex-col w-full" style={{ minHeight: "100vh" }}>
        <div
          className={`hidden md:block `}
        >
          <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div
          className={`flex-1 overflow-y-auto px-2  md:pt-0 ${
            isOpen ? "sm:w-[85%] w-[100%]" : "sm:w-[95%] w-[100%]"
          }`}
        >
          <Routes>
            <Route path="/" element={<GridSampleOne />} />
            <Route path="/two" element={<GridSampleTwo />} />
            <Route path="/three" element={<GridSampleThree />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
