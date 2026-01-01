
import React, { useState, useCallback, useMemo } from 'react';
import { 
  MenuItem, 
  CartItem, 
  SelectedOptions, 
  Category 
} from './types';
import { MENU_ITEMS, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import MenuItemCard from './components/MenuItemCard';
import CustomizationModal from './components/CustomizationModal';
import CartDrawer from './components/CartDrawer';
import { MapPin, Phone, Clock, ShoppingBag, CheckCircle2, MessageCircle, Store } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('TACOS');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const handleItemClick = (item: MenuItem) => {
    if (item.hasOptions) {
      setSelectedItem(item);
    } else {
      addToCart(item);
    }
  };

  const addToCart = (item: MenuItem, options?: SelectedOptions) => {
    const extraPrice = options 
      ? options.extras.reduce((acc, e) => acc + e.price, 0) + (options.gratinage?.price || 0)
      : 0;
    
    const totalPrice = item.price + extraPrice;

    const newCartItem: CartItem = {
      cartId: Math.random().toString(36).substr(2, 9),
      menuItemId: item.id,
      name: item.name,
      basePrice: item.price,
      totalPrice: totalPrice,
      quantity: 1,
      options: options
    };

    setCart(prev => [...prev, newCartItem]);
    setSelectedItem(null);
    if (!isCartOpen) {
      setTimeout(() => setIsCartOpen(true), 200);
    }
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    if (window.confirm('Voulez-vous vraiment vider votre panier ?')) {
      setCart([]);
    }
  };

  const filteredItems = useMemo(() => 
    MENU_ITEMS.filter(item => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-white">
      <Navbar onCartClick={() => setIsCartOpen(true)} cartCount={cartCount} />

      {/* Hero Section */}
      <section className="relative h-[350px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1600" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" 
          alt="Les Délices de Bouloc" 
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="flex justify-center gap-2 mb-4">
            <span className="bg-brand-pink text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">HALAL</span>
            <span className="bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
              <Store className="w-3 h-3" /> CLICK & COLLECT
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
            Les Délices de <span className="text-brand-pink italic">Bouloc</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
            Tacos, Bowls & Burgers faits avec amour. 
            Découvrez nos spécialités en <span className="text-brand-pink font-bold">retrait magasin</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-white text-sm border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-brand-pink" /> Frites Maison
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-white text-sm border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-brand-pink" /> Viande Fraîche
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-white text-sm border border-white/20">
              <MessageCircle className="w-4 h-4 text-[#25D366]" /> Commande WhatsApp
            </div>
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <div className="bg-black text-white py-3 px-4 text-center overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block font-bold text-sm tracking-wide">
          📍 RUE JEAN JAURÈS, 31620 BOULOC • 🕒 OUVERT 7J/7 MIDI ET SOIR • 📞 05 32 53 97 60 • 🥡 SERVICE CLICK & COLLECT UNIQUEMENT
        </div>
      </div>

      {/* Menu Categories Scroller */}
      <div className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 overflow-x-auto">
        <div className="flex px-4 md:px-8 py-4 gap-2 md:gap-4 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category)}
              className={`flex items-center gap-2 whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all transform active:scale-95 ${
                activeCategory === cat.id 
                  ? 'bg-brand-pink text-white shadow-xl shadow-brand-pink/20' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-brand-pink font-bold text-sm uppercase tracking-widest mb-1 block">La Carte</span>
            <h2 className="text-4xl font-black text-gray-900">
              {CATEGORIES.find(c => c.id === activeCategory)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-gray-400 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium">{filteredItems.length} choix savoureux</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredItems.map(item => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              onClick={() => handleItemClick(item)} 
            />
          ))}
        </div>
      </main>

      {/* Restaurant Info & Map */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div>
                <h2 className="text-5xl font-black text-gray-900 mb-6">Venez nous <span className="text-brand-pink">voir</span></h2>
                <p className="text-gray-500 text-lg">Retirez votre commande directement au comptoir. Notre équipe vous accueille avec le sourire !</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-5 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-14 h-14 bg-brand-pink/10 rounded-2xl flex items-center justify-center text-brand-pink">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-1">Notre Adresse</h4>
                    <p className="text-gray-500">Rue Jean Jaurès, 31620 Bouloc, France</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-14 h-14 bg-brand-pink/10 rounded-2xl flex items-center justify-center text-brand-pink">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-1">Commande Rapide</h4>
                    <a href="tel:0532539760" className="text-gray-500 hover:text-brand-pink transition-colors text-lg">05 32 53 97 60</a>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-14 h-14 bg-brand-pink/10 rounded-2xl flex items-center justify-center text-brand-pink">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-1">On est ouvert</h4>
                    <p className="text-gray-500">Lundi - Dimanche : Midi & Soir</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-lg uppercase">Prêt à vous servir</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-brand-pink/5 rounded-[40px] transform rotate-2"></div>
              <div className="relative rounded-[32px] overflow-hidden border-8 border-white shadow-2xl h-[500px]">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://maps.google.com/maps?q=Les%20D%C3%A9lices%20de%20Bouloc,%20Rue%20Jean%20Jaur%C3%A8s,%2031620%20Bouloc&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-pink rounded-full flex items-center justify-center text-white font-black text-2xl">D</div>
              <div>
                <span className="font-black text-2xl text-gray-900 block">Les Délices de Bouloc</span>
                <span className="text-xs text-brand-pink font-bold uppercase tracking-widest">Le goût authentique</span>
              </div>
            </div>
            <div className="flex gap-4">
               <span className="px-4 py-2 bg-gray-50 text-gray-400 text-xs font-bold rounded-xl border border-gray-100">HALAL CERTIFIÉ</span>
               <span className="px-4 py-2 bg-gray-50 text-gray-400 text-xs font-bold rounded-xl border border-gray-100">CLICK & COLLECT</span>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-50 text-center">
            <p className="text-gray-400 text-sm">© 2024 Les Délices de Bouloc. Rue Jean Jaurès, Bouloc. Site de commande en ligne.</p>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {selectedItem && (
        <CustomizationModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onAddToCart={(options) => addToCart(selectedItem, options)} 
        />
      )}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemove={removeFromCart}
        onClear={clearCart}
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
