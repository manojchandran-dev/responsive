import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

export default function GridSampleTwo() {
  const [screenType, setScreenType] = useState("mobile");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeGrids, setActiveGrids] = useState(0);

  useEffect(() => {
    const updateScreen = () => {
      const w = window.innerWidth;
      if (w >= 1024) setScreenType("desktop");
      else if (w >= 768) setScreenType("tablet");
      else setScreenType("mobile");
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  const visibleCount =
    screenType === "desktop" ? 12 : screenType === "tablet" ? 6 : 3;

  return (
    <div className="w-full h-full relative">
      <div className="h-auto md:h-[10vh] px-[2vw] pt-[2vh] md:pt-0 flex items-center justify-between ">
        <label className="text-[5vw] md:text-[1.5vw] font-semibold">
          Grid Sample Two
        </label>

        <button
          onClick={() => setDrawerOpen(true)}
          className="bg-[#6EAE40] text-white font-bold rounded px-[2vw] py-[0.5vw] text-[4vw] md:text-[1vw]"
        >
          Open
        </button>
      </div>

      <div className="h-[90vh] w-full px-[2vw] md:pt-0 pt-[2vh]">
        <main className="flex-1 h-full pb-[4vh]">
          <div className="h-full grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
            {Array.from({ length: 12 })
              .slice(0, visibleCount)
              .map((_, index) => {
                const isSelected = index < activeGrids;
                return (
                  <div
                    key={index}
                    className={`h-full flex items-center justify-center cursor-pointer text-[1.5vw] font-semibold ${
                      isSelected ? "text-white" : "bg-gray-100 text-black"
                    }`}
                    style={{
                      backgroundImage: isSelected
                        ? "linear-gradient(to top, #539C43, #6EAE40, #9CC93B)"
                        : "none",
                    }}
                  ></div>
                );
              })}
          </div>
        </main>
      </div>
      {drawerOpen && (
        <div className="fixed right-0 top-0 h-full w-[60vw] md:w-[20vw] bg-gray-200 border-l border-gray-300 shadow-xl z-50 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[4vw] md:text-[1.25vw] font-semibold">
              Choose Grid Count
            </h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-black text-[4vw] md:text-[1.2vw] font-semibold"
            >
              <MdOutlineClose className="text-[5vw] md:text-[1.25vw]" />
            </button>
          </div>

          <input
            type="number"
            min="0"
            max={visibleCount}
            value={activeGrids}
            onChange={(e) =>
              setActiveGrids(Math.min(visibleCount, Number(e.target.value)))
            }
            className="w-full border border-gray-300 rounded px-4 py-2 text-[4vw] md:text-[1vw] mb-4"
            placeholder={`Enter number (0 - ${visibleCount})`}
          />
        </div>
      )}
    </div>
  );
}
