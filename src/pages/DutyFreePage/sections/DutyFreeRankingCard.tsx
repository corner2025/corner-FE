import React from "react";
import { useTranslation } from "react-i18next";
import type { DutyFreeProduct } from "../../../types/dutyFreeProduct";

// export type RankingItem = {
//   rank: number;
//   name: string;
//   sales: number;
// };

type DutyFreeRankingCardProps = {
  rankingData: DutyFreeProduct[];
  loading: boolean;
  period: "month" | "year";
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  setPeriod: (period: "month" | "year") => void;
  monthOptions: string[];
  yearOptions: string[];
};

const DutyFreeRankingCard: React.FC<DutyFreeRankingCardProps> = ({
  rankingData,
  loading,
  period,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  setPeriod,
  monthOptions,
  yearOptions,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg text-blue-500">🏆</span>
        <h2 className="text-lg font-bold text-gray-900">
          {t("dutyFreeShop.rankingCard.title")}
        </h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as "month" | "year")}
          className="ml-auto px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm"
        >
          <option value="month">{t("dutyFreeShop.period.month")}</option>
          <option value="year">{t("dutyFreeShop.period.year")}</option>
        </select>
      </div>
      <div className="flex gap-2 mb-3">
        {period === "month" ? (
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
        {loading ? (
          <li className="text-gray-400 text-center py-8">로딩 중...</li>
        ) : rankingData.length === 0 ? (
          <li className="text-gray-400 text-center py-8">
            {t("dutyFreeShop.rankingCard.error")}
          </li>
        ) : (
          rankingData.map((item, idx) => (
            <li
              key={item.totalSales}
              className="flex items-center px-3 py-2 rounded-xl hover:bg-gray-50 transition"
            >
              <span
                className="text-base font-bold text-gray-700 mr-2"
                style={{ minWidth: 32 }}
              >
                {idx + 1}
              </span>
              <span className="flex-1 text-gray-800">{item.category}</span>
              <span className="text-blue-600 text-sm font-semibold">
                {item.totalSales.toLocaleString()}
                {t("dutyFreeShop.rankingCard.count")}
              </span>
            </li>
          ))
        )}
      </ol>
    </div>
  );
};

export default DutyFreeRankingCard;
