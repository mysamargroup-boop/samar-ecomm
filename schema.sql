-- Create the products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  "salePrice" NUMERIC,
  "categoryId" UUID,
  inventory INTEGER,
  tags TEXT[],
  images TEXT[],
  dimensions JSONB,
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- Create the categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- Create the orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID REFERENCES auth.users(id),
  items JSONB,
  total NUMERIC,
  status TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- Create the reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" UUID REFERENCES products(id),
  "userId" UUID REFERENCES auth.users(id),
  rating INTEGER,
  comment TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- Add foreign key constraint to products table
ALTER TABLE products ADD CONSTRAINT fk_category FOREIGN KEY ("categoryId") REFERENCES categories(id);

-- RLS Policies
-- Enable RLS for all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update products" ON products FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated users to delete products" ON products FOR DELETE TO authenticated USING (true);

-- Policies for categories
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert categories" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update categories" ON categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated users to delete categories" ON categories FOR DELETE TO authenticated USING (true);

-- Policies for orders
CREATE POLICY "Allow users to see their own orders" ON orders FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Allow users to create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = "userId");

-- Policies for reviews
CREATE POLICY "Allow public read access to reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert reviews" ON reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow users to update their own reviews" ON reviews FOR UPDATE USING (auth.uid() = "userId") WITH CHECK (auth.uid() = "userId");
CREATE POLICY "Allow users to delete their own reviews" ON reviews FOR DELETE USING (auth.uid() = "userId");