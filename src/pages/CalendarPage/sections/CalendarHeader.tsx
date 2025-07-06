// src/pages/sections/CalendarHeader.tsx
import React from "react";

interface Props {
  viewTitle: string;
  handlePrev: () => void;
  handleNext: () => void;
  handleToday: () => void;
}

const CalendarHeader: React.FC<Props> = ({
  viewTitle,
  handlePrev,
  handleNext,
  handleToday,
}) => (
  <div className="flex flex-col gap-2 mb-4 sm:mb-7">
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
      <div className="flex gap-2">
        <button
          onClick={handlePrev}
          className="rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-1 font-bold shadow transition"
          aria-label="Previous month"
        >
          &lt;
        </button>
        <button
          onClick={handleToday}
          className="rounded-full bg-gradient-to-r from-pink-400 to-blue-400 text-white px-4 py-2 font-bold shadow transition hover:scale-105"
          aria-label="Today"
        >
          Today
        </button>
        <button
          onClick={handleNext}
          className="rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-1 font-bold shadow transition"
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>
      <span className="mt-5 text-lg sm:text-2xl font-bold text-blue-700 whitespace-nowrap">
        {viewTitle}
      </span>
    </div>
  </div>
);

export default CalendarHeader;
