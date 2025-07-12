import { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import type { FilterType } from "./sections/CalendarFilterToggle";
import CalendarFilterToggle from "./sections/CalendarFilterToggle";
import CalendarHeader from "./sections/CalendarHeader";
import EventCalendar from "./sections/EventCalendar";
import EventList from "./sections/EventList";
import { festivals } from "../../data/festival"; // 더미 데이터
import { useTranslation } from "react-i18next";

// Performance 타입 정의
type Performance = {
  id: string;
  name: string;
  area: string;
  genre: string;
  startDate: string; // ex) "2025.07.31"
  endDate: string; // ex) "2025.07.31"
  posterUrl?: string;
  state: string;
  openRun: string;
};

// 점(.) 날짜 문자열을 Date로 변환
function parseDotDate(str: string): Date {
  const [y, m, d] = str.split(".").map(Number);
  return new Date(y, m - 1, d);
}

// 날짜 범위 포맷 (Date 타입만 받음)
function formatDateRange(start: Date, end: Date) {
  const s = start;
  const e = end;
  const startStr = `${s.getFullYear()}.${String(s.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(s.getDate()).padStart(2, "0")}`;
  const endStr = `${e.getFullYear()}.${String(e.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(e.getDate()).padStart(2, "0")}`;
  return startStr === endStr ? startStr : `${startStr} ~ ${endStr}`;
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const calendarRef = useRef<FullCalendar>(null);
  const [viewTitle, setViewTitle] = useState<string>("");

  // 공연 데이터 fetch
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}performances`)
      .then((res) => res.json())
      .then((data) => {
        setPerformances(data.content || []);
        setLoading(false);
      })
      .catch(() => {
        setError("데이터를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  // 날짜 클릭 시 해당 날짜의 공연/축제만 필터링
  const getEventsForDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const perfList = performances.filter((perf) => {
      const start = parseDotDate(perf.startDate);
      const end = parseDotDate(perf.endDate);
      return date >= start && date <= end;
    });

    const festList = festivals.filter((fest) => {
      const start = new Date(fest.startDate);
      const end = new Date(fest.endDate);
      return date >= start && date <= end;
    });

    return { perfList, festList };
  };

  const { perfList, festList } = selectedDate
    ? getEventsForDate(selectedDate)
    : { perfList: [], festList: [] };

  // 커스텀 헤더 버튼 핸들러
  const handlePrev = () => {
    calendarRef.current?.getApi().prev();
    setViewTitle(calendarRef.current?.getApi().view.title || "");
  };
  const handleNext = () => {
    calendarRef.current?.getApi().next();
    setViewTitle(calendarRef.current?.getApi().view.title || "");
  };
  const handleToday = () => {
    calendarRef.current?.getApi().today();
    setViewTitle(calendarRef.current?.getApi().view.title || "");
  };
  const handleDatesSet = () => {
    const api = calendarRef.current?.getApi();
    if (api) setViewTitle(api.view.title);
  };

  // 날짜 셀에 selected-date 클래스 추가
  useEffect(() => {
    document.querySelectorAll(".fc-daygrid-day.selected-date").forEach((el) => {
      el.classList.remove("selected-date");
    });
    if (selectedDate) {
      const cell = document.querySelector(
        `.fc-daygrid-day[data-date="${selectedDate}"]`
      );
      if (cell) cell.classList.add("selected-date");
    }
  }, [selectedDate, viewTitle]);

  // 높이 맞추기: 달력 높이 추적
  const [calendarHeight, setCalendarHeight] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    // 달력 컨테이너의 실제 높이 측정
    const resize = () => {
      const el = document.getElementById("calendar-area");
      if (el) setCalendarHeight(el.offsetHeight);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [viewTitle]);

  const { t } = useTranslation();

  if (loading) return <div>로딩 중...</div>;
  if (error) return { error };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-pink-50 to-yellow-100 py-8 px-4 flex flex-col items-center rounded-2xl mb-10 shadow-xl">
      <div className="max-w-6xl w-full bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8">
        {/* 왼쪽: 캘린더 부분 */}
        <div
          id="calendar-area"
          className="w-full md:w-1/2 flex flex-col"
          style={{ minHeight: 0 }}
        >
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-400">
            {t("calendar.title")}
          </h1>
          <p className="text-sm sm:text-md text-center text-gray-500 mb-8">
            {t("calendar.subtitle")}
          </p>
          {/* 토글 버튼 */}
          <CalendarFilterToggle filter={filter} setFilter={setFilter} />
          {/* 커스텀 헤더 */}
          <CalendarHeader
            viewTitle={viewTitle}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleToday={handleToday}
          />
          {/* 캘린더 */}
          <EventCalendar
            calendarRef={calendarRef}
            handleDatesSet={handleDatesSet}
            setSelectedDate={setSelectedDate}
          />
        </div>
        {/* 오른쪽: 일정 리스트 */}
        {selectedDate ? (
          <EventList
            selectedDate={selectedDate}
            perfList={perfList}
            festList={festList}
            filter={filter}
            calendarHeight={calendarHeight}
            formatDateRange={formatDateRange}
          />
        ) : (
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
            <p className="text-gray-500 text-md">
              Select a date to see events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
