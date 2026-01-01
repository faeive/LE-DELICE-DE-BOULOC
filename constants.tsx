
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // TACOS
  { id: 't1', category: 'TACOS', name: 'Tacos 1 viande', price: 8.00, image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&q=80&w=800', maxMeats: 1, hasOptions: true },
  { id: 't2', category: 'TACOS', name: 'Tacos 2 viandes', price: 9.00, image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&q=80&w=800', maxMeats: 2, hasOptions: true },
  { id: 't3', category: 'TACOS', name: 'Tacos 3 viandes', price: 11.50, image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&q=80&w=800', maxMeats: 3, hasOptions: true },
  
  // BOWLS
  { id: 'b1', category: 'BOWLS', name: 'Bowls 1 viande', price: 8.00, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800', maxMeats: 1, hasOptions: true },
  { id: 'b2', category: 'BOWLS', name: 'Bowls 2 viandes', price: 9.00, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', maxMeats: 2, hasOptions: true },
  { id: 'b3', category: 'BOWLS', name: 'Bowls 3 viandes', price: 11.50, image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=800', maxMeats: 3, hasOptions: true },

  // BURGERS
  { id: 'bu1', category: 'BURGERS', name: 'Cheeseburger', description: 'Menu avec frites + boisson', price: 8.50, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&q=80&w=800', hasOptions: true },
  { id: 'bu2', category: 'BURGERS', name: 'Chicken Burger', description: 'Menu avec frites + boisson', price: 8.50, image: 'https://images.unsplash.com/photo-1606755962773-b324e0a13086?auto=format&fit=crop&q=80&w=800', hasOptions: true },
  { id: 'bu3', category: 'BURGERS', name: 'Double K', description: 'Menu avec frites + boisson', price: 9.50, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800', hasOptions: true },

  // SANDWICHS
  { id: 's1', category: 'SANDWICHS', name: 'Kebab', description: 'Menu avec frites + boisson', price: 9.50, image: 'https://images.unsplash.com/photo-1629978419393-ef75915ad406?auto=format&fit=crop&q=80&w=800' },
  { id: 's2', category: 'SANDWICHS', name: 'Le Bouldogain', description: 'Menu avec frites + boisson', price: 9.50, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800' },
  { id: 's3', category: 'SANDWICHS', name: 'Le Délice', description: 'Menu avec frites + boisson', price: 11.50, image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=800' },

  // PANINIS
  { id: 'p1', category: 'PANINIS', name: 'Panini Poulet', price: 8.50, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800' },
  { id: 'p2', category: 'PANINIS', name: 'Panini Kebab', price: 7.50, image: 'https://images.unsplash.com/photo-1475090169767-40ed8d18a67d?auto=format&fit=crop&q=80&w=800' },
  { id: 'p3', category: 'PANINIS', name: 'Panini 3 Fromages', price: 7.50, image: 'https://images.unsplash.com/photo-1539252554454-31d626304679?auto=format&fit=crop&q=80&w=800' },

  // ASSIETTES
  { id: 'a1', category: 'ASSIETTES', name: 'Assiette simple (1 viande)', price: 11.50, image: 'https://images.unsplash.com/photo-1603333388123-89916ce03cc1?auto=format&fit=crop&q=80&w=800' },
  { id: 'a2', category: 'ASSIETTES', name: 'Assiette mixte (2 viandes)', price: 13.50, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800' },
  { id: 'a3', category: 'ASSIETTES', name: 'Assiette gourmande (3 viandes)', price: 15.50, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800' },

  // SALADES
  { id: 'sa1', category: 'SALADES', name: 'Salade Chicken', price: 8.90, image: 'https://images.unsplash.com/photo-1546793665-c74683c3f38d?auto=format&fit=crop&q=80&w=800' },
  { id: 'sa2', category: 'SALADES', name: 'Salade Délice', price: 8.90, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800' },

  // PETITES FAIMS
  { id: 'pf1', category: 'PETITES_FAIMS', name: 'Nuggets (5 pièces)', price: 5.00, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800' },
  { id: 'pf2', category: 'PETITES_FAIMS', name: 'Nuggets (10 pièces)', price: 9.00, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800' },
  { id: 'pf3', category: 'PETITES_FAIMS', name: 'Wings (5 pièces)', price: 5.00, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800' },
  { id: 'pf4', category: 'PETITES_FAIMS', name: 'Wings (10 pièces)', price: 9.00, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800' },
  { id: 'pf5', category: 'PETITES_FAIMS', name: 'Tenders (4 pièces)', price: 7.00, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800' },
  { id: 'pf6', category: 'PETITES_FAIMS', name: 'Frites M', price: 1.50, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800' },
  { id: 'pf7', category: 'PETITES_FAIMS', name: 'Frites L', price: 2.50, image: 'https://images.unsplash.com/photo-1576101226942-da356ee1f758?auto=format&fit=crop&q=80&w=800' },
  { id: 'pf8', category: 'PETITES_FAIMS', name: 'Frites XL', price: 3.50, image: 'https://images.unsplash.com/photo-1630384066252-19e1ad955494?auto=format&fit=crop&q=80&w=800' },
  { id: 'pf9', category: 'PETITES_FAIMS', name: 'Frites cheddar oignons frits XL', price: 4.50, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=800' },

  // DESSERTS & BOISSONS
  { id: 'db1', category: 'DESSERTS_BOISSONS', name: 'Soda 33cl', price: 2.00, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800' },
  { id: 'db2', category: 'DESSERTS_BOISSONS', name: 'Soda 1,5L', price: 3.50, image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=800' },
  { id: 'db3', category: 'DESSERTS_BOISSONS', name: 'Eau', price: 1.50, image: 'https://images.unsplash.com/photo-1548919973-5dea58593ad3?auto=format&fit=crop&q=80&w=800' },
  { id: 'db4', category: 'DESSERTS_BOISSONS', name: 'Red Bull', price: 2.50, image: 'https://images.unsplash.com/photo-1622543953495-473ee46a0574?auto=format&fit=crop&q=80&w=800' },
  { id: 'db5', category: 'DESSERTS_BOISSONS', name: 'Capri-Sun', price: 1.00, image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800' },
  { id: 'db6', category: 'DESSERTS_BOISSONS', name: 'Café', price: 1.50, image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=800' },
  { id: 'db7', category: 'DESSERTS_BOISSONS', name: 'Tiramisu', price: 2.50, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800' },
  { id: 'db8', category: 'DESSERTS_BOISSONS', name: 'Tarte aux daims', price: 2.50, image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800' },
  { id: 'db9', category: 'DESSERTS_BOISSONS', name: 'Kinder Bueno', price: 1.50, image: 'https://images.unsplash.com/photo-1623934199716-bc044bbbd3a1?auto=format&fit=crop&q=80&w=800' },
  { id: 'db10', category: 'DESSERTS_BOISSONS', name: 'Pâtisserie orientale', price: 1.90, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800' },
];

export const CATEGORIES = [
  { id: 'TACOS', label: 'Tacos', icon: '🌮' },
  { id: 'BOWLS', label: 'Bowls', icon: '🥗' },
  { id: 'BURGERS', label: 'Burgers', icon: '🍔' },
  { id: 'SANDWICHS', label: 'Sandwichs', icon: '🥪' },
  { id: 'PANINIS', label: 'Paninis', icon: '🫓' },
  { id: 'ASSIETTES', label: 'Assiettes', icon: '🍽️' },
  { id: 'SALADES', label: 'Salades', icon: '🥗' },
  { id: 'PETITES_FAIMS', label: 'Petites Faims', icon: '🍟' },
  { id: 'DESSERTS_BOISSONS', label: 'Desserts & Boissons', icon: '🍰' },
];
