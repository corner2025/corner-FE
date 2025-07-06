import React from "react";
import type { DutyFreeShop } from "../../../types/dutyFreeshop";
import { FaMapMarkerAlt } from "react-icons/fa";

interface DutyFreeShopListProps {
  shops: (DutyFreeShop & { distance?: number })[];
  onDetail?: (shop: DutyFreeShop & { distance?: number }) => void;
  onMoveMap?: (shop: DutyFreeShop & { distance?: number }) => void;
}

const DutyFreeShopList: React.FC<DutyFreeShopListProps> = ({
  shops,
  onDetail,
  onMoveMap = () => {},
}) => {
  return (
    <ul className="space-y-4">
      {shops.map((store, idx) => (
        <li
          key={store.id}
          className="bg-gradient-to-r from-yellow-50 via-blue-50 to-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition"
        >
          <div className="flex flex-col items-center min-w-[60px]">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 shadow text-2xl font-bold text-yellow-500 mb-2">
              {idx + 1}
            </div>
            <div className="text-xs text-gray-400 font-medium">RANK</div>
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-1">
              <span className="text-base font-semibold text-gray-900">
                {store.name}
              </span>
              <span className="hidden sm:inline text-xs text-gray-300">|</span>
              <span className="text-sm text-gray-500">{store.address}</span>
            </div>
            <div className="flex flex-wrap gap-3 text-[15px] text-gray-600 mt-2">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12v.01"
                  ></path>
                </svg>
                <span>{store.opening_hours}</span>
              </span>
              {typeof store.distance === "number" && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                  </svg>
                  <span>
                    {store.distance < 1
                      ? `${(store.distance * 1000).toFixed(0)}m`
                      : `${store.distance.toFixed(2)}km`}
                  </span>
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-auto sm:items-end">
            <button
              className="flex justify-center items-center gap-1 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg text-sm font-semibold shadow hover:bg-blue-50 transition"
              onClick={() => onMoveMap(store)}
              title="이 위치로 지도 이동"
            >
              <FaMapMarkerAlt className="text-pink-500" />
              지도 이동
            </button>
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
              onClick={() => onDetail && onDetail(store)}
            >
              상세정보
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DutyFreeShopList;
