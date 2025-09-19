# CareThePlanet Admin Panel

This admin panel allows administrators to manage the CareThePlanet website content, including blog posts and hero slider images.

## Features

### 🔐 Authentication
- **Login URL**: `/admin/login`
- **Username**: `admin`
- **Password**: `caretheplanet2024`

### 📝 Blog Management
- **View all blog posts** at `/admin/blog`
- **Create new posts** at `/admin/blog/new`
- **Edit existing posts** by clicking the "Edit" button
- **Publish/Unpublish posts** using the status toggle
- **Delete posts** using the "Delete" button

### 🖼️ Hero Image Management
- **Manage hero slider images** at `/admin/hero`
- **Add new images** using the "Add Image" button
- **Edit image details** (URL, title, alt text)
- **Reorder images** using up/down arrows
- **Delete images** using the "Delete" button
- **Save all changes** using the "Save All Changes" button

## How to Use

### 1. Access the Admin Panel
1. Navigate to `/admin/login` in your browser
2. Enter the credentials:
   - Username: `admin`
   - Password: `caretheplanet2024`
3. Click "Sign In"

### 2. Manage Blog Posts
1. From the dashboard, click "Manage Blog Posts" or go to `/admin/blog`
2. **Create a new post**:
   - Click "+ New Post"
   - Fill in all required fields (title, excerpt, content, author, category)
   - Choose status (draft or published)
   - Click "Save Post"
3. **Edit existing posts**:
   - Click "Edit" on any post
   - Make your changes
   - Click "Save"
4. **Change post status**:
   - Use the Publish/Unpublish toggle button
5. **Delete posts**:
   - Click "Delete" and confirm

### 3. Manage Hero Images
1. From the dashboard, click "Manage Hero Images" or go to `/admin/hero`
2. **Add a new image**:
   - Click "+ Add Image"
   - Enter image URL, title, and alt text
   - Click "Save"
3. **Edit existing images**:
   - Click "Edit" on any image
   - Update URL, title, or alt text
   - Click "Save"
4. **Reorder images**:
   - Use the up/down arrows to change the order
   - First image appears first in the slider
5. **Delete images**:
   - Click "Delete" and confirm
6. **Save all changes**:
   - Click "Save All Changes" to persist your modifications

## Technical Details

### Data Storage
- Currently uses localStorage for demo purposes
- In production, this should be replaced with a proper database and API
- Data is automatically loaded when the admin panel opens

### File Structure
```
caretheplanet/
├── pages/admin/
│   ├── index.tsx          # Admin dashboard
│   ├── login.tsx          # Admin login
│   ├── blog/
│   │   ├── index.tsx      # Blog management
│   │   └── new.tsx        # Create new blog post
│   └── hero.tsx           # Hero image management
├── utils/
│   └── adminData.ts       # Data storage utilities
└── components/
    └── Hero.tsx           # Hero component (uses admin data)
```

### Customization
- **Blog categories** can be modified in `adminData.ts`
- **Default hero images** can be changed in `adminData.ts`
- **Authentication** should be replaced with proper server-side validation
- **Image uploads** can be added for local image storage

## Security Notes

⚠️ **Important**: This is a demo implementation with basic security. For production use:

1. **Replace localStorage** with secure server-side storage
2. **Implement proper authentication** with JWT tokens or sessions
3. **Add input validation** and sanitization
4. **Use HTTPS** for all admin communications
5. **Implement rate limiting** to prevent brute force attacks
6. **Add audit logging** for all admin actions

## Troubleshooting

### Common Issues
1. **Can't access admin panel**: Check if you're logged in and using correct credentials
2. **Changes not saving**: Make sure to click "Save All Changes" for hero images
3. **Images not loading**: Verify image URLs are accessible and valid
4. **Blog posts not appearing**: Check if posts are set to "published" status

### Browser Compatibility
- Works best in modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- localStorage must be available

## Support

For technical support or feature requests, please contact the development team.

---

**Note**: This admin panel is designed for the CareThePlanet environmental conservation website. All content should align with the website's mission of promoting environmental awareness and sustainability. 