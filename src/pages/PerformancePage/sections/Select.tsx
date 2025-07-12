import { useTranslation } from "react-i18next";

// Select 컴포넌트(동적 옵션)
interface SelectProps {
  areaFilter: string;
  setAreaFilter: React.Dispatch<React.SetStateAction<string>>;
  areaOptions: string[];
}
const Select: React.FC<SelectProps> = ({
  areaFilter,
  setAreaFilter,
  areaOptions,
}) => {
  const { t } = useTranslation();
  return (
    <select
      className="p-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={areaFilter}
      onChange={(e) => setAreaFilter(e.target.value)}
    >
      <option value="">{t("area.all") || "전체 지역"}</option>
      {areaOptions.map((area) => (
        <option key={area} value={area}>
          {area}
        </option>
      ))}
    </select>
  );
};
export default Select;
