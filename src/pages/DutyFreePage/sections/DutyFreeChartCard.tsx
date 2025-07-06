import React from "react";
import Chart from "./Chart";

type DataPoint = {
  name: string;
  "월 평균 가격": number;
  "연 평균 가격": number;
};

type DutyFreeChartCardProps = {
  chartData: DataPoint[];
  period: "월간" | "연간";
};

const DutyFreeChartCard: React.FC<DutyFreeChartCardProps> = ({
  chartData,
  period,
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-lg text-green-500">📊</span>
      <h2 className="text-lg font-bold text-gray-900">
        품목별 {period} 판매량 차트
      </h2>
    </div>
    <Chart data={chartData} />
  </div>
);

export default DutyFreeChartCard;
