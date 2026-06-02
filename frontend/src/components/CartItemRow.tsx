import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem } from '../store/cartStore';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

// Tách CartItem thành component riêng để CartDrawer gọn hơn và dễ maintain
export default function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  return (
    <div className="flex gap-4 p-3 bg-white border border-lime-100 rounded-2xl shadow-sm">
      <img
        src={item.imageUrl || `/fruits/default-fruit.jpg`}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-xl bg-lime-50 flex-shrink-0"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random&size=200`;
          target.onerror = null;
        }}
      />
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-bold text-emerald-900 text-sm leading-tight truncate">{item.name}</h3>
          <p className="text-emerald-600 font-black text-sm mt-1">${item.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center bg-lime-50 rounded-lg p-1 border border-lime-100">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:bg-white rounded text-emerald-700 shadow-sm transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-emerald-900">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:bg-white rounded text-emerald-700 shadow-sm transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-bold transition-colors"
            aria-label="Remove item"
          >
            <X className="h-3 w-3" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
