# Netlify Deployment Guide for CareThePlanet

## Prerequisites
- GitHub account with your project repository
- Netlify account (free at netlify.com)

## Step 1: Push Your Code to GitHub

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - CareThePlanet website"
   ```

2. **Create GitHub Repository**:
   - Go to github.com and create a new repository
   - Name it something like "caretheplanet-website"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/caretheplanet-website.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended for beginners)

1. **Go to Netlify**:
   - Visit [netlify.com](https://netlify.com)
   - Sign up/Login with your GitHub account

2. **New Site from Git**:
   - Click "New site from Git"
   - Choose GitHub as your Git provider
   - Select your `caretheplanet-website` repository

3. **Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18 (or latest LTS)

4. **Deploy**:
   - Click "Deploy site"
   - Wait for build to complete

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

## Step 3: Configure Custom Domain (Optional)

1. **In Netlify Dashboard**:
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter your domain name

2. **DNS Configuration**:
   - Add CNAME record pointing to your Netlify site
   - Or use Netlify's nameservers

## Step 4: Environment Variables (if needed)

If you need environment variables:
1. Go to Site settings > Environment variables
2. Add any required variables

## Step 5: Continuous Deployment

- Every time you push to your main branch, Netlify will automatically rebuild and deploy
- You can preview deployments on pull requests

## Troubleshooting

### Build Errors
- Check the build logs in Netlify
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Image Issues
- Ensure all image URLs are accessible
- Consider using Netlify's image optimization

### Performance
- Enable Netlify's asset optimization
- Use Next.js Image component for better performance

## Admin Access

After deployment:
- Admin panel: `https://your-site.netlify.app/admin`
- Login: `admin` / `caretheplanet2024`

## Support

- Netlify Docs: [docs.netlify.com](https://docs.netlify.com)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- GitHub Issues: Check your repository for any issues

---

**Your site will be live at**: `https://your-site-name.netlify.app` 