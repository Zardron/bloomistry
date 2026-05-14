export type ApiListResponse<TDataKey extends string, TItem> = {
  success: true;
  message: string;
  data: Record<TDataKey, TItem[]>;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ApiItemResponse<TDataKey extends string, TItem> = {
  success: true;
  message: string;
  data: Record<TDataKey, TItem>;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  priceLabel?: string;
  sortOrder?: number;
  isActive: boolean;
};

export type Flower = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  priceLabel?: string;
  category?: Category | string;
  image?: {
    url?: string;
    filename?: string;
  };
  isFeatured: boolean;
  isActive: boolean;
};

export type Testimonial = {
  _id: string;
  customerName: string;
  image?: {
    url?: string;
    filename?: string;
  };
  isActive: boolean;
};
