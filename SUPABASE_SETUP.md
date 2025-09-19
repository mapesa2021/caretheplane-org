# 🗄️ Supabase Database Setup Guide

## **Step 1: Create Supabase Project**

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Fill in details:**
   - Organization: Create new or select existing
   - Project name: `caretheplanet-db`
   - Database password: Create a strong password
   - Region: Choose closest to your users
5. **Click "Create new project"**
6. **Wait for setup** (2-3 minutes)

## **Step 2: Get Your Project Credentials**

1. **In your project dashboard**, go to **Settings** → **API**
2. **Copy these values:**
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public key** (starts with: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## **Step 3: Set Up Environment Variables**

1. **Create `.env.local` file** in your project root:
   ```bash
   touch .env.local
   ```

2. **Add your Supabase credentials:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## **Step 4: Create Database Tables**

1. **In Supabase dashboard**, go to **SQL Editor**
2. **Copy and paste** the contents of `database-schema.sql`
3. **Click "Run"** to execute the SQL

## **Step 5: Test the Connection**

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Check the console** for any connection errors
3. **Visit your admin panel** to test database operations

## **Step 6: Migrate Existing Data (Optional)**

If you want to migrate your current localStorage data:

1. **Export data** from your current admin panel
2. **Use the database services** to import data
3. **Or manually add** through the admin interface

## **🔒 Security Features**

- **Row Level Security (RLS)** enabled on all tables
- **Authentication** built-in with Supabase Auth
- **Real-time subscriptions** for live updates
- **Automatic backups** and point-in-time recovery

## **📊 Database Tables Created**

- ✅ `blog_posts` - Blog articles and content
- ✅ `team_members` - Team information with photos
- ✅ `testimonials` - Customer reviews
- ✅ `hero_images` - Homepage slider images
- ✅ `tree_packages` - Tree planting packages
- ✅ `homepage_buttons` - Customizable buttons
- ✅ `newsletter_subscribers` - Email subscriptions
- ✅ `contact_messages` - Contact form submissions
- ✅ `admin_users` - Admin authentication

## **🚀 Benefits of Database Setup**

- **Data Persistence** across all users and devices
- **Real-time Updates** when data changes
- **Multiple Admin Users** can access simultaneously
- **Data Backup** and recovery
- **Professional Grade** PostgreSQL database
- **Scalable** for future growth

## **🆘 Troubleshooting**

### **Connection Issues**
- Verify your environment variables
- Check Supabase project status
- Ensure your IP isn't blocked

### **Permission Errors**
- Check RLS policies in Supabase
- Verify table permissions
- Check user authentication

### **Build Errors**
- Restart development server after env changes
- Check for TypeScript errors
- Verify all dependencies installed

## **📞 Support**

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Discord Community**: [discord.gg/supabase](https://discord.gg/supabase)
- **GitHub Issues**: Check your project repository

---

**Your CareThePlanet website will now have a professional, scalable database backend! 🎉** 