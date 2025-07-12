import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DutyFreeRankingCard from "./sections/DutyFreeRankingCard";
import DutyFreeChartCard from "./sections/DutyFreeChartCard";
import DutyFreeShopList from "./sections/DutyFreeShopList";
import DutyFreeShopDetailModal from "./sections/DutyFreeShopDetailModal";
import useNearbyShops from "../../hooks/useNearbyShops";
import KakaoMapView from "../../components/KakaoMapView";
import type { DutyFreeShop } from "../../types/dutyFreeshop";
import { FaCrosshairs } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import type {
  ChartDataPoint,
  DutyFreeProduct,
} from "../../types/dutyFreeProduct";

const getMonthOptions = (): string[] => {
  const options: string[] = [];
  for (let y = 2019; y <= 2025; y++) {
    const maxMonth = y === 2025 ? 3 : 12;
    for (let m = 1; m <= maxMonth; m++) {
      options.push(`${y}-${String(m).padStart(2, "0")}`);
    }
  }
  return options;
};

const getYearOptions = (): string[] => {
  const options: string[] = [];
  for (let y = 2019; y <= 2025; y++) {
    options.push(String(y));
  }
  return options;
};

const DutyFreePage: React.FC = () => {
  const [mapLevel, setMapLevel] = useState(4);
  const [period, setPeriod] = useState<"month" | "year">("month");
  const monthOptions = useMemo(() => getMonthOptions(), []);
  const yearOptions = useMemo(() => getYearOptions(), []);
  const [selectedMonth, setSelectedMonth] = useState<string>(monthOptions[0]);
  const [selectedYear, setSelectedYear] = useState<string>(yearOptions[0]);
  const [rankingData, setRankingData] = useState<DutyFreeProduct[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { t } = useTranslation();

  // 내 위치 상태
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedShop, setSelectedShop] = useState<
    (DutyFreeShop & { distance?: number }) | null
  >(null);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const navigate = useNavigate();

  // 내 위치 받아오기 및 지도 중심 초기화
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMyLocation(loc);
        setMapCenter(loc);
      },
      () => {
        const loc = { lat: 37.5665, lng: 126.978 };
        setMyLocation(loc);
        setMapCenter(loc);
      }
    );
  }, []);

  // 랭킹 데이터 및 차트 데이터 fetch
  useEffect(() => {
    setLoading(true);
    let url = "";
    let params = "";
    if (period === "month") {
      url = `${
        import.meta.env.VITE_SERVER_URL
      }dutyfree/products/monthly-ranking`;
      params = `?yearMonth=${selectedMonth}&limit=5`;
    } else {
      url = `${
        import.meta.env.VITE_SERVER_URL
      }dutyfree/products/annual-ranking`;
      params = `?yearMonth=${selectedYear}&limit=5`;
    }
    const fullUrl = `${url}${params}`;

    fetch(fullUrl)
      .then((res) => {
        // console.log("response status:", res.status);
        return res.json();
      })
      .then((data) => {
        // console.log("response data:", data);
        setRankingData(data);
        if (Array.isArray(data)) {
          setChartData(
            data.map((item: DutyFreeProduct) =>
              period === "month"
                ? { name: item.category, avgMonth: item.totalSales, avgYear: 0 }
                : { name: item.category, avgMonth: 0, avgYear: item.totalSales }
            )
          );
        } else if (Array.isArray(data.content)) {
          setChartData(
            data.content.map((item: DutyFreeProduct) =>
              period === "month"
                ? { name: item.category, avgMonth: item.totalSales, avgYear: 0 }
                : { name: item.category, avgMonth: 0, avgYear: item.totalSales }
            )
          );
        } else {
          setChartData([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("fetch error:", err);
        setLoading(false);
      });
  }, [period, selectedMonth, selectedYear]);

  // 월 옵션: 연도 변경 시 해당 연도만 필터
  const filteredMonthOptions = useMemo(
    () => monthOptions.filter((m) => m.startsWith(selectedYear)),
    [selectedYear, monthOptions]
  );

  // 가까운 면세점 리스트 (커스텀 훅)
  const sortedShops = useNearbyShops(myLocation, [], 3);

  // 상세정보 모달에서 지도 이동
  const handleMoveMapToShop = (shop: DutyFreeShop & { distance?: number }) => {
    if (shop.latitude && shop.longitude) {
      setMapCenter({ lat: shop.latitude, lng: shop.longitude });
      setMapLevel(3);
    }
    setSelectedShop(null);
  };

  // 현 위치로 지도 중심 이동 버튼 핸들러
  const handleMoveToMyLocation = () => {
    if (myLocation) {
      setMapCenter(myLocation);
      setMapLevel(4);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-5 mb-10 rounded-3xl">
      {/* 헤더 */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto pt-7 pb-11 flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight animate-fade-in-down">
            {t("dutyFreeShop.title")}
          </h1>
          <p className="text-gray-500 text-sm sm:text-md animate-fade-in ">
            {t("dutyFreeShop.subtitle")}
          </p>
        </div>
      </header>

      {/* 랭킹/차트 */}
      <section className="max-w-4xl mx-auto mt-10 mb-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
        <DutyFreeRankingCard
          rankingData={rankingData}
          loading={loading}
          period={period}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          setPeriod={setPeriod}
          monthOptions={filteredMonthOptions}
          yearOptions={yearOptions}
        />
        <DutyFreeChartCard chartData={chartData} period={period} />
      </section>

      {/* 내 주변 면세점 */}
      <section className="max-w-4xl mx-auto mb-8 px-4 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="sm:text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="text-yellow-400 text-lg sm:text-xl">📍</span>
            {t("dutyFreeShop.nearByShop.title")}
          </h2>
          <button
            className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition"
            onClick={() => {
              navigate("/dutyfreeshop");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {t("dutyFreeShop.nearByShop.more")}
          </button>
        </div>
        <DutyFreeShopList
          shops={sortedShops}
          onDetail={setSelectedShop}
          onMoveMap={handleMoveMapToShop}
        />
      </section>

      {/* 지도 */}
      <section className="max-w-4xl mx-auto mb-10 px-4 relative">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-blue-400 text-xl">🗺️</span>
          {t("dutyFreeShop.map.title")}
        </h2>
        <button
          onClick={handleMoveToMyLocation}
          className="absolute right-6 top-10 z-10 bg-white border border-gray-200 shadow-md rounded-full p-3 hover:bg-blue-50 transition"
          title="내 위치로 이동"
          aria-label="내 위치로 이동"
          style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
        >
          <FaCrosshairs className="text-blue-500 text-xl" />
        </button>
        {!mapCenter || !myLocation ? (
          <div className="w-full h-80 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-800 text-xl font-bold">
            {t("dutyFreeShop.map.loading")}
          </div>
        ) : (
          <KakaoMapView
            level={mapLevel}
            center={mapCenter}
            myLocation={myLocation}
            shops={sortedShops.map((shop) => ({
              lat: shop.latitude!,
              lng: shop.longitude!,
              name: shop.name,
            }))}
          />
        )}
      </section>

      {/* 상세정보 모달 */}
      <DutyFreeShopDetailModal
        shop={selectedShop}
        onClose={() => setSelectedShop(null)}
        onMoveMap={handleMoveMapToShop}
      />
    </div>
  );
};

export default DutyFreePage;
