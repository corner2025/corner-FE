import { useTranslation } from "react-i18next";

interface SelectProps {
  areaFilter: string;
  setAreaFilter: React.Dispatch<React.SetStateAction<string>>;
}

const areaCodes = [
  { code: "all", name: "전체 지역" },
  { code: "11", name: "서울" },
  { code: "26", name: "부산" },
  { code: "27", name: "대구" },
  { code: "28", name: "인천" },
  { code: "29", name: "광주" },
  { code: "30", name: "대전" },
  { code: "31", name: "울산" },
  { code: "36", name: "세종" },
  { code: "41", name: "경기" },
  { code: "42", name: "강원" },
  { code: "43", name: "충청북도" },
  { code: "44", name: "충청남도" },
  { code: "45", name: "전라북도" },
  { code: "46", name: "전라남도" },
  { code: "47", name: "경상북도" },
  { code: "48", name: "경상남도" },
  { code: "50", name: "제주" },
];

const Select: React.FC<SelectProps> = ({ areaFilter, setAreaFilter }) => {
  const { t } = useTranslation();

  return (
    <select
      className="p-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={areaFilter || "전체 지역"}
      onChange={(e) => {
        const selected = e.target.value;
        setAreaFilter(selected === "전체 지역" ? "" : selected);
      }}
    >
      {areaCodes.map(({ code, name }) => (
        <option key={code} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};


export default Select;
