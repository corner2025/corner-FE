import React from "react";
import type { DutyFreeShop } from "../../../types/dutyFreeshop";
import { useTranslation } from "react-i18next";

type Props = {
  shop: (DutyFreeShop & { distance?: number }) | null;
  onClose: () => void;
  onMoveMap?: (shop: DutyFreeShop & { distance?: number }) => void;
};

const dummyBrands = ["GUCCI", "LOUIS VUITTON", "CHANEL", "DIOR", "PRADA"];
const dummyReviews = [
  { user: "홍길동", content: "친절하고 쾌적해요!", score: 5 },
  { user: "이영희", content: "브랜드가 다양해서 좋아요.", score: 4 },
];

const DutyFreeShopDetailModal: React.FC<Props> = ({
  shop,
  onClose,
  onMoveMap,
}) => {
  const { t } = useTranslation();
  if (!shop) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        <h3 className="text-2xl font-bold mb-4 text-blue-700">{shop.name}</h3>
        <div className="mb-2 text-gray-700 flex items-center gap-2">
          <span className="font-semibold">
            {t("dutyFreeShop.modal.address")}
          </span>
          <span>{shop.address}</span>
        </div>
        <div className="mb-2 text-gray-700 flex items-center gap-2">
          <span className="font-semibold">
            {t("dutyFreeShop.modal.workingHours")}
          </span>
          <span>{shop.opening_hours}</span>
        </div>
        {typeof shop.distance === "number" && (
          <div className="mb-2 text-gray-700 flex items-center gap-2">
            <span className="font-semibold">
              {t("dutyFreeShop.modal.distance")}
            </span>
            <span>
              {shop.distance < 1
                ? `${(shop.distance * 1000).toFixed(0)}m`
                : `${shop.distance.toFixed(2)}km`}
            </span>
          </div>
        )}
        <div className="mb-2 text-gray-700 flex items-center gap-2">
          <span className="font-semibold">{t("dutyFreeShop.modal.phone")}</span>
          <span>{shop.phone}</span>
        </div>
        <div className="mb-2 text-gray-700 flex items-center gap-2">
          <span className="font-semibold">
            {t("dutyFreeShop.modal.map.title")}
          </span>
          <a
            href={
              shop.latitude && shop.longitude
                ? `https://map.kakao.com/link/map/${encodeURIComponent(
                    shop.name
                  )},${shop.latitude},${shop.longitude}`
                : "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {t("dutyFreeShop.modal.map.content")}
          </a>
          <button
            className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition"
            onClick={() => onMoveMap && onMoveMap(shop)}
          >
            {t("dutyFreeShop.modal.map.move")}
          </button>
        </div>
        {/* 더미 브랜드 정보 */}
        <div className="mt-4">
          <div className="font-semibold text-gray-800 mb-1">
            {t("dutyFreeShop.modal.info")}
          </div>
          <ul className="flex flex-wrap gap-2">
            {dummyBrands.map((brand) => (
              <li
                key={brand}
                className="bg-gray-100 px-2 py-1 rounded text-gray-700 text-sm"
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
        {/* 더미 리뷰 정보 */}
        <div className="mt-4">
          <div className="font-semibold text-gray-800 mb-1">
            {t("dutyFreeShop.modal.review")}
          </div>
          <ul className="space-y-1">
            {dummyReviews.map((r, i) => (
              <li
                key={i}
                className="text-sm text-gray-700 flex items-center gap-2"
              >
                <span className="text-yellow-400">★</span>
                <span className="font-semibold">{r.user}</span>
                <span>{r.content}</span>
                <span className="text-xs text-gray-400">({r.score}/5)</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 mt-6">
          <button
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
            onClick={onClose}
          >
            {t("dutyFreeShop.modal.button")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DutyFreeShopDetailModal;
