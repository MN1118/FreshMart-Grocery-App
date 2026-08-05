// Mock catalog data. Shaped to match the documented backend contract in
// services/api.js so it's a drop-in swap once the Flask API grows to cover
// categories, ratings, brands and coupons.

export const CATEGORIES = [
  { id: 'fruits', name: 'Fruits', emoji: '🍎', color: '#FF6B4A' },
  { id: 'vegetables', name: 'Vegetables', emoji: '🥦', color: '#0F7A4D' },
  { id: 'dairy', name: 'Dairy & Eggs', emoji: '🥛', color: '#4CA86C' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤', color: '#F04E2C' },
  { id: 'snacks', name: 'Snacks', emoji: '🍪', color: '#C93E21' },
  { id: 'essentials', name: 'Essentials', emoji: '🧴', color: '#268C52' },
  { id: 'bakery', name: 'Bakery', emoji: '🥐', color: '#FF8A6B' },
  { id: 'meat', name: 'Meat & Fish', emoji: '🍗', color: '#0A4E32' },
]

export const BRANDS = [
  { id: 'natures-best', name: "Nature's Best" },
  { id: 'daily-farm', name: 'Daily Farm' },
  { id: 'greenleaf', name: 'GreenLeaf' },
  { id: 'purefresh', name: 'PureFresh' },
  { id: 'orchard-co', name: 'Orchard Co.' },
  { id: 'homebake', name: 'HomeBake' },
]

export const PRODUCTS = [
  { id: 1, name: 'Fresh Red Apples', category: 'fruits', brand: 'orchard-co', description: 'Crisp, juicy hand-picked apples sourced from the Himalayan foothills.', price: 199, mrp: 249, unit: '1 kg', rating: 4.6, reviewCount: 128, stock: 42, tags: ['bestseller'], image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600' },
  { id: 2, name: 'Bananas', category: 'fruits', brand: 'orchard-co', description: 'Naturally ripened bananas, rich in potassium and fibre.', price: 49, mrp: 59, unit: '1 dozen', rating: 4.4, reviewCount: 96, stock: 60, tags: ['bestseller'], image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600' },
  { id: 3, name: 'Seedless Grapes', category: 'fruits', brand: 'natures-best', description: 'Sweet green seedless grapes, washed and ready to eat.', price: 89, mrp: 110, unit: '500 g', rating: 4.3, reviewCount: 54, stock: 30, tags: ['trending'], image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600' },
  { id: 4, name: 'Alphonso Mangoes', category: 'fruits', brand: 'orchard-co', description: 'Premium Alphonso mangoes, the king of fruits, at peak sweetness.', price: 349, mrp: 420, unit: '1 kg', rating: 4.8, reviewCount: 201, stock: 18, tags: ['trending', 'bestseller'], image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600' },
  { id: 5, name: 'Fresh Strawberries', category: 'fruits', brand: 'natures-best', description: 'Locally grown strawberries, hand-packed for maximum freshness.', price: 129, mrp: 159, unit: '250 g', rating: 4.5, reviewCount: 73, stock: 25, tags: [], image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=600' },
  { id: 6, name: 'Broccoli', category: 'vegetables', brand: 'greenleaf', description: 'Farm-fresh broccoli florets, great source of vitamin C.', price: 69, mrp: 85, unit: '500 g', rating: 4.2, reviewCount: 41, stock: 35, tags: [], image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=600' },
  { id: 7, name: 'Vine Tomatoes', category: 'vegetables', brand: 'greenleaf', description: 'Ripe, tangy tomatoes still on the vine for extra freshness.', price: 45, mrp: 55, unit: '1 kg', rating: 4.3, reviewCount: 88, stock: 50, tags: ['bestseller'], image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600' },
  { id: 8, name: 'Baby Spinach', category: 'vegetables', brand: 'greenleaf', description: 'Tender baby spinach leaves, triple-washed and ready to cook.', price: 39, mrp: 49, unit: '200 g', rating: 4.4, reviewCount: 37, stock: 40, tags: [], image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600' },
  { id: 9, name: 'Bell Peppers (Mixed)', category: 'vegetables', brand: 'greenleaf', description: 'A colourful mix of red, yellow and green bell peppers.', price: 79, mrp: 95, unit: '500 g', rating: 4.5, reviewCount: 29, stock: 28, tags: ['trending'], image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600' },
  { id: 10, name: 'Farm Carrots', category: 'vegetables', brand: 'natures-best', description: 'Sweet, crunchy carrots great for snacking or cooking.', price: 35, mrp: 42, unit: '1 kg', rating: 4.1, reviewCount: 22, stock: 55, tags: [], image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600' },
  { id: 11, name: 'Full Cream Milk', category: 'dairy', brand: 'daily-farm', description: 'Pasteurised full-cream milk delivered fresh every morning.', price: 32, mrp: 32, unit: '500 ml', rating: 4.6, reviewCount: 210, stock: 100, tags: ['bestseller'], image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600' },
  { id: 12, name: 'Farm Fresh Eggs', category: 'dairy', brand: 'daily-farm', description: 'Free-range eggs, rich in protein, sourced from local farms.', price: 89, mrp: 99, unit: '12 pcs', rating: 4.7, reviewCount: 154, stock: 70, tags: ['bestseller'], image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=600' },
  { id: 13, name: 'Greek Yoghurt', category: 'dairy', brand: 'purefresh', description: 'Thick, creamy Greek yoghurt with live probiotic cultures.', price: 65, mrp: 75, unit: '400 g', rating: 4.5, reviewCount: 66, stock: 45, tags: ['trending'], image: 'https://epigamiastore.com/cdn/shop/files/GY_400g_Natural_Pack_of_1_1080x.png?v=1739179817' },
  { id: 14, name: 'Cheddar Cheese Block', category: 'dairy', brand: 'daily-farm', description: 'Aged cheddar cheese, sharp and full of flavour.', price: 249, mrp: 289, unit: '200 g', rating: 4.6, reviewCount: 48, stock: 20, tags: [], image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=600' },
  { id: 15, name: 'Salted Butter', category: 'dairy', brand: 'daily-farm', description: 'Creamy salted butter churned from farm-fresh cream.', price: 55, mrp: 62, unit: '100 g', rating: 4.4, reviewCount: 39, stock: 60, tags: [], image: 'https://images.unsplash.com/photo-1589985270958-bf087b2d8ed7?w=600' },
  { id: 16, name: 'Cold Pressed Orange Juice', category: 'drinks', brand: 'purefresh', description: '100% cold-pressed orange juice with no added sugar.', price: 99, mrp: 120, unit: '1 L', rating: 4.5, reviewCount: 61, stock: 32, tags: ['trending'], image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600' },
  { id: 17, name: 'Sparkling Water', category: 'drinks', brand: 'purefresh', description: 'Naturally carbonated spring water, crisp and refreshing.', price: 45, mrp: 50, unit: '750 ml', rating: 4.2, reviewCount: 27, stock: 80, tags: [], image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600' },
  { id: 18, name: 'Cold Brew Coffee', category: 'drinks', brand: 'purefresh', description: 'Slow-steeped cold brew coffee concentrate, smooth and bold.', price: 149, mrp: 175, unit: '500 ml', rating: 4.6, reviewCount: 44, stock: 24, tags: ['bestseller'], image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600' },
  { id: 19, name: 'Green Tea Bags', category: 'drinks', brand: 'natures-best', description: 'Antioxidant-rich green tea leaves in individually wrapped bags.', price: 129, mrp: 150, unit: '25 bags', rating: 4.3, reviewCount: 58, stock: 50, tags: [], image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=600' },
  { id: 20, name: 'Classic Potato Chips', category: 'snacks', brand: 'homebake', description: 'Crunchy, lightly salted potato chips fried in sunflower oil.', price: 40, mrp: 45, unit: '150 g', rating: 4.3, reviewCount: 92, stock: 90, tags: ['bestseller'], image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600' },
  { id: 21, name: 'Roasted Almonds', category: 'snacks', brand: 'natures-best', description: 'Lightly roasted almonds, a wholesome protein-rich snack.', price: 249, mrp: 299, unit: '250 g', rating: 4.7, reviewCount: 83, stock: 40, tags: ['trending'], image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600' },
  { id: 22, name: 'Dark Chocolate Bar', category: 'snacks', brand: 'homebake', description: '70% cocoa dark chocolate, rich and smooth.', price: 89, mrp: 99, unit: '100 g', rating: 4.6, reviewCount: 71, stock: 55, tags: [], image: 'https://images.unsplash.com/photo-1548907040-4baa419e7d6f?w=600' },
  { id: 23, name: 'Trail Mix', category: 'snacks', brand: 'natures-best', description: 'A hearty mix of nuts, seeds and dried fruit.', price: 199, mrp: 230, unit: '300 g', rating: 4.4, reviewCount: 35, stock: 30, tags: [], image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600' },
  { id: 24, name: 'Multigrain Crackers', category: 'snacks', brand: 'homebake', description: 'Light, crispy crackers baked with five whole grains.', price: 59, mrp: 65, unit: '200 g', rating: 4.1, reviewCount: 26, stock: 65, tags: [], image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600' },
  { id: 25, name: 'Dish Wash Liquid', category: 'essentials', brand: 'purefresh', description: 'Grease-cutting dish wash liquid with a fresh lime scent.', price: 99, mrp: 115, unit: '750 ml', rating: 4.3, reviewCount: 47, stock: 60, tags: [], image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600' },
  { id: 26, name: 'Paper Towels', category: 'essentials', brand: 'purefresh', description: 'Extra-absorbent, tear-resistant paper towels, pack of 4.', price: 149, mrp: 170, unit: '4 rolls', rating: 4.4, reviewCount: 33, stock: 45, tags: [], image: 'https://images.unsplash.com/photo-1583947582886-f40ec95d3ae0?w=600' },
  { id: 27, name: 'Hand Sanitizer', category: 'essentials', brand: 'purefresh', description: '70% alcohol hand sanitizer gel, kills 99.9% of germs.', price: 79, mrp: 90, unit: '250 ml', rating: 4.2, reviewCount: 19, stock: 70, tags: [], image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600' },
  { id: 28, name: 'Laundry Detergent', category: 'essentials', brand: 'purefresh', description: 'Concentrated liquid detergent for bright, fresh laundry.', price: 219, mrp: 259, unit: '1 L', rating: 4.5, reviewCount: 52, stock: 38, tags: ['bestseller'], image: 'https://images.unsplash.com/photo-1610557892470-55d587bb361e?w=600' },
  { id: 29, name: 'Sourdough Loaf', category: 'bakery', brand: 'homebake', description: 'Naturally leavened sourdough, baked fresh every morning.', price: 119, mrp: 139, unit: '500 g', rating: 4.7, reviewCount: 64, stock: 22, tags: ['trending'], image: 'https://images.unsplash.com/photo-1585478259715-4d3a5f5a5e3a?w=600' },
  { id: 30, name: 'Butter Croissants', category: 'bakery', brand: 'homebake', description: 'Flaky, buttery croissants baked in small batches.', price: 149, mrp: 169, unit: 'pack of 4', rating: 4.6, reviewCount: 41, stock: 20, tags: [], image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600' },
  { id: 31, name: 'Fresh Chicken Breast', category: 'meat', brand: 'daily-farm', description: 'Skinless, boneless chicken breast, hormone-free.', price: 249, mrp: 279, unit: '500 g', rating: 4.5, reviewCount: 57, stock: 25, tags: ['bestseller'], image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600' },
  { id: 32, name: 'Atlantic Salmon Fillet', category: 'meat', brand: 'daily-farm', description: 'Sustainably sourced salmon fillet, rich in omega-3.', price: 449, mrp: 520, unit: '300 g', rating: 4.6, reviewCount: 31, stock: 15, tags: ['trending'], image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600' },
]

export const REVIEWS = [
  { id: 1, name: 'Ananya R.', rating: 5, comment: 'Groceries arrive so fresh, and the delivery is genuinely fast. My weekly go-to now.', avatar: 'https://i.pravatar.cc/80?img=47' },
  { id: 2, name: 'Karan Mehta', rating: 5, comment: 'Love the quality control on fruits and vegetables — never had a bad batch.', avatar: 'https://i.pravatar.cc/80?img=12' },
  { id: 3, name: 'Priya Sharma', rating: 4, comment: 'App is clean and easy to use, checkout takes seconds. Wish there were more bakery options.', avatar: 'https://i.pravatar.cc/80?img=32' },
  { id: 4, name: 'Rohit Verma', rating: 5, comment: 'The 10-minute delivery claim actually held up in my area. Impressive.', avatar: 'https://i.pravatar.cc/80?img=8' },
]

export const COUPONS = [
  { code: 'FRESH50', type: 'flat', value: 50, minOrder: 299, description: 'Flat ₹50 off on orders above ₹299' },
  { code: 'WELCOME10', type: 'percent', value: 10, minOrder: 199, description: '10% off on your order, above ₹199' },
  { code: 'BIGBASKET20', type: 'percent', value: 20, minOrder: 999, description: '20% off on orders above ₹999' },
]

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id))
}

export function getRelatedProducts(product, limit = 4) {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit)
}
