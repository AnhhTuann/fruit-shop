import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { useCartStore } from '../store/cartStore';
import { Product } from '../types';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import SectionHeader from './SectionHeader';

export default function FeaturedProducts() {
  const { data, loading, error } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <section className="py-16" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Weekly Favorites"
          subtitle="Hand-selected weekly specials picked at the peak of ripeness."
          linkLabel="View All Products"
          linkHref="#all"
        />

        {error && (
          <p className="text-center text-red-500 font-bold py-10">
            Error loading products. Please try again later.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <SkeletonCard count={8} />
          ) : (
            data?.products.map((product) => (
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
