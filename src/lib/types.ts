
import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with dashes'),
  parentId: z.string().optional(),
});
export type Category = z.infer<typeof CategorySchema>;

export const ProductVariantSchema = z.object({
  id: z.string(),
  name: z.string(), // e.g., 'Color', 'Size'
  value: z.string(), // e.g., 'Red', 'Large'
  stock: z.number().int().min(0),
});
export type ProductVariant = z.infer<typeof ProductVariantSchema>;

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  price: z.number().positive('Price must be a positive number'),
  salePrice: z.number().positive('Sale price must be a positive number').optional(),
  categoryId: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with dashes'),
  images: z.array(z.string().url('Must be a valid URL')),
  inventory: z.number().int().min(0, 'Inventory cannot be negative'),
  tags: z.array(z.string()).optional(),
  // variants: z.array(ProductVariantSchema),
});
export type Product = z.infer<typeof ProductSchema>;

export const OrderItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

export const OrderSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  items: z.array(OrderItemSchema),
  total: z.number().positive(),
  status: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
  createdAt: z.date(),
});
export type Order = z.infer<typeof OrderSchema>;
