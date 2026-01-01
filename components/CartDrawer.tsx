
import React from 'react';
import { X, Trash2, ShoppingBag, Store, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (cartId: string) => void;
  onClear: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove, onClear }) => {
  const total = cart.reduce((acc, item) => acc + (item.totalPrice * item.quantity), 0);

  const generateWhatsAppMessage = () => {
    let message = "Bonjour Les Délices de Bouloc, je souhaite passer une commande en *Click & Collect* :\n\n";
    
    cart.forEach(item => {
      message += `*${item.quantity}x ${item.name}* (${item.totalPrice.toFixed(2)}€)\n`;
      if (item.options) {
        if (item.options.meats.length > 0) message += `_Viandes:_ ${item.options.meats.join(', ')}\n`;
        if (item.options.sauces.length > 0) message += `_Sauces:_ ${item.options.sauces.join(', ')}\n`;
        if (item.options.extras.length > 0) {
          message += `_Suppléments:_ ${item.options.extras.map(e => e.meatChoice ? `${e.name} (${e.meatChoice})` : e.name).join(', ')}\n`;
        }
        if (item.options.gratinage) message += `_Gratinage:_ ${item.options.gratinage.name}\n`;
      }
      message += "\n";
    });
    
    message += `*TOTAL : ${total.toFixed(2)}€*\n\n`;
    message += "_Merci de me confirmer la réception de ma commande !_";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/33532539760?text=${encodedMessage}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-brand-pink" />
            <h2 className="text-2xl font-extrabold">Votre Panier</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-pink-50 px-6 py-3 flex items-center gap-3 text-brand-pink border-b border-pink-100">
          <Store className="w-5 h-5 shrink-0" />
          <p className="text-xs font-bold uppercase tracking-tight">Retrait uniquement en Click & Collect</p>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-500">Votre panier est vide</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex gap-4 pb-6 border-b border-gray-50">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="font-bold text-brand-pink">{item.totalPrice.toFixed(2)}€</p>
                  </div>
                  
                  {item.options && (
                    <div className="space-y-1">
                      {item.options.meats.length > 0 && (
                        <p className="text-xs text-gray-500"><span className="font-semibold">Viandes:</span> {item.options.meats.join(', ')}</p>
                      )}
                      {item.options.sauces.length > 0 && (
                        <p className="text-xs text-gray-500"><span className="font-semibold">Sauces:</span> {item.options.sauces.join(', ')}</p>
                      )}
                      {item.options.extras.length > 0 && (
                        <p className="text-xs text-gray-500">
                          <span className="font-semibold">Suppléments:</span> {item.options.extras.map(e => `${e.name}${e.meatChoice ? ` (${e.meatChoice})` : ''} (+${e.price}€)`).join(', ')}
                        </p>
                      )}
                      {item.options.gratinage && (
                        <p className="text-xs text-gray-500"><span className="font-semibold">Gratinage:</span> {item.options.gratinage.name} (+{item.options.gratinage.price}€)</p>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-medium px-2 py-0.5 bg-gray-100 rounded text-gray-600">Qté: {item.quantity}</span>
                    <button 
                      onClick={() => onRemove(item.cartId)}
                      className="text-red-500 hover:text-red-600 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Total Commande</span>
              <span className="text-2xl font-extrabold text-gray-900">{total.toFixed(2)}€</span>
            </div>
            <div className="space-y-3">
              <button 
                onClick={generateWhatsAppMessage}
                className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-lg hover:bg-[#20ba59] transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Commander sur WhatsApp
              </button>
              <button 
                onClick={onClear}
                className="w-full py-3 text-gray-400 text-sm font-medium hover:text-red-500 transition-colors"
              >
                Vider le panier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
