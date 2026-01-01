
import React, { useState, useEffect } from 'react';
import { X, Flame, ChevronDown } from 'lucide-react';
import { 
  MenuItem, MEATS, SAUCES, TACO_EXTRAS, GRATINAGES, SelectedOptions, Extra 
} from '../types';

interface CustomizationModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (options: SelectedOptions) => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({ item, onClose, onAddToCart }) => {
  const [selectedMeats, setSelectedMeats] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [selectedGratinage, setSelectedGratinage] = useState<Extra | undefined>(undefined);
  const [extraMeatChoice, setExtraMeatChoice] = useState<string | undefined>(undefined);

  const maxMeats = item.maxMeats || 0;
  const isTacosOrBowl = item.category === 'TACOS' || item.category === 'BOWLS';
  const isBurger = item.category === 'BURGERS';

  const hasExtraMeat = selectedExtras.some(e => e.name === "Viande supplémentaire");

  const totalPrice = item.price + 
    selectedExtras.reduce((acc, e) => acc + e.price, 0) + 
    (selectedGratinage?.price || 0);

  const toggleMeat = (meat: string) => {
    if (selectedMeats.includes(meat)) {
      setSelectedMeats(selectedMeats.filter(m => m !== meat));
    } else if (selectedMeats.length < maxMeats) {
      setSelectedMeats([...selectedMeats, meat]);
    }
  };

  const toggleSauce = (sauce: string) => {
    if (selectedSauces.includes(sauce)) {
      setSelectedSauces(selectedSauces.filter(s => s !== sauce));
    } else if (selectedSauces.length < 2) { 
      setSelectedSauces([...selectedSauces, sauce]);
    }
  };

  const toggleExtra = (extra: Extra) => {
    if (selectedExtras.find(e => e.name === extra.name)) {
      setSelectedExtras(selectedExtras.filter(e => e.name !== extra.name));
      if (extra.name === "Viande supplémentaire") setExtraMeatChoice(undefined);
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const canSubmit = isTacosOrBowl 
    ? (selectedMeats.length === maxMeats && selectedSauces.length > 0 && (!hasExtraMeat || (hasExtraMeat && extraMeatChoice))) 
    : true;

  const handleFinalSubmit = () => {
    const finalExtras = selectedExtras.map(e => {
      if (e.name === "Viande supplémentaire") {
        return { ...e, meatChoice: extraMeatChoice };
      }
      return e;
    });
    onAddToCart({ 
      meats: selectedMeats, 
      sauces: selectedSauces, 
      extras: finalExtras, 
      gratinage: selectedGratinage 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] md:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100 shrink-0">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-extrabold text-gray-900">{item.name}</h2>
          <p className="text-brand-pink font-semibold">Base: {item.price.toFixed(2)}€</p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-grow">
          
          {/* Meat Selection (Tacos / Bowls) */}
          {isTacosOrBowl && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Choisissez vos viandes ({selectedMeats.length}/{maxMeats})</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase tracking-wider font-bold">Requis</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {MEATS.map(meat => (
                  <button
                    key={meat}
                    onClick={() => toggleMeat(meat)}
                    disabled={!selectedMeats.includes(meat) && selectedMeats.length >= maxMeats}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedMeats.includes(meat) 
                        ? 'border-brand-pink bg-brand-pink/5 text-brand-pink font-bold' 
                        : 'border-gray-100 hover:border-gray-200 opacity-100 disabled:opacity-50'
                    }`}
                  >
                    {meat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sauces Selection (Tacos / Bowls) */}
          {isTacosOrBowl && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Choisissez vos sauces (max 2)</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase tracking-wider font-bold">Requis</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {SAUCES.map(sauce => (
                  <button
                    key={sauce.name}
                    onClick={() => toggleSauce(sauce.name)}
                    className={`p-2.5 rounded-xl border-2 text-sm text-left flex items-center justify-between transition-all ${
                      selectedSauces.includes(sauce.name) 
                        ? 'border-brand-pink bg-brand-pink/5 text-brand-pink font-bold' 
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {sauce.name}
                    {sauce.heat > 0 && (
                      <div className="flex gap-0.5">
                        {[...Array(sauce.heat)].map((_, i) => (
                          <Flame key={i} className="w-3 h-3 fill-red-500 text-red-500" />
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extras (All) */}
          <div>
            <h3 className="text-lg font-bold mb-4">Suppléments (optionnel)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(isBurger ? [{ name: "Steak", price: 2.00 }, { name: "Galette de pomme de terre", price: 2.00 }] : TACO_EXTRAS).map(extra => (
                <button
                  key={extra.name}
                  onClick={() => toggleExtra(extra)}
                  className={`p-3 rounded-xl border-2 text-left flex justify-between items-center transition-all ${
                    selectedExtras.find(e => e.name === extra.name) 
                      ? 'border-brand-pink bg-brand-pink/5 text-brand-pink font-bold' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <span>{extra.name}</span>
                  <span className="text-sm font-medium">+{extra.price.toFixed(2)}€</span>
                </button>
              ))}
            </div>

            {/* Sub-choice for extra meat */}
            {hasExtraMeat && (
              <div className="mt-4 p-4 bg-gray-50 rounded-2xl animate-in fade-in slide-in-from-top-2">
                <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                   Quelle viande supplémentaire souhaitez-vous ? <ChevronDown className="w-4 h-4" />
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {MEATS.map(meat => (
                    <button
                      key={meat}
                      onClick={() => setExtraMeatChoice(meat)}
                      className={`p-2 text-xs rounded-lg border-2 transition-all ${
                        extraMeatChoice === meat 
                          ? 'border-brand-pink bg-white text-brand-pink font-bold' 
                          : 'border-white bg-white hover:border-gray-200 text-gray-600'
                      }`}
                    >
                      {meat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Gratinage (Tacos only) */}
          {item.category === 'TACOS' && (
            <div>
              <h3 className="text-lg font-bold mb-4">Gratinage gourmand +2€ (optionnel)</h3>
              <div className="grid grid-cols-2 gap-3">
                {GRATINAGES.map(gratin => (
                  <button
                    key={gratin.name}
                    onClick={() => setSelectedGratinage(selectedGratinage?.name === gratin.name ? undefined : gratin)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedGratinage?.name === gratin.name 
                        ? 'border-brand-pink bg-brand-pink/5 text-brand-pink font-bold' 
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {gratin.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 shrink-0 bg-white">
          <button 
            disabled={!canSubmit}
            onClick={handleFinalSubmit}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              canSubmit 
                ? 'bg-brand-pink text-white hover:bg-brand-pink/90' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Ajouter au panier • {totalPrice.toFixed(2)}€
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
