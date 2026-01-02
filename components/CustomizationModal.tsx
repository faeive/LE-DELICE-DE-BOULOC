
import React, { useState, useMemo, useEffect } from 'react';
import { X, Flame, Plus, Minus, Check, ChevronRight, ArrowLeft } from 'lucide-react';
import { 
  MenuItem, MEATS, SAUCES, TACO_EXTRAS, GRATINAGES, SelectedOptions, Extra, SODA_BRANDS 
} from '../types';

interface CustomizationModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (options: SelectedOptions | undefined, quantity: number) => void;
}

const PLATE_TYPES = [
  { id: 'simple', name: 'Assiette Simple', meats: 1, priceAdd: 0, desc: '1 Viande au choix, frites, salade, pain, boisson incluse' },
  { id: 'mixte', name: 'Assiette Mixte', meats: 2, priceAdd: 2.00, desc: '2 Viandes au choix, frites, salade, pain, boisson incluse' },
  { id: 'gourmande', name: 'Assiette Gourmande', meats: 3, priceAdd: 4.00, desc: '3 Viandes au choix, frites, salade, pain, boisson incluse' }
];

const VARIANT_OPTIONS: Record<string, { id: string, name: string, priceAdd: number, desc: string }[]> = {
  'pf-nuggets': [
    { id: '6p', name: 'Portion 6 pièces', priceAdd: 0, desc: '6 délicieux nuggets de poulet' },
    { id: '10p', name: 'Portion 10 pièces', priceAdd: 4.00, desc: '10 délicieux nuggets de poulet' }
  ],
  'pf-bouchees': [
    { id: '5p', name: 'Portion 5 pièces', priceAdd: 0, desc: '5 bouchées de camembert fondantes' },
    { id: '10p', name: 'Portion 10 pièces', priceAdd: 4.00, desc: '10 bouchées de camembert fondantes' }
  ],
  'pf-frites': [
    { id: 'm', name: 'Taille M', priceAdd: 0, desc: 'Portion moyenne de frites maison' },
    { id: 'l', name: 'Taille L', priceAdd: 1.00, desc: 'Grande portion de frites maison' }
  ]
};

const CustomizationModal: React.FC<CustomizationModalProps> = ({ item, onClose, onAddToCart }) => {
  const isAssiette = item.category === 'ASSIETTES';
  const isSalade = item.category === 'SALADES';
  const hasVariants = !!VARIANT_OPTIONS[item.id];
  
  // États pour les étapes
  const [step, setStep] = useState<number>((isAssiette || hasVariants) ? 1 : 2);
  
  const [selectedPlateType, setSelectedPlateType] = useState(isAssiette ? PLATE_TYPES[0] : null);
  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? VARIANT_OPTIONS[item.id][0] : null);
  
  // États pour les options
  const [selectedMeats, setSelectedMeats] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [selectedGratinage, setSelectedGratinage] = useState<Extra | undefined>(undefined);
  const [extraMeats, setExtraMeats] = useState<string[]>([]);
  const [drinkChoice, setDrinkChoice] = useState<string | undefined>(undefined);
  const [withFries, setWithFries] = useState(false);
  const [withDrink, setWithDrink] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Pour les assiettes, la boisson est toujours "active" (incluse)
  useEffect(() => {
    if (isAssiette) {
      setWithDrink(true);
    }
  }, [isAssiette]);

  const maxMeats = useMemo(() => {
    if (isAssiette) return selectedPlateType?.meats || 1;
    return item.maxMeats || 0;
  }, [isAssiette, selectedPlateType, item.maxMeats]);

  const isTacos = item.category === 'TACOS';
  const isBowl = item.category === 'BOWLS';
  const isTacosOrBowl = isTacos || isBowl;
  const isBurger = item.category === 'BURGERS';
  const isPanini = item.category === 'PANINIS';
  const isSandwich = item.category === 'SANDWICHS';
  const isSoda = item.category === 'DESSERTS_BOISSONS' && item.name.toLowerCase().includes('soda');
  
  // Ces articles ne proposent PAS d'option menu (drink/fries)
  const noMenuOption = isAssiette || hasVariants || isSoda || item.category === 'DESSERTS_BOISSONS' || (item.category === 'PETITES_FAIMS' && !hasVariants);
  // Salades supportent maintenant le menu
  const supportsMenu = (isTacos || isBurger || isPanini || isSandwich || isBowl || isSalade) && !noMenuOption;
  
  const needsSauces = isTacosOrBowl || isBurger || isPanini || isSandwich || isAssiette;
  const hasCustomOptions = isTacosOrBowl || isBurger || isPanini || isSandwich || isAssiette || isSoda || isSalade || item.hasOptions;

  const typePriceAdd = isAssiette ? (selectedPlateType?.priceAdd || 0) : (hasVariants ? (selectedVariant?.priceAdd || 0) : 0);
  const drinkPrice = isAssiette ? 0 : 1.50;

  const unitPrice = item.price + 
    typePriceAdd +
    selectedExtras.reduce((acc, e) => acc + e.price, 0) + 
    (selectedGratinage?.price || 0) +
    (extraMeats.length * 2.00) +
    (withFries ? 1.00 : 0) +
    (withDrink ? drinkPrice : 0);

  const totalPrice = unitPrice * quantity;

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
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const toggleExtraMeat = (meat: string) => {
    if (extraMeats.includes(meat)) {
      setExtraMeats(extraMeats.filter(m => m !== meat));
    } else {
      setExtraMeats([...extraMeats, meat]);
    }
  };

  const canSubmit = (() => {
    if (isTacosOrBowl || isAssiette) {
      if (selectedMeats.length !== maxMeats) return false;
      if (selectedSauces.length === 0) return false;
    }
    if (isBurger || isPanini || isSandwich) {
       if (selectedSauces.length === 0) return false;
    }
    if (isSoda) return drinkChoice !== undefined;
    if (supportsMenu && withDrink) return drinkChoice !== undefined;
    if (isAssiette) return drinkChoice !== undefined; 
    return true;
  })();

  const handleFinalSubmit = () => {
    let finalOptions: SelectedOptions | undefined = undefined;
    
    if (hasCustomOptions) {
      const finalExtras = [
        ...selectedExtras,
        ...extraMeats.map(meat => ({ name: "Viande supplémentaire", price: 2.00, meatChoice: meat }))
      ];

      if (isAssiette && selectedPlateType) {
        finalExtras.unshift({ name: `Formule: ${selectedPlateType.name}`, price: 0 });
      }
      
      if (hasVariants && selectedVariant) {
        finalExtras.unshift({ name: `Choix: ${selectedVariant.name}`, price: 0 });
      }

      finalOptions = { 
        meats: selectedMeats, 
        sauces: selectedSauces, 
        extras: finalExtras, 
        gratinage: selectedGratinage,
        drinkChoice: withDrink ? drinkChoice : (isSoda ? drinkChoice : undefined),
        withFries,
        withDrink
      };
    }

    onAddToCart(finalOptions, quantity);
  };

  const currentTitle = isAssiette 
    ? (step === 1 ? "Choisir ma Formule" : selectedPlateType?.name) 
    : (hasVariants ? (step === 1 ? `Choisir ${item.name}` : selectedVariant?.name) : item.name);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] md:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100 shrink-0 bg-white z-10">
          <div className="flex items-center gap-3">
            {(isAssiette || hasVariants) && step === 2 && (
              <button 
                onClick={() => setStep(1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-brand-pink" />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">{currentTitle}</h2>
              <p className="text-brand-pink font-semibold">
                {(isAssiette || hasVariants) && step === 1 ? "À partir de " : ""}
                {item.price.toFixed(2)}€ 
                {step === 2 && typePriceAdd > 0 && (
                  <span className="text-gray-400 font-normal ml-1">(+ {typePriceAdd.toFixed(2)}€ inclus)</span>
                )}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-grow bg-gray-50/30">
          
          {/* ÉTAPE 1: Choix Type / Variante */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-brand-pink/5 p-4 rounded-2xl border border-brand-pink/10 mb-6 text-center">
                <p className="text-sm font-medium text-gray-600">
                  {isAssiette ? "Choisissez votre formule complète." : "Choisissez la taille ou la quantité souhaitée."}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {(isAssiette ? PLATE_TYPES : VARIANT_OPTIONS[item.id]).map(type => (
                  <button
                    key={type.id}
                    onClick={() => {
                      if (isAssiette) {
                        setSelectedPlateType(type as any);
                        setSelectedMeats([]);
                      } else {
                        setSelectedVariant(type as any);
                      }
                    }}
                    className={`p-5 rounded-3xl border-2 flex items-center justify-between transition-all group ${
                      (isAssiette ? selectedPlateType?.id === type.id : selectedVariant?.id === type.id)
                        ? 'border-brand-pink bg-brand-pink/5 shadow-lg shadow-brand-pink/5' 
                        : 'border-gray-100 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex flex-col items-start text-left">
                      <span className={`text-lg font-black ${(isAssiette ? selectedPlateType?.id === type.id : selectedVariant?.id === type.id) ? 'text-brand-pink' : 'text-gray-900'}`}>{type.name}</span>
                      <span className="text-sm text-gray-400 font-medium">{type.desc}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-black text-xl text-gray-900">{(item.price + type.priceAdd).toFixed(2)}€</span>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${(isAssiette ? selectedPlateType?.id === type.id : selectedVariant?.id === type.id) ? 'border-brand-pink bg-brand-pink' : 'border-gray-200 group-hover:border-gray-300'}`}>
                        {(isAssiette ? selectedPlateType?.id === type.id : selectedVariant?.id === type.id) ? <Check className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-gray-300" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ÉTAPE 2: Personnalisation */}
          {(step === 2) && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              
              {/* Menu Options */}
              {supportsMenu && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                  <h3 className="text-lg font-bold mb-4">{isSalade ? "Ajouter une boisson ?" : "Passer en menu ?"}</h3>
                  <div className={`grid ${isSalade ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                    {!isSalade && (
                      <button 
                        onClick={() => setWithFries(!withFries)}
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${withFries ? 'border-brand-pink bg-brand-pink/5' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                      >
                        <div className="flex flex-col items-start">
                          <span className={`font-bold ${withFries ? 'text-brand-pink' : 'text-gray-700'}`}>Frites</span>
                          <span className="text-xs text-gray-400">+1.00€</span>
                        </div>
                        {withFries && <Check className="w-5 h-5 text-brand-pink" />}
                      </button>
                    )}
                    <button 
                      onClick={() => setWithDrink(!withDrink)}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${withDrink ? 'border-brand-pink bg-brand-pink/5' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                    >
                      <div className="flex flex-col items-start">
                        <span className={`font-bold ${withDrink ? 'text-brand-pink' : 'text-gray-700'}`}>Boisson</span>
                        <span className="text-xs text-gray-400">+1.50€</span>
                      </div>
                      {withDrink && <Check className="w-5 h-5 text-brand-pink" />}
                    </button>
                  </div>

                  {withDrink && (
                    <div className="pt-4 border-t border-gray-100 animate-in fade-in duration-300">
                      <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3">Choix de la boisson</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {SODA_BRANDS.map(brand => (
                          <button
                            key={brand}
                            onClick={() => setDrinkChoice(brand)}
                            className={`p-2.5 text-xs rounded-xl border-2 text-center transition-all ${
                              drinkChoice === brand 
                                ? 'border-brand-pink bg-brand-pink/5 text-brand-pink font-bold' 
                                : 'border-gray-100 bg-gray-50'
                            }`}
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Boisson Incluse pour Assiette */}
              {isAssiette && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold">Choisissez votre boisson (Incluse)</h3>
                    <span className="text-[10px] bg-brand-pink/10 px-2 py-0.5 rounded text-brand-pink font-black uppercase">REQUIS</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {SODA_BRANDS.map(brand => (
                      <button
                        key={brand}
                        onClick={() => setDrinkChoice(brand)}
                        className={`p-2.5 text-xs rounded-xl border-2 text-center transition-all ${
                          drinkChoice === brand 
                                ? 'border-brand-pink bg-brand-pink/5 text-brand-pink font-bold' 
                                : 'border-gray-100 bg-gray-50'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isSoda && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Choisissez votre boisson</h3>
                    <span className="text-xs bg-brand-pink/10 px-2 py-1 rounded text-brand-pink uppercase tracking-wider font-bold">Requis</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SODA_BRANDS.map(brand => (
                      <button
                        key={brand}
                        onClick={() => setDrinkChoice(brand)}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          drinkChoice === brand 
                            ? 'border-brand-pink bg-brand-pink/5 text-brand-pink font-bold' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(isTacosOrBowl || isAssiette) && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Choisissez vos viandes ({selectedMeats.length}/{maxMeats})</h3>
                    <span className="text-xs bg-brand-pink/10 px-2 py-1 rounded text-brand-pink uppercase tracking-wider font-bold">Requis</span>
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
                            : 'border-gray-200 hover:border-gray-300 bg-white opacity-100 disabled:opacity-30'
                        }`}
                      >
                        {meat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {needsSauces && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Choisissez vos sauces (max 2)</h3>
                    <span className="text-xs bg-brand-pink/10 px-2 py-1 rounded text-brand-pink uppercase tracking-wider font-bold">Requis</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {SAUCES.map(sauce => (
                      <button
                        key={sauce.name}
                        onClick={() => toggleSauce(sauce.name)}
                        className={`p-2.5 rounded-xl border-2 text-sm text-left flex items-center justify-between transition-all ${
                          selectedSauces.includes(sauce.name) 
                            ? 'border-brand-pink bg-brand-pink/5 text-brand-pink font-bold' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
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

              {(isTacosOrBowl || isAssiette) && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-4">Viandes supplémentaires (+2.00€/u)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {MEATS.map(meat => (
                      <button
                        key={meat}
                        onClick={() => toggleExtraMeat(meat)}
                        className={`p-2 text-xs rounded-xl border-2 text-center transition-all ${
                          extraMeats.includes(meat) 
                            ? 'border-brand-pink bg-brand-pink/5 text-brand-pink font-bold' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {meat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(isTacosOrBowl || isBurger || isAssiette) && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-4">Suppléments gourmands</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(isBurger ? [{ name: "Steak", price: 2.00 }, { name: "Galette de pomme de terre", price: 2.00 }] : TACO_EXTRAS).map(extra => (
                      <button
                        key={extra.name}
                        onClick={() => toggleExtra(extra)}
                        className={`p-3 rounded-xl border-2 text-left flex justify-between items-center transition-all ${
                          selectedExtras.find(e => e.name === extra.name) 
                            ? 'border-brand-pink bg-brand-pink/5 text-brand-pink font-bold' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <span>{extra.name}</span>
                        <span className="text-sm font-medium">+{extra.price.toFixed(2)}€</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isTacos && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-4">Gratinage +2€ (optionnel)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {GRATINAGES.map(gratin => (
                      <button
                        key={gratin.name}
                        onClick={() => setSelectedGratinage(selectedGratinage?.name === gratin.name ? undefined : gratin)}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          selectedGratinage?.name === gratin.name 
                            ? 'border-brand-pink bg-brand-pink/5 text-brand-pink font-bold' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {gratin.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 shrink-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-10">
          {(isAssiette || hasVariants) && step === 1 ? (
            <button 
              onClick={() => setStep(2)}
              className="w-full py-5 bg-brand-pink text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-pink/20 hover:bg-brand-pink/90 transition-all flex items-center justify-center gap-2"
            >
              {isAssiette ? "PERSONNALISER MON ASSIETTE" : "VALIDER MON CHOIX"} <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-gray-700 text-lg">Quantité</span>
                <div className="flex items-center gap-5 bg-gray-100 px-5 py-2.5 rounded-2xl">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-gray-400 hover:text-brand-pink transition-all active:scale-90"><Minus className="w-5 h-5" /></button>
                  <span className="text-2xl font-black min-w-[1.5ch] text-center text-gray-900">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-gray-400 hover:text-brand-pink transition-all active:scale-90"><Plus className="w-5 h-5" /></button>
                </div>
              </div>

              <button 
                disabled={!canSubmit}
                onClick={handleFinalSubmit}
                className={`w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
                  canSubmit 
                    ? 'bg-brand-pink text-white hover:bg-brand-pink/90 shadow-lg shadow-brand-pink/20' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Ajouter au panier • {totalPrice.toFixed(2)}€
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
