import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { dutyFreeProducts } from "../../data/dutyFreeProduct";
import { touristSpots } from "../../data/tourist";
import { festivals } from "../../data/festival";
import { performances } from "../../data/performance";
import { dutyFreeShops } from "../../data/dutyFreeShop";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const highlight = (text: string, keyword: string) => {
  if (!keyword) return text;
  const parts = text.split(new RegExp(`(${keyword})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <span key={i} className="bg-yellow-200 font-bold rounded px-1">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

const MAX_RESULTS = 5;

const SearchPage: React.FC = () => {
  const query = useQuery();
  const keyword = query.get("query")?.trim() || "";

  // "더보기" 상태 관리
  const [showAll, setShowAll] = useState({
    dutyfree: false,
    dutyfreeShop: false,
    tourist: false,
    festival: false,
    performance: false,
  });

  // 검색 결과 필터링
  const dutyfreeResults = dutyFreeProducts.filter((item) =>
    item.category.toLowerCase().includes(keyword.toLowerCase())
  );
  const touristResults = touristSpots.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      (item.address &&
        item.address.toLowerCase().includes(keyword.toLowerCase()))
  );
  const festivalResults = festivals.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      (item.place && item.place.toLowerCase().includes(keyword.toLowerCase()))
  );
  const performanceResults = performances.filter(
    (item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase()) ||
      (item.place && item.place.toLowerCase().includes(keyword.toLowerCase()))
  );
  // 면세점 위치 정보(주소) 검색
  const dutyfreeShopResults = dutyFreeShops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(keyword.toLowerCase()) ||
      (shop.address &&
        shop.address.toLowerCase().includes(keyword.toLowerCase()))
  );

  const hasResults =
    dutyfreeResults.length > 0 ||
    touristResults.length > 0 ||
    festivalResults.length > 0 ||
    performanceResults.length > 0 ||
    dutyfreeShopResults.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        <span className="mr-2">🔍</span>
        검색 결과
        {keyword && (
          <span className="ml-2 text-lg text-gray-500">"{keyword}"</span>
        )}
      </h1>

      {!keyword && (
        <div className="text-gray-400 text-center py-20">
          검색어를 입력해 주세요.
        </div>
      )}

      {keyword && !hasResults && (
        <div className="text-gray-400 text-center py-20">
          <span className="text-3xl">😥</span>
          <div className="mt-2">"{keyword}"에 대한 결과가 없습니다.</div>
        </div>
      )}

      {keyword && hasResults && (
        <div className="space-y-10">
          {/* 면세점 품목 */}
          {dutyfreeResults.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-blue-600 mb-2">
                🛍️ 면세점 인기 품목{" "}
                <span className="text-xs text-gray-400">
                  ({dutyfreeResults.length}건)
                </span>
              </h2>
              <ul className="divide-y divide-gray-100">
                {(showAll.dutyfree
                  ? dutyfreeResults
                  : dutyfreeResults.slice(0, MAX_RESULTS)
                ).map((item) => (
                  <li
                    key={item.category}
                    className="py-2 flex justify-between items-center"
                  >
                    <span>{highlight(item.category, keyword)}</span>
                    <span className="text-sm text-gray-400">
                      {item.sales_count.toLocaleString()}개
                    </span>
                  </li>
                ))}
              </ul>
              {dutyfreeResults.length > MAX_RESULTS && !showAll.dutyfree && (
                <button
                  className="mt-2 text-blue-500 hover:underline text-sm"
                  onClick={() =>
                    setShowAll((prev) => ({ ...prev, dutyfree: true }))
                  }
                >
                  더보기
                </button>
              )}
            </section>
          )}

          {/* 면세점 위치 정보 */}
          {dutyfreeShopResults.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-blue-700 mb-2">
                🏬 면세점 위치 정보{" "}
                <span className="text-xs text-gray-400">
                  ({dutyfreeShopResults.length}건)
                </span>
              </h2>
              <ul className="divide-y divide-gray-100">
                {(showAll.dutyfreeShop
                  ? dutyfreeShopResults
                  : dutyfreeShopResults.slice(0, MAX_RESULTS)
                ).map((shop) => (
                  <li key={shop.id} className="py-2">
                    <Link
                      to={`/dutyfreeshop/${shop.id}`}
                      className="hover:underline font-medium"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      {highlight(shop.name, keyword)}
                    </Link>
                    <span className="ml-2 text-xs text-gray-400">
                      {highlight(shop.address || "", keyword)}
                    </span>
                  </li>
                ))}
              </ul>
              {dutyfreeShopResults.length > MAX_RESULTS &&
                !showAll.dutyfreeShop && (
                  <button
                    className="mt-2 text-blue-500 hover:underline text-sm"
                    onClick={() =>
                      setShowAll((prev) => ({ ...prev, dutyfreeShop: true }))
                    }
                  >
                    더보기
                  </button>
                )}
            </section>
          )}

          {/* 관광지 */}
          {touristResults.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-green-600 mb-2">
                🏞️ 관광지{" "}
                <span className="text-xs text-gray-400">
                  ({touristResults.length}건)
                </span>
              </h2>
              <ul className="divide-y divide-gray-100">
                {(showAll.tourist
                  ? touristResults
                  : touristResults.slice(0, MAX_RESULTS)
                ).map((item) => (
                  <li key={item.id} className="py-2">
                    <Link
                      to={`/tourist/${item.id}`}
                      className="hover:underline font-medium"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      {highlight(item.name, keyword)}
                    </Link>
                    <span className="ml-2 text-xs text-gray-400">
                      {highlight(item.address || "", keyword)}
                    </span>
                  </li>
                ))}
              </ul>
              {touristResults.length > MAX_RESULTS && !showAll.tourist && (
                <button
                  className="mt-2 text-green-600 hover:underline text-sm"
                  onClick={() =>
                    setShowAll((prev) => ({ ...prev, tourist: true }))
                  }
                >
                  더보기
                </button>
              )}
            </section>
          )}

          {/* 축제 */}
          {festivalResults.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-pink-600 mb-2">
                🎉 축제 정보{" "}
                <span className="text-xs text-gray-400">
                  ({festivalResults.length}건)
                </span>
              </h2>
              <ul className="divide-y divide-gray-100">
                {(showAll.festival
                  ? festivalResults
                  : festivalResults.slice(0, MAX_RESULTS)
                ).map((item) => (
                  <li key={item.id} className="py-2">
                    <Link
                      to={`/festival/${item.id}`}
                      className="hover:underline font-medium"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      {highlight(item.name, keyword)}
                    </Link>
                    <span className="ml-2 text-xs text-gray-400">
                      {highlight(item.place || "", keyword)}
                    </span>
                  </li>
                ))}
              </ul>
              {festivalResults.length > MAX_RESULTS && !showAll.festival && (
                <button
                  className="mt-2 text-pink-600 hover:underline text-sm"
                  onClick={() =>
                    setShowAll((prev) => ({ ...prev, festival: true }))
                  }
                >
                  더보기
                </button>
              )}
            </section>
          )}

          {/* 공연 */}
          {performanceResults.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-purple-700 mb-2">
                🎭 공연 정보{" "}
                <span className="text-xs text-gray-400">
                  ({performanceResults.length}건)
                </span>
              </h2>
              <ul className="divide-y divide-gray-100">
                {(showAll.performance
                  ? performanceResults
                  : performanceResults.slice(0, MAX_RESULTS)
                ).map((item) => (
                  <li key={item.id} className="py-2">
                    <Link
                      to={`/performance/${item.id}`}
                      className="hover:underline font-medium"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      {highlight(item.title, keyword)}
                    </Link>
                    <span className="ml-2 text-xs text-gray-400">
                      {highlight(item.place || "", keyword)}
                    </span>
                  </li>
                ))}
              </ul>
              {performanceResults.length > MAX_RESULTS &&
                !showAll.performance && (
                  <button
                    className="mt-2 text-purple-700 hover:underline text-sm"
                    onClick={() =>
                      setShowAll((prev) => ({ ...prev, performance: true }))
                    }
                  >
                    더보기
                  </button>
                )}
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
