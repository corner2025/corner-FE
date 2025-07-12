import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import { enUS } from "date-fns/locale/en-US";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

interface DateInputProps {
  dateFilter: string;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
}

registerLocale("ko", ko);
registerLocale("en", enUS);

const DateInput: React.FC<DateInputProps> = ({ dateFilter, setDateFilter }) => {
  const { t, i18n } = useTranslation();

  // string → Date 변환 (YYYY.MM.DD → Date)
  const value = dateFilter
    ? new Date(dateFilter.replace(/\./g, "-")) // "2025.07.11" → "2025-07-11"
    : null;
  const lang = i18n.language.startsWith("ko") ? "ko" : "en";

  return (
    <DatePicker
      selected={value}
      onChange={(date: Date | null) => {
        if (date) {
          // Date → YYYY.MM.DD 문자열 변환
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, "0");
          const dd = String(date.getDate()).padStart(2, "0");
          setDateFilter(`${yyyy}.${mm}.${dd}`);
        } else {
          setDateFilter("");
        }
      }}
      locale={lang}
      dateFormat="yyyy.MM.dd"
      className="p-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-34 md:w-40"
      placeholderText={t("dateInput.placeholder")}
      aria-label={t("dateInput.ariaLabel")}
      isClearable
    />
  );
};

export default DateInput;
