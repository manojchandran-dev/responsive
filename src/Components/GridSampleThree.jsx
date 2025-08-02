import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function GridSampleThree() {
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

  const getPaneIndexes = (pane) => {
    const paneMap = { Left: [0], Center: [1], Right: [2] };
    return paneMap[pane] || [];
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="h-auto px-[2vw] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 py-4">
        <label className="text-[5vw] md:text-[1.5vw] font-semibold">
          Grid Sample Three
        </label>

        <div className="relative w-full md:w-auto">
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

      {/* Grid section - flex-grow to fill remaining height, center content */}
      <div className="flex-grow flex items-center justify-center px-[2vw]">
        <main className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {[0, 1, 2].map((index) => {
              const isSelected = getPaneIndexes(selectedPane).includes(index);
              return (
                <div
                  key={index}
                  className={`aspect-square w-full flex items-center flex-col justify-center font-mono cursor-pointer text-[4vw] md:p-[1vw] p-[3vw] text-justify md:text-[1.2vw] font-semibold ${
                    isSelected ? "text-white" : "bg-gray-100 text-black"
                  }`}
                  style={{
                    backgroundImage: isSelected
                      ? "linear-gradient(to top, #539C43, #6EAE40, #9CC93B)"
                      : "none",
                  }}
                >
                  {isSelected &&
                    `Responsive began in 2015 when founders Ganesh Shankar, AJ Sunder, and Sankar Lagudu created RFPIO to simplify and speed up RFP responses. As customer needs expanded, so did the platform—evolving into a full Strategic Response Management (SRM) solution. Now known as Responsive, the company has grown from a small startup to a global leader with 500+ employees, 2,000 customers (including 20% of the Fortune 500), and over 300,000 users worldwide.`}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
