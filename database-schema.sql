-- CareThePlanet Database Schema for Supabase
-- Run this in your Supabase SQL editor
-- Updated version with complete admin panel support

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Allow all operations" ON blog_posts;
DROP POLICY IF EXISTS "Allow all operations" ON team_members;
DROP POLICY IF EXISTS "Allow all operations" ON testimonials;
DROP POLICY IF EXISTS "Allow all operations" ON hero_images;
DROP POLICY IF EXISTS "Allow all operations" ON tree_packages;
DROP POLICY IF EXISTS "Allow all operations" ON homepage_buttons;
DROP POLICY IF EXISTS "Allow all operations" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow all operations" ON contact_messages;
DROP POLICY IF EXISTS "Allow all operations" ON admin_users;
DROP POLICY IF EXISTS "Allow all operations" ON payments;

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  status TEXT CHECK (status IN ('published', 'draft')) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT NOT NULL,
  avatar TEXT NOT NULL,
  email TEXT,
  linkedin TEXT,
  twitter TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Images Table
CREATE TABLE IF NOT EXISTS hero_images (
  id BIGSERIAL PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  title TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tree Packages Table
CREATE TABLE IF NOT EXISTS tree_packages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  tree_count INTEGER NOT NULL,
  price INTEGER NOT NULL,
  currency TEXT NOT NULL,
  features TEXT[] NOT NULL,
  is_popular BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Homepage Buttons Table
CREATE TABLE IF NOT EXISTS homepage_buttons (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  text TEXT NOT NULL,
  url TEXT NOT NULL,
  variant TEXT CHECK (variant IN ('primary', 'secondary')) DEFAULT 'primary',
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  source TEXT DEFAULT 'homepage',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('new', 'read', 'replied')) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'TZS',
  buyer_email TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_phone TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  zeno_pay_response JSONB,
  zeno_pay_payment_id TEXT,
  callback_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: caretheplanet2024)
INSERT INTO admin_users (username, email, password_hash) 
VALUES ('admin', 'admin@caretheplanet.org', '$2a$10$default_hash_here')
ON CONFLICT (username) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active ON newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE tree_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_buttons ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for admin operations (allows all operations for now)
-- In production, you should implement proper authentication-based policies
CREATE POLICY "Allow all operations" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON team_members FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON testimonials FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON hero_images FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON tree_packages FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON homepage_buttons FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON newsletter_subscribers FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON contact_messages FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON admin_users FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON payments FOR ALL USING (true);

-- Insert sample data for testing

-- Sample blog posts
INSERT INTO blog_posts (title, excerpt, content, author, date, read_time, category, image, status) VALUES
('The Impact of Tree Planting on Climate Change', 'Discover how strategic tree planting initiatives can significantly reduce carbon emissions and combat global warming.', 'This is the full content of the blog post about tree planting and climate change...', 'Dr. Sarah Johnson', 'August 15, 2024', '5 min read', 'Climate Action', '🌳', 'published'),
('Sustainable Living: Small Changes, Big Impact', 'Learn about simple daily habits that can make a substantial difference in reducing your environmental footprint.', 'This is the full content of the blog post about sustainable living...', 'Michael Chen', 'August 12, 2024', '4 min read', 'Sustainability', '♻️', 'published'),
('Community-Led Conservation Success Stories', 'Explore inspiring stories of communities around the world that have successfully restored their local ecosystems.', 'This is the full content of the blog post about community conservation...', 'Maria Rodriguez', 'August 10, 2024', '6 min read', 'Community', '🌍', 'draft')
ON CONFLICT DO NOTHING;

-- Sample testimonials
INSERT INTO testimonials (name, role, content, avatar, "order") VALUES
('David Chen', 'Environmental Advocate', 'I''ve been supporting CareThePlanet for over two years now, and I''m amazed by the impact they''ve made. Their tree planting initiatives have transformed barren lands into thriving forests.', '👨‍💼', 1),
('Sarah Johnson', 'Climate Scientist', 'As a climate scientist, I''m impressed by CareThePlanet''s data-driven approach to environmental conservation. Their projects are not just well-intentioned but scientifically sound.', '👩‍🔬', 2),
('Miguel Rodriguez', 'Local Farmer', 'CareThePlanet didn''t just plant trees on my land—they taught me sustainable farming practices that have improved my crop yields while protecting the environment.', '👨‍🌾', 3)
ON CONFLICT DO NOTHING;

-- Sample hero images
INSERT INTO hero_images (src, alt, title, "order") VALUES
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'Majestic mountains with snow-capped peaks above clouds', 'Protecting Our Mountains', 1),
('https://images.unsplash.com/photo-1441974231531-c6227db76b6e', 'Lush green forest with sunlight filtering through trees', 'Restoring Forests', 2),
('https://images.unsplash.com/photo-1518837695005-2083093ee35b', 'Person planting a tree in a forest', 'Planting Trees Together', 3),
('https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 'Beautiful sunset over ocean waves', 'Protecting Our Oceans', 4),
('https://images.unsplash.com/photo-1549366021-9f761d450615', 'Wildlife in natural habitat', 'Preserving Wildlife', 5)
ON CONFLICT DO NOTHING;

-- Sample tree packages
INSERT INTO tree_packages (name, description, tree_count, price, currency, features, is_popular, "order") VALUES
('Bronze Package', 'Start your environmental journey with our basic tree planting package.', 5, 30000, 'Tsh', ARRAY['5 trees planted in your name', 'Certificate of contribution', 'Monthly progress updates', 'Basic impact report'], false, 1),
('Silver Package', 'Make a significant impact with our popular tree planting package.', 20, 100000, 'Tsh', ARRAY['20 trees planted in your name', 'Premium certificate of contribution', 'Weekly progress updates', 'Detailed impact report', 'GPS coordinates of planted trees', 'Photo updates of tree growth'], true, 2),
('Gold Package', 'Maximum environmental impact with our premium tree planting package.', 50, 300000, 'Tsh', ARRAY['50 trees planted in your name', 'Luxury certificate of contribution', 'Real-time progress tracking', 'Comprehensive impact report', 'GPS coordinates of planted trees', 'Regular photo updates', 'Personal tree planting ceremony invitation', 'Naming rights for a small grove'], false, 3)
ON CONFLICT DO NOTHING;

-- Sample homepage buttons
INSERT INTO homepage_buttons (id, section, text, url, variant, "order", is_active) VALUES
('hero-donate', 'hero', 'Donate Now', '/donate', 'primary', 1, true),
('hero-learn', 'hero', 'Learn More', '/about', 'secondary', 2, true),
('mission-plant', 'mission', 'Start Planting Today', '/plant', 'primary', 1, true),
('mission-how', 'mission', 'Learn How It Works', '/how-it-works', 'secondary', 2, true),
('about-read', 'about', 'Read More About Us', '/about', 'secondary', 1, true),
('cta-donate', 'cta', 'Donate Today', '/donate', 'secondary', 1, true),
('cta-volunteer', 'cta', 'Volunteer With Us', '/volunteer', 'secondary', 2, true)
ON CONFLICT (id) DO NOTHING; 