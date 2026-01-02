
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // TACOS
  { 
    id: 't1', 
    category: 'TACOS', 
    name: 'Tacos 1 Viande', 
    description: 'Sauce fromagère maison, frites et 1 viande au choix.', 
    price: 8.00, 
    image: 'https://www.elecodevaldepenas.es/images/showid2/6879474?w=1200&zc=4', 
    maxMeats: 1, 
    hasOptions: true 
  },

  // BOWLS
  { 
    id: 'b1', 
    category: 'BOWLS', 
    name: 'Le Bowl Tacos', 
    description: 'Tous les ingrédients du Tacos servis en Bowl : Frites, Sauce fromagère maison et vos viandes au choix.', 
    price: 8.50, 
    image: 'https://ulyssekebab33.com/wp-content/uploads/2024/12/bowl-crousti.jpg', 
    maxMeats: 1, 
    hasOptions: true 
  },

  // BURGERS
  { 
    id: 'bu1', 
    category: 'BURGERS', 
    name: 'Cheese Burger', 
    description: 'Steak, cheddar, salade, tomates, oignons, sauce burger.',
    price: 6.50, 
    image: 'https://media.istockphoto.com/id/1319396810/fr/photo/d%C3%A9licieux-hamburger-grill%C3%A9-disolement-sur-le-fond-blanc-hamburger-de-restauration-rapide.jpg?s=612x612&w=0&k=20&c=sMnfAU5AZ8DkSVSwfkoTC5SX2in-DkOKJVlV8TMqxTo=', 
    hasOptions: true 
  },
  { 
    id: 'bu2', 
    category: 'BURGERS', 
    name: 'Chicken Burger', 
    description: 'Poulet pané croustillant, cheddar, salade, sauce mayo.',
    price: 6.50, 
    image: 'https://www.shutterstock.com/image-photo/crispy-chicken-burger-isolation-on-600nw-2626642199.jpg', 
    hasOptions: true 
  },
  { 
    id: 'bu3', 
    category: 'BURGERS', 
    name: 'Le Double K', 
    description: 'Le burger signature : double steak, double cheddar, œuf et bacon.', 
    price: 8.50, 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zNekkOOduP2mrGgS-DpNNErTcd9xCJ6SQ&s', 
    hasOptions: true 
  },

  // PANINIS
  { id: 'p1', category: 'PANINIS', name: 'Panini Poulet', price: 6.50, image: 'https://allopizza88.fr/wp-content/uploads/2019/03/panini-poulet.jpg', hasOptions: true },
  { id: 'p2', category: 'PANINIS', name: 'Panini Kebab', price: 6.50, image: 'https://lamamakebab.fr/uploads/products_images/product_1756463598_68b181ee3f585.png', hasOptions: true },
  { id: 'p3', category: 'PANINIS', name: 'Panini 3 Fromages', price: 5.50, image: 'https://lamamakebab.fr/uploads/products_images/product_1756463598_68b181ee24a5e.webp', hasOptions: true },

  // SANDWICHS
  { 
    id: 's1', 
    category: 'SANDWICHS', 
    name: 'Sandwich Kebab', 
    description: 'Pain pita ou galette, viande kebab grillée à la broche, salade, tomate, oignons.', 
    price: 7.50, 
    image: 'https://www.gourmetkebab.es/wp-content/uploads/2023/12/ingredientes-del-kebab.jpg',
    hasOptions: true
  },
  { 
    id: 's2', 
    category: 'SANDWICHS', 
    name: 'Le Boulocain', 
    description: 'Steak haché, œuf, bacon, cheddar, frites à l\'intérieur.', 
    price: 8.50, 
    image: 'https://mbm-street-food.fr/wp-content/uploads/2023/10/Sandwich-steak.jpg',
    hasOptions: true
  },

  // ASSIETTES
  { 
    id: 'a1', 
    category: 'ASSIETTES', 
    name: 'Assiette Complète', 
    description: 'Servie avec frites maison, salade composée, pain chaud et boisson 33cl incluse.', 
    price: 11.50, 
    image: 'https://www.restalamaison.ch/images/thumbnails/1000/715/detailed/12/assiette_kebab.jpg',
    hasOptions: true 
  },

  // SALADES
  { 
    id: 'sa1', 
    category: 'SALADES', 
    name: 'Salade chicken', 
    description: 'Poulet croustillant, salade romaine, tomates cerises, croûtons, parmesan, sauce caesar.', 
    price: 9.90, 
    image: 'https://img.freepik.com/photos-premium/salade-cesar-dans-bol-papier-emporter-isole-fond-blanc_116118-2640.jpg', 
    hasOptions: true 
  },
  { 
    id: 'sa2', 
    category: 'SALADES', 
    name: 'Salade delice', 
    description: 'Tomate cerise, concombre, olives, fêta, menthe fraîche et citron.', 
    price: 8.90, 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi94JaldHeJrATJACjvgWcdFayKlvWo4J3mQ&s', 
    hasOptions: true 
  },

  // PETITES FAIMS
  { 
    id: 'pf-nuggets', 
    category: 'PETITES_FAIMS', 
    name: 'Nuggets de Poulet', 
    description: 'Poulet croustillant, servi avec sauce au choix.', 
    price: 5.00, 
    image: 'https://media.istockphoto.com/id/520915723/fr/photo/nuggets-de-poulet-isol%C3%A9-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=0h8VSI-P6nyVzuGdXFbaoX_9IkD1AOnsjmgmLsZKUVg=',
    hasOptions: true 
  },
  { 
    id: 'pf-bouchees', 
    category: 'PETITES_FAIMS', 
    name: 'Bouchées Camembert', 
    description: 'Camembert fondant enrobé d\'une panure croustillante.', 
    price: 5.50, 
    image: 'https://allopizza88.fr/wp-content/uploads/2019/03/bouchee-camembert.jpg',
    hasOptions: true
  },
  { 
    id: 'pf-frites', 
    category: 'PETITES_FAIMS', 
    name: 'Frites Maison', 
    description: 'Frites fraîches préparées chaque matin.', 
    price: 3.50, 
    image: 'https://media.istockphoto.com/id/2151908327/fr/photo/tas-de-frites-de-pommes-de-terre-%C3%A9pluch%C3%A9es-fran%C3%A7aises-fra%C3%AEchement-cuites-au-four-sur-fond.jpg?s=612x612&w=0&k=20&c=kTQgXq5IqNcRqGpCCDDsn3S3rN3n4STSKJVzG_L3M8s=',
    hasOptions: true
  },
  { id: 'pf1d', category: 'PETITES_FAIMS', name: 'Médaillons Chèvre (5 pcs)', price: 6.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpDCzhq02AL7HITD0oSVb-CELL86ruUqKNA&s' },
  { id: 'pf1e', category: 'PETITES_FAIMS', name: 'Oignons Rings (5 pcs)', price: 5.00, image: 'https://firstpizz.fr/wp-content/uploads/2021/01/Jack-Box-Panko-Onion-Rings.jpg' },
  { id: 'pf3', category: 'PETITES_FAIMS', name: 'Wings de Poulet (5 pcs)', price: 6.00, image: 'https://www.shutterstock.com/image-photo/fried-chicken-breast-hot-crispy-600nw-2499038789.jpg' },
  { id: 'pf5', category: 'PETITES_FAIMS', name: 'Tenders (4 pcs)', price: 7.50, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800' },
  { id: 'pf9', category: 'PETITES_FAIMS', name: 'Frites Cheddar & Oignons', price: 5.50, description: 'Format XL avec cheddar fondant et oignons frits.', image: 'https://chamasburger.com/wp-content/uploads/2020/07/Frites-Cheddar-768x512.jpg' },

  // DESSERTS & BOISSONS
  { id: 'db1', category: 'DESSERTS_BOISSONS', name: 'Soda 33cl', price: 2.00, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800', hasOptions: true },
  { id: 'db2', category: 'DESSERTS_BOISSONS', name: 'Soda 1,5L', price: 3.50, image: 'https://monoprixfranchise.lu/cdn/shop/files/images_2F2029-1.jpg?v=1728607367', hasOptions: true },
  { id: 'db3', category: 'DESSERTS_BOISSONS', name: 'Eau 50cl', price: 1.50, image: 'https://www.comptoirdesrestaurateurs.fr/media/cache/sylius_shop_product_original/22/df/d338139258bfa53d4a414646fddc.jpg.webp' },
  { id: 'db4', category: 'DESSERTS_BOISSONS', name: 'Red Bull 25cl', price: 2.50, image: 'https://media.istockphoto.com/id/477614020/fr/photo/blue-silver-red-bull-est-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=UKtVGP42pR0VDvfXQSXdMA6yhN_Dn6fe2kvxTI1JgXs=' },
  { id: 'db5', category: 'DESSERTS_BOISSONS', name: 'Capri-Sun', price: 1.00, image: 'https://www.distrivallees.fr/images/Image/Caprisun-1-1-1.png' },
  { id: 'db11', category: 'DESSERTS_BOISSONS', name: 'Atay Nature', price: 2.50, image: 'https://us.123rf.com/450wm/dagobert1620/dagobert16201709/dagobert1620170900014/85195290-true-moroccan-mint-tea-in-the-original-cup-and-teapot-on-the-white-background.jpg' },
  { id: 'db7', category: 'DESSERTS_BOISSONS', name: 'Tiramisu Maison', price: 3.50, image: 'https://st3.depositphotos.com/22341038/37087/i/450/depositphotos_370876942-stock-photo-sweet-tiramisu-isolated-white-background.jpg' },
  { id: 'db8', category: 'DESSERTS_BOISSONS', name: 'Tarte aux Daims', price: 3.00, image: 'https://www.pizzaland-lillebonne.fr/wp-content/uploads/2020/03/desserts-tarte-au-daim.png' },
  { id: 'db10', category: 'DESSERTS_BOISSONS', name: 'Pâtisserie Orientale', price: 1.90, image: 'https://media.istockphoto.com/id/1256548223/fr/photo/dessert-du-moyen-orient-%C3%A0-la-pistache-isol%C3%A9e-sur-blanc.jpg?s=612x612&w=0&k=20&c=0XLQsEEwqq4zSFYS8N55t8YxWfGEOOHGNZ5VmUdlHHg=' },
  { id: 'db6', category: 'DESSERTS_BOISSONS', name: 'Café', price: 1.50, image: 'https://media.istockphoto.com/id/1152767411/fr/photo/cuvette-de-caf%C3%A9-latte-disolement-sur-le-fond-blanc-avec-le-chemin-de-d%C3%A9coupage.jpg?s=612x612&w=0&k=20&c=yYhstH3P85IHyaV1Jn_u2x83ykWP6-iglvtCMYJF2Pc=' },
];

export const CATEGORIES = [
  { id: 'TACOS_SANDWICHS', label: 'Tacos & Sandwichs', icon: '🌮' },
  { id: 'PANINIS', label: 'Paninis', icon: '🫓' },
  { id: 'ASSIETTES_SALADES_BOWLS', label: 'Assiettes, Salades & Bowls', icon: '🍽️' },
  { id: 'BURGERS', label: 'Burgers', icon: '🍔' },
  { id: 'PETITES_FAIMS', label: 'Petites Faims', icon: '🍟' },
  { id: 'DESSERTS_BOISSONS', label: 'Desserts & Boissons', icon: '🍰' },
];
