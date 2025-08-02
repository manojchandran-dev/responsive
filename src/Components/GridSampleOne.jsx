import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function GridSampleOne() {
  const [selectedPane, setSelectedPane] = useState(null);
  const [screenType, setScreenType] = useState("mobile");

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

  const getPaneIndexes = (pane) => {
    const map = {
      desktop: {
        Left: [0, 1, 2, 3],
        Center: [4, 5, 6, 7],
        Right: [8, 9, 10, 11],
      },
      tablet: {
        Left: [0, 1],
        Center: [2, 3],
        Right: [4, 5],
      },
      mobile: {
        Left: [0],
        Center: [1],
        Right: [2],
      },
    };
    return map[screenType]?.[pane] || [];
  };

  return (
    <div className="w-full h-full">
      <div className="h-auto md:h-[10vh] px-[2vw] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 py-2 md:py-0">
        <label className="text-[5vw] md:text-[1.5vw] font-semibold">
          Grid Sample One
        </label>

        <div className="relative w-full md:w-auto md:pb-0 ">
          <select
            className="appearance-none text-[4vw] md:text-[1vw] outline-none rounded px-4 py-2 w-full md:w-[12vw]"
            style={{
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(to bottom, #539C43, #6EAE40, #9CC93B) border-box",
              border: "1px solid transparent",
              borderRadius: "0.5rem",
            }}
            onChange={(e) => setSelectedPane(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select a pane
            </option>
            <option value="Left">Left</option>
            <option value="Center">Center</option>
            <option value="Right">Right</option>
          </select>

          <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
            <FaChevronDown
              className="md:text-[1vw] text-[4vw]"
              color="#9CC93B"
            />
          </div>
        </div>
      </div>

      <div className="h-[90vh] w-full px-[2vw] md:pt-0 pt-[2vh]">
        <main className="flex-1 h-full pb-[4vh]">
          <div className="h-full grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
            {Array.from({ length: 12 })
              .slice(0, visibleCount)
              .map((_, index) => {
                const isSelected = getPaneIndexes(selectedPane).includes(index);
                return (
                  <div
                    key={index}
                    className={`h-full rounded border flex items-center justify-center cursor-pointer text-[1.5vw] font-semibold ${
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
    </div>
  );
}
