import type { Product } from '../types';

export interface LuxuryCollection {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  accent: string;
  productCount: string;
  products: Product[];
}

const img = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const luxuryCollections: LuxuryCollection[] = [
  {
    slug: 'men-fashion',
    title: 'Men Fashion',
    eyebrow: 'Tailored Discipline',
    description: 'Sharp tailoring, relaxed layers, and polished essentials for a cinematic modern wardrobe.',
    image: img('photo-1496747611176-843222e1e57c', 1600),
    accent: 'from-amber-500/70 via-slate-950/35 to-slate-950/90',
    productCount: '18 looks',
    products: [
      { id: 8101, title: 'Noir Wool Overshirt', price: 220, thumbnail: img('photo-1617127365659-c47fa864d8bc'), category: 'Men Fashion', rating: 4.8, discountPercentage: 8, brand: 'Sahrin Atelier', description: 'Structured wool overshirt with brushed metal hardware.', stock: 14, images: [] },
      { id: 8102, title: 'Ivory Resort Knit Polo', price: 145, thumbnail: img('photo-1516826957135-700dedea698c'), category: 'Men Fashion', rating: 4.7, discountPercentage: 0, brand: 'Maison Vale', description: 'Textured knit polo designed for refined warm-weather dressing.', stock: 18, images: [] },
      { id: 8103, title: 'Midnight Pleated Trouser', price: 180, thumbnail: img('photo-1506629905607-d9e297d1f5f7'), category: 'Men Fashion', rating: 4.9, discountPercentage: 12, brand: 'Aure Studio', description: 'Fluid pleated trousers with a tailored taper.', stock: 9, images: [] },
      { id: 8104, title: 'Heritage Leather Jacket', price: 640, thumbnail: img('photo-1520975682031-ae0cb5a05720'), category: 'Men Fashion', rating: 4.9, discountPercentage: 5, brand: 'Nocturne', description: 'Supple lamb leather jacket with a clean luxury finish.', stock: 5, images: [] },
    ],
  },
  {
    slug: 'women-fashion',
    title: 'Women Fashion',
    eyebrow: 'Evening Radiance',
    description: 'Flowing silhouettes, sculptural separates, and luminous textures for statement dressing.',
    image: img('photo-1483985988355-763728e1935b', 1600),
    accent: 'from-rose-500/70 via-fuchsia-950/30 to-slate-950/90',
    productCount: '24 edits',
    products: [
      { id: 8201, title: 'Celeste Satin Wrap Dress', price: 310, thumbnail: img('photo-1515372039744-b8f02a3ae446'), category: 'Women Fashion', rating: 4.9, discountPercentage: 10, brand: 'Celeste House', description: 'Satin wrap dress with an elegant evening drape.', stock: 12, images: [] },
      { id: 8202, title: 'Pearl Silk Blazer', price: 420, thumbnail: img('photo-1509631179647-0177331693ae'), category: 'Women Fashion', rating: 4.8, discountPercentage: 6, brand: 'Maison Vale', description: 'Soft silk blazer with a luminous tailored profile.', stock: 7, images: [] },
      { id: 8203, title: 'Opal Pleated Skirt', price: 195, thumbnail: img('photo-1485968579580-b6d095142e6e'), category: 'Women Fashion', rating: 4.7, discountPercentage: 0, brand: 'Aure Studio', description: 'Accordion pleats with graceful motion and polish.', stock: 16, images: [] },
      { id: 8204, title: 'Velvet Gallery Coat', price: 560, thumbnail: img('photo-1502716119720-b23a93e5fe1b'), category: 'Women Fashion', rating: 5, discountPercentage: 18, brand: 'Nocturne', description: 'Long velvet coat cut for evening arrivals.', stock: 4, images: [] },
    ],
  },
  {
    slug: 'shoes',
    title: 'Shoes',
    eyebrow: 'Sculpted Movement',
    description: 'Statement heels, polished loafers, and elevated sneakers built around presence and comfort.',
    image: img('photo-1543163521-1bf539c55dd2', 1600),
    accent: 'from-cyan-400/60 via-slate-950/25 to-slate-950/90',
    productCount: '16 pairs',
    products: [
      { id: 8301, title: 'Monaco Leather Loafer', price: 260, thumbnail: img('photo-1614252369475-531eba835eb1'), category: 'Shoes', rating: 4.8, discountPercentage: 7, brand: 'Monaco Line', description: 'Polished leather loafer with hand-finished detailing.', stock: 10, images: [] },
      { id: 8302, title: 'Astra Crystal Heel', price: 340, thumbnail: img('photo-1543163521-1bf539c55dd2'), category: 'Shoes', rating: 4.9, discountPercentage: 0, brand: 'Celeste House', description: 'A luminous heel made for black-tie evenings.', stock: 8, images: [] },
      { id: 8303, title: 'Heritage Court Sneaker', price: 190, thumbnail: img('photo-1542291026-7eec264c27ff'), category: 'Shoes', rating: 4.7, discountPercentage: 14, brand: 'Sahrin Atelier', description: 'Minimal court sneaker with premium leather panels.', stock: 21, images: [] },
      { id: 8304, title: 'Obsidian Chelsea Boot', price: 310, thumbnail: img('photo-1608256246200-53e635b5b65f'), category: 'Shoes', rating: 4.8, discountPercentage: 9, brand: 'Nocturne', description: 'Sleek Chelsea boot with a sculpted silhouette.', stock: 11, images: [] },
    ],
  },
  {
    slug: 'watches',
    title: 'Watches',
    eyebrow: 'Private Timepieces',
    description: 'Precision watches with architectural dials, polished bracelets, and heirloom-level finishing.',
    image: img('photo-1524592094714-0f0654e20314', 1600),
    accent: 'from-yellow-500/70 via-stone-950/30 to-slate-950/90',
    productCount: '12 pieces',
    products: [
      { id: 8401, title: 'Nomad Horizon Automatic', price: 780, thumbnail: img('photo-1523275335684-37898b6baf30'), category: 'Watches', rating: 4.9, discountPercentage: 5, brand: 'Nomad', description: 'Automatic movement with sapphire crystal and brushed steel.', stock: 6, images: [] },
      { id: 8402, title: 'Aurum Moonphase', price: 1240, thumbnail: img('photo-1524592094714-0f0654e20314'), category: 'Watches', rating: 5, discountPercentage: 0, brand: 'Aurum', description: 'Moonphase complication with a rich midnight dial.', stock: 3, images: [] },
      { id: 8403, title: 'Sable Chronograph', price: 920, thumbnail: img('photo-1508685096489-7aacd43bd3b1'), category: 'Watches', rating: 4.8, discountPercentage: 11, brand: 'Nocturne', description: 'A dramatic black chronograph with luminous indices.', stock: 5, images: [] },
      { id: 8404, title: 'Pearl Bracelet Watch', price: 680, thumbnail: img('photo-1539874754764-5a96559165b0'), category: 'Watches', rating: 4.7, discountPercentage: 6, brand: 'Celeste House', description: 'Jewelry-inspired bracelet watch with soft polish.', stock: 9, images: [] },
    ],
  },
  {
    slug: 'bags',
    title: 'Bags',
    eyebrow: 'Carry Objects',
    description: 'Structured totes, glossy mini bags, and travel silhouettes with polished practicality.',
    image: img('photo-1590874103328-eac38a683ce7', 1600),
    accent: 'from-emerald-400/60 via-slate-950/30 to-slate-950/90',
    productCount: '20 designs',
    products: [
      { id: 8501, title: 'Serpentine Mini Bag', price: 390, thumbnail: img('photo-1590874103328-eac38a683ce7'), category: 'Bags', rating: 4.9, discountPercentage: 7, brand: 'Celeste House', description: 'Compact sculptural bag with a glossy finish.', stock: 13, images: [] },
      { id: 8502, title: 'Gallery Leather Tote', price: 520, thumbnail: img('photo-1548036328-c9fa89d128fa'), category: 'Bags', rating: 4.8, discountPercentage: 0, brand: 'Maison Vale', description: 'Structured tote for refined daily movement.', stock: 10, images: [] },
      { id: 8503, title: 'Riviera Crossbody', price: 280, thumbnail: img('photo-1584917865442-de89df76afd3'), category: 'Bags', rating: 4.7, discountPercentage: 12, brand: 'Aure Studio', description: 'Compact crossbody with polished chain detailing.', stock: 15, images: [] },
      { id: 8504, title: 'Noir Weekender', price: 610, thumbnail: img('photo-1553062407-98eeb64c6a62'), category: 'Bags', rating: 4.9, discountPercentage: 9, brand: 'Nocturne', description: 'Soft leather weekender built for elegant escapes.', stock: 6, images: [] },
    ],
  },
  {
    slug: 'accessories',
    title: 'Accessories',
    eyebrow: 'Finishing Notes',
    description: 'Jewelry, eyewear, silk accents, and refined details that complete the composition.',
    image: img('photo-1515562141207-7a88fb7ce338', 1600),
    accent: 'from-violet-500/65 via-slate-950/25 to-slate-950/90',
    productCount: '28 details',
    products: [
      { id: 8601, title: 'Solstice Gold Hoops', price: 150, thumbnail: img('photo-1515562141207-7a88fb7ce338'), category: 'Accessories', rating: 4.8, discountPercentage: 0, brand: 'Aurum', description: 'Polished hoops with sculptural weight and shine.', stock: 20, images: [] },
      { id: 8602, title: 'Silk Riviera Scarf', price: 125, thumbnail: img('photo-1584917865442-de89df76afd3'), category: 'Accessories', rating: 4.7, discountPercentage: 10, brand: 'Maison Vale', description: 'Printed silk scarf with hand-rolled edges.', stock: 17, images: [] },
      { id: 8603, title: 'Onyx Statement Sunglasses', price: 210, thumbnail: img('photo-1511499767150-a48a237f0083'), category: 'Accessories', rating: 4.9, discountPercentage: 6, brand: 'Nocturne', description: 'Oversized acetate frames with a cinematic profile.', stock: 12, images: [] },
      { id: 8604, title: 'Pearl Layered Necklace', price: 240, thumbnail: img('photo-1599643478518-a784e5dc4c8f'), category: 'Accessories', rating: 5, discountPercentage: 15, brand: 'Celeste House', description: 'Layered pearl necklace with delicate metal accents.', stock: 8, images: [] },
    ],
  },
  {
    slug: 'electronics',
    title: 'Electronics',
    eyebrow: 'Designed Technology',
    description: 'Elegant tech objects, refined audio, and desk pieces with premium materials and quiet power.',
    image: img('photo-1498049794561-7780e7231661', 1600),
    accent: 'from-blue-500/65 via-slate-950/30 to-slate-950/90',
    productCount: '14 devices',
    products: [
      { id: 8701, title: 'Obsidian Studio Headphones', price: 430, thumbnail: img('photo-1505740420928-5e560c06d30e'), category: 'Electronics', rating: 4.9, discountPercentage: 8, brand: 'Arc Audio', description: 'Noise-cancelling headphones with warm studio sound.', stock: 14, images: [] },
      { id: 8702, title: 'Luxe Minimal Laptop', price: 1490, thumbnail: img('photo-1496181133206-80ce9b88a853'), category: 'Electronics', rating: 4.8, discountPercentage: 4, brand: 'Nova', description: 'Ultra-thin performance laptop in a brushed finish.', stock: 7, images: [] },
      { id: 8703, title: 'Cinematic Smart Display', price: 690, thumbnail: img('photo-1541807084-5c52b6b3adef'), category: 'Electronics', rating: 4.7, discountPercentage: 13, brand: 'Vanta', description: 'High-resolution display for a refined digital workspace.', stock: 9, images: [] },
      { id: 8704, title: 'Graphite Wireless Speaker', price: 360, thumbnail: img('photo-1545454675-3531b543be5d'), category: 'Electronics', rating: 4.8, discountPercentage: 0, brand: 'Arc Audio', description: 'Compact speaker with textured metal and room-filling sound.', stock: 16, images: [] },
    ],
  },
  {
    slug: 'perfumes',
    title: 'Perfumes',
    eyebrow: 'Private Scents',
    description: 'Layered fragrances with velvet woods, bright florals, and jewel-toned evening signatures.',
    image: img('photo-1594035910387-fea47794261f', 1600),
    accent: 'from-orange-400/70 via-rose-950/25 to-slate-950/90',
    productCount: '10 scents',
    products: [
      { id: 8801, title: 'Velvet Oud Elixir', price: 185, thumbnail: img('photo-1594035910387-fea47794261f'), category: 'Perfumes', rating: 4.9, discountPercentage: 0, brand: 'Nocturne', description: 'Smoky oud, amber resin, and soft saffron.', stock: 19, images: [] },
      { id: 8802, title: 'Citrus Silk Parfum', price: 165, thumbnail: img('photo-1541643600914-78b084683601'), category: 'Perfumes', rating: 4.8, discountPercentage: 10, brand: 'Celeste House', description: 'Sparkling citrus over white musk and neroli.', stock: 15, images: [] },
      { id: 8803, title: 'Rose Noir Essence', price: 210, thumbnail: img('photo-1587017539504-67cfbddac569'), category: 'Perfumes', rating: 5, discountPercentage: 6, brand: 'Aurum', description: 'Dark rose, patchouli, and polished woods.', stock: 8, images: [] },
      { id: 8804, title: 'Amber Atelier Mist', price: 140, thumbnail: img('photo-1615634260167-c8cdede054de'), category: 'Perfumes', rating: 4.7, discountPercentage: 12, brand: 'Maison Vale', description: 'Golden amber, vanilla orchid, and sandalwood.', stock: 21, images: [] },
    ],
  },
];

export function getLuxuryCollection(slug: string) {
  return luxuryCollections.find((collection) => collection.slug === slug);
}

export function getLuxuryProduct(id: number | string) {
  const productId = Number(id);
  return luxuryCollections.flatMap((collection) => collection.products).find((product) => product.id === productId);
}
