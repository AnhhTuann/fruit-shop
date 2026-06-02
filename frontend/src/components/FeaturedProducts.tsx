import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '../store/cartStore';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { products, loading, error } = useProducts();
  const addToCart = useCartStore(state => state.addToCart);

  if (error) {
    return (
      <section className="py-16" id="shop">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500 font-bold">Error loading products. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-black text-emerald-800 mb-4">Weekly Favorites</h2>
            <p className="text-emerald-600 max-w-xl">Hand-selected weekly specials picked at the peak of ripeness.</p>
          </div>
          <a href="#all" className="hidden sm:inline-block text-sm font-bold text-orange-600 underline decoration-2 hover:text-orange-500 transition-colors">
            View All Products &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            // Skeleton Loader
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-lime-200 flex flex-col animate-pulse">
                <div className="aspect-[4/3] bg-lime-100 rounded-2xl mb-4"></div>
                <div className="h-4 bg-lime-100 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-lime-100 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-lime-100 rounded w-1/5 block mb-4"></div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="h-6 bg-lime-100 rounded w-1/4"></div>
                  <div className="w-10 h-10 bg-lime-100 rounded-full"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual Products
            // Actual Products
            products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
