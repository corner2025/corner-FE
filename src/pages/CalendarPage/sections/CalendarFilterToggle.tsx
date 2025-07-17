import React from "react";
import { useTranslation } from "react-i18next";

export const FILTERS = [
  { label: "calendar.toggle.performance", value: "performance" },
  { label: "calendar.toggle.festival", value: "festival" },
] as const;
export type FilterType = (typeof FILTERS)[number]["value"];

interface Props {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
}

const CalendarFilterToggle: React.FC<Props> = ({ filter, setFilter }) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-3 mb-8 justify-center">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={`px-4 py-2 rounded-full font-semibold shadow transition-all duration-150
            ${
              filter === f.value
                ? "bg-gradient-to-r from-blue-400 to-pink-300 text-white scale-105 ring-2 ring-pink-200"
                : "bg-gray-100 text-gray-500 hover:bg-blue-100"
            }
          `}
          onClick={() => setFilter(f.value)}
        >
          {t(f.label)}
        </button>
      ))}
    </div>
  );
};

export default CalendarFilterToggle;
