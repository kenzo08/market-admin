export interface CreateOffer {
  title: string;
  description: string;
  prices: PriceTariff[];
  images?: string[];
  categoryId?: string;
  branchAddress?: string;
}

export interface PriceTariff {
  price: number;
  priceType: string;
}

export interface CreateOfferResponse {
  title: string;
  description:   string;
  prices: Price[];
  branchAddress: string;
  author: Author;
  images: null;
  category_id:   null;
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Author {
  id: number;
}

export interface Price {
  price:     number;
  priceType: string;
}
