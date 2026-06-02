import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore, selectTotalPrice } from '../store/cartStore';

export default function CartDrawer() {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeFromCart } = useCartStore();
  const totalPrice = useCartStore(selectTotalPrice);

  return (
    <>
      {/* Overlay backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-emerald-900/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Slide-out Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-lime-100 flex justify-between items-center bg-lime-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-emerald-600 h-5 w-5" />
            <h2 className="text-lg font-black text-emerald-900">Your Cart</h2>
          </div>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-lime-200 rounded-full text-emerald-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-emerald-500/60">
              <ShoppingBag className="h-16 w-16 mb-4 opacity-50" />
              <p className="font-bold">Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-white border border-lime-100 rounded-2xl shadow-sm">
                <img 
                  src={item.imageUrl || `https://picsum.photos/seed/${item.id}/200`} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-xl bg-lime-50"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-emerald-900 text-sm leading-tight">{item.name}</h3>
                    <p className="text-emerald-600 font-black text-sm mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-lime-50 rounded-lg p-1 border border-lime-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded text-emerald-700 shadow-sm transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-emerald-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded text-emerald-700 shadow-sm transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-orange-500 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-lime-100 bg-lime-50/30">
          <div className="flex justify-between items-center mb-4">
            <span className="text-emerald-700 font-bold">Subtotal</span>
            <span className="text-xl font-black text-emerald-900">${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            disabled={cartItems.length === 0}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-black text-lg transition-colors shadow-md"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
