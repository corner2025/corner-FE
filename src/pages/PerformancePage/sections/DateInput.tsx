import React from "react";

interface DateInputProps {
  dateFilter: string;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
}

const DateInput: React.FC<DateInputProps> = ({ dateFilter, setDateFilter }) => {
  return (
    <input
      type="date"
      className="p-2 rounded-lg  shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={dateFilter}
      onChange={(e) => setDateFilter(e.target.value)}
    />
  );
};

export default DateInput;
