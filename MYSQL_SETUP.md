# 🗄️ MySQL Database Setup Guide for CareThePlanet

This guide helps you set up MySQL database for the CareThePlanet project, replacing Supabase with a local MySQL solution.

## 📋 **Prerequisites**

- cPanel hosting with MySQL database access
- MySQL database credentials
- SSH access (optional, for command line setup)

## 🛠️ **Step 1: Create MySQL Database**

### **Via cPanel**
1. **Login to cPanel**
2. **Go to "MySQL Databases"**
3. **Create Database:**
   - Database Name: `carethep_caretheplanet`
4. **Create Database User:**
   - Username: `carethep_caretheplanet`
   - Password: `caretheplanet@2025`
5. **Add User to Database:**
   - Select user and database
   - Grant **ALL PRIVILEGES**

### **Database Connection Details**
- **Host**: `localhost` (or your server's IP)
- **Port**: `3306` (default MySQL port)
- **Database**: `carethep_caretheplanet`
- **Username**: `carethep_caretheplanet`
- **Password**: `caretheplanet@2025`

## 🔧 **Step 2: Environment Configuration**

Update your `.env.local` file with MySQL credentials:

```env
# Database Configuration - MySQL
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=carethep_caretheplanet
DB_USERNAME=carethep_caretheplanet
DB_PASSWORD=caretheplanet@2025

# ZenoPay Configuration (already working)
ZENOPAY_API_KEY=ArtYqYpjmi8UjbWqxhCe7SLqpSCbws-_7vjudTuGR91PT6pmWX85lapiuq7xpXsJ2BkPZ9gkxDEDotPgtjdV6g
```

## 📊 **Step 3: Create Database Tables**

### **Option A: Via cPanel phpMyAdmin**
1. **Open phpMyAdmin** from cPanel
2. **Select your database** (`carethep_caretheplanet`)
3. **Go to "SQL" tab**
4. **Copy and paste** the contents of `database-schema.mysql.sql`
5. **Click "Go"** to execute

### **Option B: Via Command Line (if SSH available)**
```bash
mysql -u carethep_caretheplanet -p carethep_caretheplanet < database-schema.mysql.sql
```

## 🧪 **Step 4: Test Database Connection**

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test database connection:**
   Visit: `http://localhost:3000/api/database/test`
   
   Expected response:
   ```json
   {
     "success": true,
     "message": "MySQL database connection successful",
     "details": {
       "connection": true,
       "healthCheck": true,
       "config": {
         "host": "localhost",
         "port": 3306,
         "database": "carethep_caretheplanet",
         "username": "carethep_caretheplanet"
       }
     }
   }
   ```

## 🎯 **Step 5: Test Payment System**

1. **Go to**: http://localhost:3000
2. **Click any donation button**
3. **Fill in the form** with test data:
   - Name: `Test User`
   - Email: `test@example.com`
   - Phone: `0754546567` (test number)
4. **Click "Donate Now"**

Payment records will now be stored in your MySQL database!

## 📚 **Database Tables Created**

- ✅ `payments` - Payment transactions and ZenoPay records
- ✅ `blog_posts` - Blog articles and content
- ✅ `team_members` - Team information with photos
- ✅ `testimonials` - Customer reviews
- ✅ `hero_images` - Homepage slider images
- ✅ `tree_packages` - Tree planting packages
- ✅ `homepage_buttons` - Customizable buttons
- ✅ `newsletter_subscribers` - Email subscriptions
- ✅ `contact_messages` - Contact form submissions
- ✅ `admin_users` - Admin authentication

## 🔍 **Troubleshooting**

### **Connection Issues**
- Verify database credentials in `.env.local`
- Check if MySQL service is running
- Ensure firewall allows connections on port 3306
- Verify user has proper privileges

### **Permission Errors**
- Grant ALL PRIVILEGES to database user
- Check cPanel user permissions
- Verify database exists and is accessible

### **Environment Issues**
- Restart development server after env changes: `npm run dev`
- Check console for connection errors
- Use database test endpoint: `/api/database/test`

## 🚀 **Benefits of MySQL Setup**

- **Cost Effective**: No monthly Supabase fees
- **Full Control**: Complete database access via cPanel
- **Performance**: Local database for faster queries
- **Backup**: Easy database exports via phpMyAdmin
- **Scalability**: Can handle production traffic
- **Compatibility**: Works with all hosting providers

## 📞 **Support**

If you encounter issues:
1. Check the `/api/database/test` endpoint for connection status
2. Verify MySQL credentials in cPanel
3. Check server error logs in cPanel
4. Ensure all required packages are installed: `npm install`

---

**Your CareThePlanet website now uses MySQL for reliable, cost-effective data storage! 🎉**