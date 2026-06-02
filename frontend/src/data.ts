import { Product, Category } from './types';

export const categories: Category[] = [
  { id: 'c1', name: 'Citrus', iconName: 'Lemon' },
  { id: 'c2', name: 'Berries', iconName: 'Cherry' },
  { id: 'c3', name: 'Tropical', iconName: 'Trees' },
  { id: 'c4', name: 'Apples', iconName: 'Apple' },
];

export const featuredProducts: Product[] = [
  { 
    id: 'p1', 
    name: 'Fuji Apples', 
    price: 4.99, 
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6caa6?auto=format&fit=crop&w=800&q=80', 
    category: 'Apples' 
  },
  { 
    id: 'p2', 
    name: 'Navel Oranges', 
    price: 5.49, 
    imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80', 
    category: 'Citrus' 
  },
  { 
    id: 'p3', 
    name: 'Organic Blueberries', 
    price: 6.99, 
    imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80', 
    category: 'Berries' 
  },
  { 
    id: 'p4', 
    name: 'Alphonso Mangoes', 
    price: 8.99, 
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fd0078?auto=format&fit=crop&w=800&q=80', 
    category: 'Tropical' 
  },
];
