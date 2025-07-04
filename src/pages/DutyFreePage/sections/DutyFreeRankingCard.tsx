import React from "react";

type RankingItem = {
  rank: number;
  name: string;
  sales: number;
};

type DutyFreeRankingCardProps = {
  rankingData: RankingItem[];
  period: "월간" | "연간";
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  setPeriod: (period: "월간" | "연간") => void;
  monthOptions: string[];
  yearOptions: string[];
};

const DutyFreeRankingCard: React.FC<DutyFreeRankingCardProps> = ({
  rankingData,
  period,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  setPeriod,
  monthOptions,
  yearOptions,
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-lg text-blue-500">🏆</span>
      <h2 className="text-lg font-bold text-gray-900">판매량 랭킹</h2>
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value as "월간" | "연간")}
        className="ml-auto px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm"
      >
        <option value="월간">월간</option>
        <option value="연간">연간</option>
      </select>
    </div>
    <div className="flex gap-2 mb-3">
      {period === "월간" ? (
        <select
          className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {monthOptions.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      ) : (
        <select
          className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      )}
    </div>
    <ol className="space-y-2">
      {rankingData.length === 0 ? (
        <li className="text-gray-400 text-center py-8">데이터 없음</li>
      ) : (
        rankingData.map((item) => (
          <li
            key={item.rank}
            className="flex items-center px-3 py-2 rounded-xl hover:bg-gray-50 transition"
          >
            <span
              className="text-base font-bold text-gray-700 mr-2"
              style={{ minWidth: 32 }}
            >
              {item.rank}
            </span>
            <span className="flex-1 text-gray-800">{item.name}</span>
            <span className="text-blue-600 text-sm font-semibold">
              {item.sales.toLocaleString()}개
            </span>
          </li>
        ))
      )}
    </ol>
  </div>
);

export default DutyFreeRankingCard;
