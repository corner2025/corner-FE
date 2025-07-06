export type DutyFreeProduct = {
    id: number;           // BIGINT PRIMARY KEY AUTO_INCREMENT
    year_month: string;   // VARCHAR(7), 예: '2021-06'
    category: string;     // VARCHAR(50), 예: '화장품'
    sales_count: number;  // INT
  };
  