import { Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import MainPage from "./pages/MainPage";
import DutyFreePage from "./pages/DutyFreePage";
import TouristPage from "./pages/TouristPage";
import FestivalPage from "./pages/FestivalPage";
import MapPage from "./pages/MapPage";
import SpotDetail from "./pages/MapPage/spotDetail";
import FestivalDetailPage from "./components/FestivalDetailPage";
import PerformanceDetailPage from "./components/PerformanceDetailPage";
import PerformancePage from "./pages/PerformancePage";
import TouristDetailPage from "./components/TouristDetailPage";
import SearchPage from "./pages/SearchPage";
import DutyFreeShopPage from "./pages/DutyFreeShopPage";
import DutyFreeShopDetailPage from "./pages/DutyFreeShopDetailPage";
import CalendarPage from "./pages/CalendarPage";


function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <main className="mt-24 mb-auto mx-auto w-10/12 max-w-4xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        {/* 면세점 */}
        <Route path="/dutyfree" element={<DutyFreePage />} />
        <Route path="/dutyfreeshop" element={<DutyFreeShopPage />} />
        <Route path="/dutyfreeshop/:id" element={<DutyFreeShopDetailPage />} />
        {/* 관광지 */}
        <Route path="/tourist" element={<TouristPage />} />
        <Route path="/tourist/:id" element={<TouristDetailPage />} />
        {/* 축제 정보 */}
        <Route path="/festival" element={<FestivalPage />} />
        <Route path="/festival/:id" element={<FestivalDetailPage />} />
        {/* 공연 정보 */}
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/performance/:id" element={<PerformanceDetailPage />} />
        {/* 일정 캘린더 */}
        <Route path="/calendar" element={<CalendarPage />} />
        {/* 여행 지도, 관광지 상세정보 */}
        <Route path="/map" element={<MapPage />} />
        <Route path="/spot/:id" element={<SpotDetail />} />
        {/* 검색 페이지 */}
        <Route path="/search" element={<SearchPage />} />
        
      </Route>
      {/* 관리자 로그인 */}
      <Route path="/admin" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
