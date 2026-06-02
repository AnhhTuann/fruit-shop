import { ShoppingCart, User, Menu, LogOut } from 'lucide-react';
import { useCartStore, selectTotalItems } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

export default function Header() {
  const toggleCart = useCartStore(state => state.toggleCart);
  const totalItems = useCartStore(selectTotalItems);
  const { user, toggleLoginModal, logout } = useAuthStore();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-lime-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-xl filter drop-shadow-sm text-white">🍋</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-emerald-800">
              Fruit<span className="text-orange-500">Shop</span>
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Shop', 'Blog', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className={`font-bold text-sm uppercase tracking-widest transition-colors ${item === 'Home' ? 'text-orange-500' : 'text-emerald-700 hover:text-orange-400'}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-5">
            {user ? (
              <div className="flex items-center gap-3 relative group">
                <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-lime-100 rounded-full transition-colors">
                  <User className="h-6 w-6 text-emerald-700" />
                  <span className="hidden sm:block text-sm font-bold text-emerald-800">{user.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors group-hover:block sm:hidden absolute top-full mt-2 right-0 bg-white border border-red-100 shadow-md sm:relative sm:top-auto sm:mt-0 sm:bg-transparent sm:border-none sm:shadow-none sm:group-hover:block" 
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={toggleLoginModal}
                className="p-2 hover:bg-lime-100 rounded-full text-emerald-700 transition-colors" 
                aria-label="Login"
              >
                <User className="h-6 w-6" />
              </button>
            )}
            <button 
              onClick={toggleCart}
              className="relative p-2 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-colors" 
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-lime-100 rounded-full text-emerald-700 transition-colors">
               <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
