import { ShoppingBag, Star } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '../store/cartStore';

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
            products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-lime-200 flex flex-col group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-lime-50 rounded-2xl mb-4 flex items-center justify-center">
                  <img 
                    src={product.imageUrl || `https://picsum.photos/seed/${product.id}/600/400`} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                    {product.category?.name || 'Fresh'}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-emerald-500 ml-1">(24)</span>
                  </div>
                  
                  <h3 className="font-black text-emerald-900 mb-1 truncate" title={product.name}>
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-emerald-500 mb-3 block truncate" title={product.description}>
                    {product.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-black text-emerald-700">${product.price.toFixed(2)}</span>
                    
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-600 active:scale-95 transition-all flex-shrink-0" 
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
