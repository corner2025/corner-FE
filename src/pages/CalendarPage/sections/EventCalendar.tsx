// src/pages/sections/EventCalendar.tsx
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Props {
  calendarRef: React.RefObject<FullCalendar | null>;
  handleDatesSet: () => void;
  setSelectedDate: (dateStr: string) => void;
}

const EventCalendar: React.FC<Props> = ({
  calendarRef,
  handleDatesSet,
  setSelectedDate,
}) => (
  <FullCalendar
    ref={calendarRef}
    plugins={[dayGridPlugin, interactionPlugin]}
    initialView="dayGridMonth"
    events={[]} // 일정은 리스트에서만 보여줌
    headerToolbar={false}
    locale="en"
    height="auto"
    dateClick={(info) => setSelectedDate(info.dateStr)}
    datesSet={handleDatesSet}
    fixedWeekCount={false}
    showNonCurrentDates={false}
  />
);

export default EventCalendar;
