import React, { useState } from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-lime-200 flex flex-col group">
      <Link to={`/product/${product.id}`} className="relative aspect-[4/3] overflow-hidden bg-lime-50 rounded-2xl mb-4 flex items-center justify-center block">
        {/* Image Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-lime-100 animate-pulse"></div>
        )}
        
        <img 
          src={product.imageUrl || `/fruits/default-fruit.jpg`} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(`A highly detailed studio photography of a fresh ${product.name} fruit, isolated on a clean solid white background`)}?width=600&height=400&nologo=true`;
            target.onerror = null;
          }}
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
          {product.category?.name || 'Fresh'}
        </div>
      </Link>
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-emerald-500 ml-1">(24)</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="hover:underline decoration-emerald-500 decoration-2 underline-offset-2">
          <h3 className="font-black text-emerald-900 mb-1 truncate" title={product.name}>
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xs text-emerald-500 mb-3 block truncate" title={product.description}>
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-black text-emerald-700">${product.price.toFixed(2)}</span>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-600 active:scale-95 transition-all flex-shrink-0" 
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
