import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useCartStore, selectTotalPrice } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { CREATE_ORDER } from '../graphql/mutations';

export default function CartDrawer() {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const totalPrice = useCartStore(selectTotalPrice);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const [createOrder, { loading }] = useMutation(CREATE_ORDER);
  const [checkoutMessage, setCheckoutMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleCheckout = async () => {
    if (!user) {
      toggleCart();
      navigate('/login');
      return;
    }

    // Since our backend takes an array of IDs, we expand the cart items based on their quantity
    // E.g., if Navel Orange has quantity 2, we pass its ID twice.
    const productIds: string[] = [];
    cartItems.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        productIds.push(item.id);
      }
    });

    try {
      setCheckoutMessage(null);
      await createOrder({ variables: { productIds } });
      clearCart();
      setCheckoutMessage({ type: 'success', text: 'Order placed successfully!' });
      
      // Auto clear message after a few seconds
      setTimeout(() => {
        setCheckoutMessage(null);
      }, 3000);
    } catch (err: any) {
      console.error('Checkout failed:', err);
      setCheckoutMessage({ type: 'error', text: err.message || 'Failed to place order.' });
    }
  };

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
          {checkoutMessage && (
            <div className={`mb-4 p-3 rounded-xl text-sm font-bold text-center ${
              checkoutMessage.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-600'
            }`}>
              {checkoutMessage.text}
            </div>
          )}
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-emerald-700 font-bold">Subtotal</span>
            <span className="text-xl font-black text-emerald-900">${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || loading}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-black text-lg transition-colors shadow-md flex justify-center items-center"
          >
            {loading ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      </div>
    </>
  );
}
