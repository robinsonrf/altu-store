export type ProductId = string;

export type Money = {
  amount: number;
  currency: "CLP";
};

export type Product = {
  id: ProductId;
  slug: string;
  name: string;
  shortDescription: string;
  price: Money;
  category: string;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
};
