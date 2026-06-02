export interface Category {
  id: string;
  name: string;
  description?: string;
  iconName?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: Category;
}
