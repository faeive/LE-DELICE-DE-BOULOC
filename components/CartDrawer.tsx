
import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, Store, MessageCircle, Plus, Minus, Clock, User, ChevronLeft, ReceiptText } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (cartId: string) => void;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onClear: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  onRemove, 
  onUpdateQuantity,
  onClear 
}) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [pickupTime, setPickupTime] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  
  const total = cart.reduce((acc, item) => acc + (item.totalPrice * item.quantity), 0);

  // Reset step to 'cart' when opening the drawer
  useEffect(() => {
    if (isOpen) {
      setStep('cart');
    }
  }, [isOpen]);

  const generateTimeSlots = () => {
    const slots = [];
    // Midi
    for (let h = 11; h <= 14; h++) {
      for (let m = 0; m < 60; m += 15) {
        if (h === 11 && m < 30) continue;
        if (h === 14 && m > 30) continue;
        slots.push(`${h}h${m === 0 ? '00' : m}`);
      }
    }
    // Soir
    for (let h = 18; h <= 22; h++) {
      for (let m = 0; m < 60; m += 15) {
        if (h === 22 && m > 30) continue;
        slots.push(`${h}h${m === 0 ? '00' : m}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const generateWhatsAppMessage = () => {
    if (!pickupTime || !userName.trim()) return;

    let message = `Bonjour Les Délices de Bouloc, c'est *${userName.trim()}*.\n`;
    message += "Je souhaite passer une commande en *Click & Collect* :\n\n";
    
    message += `⏰ *HEURE DE RETRAIT SOUHAITÉE : ${pickupTime}*\n\n`;
    message += "--- DÉTAIL DE LA COMMANDE ---\n";
    
    cart.forEach(item => {
      message += `*${item.quantity}x ${item.name}* — ${(item.totalPrice * item.quantity).toFixed(2)}€\n`;
      if (item.options) {
        if (item.options.withFries || item.options.withDrink) {
          const menuParts = [];
          if (item.options.withFries) menuParts.push("Accompagnement Frites");
          if (item.options.withDrink) menuParts.push(`Boisson: ${item.options.drinkChoice}`);
          message += `_Formule:_ ${menuParts.join(' + ')}\n`;
        } else if (item.options.drinkChoice) {
          message += `_Boisson:_ ${item.options.drinkChoice}\n`;
        }

        if (item.options.meats.length > 0) message += `_Viandes:_ ${item.options.meats.join(', ')}\n`;
        if (item.options.sauces.length > 0) message += `_Sauces:_ ${item.options.sauces.join(', ')}\n`;
        if (item.options.extras.length > 0) {
          message += `_Suppléments:_ ${item.options.extras.map(e => e.meatChoice ? `${e.name} (${e.meatChoice})` : e.name).join(', ')}\n`;
        }
        if (item.options.gratinage) message += `_Gratinage:_ ${item.options.gratinage.name}\n`;
      }
      message += "\n";
    });
    
    message += `*TOTAL À PAYER : ${total.toFixed(2)}€*\n\n`;
    message += "_Merci de me confirmer la validation de ma commande !_";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/33532539760?text=${encodedMessage}`, '_blank');
  };

  const canSubmit = pickupTime && userName.trim().length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-3">
            {step === 'checkout' ? (
              <button 
                onClick={() => setStep('cart')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-1"
              >
                <ChevronLeft className="w-6 h-6 text-brand-pink" />
              </button>
            ) : (
              <div className="p-2 bg-brand-pink/10 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-brand-pink" />
              </div>
            )}
            <h2 className="text-2xl font-black text-gray-900">
              {step === 'cart' ? 'Mon Panier' : 'Finaliser'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="bg-pink-50 px-6 py-4 flex items-center gap-4 border-b border-pink-100">
          <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-white shrink-0">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-black text-brand-pink uppercase tracking-widest leading-none mb-1">Service Boutique</p>
            <p className="text-sm font-bold text-gray-800">Retrait Click & Collect uniquement</p>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50/20">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center animate-pulse">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 mb-1">Votre panier est vide</p>
                <p className="text-gray-400 max-w-[200px] mx-auto">Parcourez notre carte pour ajouter vos délices !</p>
              </div>
            </div>
          ) : step === 'cart' ? (
            /* ÉTAPE 1 : PANIER */
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {cart.map((item) => (
                <div key={item.cartId} className="flex flex-col bg-white p-5 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-grow">
                      <h4 className="font-extrabold text-gray-900 leading-tight mb-1">{item.name}</h4>
                      {item.options && (
                        <div className="space-y-1 mt-2 pr-4">
                          {(item.options.withFries || item.options.withDrink) && (
                            <div className="mb-2 p-2 bg-brand-pink/5 rounded-lg border border-brand-pink/10">
                              <p className="text-[9px] font-black uppercase tracking-widest text-brand-pink mb-1">Formule Menu</p>
                              {item.options.withFries && <p className="text-[10px] text-gray-700 font-bold">• Frites Incluses</p>}
                              {item.options.withDrink && <p className="text-[10px] text-gray-700 font-bold">• Boisson: {item.options.drinkChoice}</p>}
                            </div>
                          )}
                          {!item.options.withDrink && item.options.drinkChoice && (
                            <p className="text-[10px] text-brand-pink font-bold"><span className="text-gray-400 font-black mr-1 uppercase">Boisson:</span>{item.options.drinkChoice}</p>
                          )}
                          {item.options.meats.length > 0 && (
                            <p className="text-[10px] text-gray-600 font-medium"><span className="text-gray-400 font-black mr-1 uppercase">Viandes:</span>{item.options.meats.join(', ')}</p>
                          )}
                          {item.options.sauces.length > 0 && (
                            <p className="text-[10px] text-gray-600 font-medium"><span className="text-gray-400 font-black mr-1 uppercase">Sauces:</span>{item.options.sauces.join(', ')}</p>
                          )}
                          {item.options.extras.length > 0 && (
                            <p className="text-[10px] text-brand-pink font-bold"><span className="text-gray-400 font-black mr-1 uppercase">Suppléments:</span>{item.options.extras.map(e => e.meatChoice ? `${e.name} (${e.meatChoice})` : e.name).join(', ')}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="font-black text-brand-pink text-lg shrink-0">{(item.totalPrice * item.quantity).toFixed(2)}€</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-2xl">
                      <button onClick={() => onUpdateQuantity(item.cartId, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-400 hover:text-brand-pink transition-all active:scale-90"><Minus className="w-4 h-4" /></button>
                      <span className="font-black text-gray-900 w-6 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.cartId, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-400 hover:text-brand-pink transition-all active:scale-90"><Plus className="w-4 h-4" /></button>
                    </div>
                    <button onClick={() => onRemove(item.cartId)} className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-red-500 transition-colors uppercase tracking-widest px-2"><Trash2 className="w-4 h-4" /> Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ÉTAPE 2 : RÉSUMÉ & INFOS */
            <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
              {/* Résumé de commande */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <ReceiptText className="w-5 h-5 text-brand-pink" />
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-900">Résumé des articles</h3>
                </div>
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.cartId} className="flex justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                      <span className="text-gray-600 font-medium">
                        <span className="font-black text-brand-pink mr-1">{item.quantity}x</span> {item.name}
                      </span>
                      <span className="font-bold text-gray-900">{(item.totalPrice * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                  <div className="pt-3 flex justify-between items-center border-t-2 border-dashed border-gray-100">
                    <span className="font-black text-gray-900 uppercase text-xs tracking-widest">Sous-total</span>
                    <span className="font-black text-brand-pink text-xl">{total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              {/* Formulaire Informations Client */}
              <div className="space-y-3 bg-white p-6 rounded-3xl shadow-sm border-2 border-brand-pink/30">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-5 h-5 text-brand-pink" />
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-900">Vos Coordonnées</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Nom complet</label>
                    <input 
                      type="text"
                      placeholder="Ex: Jean Dupont"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-brand-pink/10 focus:border-brand-pink transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Heure de retrait souhaitée</label>
                    <div className="relative">
                      <select 
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-brand-pink/10 focus:border-brand-pink transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Choisir un créneau</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Clock className="w-5 h-5 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {(!pickupTime || !userName.trim()) && (
                  <div className="mt-4 p-3 bg-brand-pink/5 rounded-xl border border-brand-pink/10">
                    <p className="text-[10px] text-brand-pink font-black uppercase tracking-tight leading-tight">
                      ℹ️ Veuillez renseigner votre nom et choisir une heure pour activer la commande sur WhatsApp.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-10">
            {step === 'cart' ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total panier</span>
                  <span className="text-3xl font-black text-gray-900">{total.toFixed(2)}€</span>
                </div>
                <button 
                  onClick={() => setStep('checkout')}
                  className="w-full py-5 bg-brand-pink text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-pink/20 flex items-center justify-center gap-3 transform active:scale-[0.98] hover:bg-brand-pink/90"
                >
                  PASSER À LA COMMANDE
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total final</span>
                  <span className="text-3xl font-black text-brand-pink">{total.toFixed(2)}€</span>
                </div>
                <button 
                  disabled={!canSubmit}
                  onClick={generateWhatsAppMessage}
                  className={`w-full py-5 text-white rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 transform active:scale-[0.98] ${
                    canSubmit ? 'bg-[#25D366] hover:bg-[#20ba59] shadow-green-500/20' : 'bg-gray-300 cursor-not-allowed opacity-60'
                  }`}
                >
                  <MessageCircle className="w-7 h-7" />
                  {canSubmit ? 'CONFIRMER SUR WHATSAPP' : 'INFOS MANQUANTES'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
