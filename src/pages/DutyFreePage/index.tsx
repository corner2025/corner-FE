import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dutyFreeShops } from "../../data/dutyFreeShop";
import { dutyFreeProducts } from "../../data/dutyFreeProduct";
import DutyFreeRankingCard from "./sections/DutyFreeRankingCard";
import DutyFreeChartCard from "./sections/DutyFreeChartCard";
import DutyFreeShopList from "./sections/DutyFreeShopList";
import DutyFreeShopDetailModal from "./sections/DutyFreeShopDetailModal";
import useNearbyShops from "../../hooks/useNearbyShops";
import KakaoMapView from "../../components/KakaoMapView";
import type { DutyFreeShop } from "../../types/dutyFreeshop";
import { FaCrosshairs } from "react-icons/fa"; // 아이콘 패키지 설치 필요: npm i react-icons

const getPeriod = (yearMonth: string) => yearMonth.slice(0, 4);
const getYear = () => new Date().getFullYear().toString();

const DutyFreePage: React.FC = () => {
  const [mapLevel, setMapLevel] = useState(4); // 기본 줌 레벨(4~14)
  const [period, setPeriod] = useState<"월간" | "연간">("월간");
  const [selectedMonth, setSelectedMonth] = useState(
    `${getYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`
  );
  const yearOptions = useMemo(() => {
    const years = Array.from(
      new Set(dutyFreeProducts.map((p) => p.year_month.slice(0, 4)))
    );
    return years.sort();
  }, []);
  const [selectedYear, setSelectedYear] = useState(
    yearOptions.length > 0 ? yearOptions[yearOptions.length - 1] : getYear()
  );

  // 내 위치 상태
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // 상세정보 모달 상태
  const [selectedShop, setSelectedShop] = useState<
    (DutyFreeShop & { distance?: number }) | null
  >(null);

  // 지도 중심(면세점 위치)
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
        setMapCenter(loc); // 지도 중심도 내 위치로!
      },
      () => {
        const loc = { lat: 37.5665, lng: 126.978 }; // fallback: 서울시청
        setMyLocation(loc);
        setMapCenter(loc);
      }
    );
  }, []);

  // 랭킹 데이터
  const rankingData = useMemo(() => {
    if (period === "월간") {
      const filtered = dutyFreeProducts.filter(
        (p) => p.year_month === selectedMonth
      );
      return [...filtered]
        .sort((a, b) => b.sales_count - a.sales_count)
        .slice(0, 5)
        .map((item, idx) => ({
          rank: idx + 1,
          name: item.category,
          sales: item.sales_count,
        }));
    } else {
      const byCategory: Record<string, number> = {};
      dutyFreeProducts
        .filter((p) => getPeriod(p.year_month) === selectedYear)
        .forEach((p) => {
          byCategory[p.category] =
            (byCategory[p.category] || 0) + p.sales_count;
        });
      return Object.entries(byCategory)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([category, sales], idx) => ({
          rank: idx + 1,
          name: category,
          sales,
        }));
    }
  }, [period, selectedMonth, selectedYear]);

  // 차트 데이터 (Chart 타입에 맞춰 변환)
  const chartData = useMemo(() => {
    if (period === "월간") {
      return dutyFreeProducts
        .filter((p) => p.year_month === selectedMonth)
        .map((p) => ({
          name: p.category,
          "월 평균 가격": p.sales_count,
          "연 평균 가격": 0,
        }));
    } else {
      const byCategory: Record<string, number> = {};
      dutyFreeProducts
        .filter((p) => getPeriod(p.year_month) === selectedYear)
        .forEach((p) => {
          byCategory[p.category] =
            (byCategory[p.category] || 0) + p.sales_count;
        });
      return Object.entries(byCategory).map(([category, sales]) => ({
        name: category,
        "월 평균 가격": 0,
        "연 평균 가격": sales,
      }));
    }
  }, [period, selectedMonth, selectedYear]);

  // 월 옵션: 선택된 연도에 실제 데이터가 존재하는 월만 표시
  const monthOptions = useMemo(() => {
    const months = dutyFreeProducts
      .filter((p) => getPeriod(p.year_month) === selectedYear)
      .map((p) => p.year_month)
      .filter((v, i, arr) => arr.indexOf(v) === i)
      .sort();
    return months;
  }, [selectedYear]);

  // 가까운 면세점 리스트 (커스텀 훅)
  const sortedShops = useNearbyShops(myLocation, dutyFreeShops, 3);

  // 상세정보 모달에서 지도 이동
  const handleMoveMapToShop = (shop: DutyFreeShop & { distance?: number }) => {
    if (shop.latitude && shop.longitude) {
      setMapCenter({ lat: shop.latitude, lng: shop.longitude }); // 지도 중심을 해당 면세점으로 이동
      setMapLevel(3);
    }
    setSelectedShop(null);
  };

  // 현 위치로 지도 중심 이동 버튼 핸들러
  const handleMoveToMyLocation = () => {
    if (myLocation) {
      setMapCenter(myLocation);
      setMapLevel(4); // 원하는 줌 레벨로 조정
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-5 mb-10 rounded-3xl">
      {/* 헤더 */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight animate-fade-in-down">
            면세점 품목 랭킹 & 내 주변 정보
          </h1>
          <p className="text-gray-500 text-sm sm:text-md animate-fade-in ">
            인기 품목 판매량과 가까운 면세점 정보를 한눈에
          </p>
        </div>
      </header>

      {/* 랭킹/차트 */}
      <section className="max-w-4xl mx-auto mt-10 mb-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
        <DutyFreeRankingCard
          rankingData={rankingData}
          period={period}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          setPeriod={setPeriod}
          monthOptions={monthOptions}
          yearOptions={yearOptions}
        />
        <DutyFreeChartCard chartData={chartData} period={period} />
      </section>

      {/* 내 주변 면세점 */}
      <section className="max-w-4xl mx-auto mb-8 px-4 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="sm:text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="text-yellow-400 text-lg sm:text-xl">📍</span>내
            위치 기반 가까운 면세점
          </h2>
          <button
            className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition"
            onClick={() => {
              navigate("/dutyfreeshop");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            더보기
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
          <span className="text-blue-400 text-xl">🗺️</span>지도에서 위치 보기
        </h2>
        {/* 현 위치로 이동 버튼 (지도 우상단에 고정) */}
        <button
          onClick={handleMoveToMyLocation}
          className="absolute right-6 top-10 z-10 bg-white border border-gray-200 shadow-md rounded-full p-3 hover:bg-blue-50 transition"
          title="내 위치로 이동"
          aria-label="내 위치로 이동"
          style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
        >
          <FaCrosshairs className="text-blue-500 text-xl" />
        </button>
        {/* center와 myLocation이 모두 준비된 후에만 지도 렌더 */}
        {!mapCenter || !myLocation ? (
          <div className="w-full h-80 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-800 text-xl font-bold">
            내 위치 정보를 불러오는 중...
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
