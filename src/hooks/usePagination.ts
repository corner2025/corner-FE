// src/hooks/usePagination.ts
import { useState, useMemo, useEffect, useCallback } from 'react';

interface UsePaginationProps<T> {
  items: T[]; // 페이지네이션할 전체 아이템 배열
  itemsPerPage?: number; // 한 페이지에 보여줄 아이템 수 (기본값 8)
  pageRangeDisplayed?: number; // 한 번에 표시할 페이지 번호 개수 (기본값 5)
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  handlePageChange: (pageNumber: number) => void;
  resetPagination: () => void;
  pageRange: number[]; // 추가: 표시할 페이지 번호 배열
}

/**
 * 배열 데이터에 페이지네이션을 적용하는 커스텀 훅
 * @param items - 페이지네이션할 전체 아이템 배열
 * @param itemsPerPage - 한 페이지에 보여줄 아이템 수 (기본값 8)
 * @param pageRangeDisplayed - 한 번에 표시할 페이지 번호 개수 (기본값 5)
 * @returns currentPage, totalPages, paginatedItems, handlePageChange, resetPagination, pageRange
 */
export const usePagination = <T>({
  items,
  itemsPerPage = 8,
  pageRangeDisplayed = 5, // 기본값 5로 설정
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 전체 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);

  // 현재 페이지에 해당하는 아이템들만 슬라이스
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [currentPage, items, itemsPerPage]);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 상단으로 스크롤
    }
  }, [totalPages]);

  // 페이지를 1로 리셋하는 함수
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // 아이템 배열이 변경될 때 (필터링 등으로 인해) 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  // 표시할 페이지 번호 범위를 계산하는 로직
  const pageRange = useMemo(() => {
    const range: number[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(pageRangeDisplayed / 2));
    const endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1);

    // If we're at the end, adjust startPage to ensure pageRangeDisplayed pages
    if (endPage - startPage + 1 < pageRangeDisplayed) {
      startPage = Math.max(1, endPage - pageRangeDisplayed + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  }, [currentPage, totalPages, pageRangeDisplayed]);


  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    resetPagination,
    pageRange, // 새로 추가된 pageRange 반환
  };
};