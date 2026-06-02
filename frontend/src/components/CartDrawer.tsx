import { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useCartStore, selectTotalPrice } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { CREATE_ORDER } from '../graphql/mutations';
import CartItemRow from './CartItemRow';
import AlertMessage from './AlertMessage';

export default function CartDrawer() {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const totalPrice = useCartStore(selectTotalPrice);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [createOrder, { loading }] = useMutation(CREATE_ORDER);
  const [checkoutMessage, setCheckoutMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCheckout = async () => {
    if (!user) {
      toggleCart();
      navigate('/login');
      return;
    }

    const productIds: string[] = [];
    cartItems.forEach(item => {
      for (let i = 0; i < item.quantity; i++) productIds.push(item.id);
    });

    try {
      setCheckoutMessage(null);
      await createOrder({ variables: { productIds } });
      clearCart();
      setCheckoutMessage({ type: 'success', text: '🎉 Order placed successfully!' });
      setTimeout(() => setCheckoutMessage(null), 3000);
    } catch (err: any) {
      setCheckoutMessage({ type: 'error', text: err.message || 'Failed to place order.' });
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
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
        {/* Header */}
        <div className="p-4 border-b border-lime-100 flex justify-between items-center bg-lime-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-emerald-600 h-5 w-5" />
            <h2 className="text-lg font-black text-emerald-900">Your Cart</h2>
            {cartItems.length > 0 && (
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-lime-200 rounded-full text-emerald-700 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-emerald-500/60">
              <ShoppingBag className="h-16 w-16 mb-4 opacity-50" />
              <p className="font-bold text-lg">Your cart is empty</p>
              <p className="text-sm mt-1 opacity-70">Add some fresh fruits!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-lime-100 bg-lime-50/30 space-y-3">
          {checkoutMessage && (
            <AlertMessage type={checkoutMessage.type} message={checkoutMessage.text} />
          )}

          <div className="flex justify-between items-center">
            <span className="text-emerald-700 font-bold">Subtotal</span>
            <span className="text-xl font-black text-emerald-900">${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || loading}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-black text-lg transition-all shadow-md flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              'Checkout'
            )}
          </button>
        </div>
      </div>
    </>
  );
}
