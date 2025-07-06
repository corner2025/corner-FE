type FilterOptions<T> = {
    areaKey: keyof T;
    areaFilter: string; // ← regionFilter에서 areaFilter로 통일
    keyword: string;
    keywordFields: (keyof T)[];
    startDateKey: keyof T;
    endDateKey: keyof T;
    startDateFilter: string;
    endDateFilter: string;
    today: Date;
  };
  
  export function filterItems<T>(
    items: T[],
    options: FilterOptions<T>
  ): T[] {
    let result = items;
  
    // 지역 필터
    if (options.areaFilter && options.areaFilter !== "전체") {
      result = result.filter(
        (item) => item[options.areaKey] === options.areaFilter
      );
    }
  
    // 키워드 필터
    if (options.keyword) {
      const lowerKeyword = options.keyword.toLowerCase();
      result = result.filter((item) =>
        options.keywordFields.some((field) =>
          (item[field] as string)?.toLowerCase().includes(lowerKeyword)
        )
      );
    }
  
    // 시작일 필터
    if (options.startDateFilter) {
      const filterStart = new Date(options.startDateFilter);
      filterStart.setHours(0, 0, 0, 0);
      result = result.filter(
        (item) =>
          (item[options.endDateKey] as Date).setHours(0, 0, 0, 0) >=
          filterStart.getTime()
      );
    } else {
      result = result.filter(
        (item) =>
          (item[options.endDateKey] as Date).setHours(0, 0, 0, 0) >=
          options.today.getTime()
      );
    }
  
    // 종료일 필터
    if (options.endDateFilter) {
      const filterEnd = new Date(options.endDateFilter);
      filterEnd.setHours(23, 59, 59, 999);
      result = result.filter(
        (item) =>
          (item[options.startDateKey] as Date).setHours(0, 0, 0, 0) <=
          filterEnd.getTime()
      );
    }
  
    // 시작일 기준 오름차순 정렬
    result = result.slice().sort(
      (a, b) =>
        (a[options.startDateKey] as Date).getTime() -
        (b[options.startDateKey] as Date).getTime()
    );
  
    return result;
  }
  