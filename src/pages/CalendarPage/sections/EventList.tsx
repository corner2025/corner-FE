import React from "react";
import { FaTheaterMasks } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import type { Performance } from "../../../types/performance";
import type { Festival } from "../../../types/festival";
import type { FilterType } from "./CalendarFilterToggle";

// 점(.) 날짜 문자열을 Date로 변환
function parseDotDate(str: string): Date {
  const [y, m, d] = str.split(".").map(Number);
  return new Date(y, m - 1, d);
}

interface Props {
  selectedDate: string;
  perfList: Performance[];
  festList: Festival[];
  filter: FilterType;
  calendarHeight?: number;
  formatDateRange: (start: Date, end: Date) => string;
}

const EventList: React.FC<Props> = ({
  selectedDate,
  perfList,
  festList,
  filter,
  calendarHeight,
  formatDateRange,
}) => {
  const showPerf = filter === "all" || filter === "performance";
  const showFest = filter === "all" || filter === "festival";

  return (
    <div
      className="w-full md:w-1/2 flex flex-col"
      style={{
        minHeight: 0,
        height: calendarHeight ? calendarHeight : "auto",
        maxHeight: calendarHeight ? calendarHeight : "none",
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        {selectedDate?.replace(/-/g, ".")} Schedule
      </h2>
      <div className="flex-1 min-h-0">
        <ul
          className="space-y-4 overflow-y-auto pr-2"
          style={{
            maxHeight: "100%",
            minHeight: 0,
          }}
        >
          {selectedDate &&
            !(
              (showPerf && perfList.length) ||
              (showFest && festList.length)
            ) && (
              <div className="text-gray-400">
                해당 날짜에는 공연이나 축제가 없습니다.
              </div>
            )}
          {showPerf &&
            perfList.map((perf) => (
              <li
                key={`performance-${perf.id}`}
                className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 shadow flex flex-col"
              >
                <span className="flex items-center gap-2 font-semibold text-blue-700 text-lg">
                  <FaTheaterMasks className="text-blue-400" />
                  {perf.name}
                </span>
                <span className="text-sm text-gray-600 mt-1">
                  장소 : {perf.area}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDateRange(
                    parseDotDate(perf.startDate),
                    parseDotDate(perf.endDate)
                  )}
                </span>
              </li>
            ))}
          {showFest &&
            festList.map((fest) => (
              <li
                key={`festival-${fest.id}`}
                className="rounded-lg border border-pink-200 bg-pink-50 px-4 py-3 shadow flex flex-col"
              >
                <span className="flex items-center gap-2 font-semibold text-pink-700 text-lg">
                  <GiPartyPopper className="text-pink-400" />
                  {fest.name}
                </span>
                <span className="text-sm text-gray-600 mt-1">
                  장소: {fest.place}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDateRange(
                    new Date(fest.startDate),
                    new Date(fest.endDate)
                  )}
                </span>
                {fest.description && (
                  <span className="text-sm mt-2">{fest.description}</span>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default EventList;
