# 🌍 CareThePlanet - Environmental NGO Website

A modern, responsive website built for environmental conservation efforts, featuring secure donation mechanisms and content management.

## 🚀 Features

- **Modern Design**: Built with Next.js 14, React 18, and Tailwind CSS
- **Payment Integration**: ZenoPay mobile money payments for Tanzania
- **Admin Panel**: Complete CMS for managing content, payments, and users
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Static site generation for fast loading
- **SEO Optimized**: Built-in meta tags and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payments**: ZenoPay API (Tanzania Mobile Money)
- **Deployment**: Static export compatible with any hosting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mapesa2021/caretheplane-org.git
   cd caretheplane-org
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env-template.txt .env.local
   ```
   Then update `.env.local` with your actual values:
   - Supabase URL and API key
   - ZenoPay API key (if different from default)

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 💳 Payment System

### ZenoPay Integration
- **Test Phone**: `0754546567` - Triggers test payment simulation
- **Live Payments**: Any other Tanzania phone number (07XXXXXXXX)
- **Supported Formats**: 07XXXXXXXX, +2557XXXXXXXX, 2557XXXXXXXX

### API Endpoints
- `POST /api/payment/initiate` - Start payment process
- `POST /api/payment/callback` - ZenoPay webhook handler
- `GET /api/payment/status?orderId=ID` - Check payment status
- `GET|POST /api/payment/history` - Payment records management

## 🏗️ Project Structure

```
├── components/          # Reusable UI components
├── pages/              # Next.js pages and API routes
│   ├── admin/          # Admin panel pages
│   └── api/            # API endpoints
├── lib/                # Utility libraries
│   ├── zenopay.ts      # Payment service
│   ├── database.ts     # Database operations
│   └── supabase.ts     # Supabase client
├── styles/             # Global styles
└── public/             # Static assets
```

## 🔧 Admin Panel

Access the admin panel at `/admin/login`

**Default Credentials:**
- Username: `admin`
- Password: `caretheplanet2024`

**Features:**
- Content management (blog, team, testimonials)
- Payment tracking and management
- Newsletter subscriber management
- Hero image management

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run export
```

### Deployment Options
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag-and-drop the `out/` folder
- **cPanel**: Upload extracted files to `public_html`
- **Any Static Host**: Use the generated `out/` folder

## 🔐 Environment Variables

Required environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# ZenoPay Configuration (optional - uses default if not set)
ZENOPAY_API_KEY=your_zenopay_api_key
```

## 📱 Mobile Money Support

Currently supports Tanzania mobile money providers:
- M-Pesa Tanzania
- Tigo Pesa
- Airtel Money
- Other mobile money services via ZenoPay

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For support or questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 🌟 Acknowledgments

- ZenoPay for payment processing
- Supabase for backend services
- Vercel for Next.js framework
- All contributors and supporters

---

**Made with ❤️ for environmental conservation**