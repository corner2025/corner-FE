import { Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import MainPage from "./pages/MainPage";
import DutyFreePage from "./pages/DutyFreePage";
import TouristPage from "./pages/TouristPage";
import FestivalPage from "./pages/FestivalPage";
import CalenderPage from "./pages/CalenderPage";
import MapPage from "./pages/MapPage";
import ChartPage from "./pages/ChartPage";

function Layout() {
  return (
    <div
      className="flex flex-col h-screen justify-between"
      //   style={{ backgroundColor: "#EEF6FB" }}
    >
      <Navbar />
      <main className="mt-24 mb-auto mx-auto w-10/12 max-w-4xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#EEF6FB" }}>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/dutyfree" element={<DutyFreePage />} />
        <Route path="/tourist" element={<TouristPage />} />
        <Route path="/festival" element={<FestivalPage />} />
        <Route path="/calender" element={<CalenderPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
