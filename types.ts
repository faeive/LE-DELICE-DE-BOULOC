
export type Category = 'TACOS' | 'BOWLS' | 'BURGERS' | 'SANDWICHS' | 'PANINIS' | 'ASSIETTES' | 'SALADES' | 'PETITES_FAIMS' | 'DESSERTS_BOISSONS';

export interface Extra {
  name: string;
  price: number;
  meatChoice?: string; // Pour le supplément viande
}

export interface MenuItem {
  id: string;
  category: Category;
  name: string;
  description?: string;
  price: number;
  image: string;
  maxMeats?: number;
  hasOptions?: boolean;
}

export interface SelectedOptions {
  meats: string[];
  sauces: string[];
  extras: Extra[];
  gratinage?: Extra;
}

export interface CartItem {
  cartId: string;
  menuItemId: string;
  name: string;
  basePrice: number;
  totalPrice: number;
  quantity: number;
  options?: SelectedOptions;
}

export const MEATS = [
  "Tenders", "Nuggets", "Kebab", "Steak haché", "Merguez", 
  "Poulet mariné", "Kefta", "Crispy vegan"
];

export const SAUCES = [
  { name: "Mayonnaise", heat: 0 },
  { name: "Ketchup", heat: 0 },
  { name: "Blanche", heat: 0 },
  { name: "Fromagère", heat: 0 },
  { name: "Barbecue", heat: 0 },
  { name: "Biggy", heat: 0 },
  { name: "Marocaine", heat: 1 },
  { name: "Andalouse", heat: 1 },
  { name: "Curry", heat: 1 },
  { name: "Algérienne", heat: 2 },
  { name: "Samouraï", heat: 2 },
  { name: "Chili-thaï", heat: 2 },
  { name: "Harissa", heat: 3 }
];

export const TACO_EXTRAS = [
  { name: "Œuf", price: 1.50 },
  { name: "Fromage", price: 1.50 },
  { name: "Viande supplémentaire", price: 2.00 },
  { name: "Steak", price: 2.00 },
  { name: "Galette de pomme de terre", price: 2.00 }
];

export const GRATINAGES = [
  { name: "Lardon", price: 2.00 },
  { name: "3 fromages", price: 2.00 },
  { name: "Chèvre miel", price: 2.00 },
  { name: "Pizza (mozza + sauce tomate)", price: 2.00 }
];
