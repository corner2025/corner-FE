import React, { useEffect, useRef, useCallback } from "react";
import type { Performance } from "../../../types/performance";
import type { Festival } from "../../../types/festival";
import type { FilterType } from "./CalendarFilterToggle";
import { FaTheaterMasks } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

// 점(.)으로 구분된 날짜 문자열을 Date 객체로 변환
function parseDotDate(str: string): Date {
  const [year, month, day] = str.split(".").map(Number);
  return new Date(year, month - 1, day);
}

interface Props {
  selectedDate: string;
  perfList: Performance[];
  festList: Festival[];
  filter: FilterType;
  calendarHeight?: number;
  formatDateRange: (start: Date, end: Date) => string;
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

const EventList: React.FC<Props> = ({
  selectedDate,
  perfList,
  festList,
  filter,
  calendarHeight,
  formatDateRange,
  onLoadMore,
  hasMore,
  loading,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      }, {
        threshold: 1.0,
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  const showPerf = filter === "performance";
  const showFest = filter === "festival";

  const renderPerformances = () => {
    if (perfList.length === 0) {
      return <div className="text-gray-400">해당 날짜에는 공연이 없습니다.</div>;
    }

    return perfList.map((perf, idx) => {
      if (idx === perfList.length - 1) {
        return (
          <li
            key={`performance-${perf.id}`}
            ref={lastItemRef}
            className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 shadow flex flex-col"
          >
            <span className="flex items-center gap-2 font-semibold text-blue-700 text-lg">
              <FaTheaterMasks className="text-blue-400" />
              {perf.name}
            </span>
            <span className="text-sm text-gray-600 mt-1">장소 : {perf.area}</span>
            <span className="text-xs text-gray-400">
              {formatDateRange(parseDotDate(perf.startDate), parseDotDate(perf.endDate))}
            </span>
          </li>
        );
      }
      return (
        <li
          key={`performance-${perf.id}`}
          className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 shadow flex flex-col"
        >
          <span className="flex items-center gap-2 font-semibold text-blue-700 text-lg">
            <FaTheaterMasks className="text-blue-400" />
            {perf.name}
          </span>
          <span className="text-sm text-gray-600 mt-1">장소 : {perf.area}</span>
          <span className="text-xs text-gray-400">
            {formatDateRange(parseDotDate(perf.startDate), parseDotDate(perf.endDate))}
          </span>
        </li>
      );
    });
  };

  const renderFestivals = () => {
    if (festList.length === 0) {
      return <div className="text-gray-400">해당 날짜에는 축제가 없습니다.</div>;
    }

    return festList.map((fest, idx) => {
      if (idx === festList.length - 1) {
        return (
          <li
            key={`festival-${fest.id}`}
            ref={lastItemRef}
            className="rounded-lg border border-pink-200 bg-pink-50 px-4 py-3 shadow flex flex-col"
          >
            <span className="flex items-center gap-2 font-semibold text-pink-700 text-lg">
              <GiPartyPopper className="text-pink-400" />
              {fest.title}
            </span>
            <span className="text-sm text-gray-600 mt-1">장소: {fest.addr1}</span>
            <span className="text-xs text-gray-400">
              {formatDateRange(new Date(fest.eventStartDate), new Date(fest.eventEndDate))}
            </span>
            {fest.tel && <span className="text-sm mt-2">{fest.tel}</span>}
          </li>
        );
      }
      return (
        <li
          key={`festival-${fest.id}`}
          className="rounded-lg border border-pink-200 bg-pink-50 px-4 py-3 shadow flex flex-col"
        >
          <span className="flex items-center gap-2 font-semibold text-pink-700 text-lg">
            <GiPartyPopper className="text-pink-400" />
            {fest.title}
          </span>
          <span className="text-sm text-gray-600 mt-1">장소: {fest.addr1}</span>
          <span className="text-xs text-gray-400">
            {formatDateRange(new Date(fest.eventStartDate), new Date(fest.eventEndDate))}
          </span>
          {fest.tel && <span className="text-sm mt-2">{fest.tel}</span>}
        </li>
      );
    });
  };

  return (
    <div
      className="w-full md:w-1/2 flex flex-col"
      style={{
        minHeight: 0,
        height: calendarHeight ?? "auto",
        maxHeight: calendarHeight ?? "none",
      }}
    >
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: showPerf ? "#2563EB" : "#DB2777" }}
      >
        {selectedDate?.replace(/-/g, ".")}
      </h2>

      <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-4">
        <ul style={{ maxHeight: "100%", minHeight: 0 }}>
          {selectedDate &&
            !((showPerf && perfList.length) || (showFest && festList.length)) && (
              <div className="text-gray-400">해당 날짜에는 공연이나 축제가 없습니다.</div>
            )}

          {showPerf && renderPerformances()}
          {showFest && renderFestivals()}
        </ul>
      </div>
      {loading && (
        <p className="text-center text-gray-600 mt-2">로딩 중...</p>
      )}
    </div>
  );
};

export default EventList;
