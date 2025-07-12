import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DutyFreeShopPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("전체");
  const { t } = useTranslation();

  //   // 필터링
  //   const filteredShops = useMemo(() => {
  //     let list = dutyFreeShops;
  //     if (region !== "전체") {
  //       list = list.filter(
  //         (shop) => shop.address && shop.address.startsWith(region)
  //       );
  //     }
  //     if (search.trim()) {
  //       const q = search.trim().toLowerCase();
  //       list = list.filter(
  //         (shop) =>
  //           shop.name.toLowerCase().includes(q) ||
  //           (shop.address && shop.address.toLowerCase().includes(q))
  //       );
  //     }
  //     return list;
  //   }, [search, region]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-800 mb-10 tracking-tight drop-shadow animate-fade-in-down">
        <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
          {t("dutyFreeShop.list.title")}
        </span>
      </h1>

      {/* 검색/필터 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 items-center justify-between">
        <input
          type="text"
          placeholder={t("dutyFreeShop.list.placeholder")}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            // handlePageChange(1);
          }}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 bg-white"
          style={{ minWidth: 180 }}
        />
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            // handlePageChange(1);
          }}
          className="px-4 py-3 rounded-lg border border-gray-200 shadow-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-300"
        >
          {/* {REGION_LIST.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))} */}
        </select>
      </div>

      {/* 리스트 */}
      {/* {paginatedItems.length === 0 ? (
        <div className="flex flex-col items-center h-60 justify-center">
          <p className="text-center text-xl text-gray-500">
            {t("dutyFreeShop.list.error")}
          </p>
        </div> */}
      {/* ) : (
        <ul className="divide-y divide-gray-100 rounded-2xl bg-white shadow border border-gray-100 mb-10">
          {paginatedItems.map((shop) => (
            <li
              key={shop.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-5 hover:bg-blue-50 transition cursor-pointer"
              onClick={() => {
                navigate(`/dutyfreeshop/${shop.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div>
                <div className="text-lg font-bold text-blue-700 mb-1">
                  {shop.name}
                </div>
                <div className="text-gray-500 text-sm">{shop.address}</div>
              </div>
              <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                <span className="text-xs text-gray-400">
                  {shop.opening_hours}
                </span>
                <span className="text-xs text-gray-400">{shop.phone}</span>
              </div>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default DutyFreeShopPage;
