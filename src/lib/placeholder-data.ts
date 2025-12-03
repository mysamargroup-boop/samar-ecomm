
import type { Product, Category, Order } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || 'https://picsum.photos/seed/default/600/600';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Apparel', slug: 'apparel' },
  { id: '3', name: 'Home Goods', slug: 'home-goods' },
  { id: '4', name: 'Books', slug: 'books' },
];

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immerse yourself in music with these high-fidelity wireless headphones. Featuring active noise-cancellation and a 30-hour battery life, they are perfect for travel, work, and leisure. The plush earcups provide all-day comfort.',
    price: 18999,
    salePrice: 14999,
    categoryId: '1',
    images: [findImage('headphone1'), findImage('headphone2')],
    inventory: 150,
    tags: ['audio', 'tech', 'headphones'],
  },
  {
    id: 'prod_2',
    name: 'Smartwatch Series 8',
    description: 'Stay connected and track your fitness with the new Smartwatch Series 8. It features a brighter always-on display, advanced health sensors, and a durable design. Monitor your heart rate, blood oxygen, and daily activity effortlessly.',
    price: 29999,
    categoryId: '1',
    images: [findImage('smartwatch1'), findImage('smartwatch2')],
    inventory: 200,
    tags: ['smartwatch', 'fitness', 'tech'],
  },
  {
    id: 'prod_3',
    name: 'Classic Cotton T-Shirt',
    description: 'A wardrobe essential, this classic t-shirt is made from 100% premium soft cotton. Its timeless design and comfortable fit make it perfect for layering or wearing on its own. Available in a variety of colors.',
    price: 999,
    categoryId: '2',
    images: [findImage('tshirt1'), findImage('tshirt2')],
    inventory: 500,
    tags: ['apparel', 't-shirt', 'basics'],
  },
  {
    id: 'prod_4',
    name: 'Modern Leather Backpack',
    description: 'Carry your essentials in style with this minimalist leather backpack. It features a padded laptop compartment, multiple pockets for organization, and comfortable shoulder straps. Ideal for daily commutes and weekend trips.',
    price: 4999,
    categoryId: '2',
    images: [findImage('backpack1'), findImage('backpack2')],
    inventory: 80,
    tags: ['bags', 'leather', 'fashion'],
  },
  {
    id: 'prod_5',
    name: 'Automatic Espresso Machine',
    description: 'Become your own barista with this fully automatic espresso machine. It grinds, tamps, and brews delicious espresso, cappuccinos, and lattes at the touch of a button. The integrated milk frother creates creamy foam for perfect coffee drinks.',
    price: 59999,
    categoryId: '3',
    images: [findImage('espresso1'), findImage('espresso2')],
    inventory: 50,
    tags: ['kitchen', 'coffee', 'home'],
  },
  {
    id: 'prod_6',
    name: 'Cozy Knit Throw Blanket',
    description: 'Snuggle up with this incredibly soft and cozy knit throw blanket. Perfect for adding a touch of warmth and texture to your sofa or bed. Made from a durable and machine-washable acrylic blend.',
    price: 1499,
    categoryId: '3',
    images: [findImage('blanket1'), findImage('blanket2')],
    inventory: 120,
    tags: ['home decor', 'textiles', 'cozy'],
  },
  {
    id: 'prod_7',
    name: 'The Art of Programming',
    description: 'A comprehensive guide to the fundamentals of computer programming. This book covers everything from basic syntax to advanced algorithms, making it an essential read for both beginners and experienced developers.',
    price: 1299,
    categoryId: '4',
    images: [findImage('book1'), findImage('book2')],
    inventory: 300,
    tags: ['books', 'education', 'programming'],
  },
  {
    id: 'prod_8',
    name: 'Sci-Fi Bestseller: "Nebula\'s Dawn"',
    description: 'Embark on an epic journey across the galaxy in this critically acclaimed sci-fi novel. "Nebula\'s Dawn" weaves a tale of adventure, discovery, and the indomitable human spirit. A must-read for fans of the genre.',
    price: 799,
    categoryId: '4',
    images: [findImage('book3'), findImage('book4')],
    inventory: 450,
    tags: ['books', 'sci-fi', 'fiction'],
  },
];

export const orders: Order[] = [
  {
    id: 'ord_1',
    customerName: 'Alice Johnson',
    customerEmail: 'alice@example.com',
    items: [
      { id: 'item_1', productId: 'prod_1', productName: 'Wireless Noise-Cancelling Headphones', quantity: 1, price: 14999 },
      { id: 'item_2', productId: 'prod_7', productName: 'The Art of Programming', quantity: 1, price: 1299 },
    ],
    total: 16298,
    status: 'Shipped',
    createdAt: new Date('2023-10-26T10:00:00Z'),
  },
  {
    id: 'ord_2',
    customerName: 'Bob Smith',
    customerEmail: 'bob@example.com',
    items: [
      { id: 'item_3', productId: 'prod_3', productName: 'Classic Cotton T-Shirt', quantity: 3, price: 999 },
    ],
    total: 2997,
    status: 'Processing',
    createdAt: new Date('2023-10-28T14:30:00Z'),
  },
  {
    id: 'ord_3',
    customerName: 'Charlie Brown',
    customerEmail: 'charlie@example.com',
    items: [
      { id: 'item_4', productId: 'prod_5', productName: 'Automatic Espresso Machine', quantity: 1, price: 59999 },
    ],
    total: 59999,
    status: 'Delivered',
    createdAt: new Date('2023-10-20T09:00:00Z'),
  },
  {
    id: 'ord_4',
    customerName: 'Diana Prince',
    customerEmail: 'diana@example.com',
    items: [
      { id: 'item_5', productId: 'prod_2', productName: 'Smartwatch Series 8', quantity: 1, price: 29999 },
      { id: 'item_6', productId: 'prod_4', productName: 'Modern Leather Backpack', quantity: 1, price: 4999 },
    ],
    total: 34998,
    status: 'Pending',
    createdAt: new Date('2023-10-29T11:00:00Z'),
  },
];
