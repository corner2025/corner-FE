// src/hooks/useTouristSpotFilter.ts
import { useState, useMemo } from "react";
import type { TouristSpot } from "../types/tourist";

export function useTouristSpotFilter(spots: TouristSpot[]) {
  const [areaCode, setAreaCode] = useState("전체");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");
  const [keyword, setKeyword] = useState("");

  const filteredSpots = useMemo(() => {
    let result = spots;
    if (areaCode !== "전체") result = result.filter(s => s.areaCode === areaCode);
    if (category1) result = result.filter(s => s.category1 === category1);
    if (category2) result = result.filter(s => s.category2 === category2);
    if (category3) result = result.filter(s => s.category3 === category3);
    if (keyword) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        s =>
          s.name.toLowerCase().includes(kw) ||
          s.address.toLowerCase().includes(kw) ||
          s.description.toLowerCase().includes(kw)
      );
    }
    return result;
  }, [spots, areaCode, category1, category2, category3, keyword]);

  return {
    filteredSpots,
    areaCode, setAreaCode,
    category1, setCategory1,
    category2, setCategory2,
    category3, setCategory3,
    keyword, setKeyword
  };
}
