-- Run this in your Supabase SQL Editor

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  category TEXT,
  unit TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (for demo/admin purposes)
CREATE POLICY "Public Access" ON products FOR ALL USING (true) WITH CHECK (true);

-- Create site_settings table for managing page photos and content
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY, -- e.g., 'hero_image_home', 'about_us_image'
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Public Access" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'images' );
CREATE POLICY "Anon Insert" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'images' );
CREATE POLICY "Anon Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'images' );
CREATE POLICY "Anon Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'images' );
