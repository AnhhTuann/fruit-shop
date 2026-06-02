import { ShoppingCart, User, Menu } from 'lucide-react';

export default function Header() {
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
            <button className="p-2 hover:bg-lime-100 rounded-full text-emerald-700 transition-colors" aria-label="User Profile">
              <User className="h-6 w-6" />
            </button>
            <button className="relative p-2 bg-emerald-100 text-emerald-600 rounded-full transition-colors" aria-label="Shopping Cart">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                3
              </span>
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
