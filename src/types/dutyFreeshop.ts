export type DutyFreeShop = {
    id: number; // BIGINT PRIMARY KEY AUTO_INCREMENT
    name: string; // VARCHAR(100) NOT NULL
    address?: string; // VARCHAR(255), optional
    latitude?: number; // DOUBLE, optional
    longitude?: number; // DOUBLE, optional
    phone?: string; // VARCHAR(50), optional
    opening_hours?: string; // VARCHAR(100), optional
    created_at?: string; // DATETIME, optional, ISO string format
  };
  
  // Note: Optional fields are marked with ? because they may be null or undefined in data.
  