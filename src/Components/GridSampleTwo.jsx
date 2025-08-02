import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";

export default function GridSampleTwo() {
  const [screenType, setScreenType] = useState("mobile");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeGrids, setActiveGrids] = useState(3);

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

  useEffect(() => {
    setActiveGrids(3); // reset to 3 on screen change
  }, [screenType]);

  // Dynamic visible count based on screen
  const visibleCount =
    screenType === "desktop" ? 12 : screenType === "tablet" ? 6 : 3;

  // Responsive drawer width (no min)
  const drawerWidthPercent = (activeGrids / visibleCount) * 100;

  return (
    <div className="w-full h-full relative">
      {/* Header */}
      <div className="h-auto md:h-[10vh] px-[2vw] pt-[2vh] md:pt-0 flex items-center justify-between">
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

      {/* Drawer */}
      {drawerOpen && (
        <div
          className="fixed right-0 top-0 h-full bg-gray-200 border-l border-gray-300 shadow-xl z-50 p-6 transition-all duration-300"
          style={{
            width: `${drawerWidthPercent}vw`,
            maxWidth: "100vw",
          }}
        >
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
            min="1"
            max={visibleCount}
            value={activeGrids}
            onChange={(e) =>
              setActiveGrids(Math.min(visibleCount, Number(e.target.value)))
            }
            className="w-full border border-gray-300 rounded px-4 py-2 text-[4vw] md:text-[1vw] mb-4"
            placeholder={`Enter number (1 - ${visibleCount})`}
          />
        </div>
      )}
    </div>
  );
}
