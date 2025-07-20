import { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import type { FilterType } from "./sections/CalendarFilterToggle";
import CalendarFilterToggle from "./sections/CalendarFilterToggle";
import CalendarHeader from "./sections/CalendarHeader";
import EventCalendar from "./sections/EventCalendar";
import EventList from "./sections/EventList";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import type { Festival } from "../../types/festival";
import type { Performance } from "../../types/performance";

function formatDateRange(start: Date, end: Date) {
  const s = start;
  const e = end;
  const startStr = `${s.getFullYear()}.${String(s.getMonth() + 1).padStart(2, "0")}.${String(s.getDate()).padStart(2, "0")}`;
  const endStr = `${e.getFullYear()}.${String(e.getMonth() + 1).padStart(2, "0")}.${String(e.getDate()).padStart(2, "0")}`;
  return startStr === endStr ? startStr : `${startStr} ~ ${endStr}`;
}

function formatDateToHyphen(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const todayStr = new Date().toISOString().slice(0, 10);

const CalendarPage = () => {
  const calendarRef = useRef<FullCalendar | null>(null);

  const [viewTitle, setViewTitle] = useState("");
  const [filter, setFilter] = useState<FilterType>("performance");

  const [performances, setPerformances] = useState<Performance[]>([]);
  const [pageNoPerformance, setPageNoPerformance] = useState(1);
  const [hasMorePerformance, setHasMorePerformance] = useState(true);

  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [pageNoFestival, setPageNoFestival] = useState(1);
  const [hasMoreFestival, setHasMoreFestival] = useState(true);

  const [loadingPerformance, setLoadingPerformance] = useState(false);
  const [loadingFestival, setLoadingFestival] = useState(false);

  const [error, setError] = useState("");

  const [clickDates, setClickDates] = useState<string[]>([todayStr]);
  const [selectedRange, setSelectedRange] = useState<{ start: string; end: string }>({
    start: todayStr,
    end: todayStr,
  });

  useEffect(() => {
    if (filter !== "performance") return;

    setLoadingPerformance(true);
    setError("");

    const params = {
      page: pageNoPerformance,
      size: 7,
      startDate: formatDateToHyphen(new Date(selectedRange.start)),
      endDate: formatDateToHyphen(new Date(selectedRange.end)),
    };

    axiosInstance
      .get("performances", { params })
      .then((res) => {
        const content = res.data.content || [];
        setPerformances((prev) => {
          if (pageNoPerformance === 1) return content;
          const newItems = content.filter((item: Performance) => !prev.some((p) => p.id === item.id));
          return [...prev, ...newItems];
        });
        setHasMorePerformance(!res.data.last);
        setLoadingPerformance(false);
      })
      .catch(() => {
        setError("공연 데이터를 불러오지 못했습니다.");
        setLoadingPerformance(false);
      });
  }, [pageNoPerformance, filter, selectedRange]);

  useEffect(() => {
    if (filter !== "festival") return;

    setLoadingFestival(true);
    setError("");

    const params = {
      pageNo: pageNoFestival,
      pageSize: 7,
      startDate: formatDateToHyphen(new Date(selectedRange.start)),
      endDate: formatDateToHyphen(new Date(selectedRange.end)),
    };

    axiosInstance
      .get("festivals", { params })
      .then((res) => {
        const content = Array.isArray(res.data) ? res.data : [];
        setFestivals((prev) => {
          if (pageNoFestival === 1) return content;
          const newItems = content.filter((item: Festival) => !prev.some((f) => f.id === item.id));
          return [...prev, ...newItems];
        });
        setHasMoreFestival(content.length === 7);
        setLoadingFestival(false);
      })
      .catch(() => {
        setError("축제 데이터를 불러오지 못했습니다.");
        setLoadingFestival(false);
      });
  }, [pageNoFestival, filter, selectedRange]);

  useEffect(() => {
    if (filter === "performance") {
      setPageNoPerformance(1);
      setHasMorePerformance(true);
      setPerformances([]);
    } else if (filter === "festival") {
      setPageNoFestival(1);
      setHasMoreFestival(true);
      setFestivals([]);
    }
  }, [selectedRange]);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    if (newFilter === "performance") {
      setPageNoPerformance(1);
      setHasMorePerformance(true);
      setPerformances([]);
    } else if (newFilter === "festival") {
      setPageNoFestival(1);
      setHasMoreFestival(true);
      setFestivals([]);
    }
  };

  const onDateClick = (dateStr: string) => {
    let newClickDates = [...clickDates];
    if (newClickDates.length === 0) {
      newClickDates = [dateStr];
    } else if (newClickDates.length === 1) {
      if (dateStr === newClickDates[0]) {
        newClickDates = [dateStr];
      } else {
        newClickDates.push(dateStr);
      }
    } else {
      newClickDates = [dateStr];
    }

    if (newClickDates.length === 2) {
      const [first, second] = newClickDates;
      if (new Date(first) > new Date(second)) {
        newClickDates = [second, first];
      }
    }

    setClickDates(newClickDates);

    if (newClickDates.length === 1) {
      setSelectedRange({ start: newClickDates[0], end: newClickDates[0] });
    } else if (newClickDates.length === 2) {
      setSelectedRange({ start: newClickDates[0], end: newClickDates[1] });
    }
  };

  const perfList = performances;
  const festList = festivals;

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

  useEffect(() => {
    document.querySelectorAll(".fc-daygrid-day.selected-date").forEach((el) => {
      el.classList.remove("selected-date");
    });

    if (calendarRef.current) {
      let cur = new Date(selectedRange.start);
      const end = new Date(selectedRange.end);
      while (cur <= end) {
        const dateStr = cur.toISOString().slice(0, 10);
        const cell = document.querySelector(`.fc-daygrid-day[data-date="${dateStr}"]`);
        if (cell) cell.classList.add("selected-date");
        cur.setDate(cur.getDate() + 1);
      }
    }
  }, [selectedRange, viewTitle]);

  const [calendarHeight, setCalendarHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const resize = () => {
      const el = document.getElementById("calendar-area");
      if (el) setCalendarHeight(el.offsetHeight);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [viewTitle]);

  const { t } = useTranslation();

  const handleLoadMore = () => {
    if (filter === "performance" && !loadingPerformance && hasMorePerformance) {
      setPageNoPerformance((prev) => prev + 1);
    } else if (filter === "festival" && !loadingFestival && hasMoreFestival) {
      setPageNoFestival((prev) => prev + 1);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gradient-to-br from-blue-100 via-pink-50 to-yellow-100 py-8 px-4 flex flex-col items-center rounded-2xl mb-10 shadow-xl">
      <div className="max-w-6xl w-full bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8">
        <div id="calendar-area" className="w-full md:w-1/2 flex flex-col" style={{ minHeight: 0 }}>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-400">
            {t("calendar.title")}
          </h1>
          <p className="text-sm sm:text-md text-center text-gray-500 mb-8">
            {t("calendar.subtitle")}
          </p>

          <CalendarFilterToggle filter={filter} setFilter={handleFilterChange} />
          <CalendarHeader viewTitle={viewTitle} handlePrev={handlePrev} handleNext={handleNext} handleToday={handleToday} />
          <EventCalendar
            calendarRef={calendarRef}
            handleDatesSet={handleDatesSet}
            setSelectedDate={onDateClick}
            performances={filter === "performance" ? performances : []}
            festivals={filter === "festival" ? festivals : []}
            filter={filter}
          />
        </div>

        <EventList
          selectedDate={selectedRange.start}
          perfList={perfList}
          festList={festList}
          filter={filter}
          calendarHeight={calendarHeight}
          formatDateRange={formatDateRange}
          onLoadMore={handleLoadMore}
          hasMore={filter === "performance" ? hasMorePerformance : hasMoreFestival}
          loading={filter === "performance" ? loadingPerformance : loadingFestival}
        />
      </div>
    </div>
  );
};

export default CalendarPage;