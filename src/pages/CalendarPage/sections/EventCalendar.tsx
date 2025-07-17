import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { EventInput } from "@fullcalendar/core";
import type { Festival } from "../../../types/festival";

// Performance 타입
type Performance = {
  id: string;
  name: string;
  area: string;
  genre: string;
  startDate: string; // "2025.07.31"
  endDate: string;   // "2025.08.02"
};

// props
type Props = {
  calendarRef: React.RefObject<FullCalendar | null>;
  handleDatesSet: () => void;
  setSelectedDate: (dateStr: string) => void;
  performances: Performance[]; // 필요 시 포함
  festivals: Festival[];
  filter: "performance" | "festival";
};

// "2025.07.31" → Date 객체
function parseDotDate(str: string): Date {
  const [y, m, d] = str.split(".").map(Number);
  return new Date(y, m - 1, d);
}

const EventCalendar: React.FC<Props> = ({
  calendarRef,
  handleDatesSet,
  setSelectedDate,
  performances,
}) => {
  const events: EventInput[] = performances.map((perf) => ({
    title: perf.name,
    start: parseDotDate(perf.startDate),
    end: new Date(parseDotDate(perf.endDate).getTime() + 86400000),
    id: perf.id,
    extendedProps: {
      genre: perf.genre,
      area: perf.area,
      state: perf.name,
    },
  }));

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      //events={events}
      headerToolbar={false}
      locale="en"
      height="auto"
      dateClick={(info) => setSelectedDate(info.dateStr)}
      datesSet={handleDatesSet}
      fixedWeekCount={false}
      showNonCurrentDates={false}
    />
  );
};

export default EventCalendar;
