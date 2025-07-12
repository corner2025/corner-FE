import React from "react";
import Chart from "./Chart";
import { useTranslation } from "react-i18next";

type DataPoint = {
  name: string;
  avgMonth: number;
  avgYear: number;
};

type DutyFreeChartCardProps = {
  chartData: DataPoint[];
  period: "month" | "year";
};

const DutyFreeChartCard: React.FC<DutyFreeChartCardProps> = ({
  chartData,
  period,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg text-green-500">📊</span>
        <h2 className="text-lg font-bold text-gray-900">
          {t("dutyFreeShop.chartCard.title.1")}
          {t(`dutyFreeShop.period.${period}`)}
          {t("dutyFreeShop.chartCard.title.2")}
        </h2>
      </div>
      <Chart data={chartData} />
    </div>
  );
};

export default DutyFreeChartCard;
