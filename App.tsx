
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
  const [activeCategory, setActiveCategory] = useState<Category>('TACOS_SANDWICHS');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const addToCart = (item: MenuItem, options?: SelectedOptions, quantity: number = 1) => {
    // Calcul précis des suppléments pour le prix unitaire
    const drinkPrice = item.category === 'ASSIETTES' ? 0 : 1.50;
    
    const menuPrice = options 
      ? (options.withFries ? 1.00 : 0) + (options.withDrink ? drinkPrice : 0)
      : 0;
      
    const extrasPrice = options 
      ? options.extras.reduce((acc, e) => acc + e.price, 0) + (options.gratinage?.price || 0)
      : 0;
    
    let typeAdjustment = 0;
    if (options) {
      // Ajustement pour les assiettes
      const formulaExtra = options.extras.find(e => e.name.includes('Formule:'));
      if (formulaExtra?.name.includes('Mixte')) typeAdjustment = 2.00;
      else if (formulaExtra?.name.includes('Gourmande')) typeAdjustment = 4.00;
      
      // Ajustement pour les variantes de petites faims
      const choiceExtra = options.extras.find(e => e.name.includes('Choix:'));
      if (choiceExtra) {
        if (choiceExtra.name.includes('10 pièces')) typeAdjustment = 4.00;
        else if (choiceExtra.name.includes('Taille L')) typeAdjustment = 1.00;
      }
    }

    const unitPrice = item.price + typeAdjustment + menuPrice + extrasPrice;

    setCart(prev => {
      // On compare l'item et TOUTES ses options pour voir s'il existe déjà exactement le même dans le panier
      const existingItemIndex = prev.findIndex(ci => 
        ci.menuItemId === item.id && 
        JSON.stringify(ci.options) === JSON.stringify(options)
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      const newCartItem: CartItem = {
        cartId: Math.random().toString(36).substr(2, 9),
        menuItemId: item.id,
        name: item.name,
        basePrice: item.price,
        totalPrice: unitPrice, 
        quantity: quantity,
        options: options
      };
      return [...prev, newCartItem];
    });

    setSelectedItem(null);
    if (!isCartOpen) {
      setTimeout(() => setIsCartOpen(true), 200);
    }
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const filteredItems = useMemo(() => {
    if (activeCategory === 'TACOS_SANDWICHS') {
      return MENU_ITEMS.filter(item => item.category === 'TACOS' || item.category === 'SANDWICHS');
    }
    if (activeCategory === 'ASSIETTES_SALADES_BOWLS') {
      return MENU_ITEMS.filter(item => item.category === 'ASSIETTES' || item.category === 'SALADES' || item.category === 'BOWLS');
    }
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-white selection:bg-brand-pink selection:text-white">
      <Navbar onCartClick={() => setIsCartOpen(true)} cartCount={cartCount} />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[550px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxhnyd5Nyx_mgf0aMNPGg7HOplowVBH7zG6TuxL_2DEm-NLhzbhVkzZqQ0cevXPquPgOVFiACbZN-RuHT6CbfZlcgT9R6KmZ_5GXIvxdPVQ6cgh1b6G4U_xqFr9JuKVMnF4ZpY=s1360-w1360-h1020-rw" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.3] scale-105" 
          alt="Les Délices de Bouloc" 
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="flex justify-center gap-3 mb-6">
            <span className="bg-brand-pink text-white text-[11px] font-black px-3 py-1.5 rounded-lg shadow-lg shadow-brand-pink/30 uppercase tracking-[0.2em]">HALAL</span>
            <span className="bg-white text-brand-pink text-[11px] font-black px-3 py-1.5 rounded-lg shadow-xl uppercase tracking-[0.2em] flex items-center gap-2">
              <Store className="w-3.5 h-3.5" /> CLICK & COLLECT
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl">
            Les Délices de <span className="text-brand-pink italic decoration-brand-pink underline-offset-8">Bouloc</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            L'excellence du fast-food à Bouloc. Tacos généreux, bowls healthy et burgers gourmands en <span className="text-brand-pink font-extrabold">retrait express</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-3 rounded-2xl text-white text-sm font-bold border border-white/10 hover:bg-white/10 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-green-400" /> Frites Maison
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-3 rounded-2xl text-white text-sm font-bold border border-white/10 hover:bg-white/10 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-green-400" /> Viande Fraîche
            </div>
            <div className="flex items-center gap-3 bg-[#25D366]/10 backdrop-blur-xl px-5 py-3 rounded-2xl text-white text-sm font-bold border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors">
              <MessageCircle className="w-5 h-5 text-[#25D366]" /> Commande WhatsApp
            </div>
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <div className="bg-gray-900 text-white py-4 px-4 text-center overflow-hidden border-b border-white/5">
        <div className="animate-marquee inline-block font-black text-xs tracking-[0.3em] uppercase opacity-80">
          📍 RUE JEAN JAURÈS, 31620 BOULOC • 🕒 OUVERT 7J/7 : 11H30-14H30 & 18H00-22H30 • 📞 05 32 53 97 60 • 🥡 SERVICE CLICK & COLLECT • HALAL CERTIFIÉ
        </div>
      </div>

      {/* Menu Categories Scroller */}
      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md overflow-x-auto">
        <div className="flex px-4 md:px-8 py-3.5 gap-2 md:gap-3 no-scrollbar max-w-7xl mx-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl font-black transition-all transform active:scale-95 border ${
                activeCategory === cat.id 
                  ? 'bg-brand-pink text-white border-brand-pink shadow-lg shadow-brand-pink/20' 
                  : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100 hover:text-gray-600'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-[11px] uppercase tracking-wider">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-1">
            <span className="text-brand-pink font-black text-[10px] uppercase tracking-[0.4em] block pl-1">Sélection du chef</span>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Nos <span className="text-brand-pink">{CATEGORIES.find(c => c.id === activeCategory)?.label}</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 text-gray-400 bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-100">
            <ShoppingBag className="w-4 h-4 text-brand-pink" />
            <span className="font-bold text-[10px] tracking-widest uppercase">{filteredItems.length} Variétés</span>
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
      <section className="bg-gray-50 py-24 md:py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-brand-pink font-black text-xs uppercase tracking-[0.5em] block pl-1">Contact</span>
                <h2 className="text-6xl font-black text-gray-900 leading-[0.9] tracking-tighter">Votre commande vous <span className="text-brand-pink">attend</span>.</h2>
                <p className="text-gray-400 text-xl font-medium pt-4">Commandez en ligne, sélectionnez votre heure et récupérez votre repas. Rapide et savoureux.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group flex items-start gap-6 p-8 bg-white rounded-[40px] shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:border-brand-pink/20">
                  <div className="w-16 h-16 bg-brand-pink/5 rounded-3xl flex items-center justify-center text-brand-pink transition-transform group-hover:scale-110">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Localisation</h4>
                    <p className="font-bold text-gray-900 text-lg leading-snug">Rue Jean Jaurès, 31620 Bouloc</p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-8 bg-white rounded-[40px] shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:border-brand-pink/20">
                  <div className="w-16 h-16 bg-brand-pink/5 rounded-3xl flex items-center justify-center text-brand-pink transition-transform group-hover:scale-110">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Téléphone</h4>
                    <a href="tel:0532539760" className="font-black text-gray-900 text-lg hover:text-brand-pink transition-colors">05 32 53 97 60</a>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-8 bg-white rounded-[40px] shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:border-brand-pink/20 sm:col-span-2">
                  <div className="w-16 h-16 bg-brand-pink/5 rounded-3xl flex items-center justify-center text-brand-pink transition-transform group-hover:scale-110">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">Horaires</h4>
                      <span className="px-3 py-1 bg-green-100 text-green-600 text-[9px] font-black rounded-full uppercase tracking-widest">Ouvert 7j/7</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-gray-900 text-lg">Midi : 11h30 — 14h30</p>
                      <p className="font-bold text-gray-900 text-lg">Soir : 18h00 — 22h30</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-6 bg-brand-pink/5 rounded-[60px] transform rotate-3 transition-transform group-hover:rotate-1"></div>
              <div className="relative rounded-[50px] overflow-hidden border-[12px] border-white shadow-2xl h-[600px] z-10 transition-transform group-hover:scale-[1.01]">
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
      <footer className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-brand-pink rounded-[24px] flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-brand-pink/30">D</div>
              <div>
                <span className="font-black text-3xl text-gray-900 block tracking-tighter">Les Délices de Bouloc</span>
                <span className="text-[10px] text-brand-pink font-black uppercase tracking-[0.5em] mt-1 block">Le goût à l'état pur</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
               <span className="px-6 py-3 bg-gray-900 text-white text-[10px] font-black rounded-2xl shadow-lg uppercase tracking-widest">HALAL CERTIFIÉ</span>
               <span className="px-6 py-3 bg-brand-pink text-white text-[10px] font-black rounded-2xl shadow-lg shadow-brand-pink/20 uppercase tracking-widest">CLICK & COLLECT</span>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-xs font-medium">© 2024 Les Délices de Bouloc. Rue Jean Jaurès, Bouloc.</p>
            <div className="flex gap-8 text-xs font-black text-gray-300 uppercase tracking-widest">
              <a href="#" className="hover:text-brand-pink transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-brand-pink transition-colors">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

      {selectedItem && (
        <CustomizationModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onAddToCart={(options, qty) => addToCart(selectedItem, options, qty)} 
        />
      )}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
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
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
