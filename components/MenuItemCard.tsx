
import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-bold text-brand-pink">
          {item.price.toFixed(2)}€
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-1 group-hover:text-brand-pink transition-colors">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-gray-500 mb-4 flex-grow">{item.description}</p>
        )}
        <div className="mt-auto flex justify-end">
          <div className="bg-brand-pink text-white p-2 rounded-xl group-hover:bg-brand-pink/90 transition-colors">
            <Plus className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
