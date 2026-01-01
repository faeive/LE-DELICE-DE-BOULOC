
import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartCount }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center text-white font-bold text-xl">D</div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">Les Délices de Bouloc</h1>
          <p className="text-xs text-brand-pink font-medium">Fast-Food • Halal • Frites Maison</p>
        </div>
      </div>
      
      <button 
        onClick={onCartClick}
        className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
      >
        <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-brand-pink" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
