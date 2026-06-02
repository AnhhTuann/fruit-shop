import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../graphql/queries';
import { useCartStore } from '../store/cartStore';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 aspect-square bg-lime-100 rounded-3xl"></div>
          <div className="w-full md:w-1/2 space-y-6 pt-6">
            <div className="h-10 bg-lime-100 rounded w-3/4"></div>
            <div className="h-6 bg-lime-100 rounded w-1/4"></div>
            <div className="h-32 bg-lime-100 rounded w-full"></div>
            <div className="h-14 bg-lime-100 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-black text-emerald-900 mb-4">Product Not Found</h2>
        <p className="text-emerald-600 mb-8">We couldn't find the product you're looking for.</p>
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </div>
    );
  }

  const { product } = data;

  // Try parsing the description to see if it has the Fruityvice string format:
  // "Family: Musaceae. Calories: 89kcal, Sugar: 12.2g."
  let calories = '--';
  let sugar = '--';
  let family = '--';
  
  const descMatch = product.description.match(/Family:\s*([^.]+)\.\s*Calories:\s*([^,]+),\s*Sugar:\s*(.*)/i);
  if (descMatch) {
    family = descMatch[1].trim();
    calories = descMatch[2].trim();
    sugar = descMatch[3].trim();
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-lime-50 rounded-[3rem] p-8 flex items-center justify-center border-2 border-lime-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-emerald-700 uppercase tracking-widest z-10">
              {product.category?.name || 'Fresh'}
            </div>
            <img 
              src={product.imageUrl || `/fruits/default-fruit.jpg`} 
              alt={product.name} 
              className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/fruits/default-fruit.jpg';
                target.onerror = null;
              }}
            />
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-1/2 flex flex-col pt-4 md:pt-10">
          <h1 className="text-4xl md:text-5xl font-black text-emerald-900 tracking-tight mb-4">
            {product.name}
          </h1>
          <p className="text-3xl font-black text-emerald-600 mb-8">
            ${product.price.toFixed(2)}
          </p>

          <div className="prose prose-emerald mb-10">
            <p className="text-lg text-emerald-800 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Nutrition Facts */}
          {descMatch && (
            <div className="bg-emerald-50 rounded-3xl p-6 mb-10 border border-emerald-100">
              <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center uppercase tracking-wider">
                Nutrition Facts
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                  <div className="text-emerald-500 text-xs font-bold uppercase mb-1">Calories</div>
                  <div className="text-xl font-black text-emerald-900">{calories}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                  <div className="text-emerald-500 text-xs font-bold uppercase mb-1">Sugar</div>
                  <div className="text-xl font-black text-emerald-900">{sugar}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                  <div className="text-emerald-500 text-xs font-bold uppercase mb-1">Family</div>
                  <div className="text-sm font-black text-emerald-900 mt-1 truncate" title={family}>{family}</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto pt-8 border-t border-lime-200 flex items-center gap-6">
            <div className="flex items-center bg-lime-100 rounded-full p-1 border border-lime-200">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center rounded-full text-emerald-700 hover:bg-white hover:shadow-sm transition-all"
                aria-label="Decrease quantity"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-12 text-center font-black text-xl text-emerald-900">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center rounded-full text-emerald-700 hover:bg-white hover:shadow-sm transition-all"
                aria-label="Increase quantity"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="flex-1 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center gap-3 shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0 transition-all group"
            >
              <ShoppingBag className="h-5 w-5 group-hover:animate-bounce" />
              <span className="font-bold text-lg">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
