import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  name: string;
  avgMonth: number;
  avgYear: number;
};

type ChartProps = {
  data: DataPoint[]; // data는 DataPoint 타입의 배열
};

const Chart: React.FC<ChartProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="avgMonth"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name={t("dutyFreeShop.chartCard.sale.avgMonth")}
        />
        <Line
          type="monotone"
          dataKey="avgYear"
          stroke="#82ca9d"
          name={t("dutyFreeShop.chartCard.sale.avgYear")}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
