# The One Source IT Solutions - Refurbished Laptop Marketplace

A comprehensive refurbished laptop buy/sell marketplace website similar to Cashify.in, specifically designed for laptops and customized for The One Source IT Solutions brand.

## 🚀 Live Demo

This website will be hosted on GitHub Pages at: `https://yourusername.github.io/theonesource-laptop-marketplace`

## 📋 Recent Updates

### ✅ Latest Customizations (September 2025)
- **Footer Credit**: Updated to "Made with ❤️ by RajMohanAcharya" with link to portfolio
- **Footer Logo**: Fixed display issue - logo now shows properly in footer
- **Store Locations**: Added 3 Bangalore locations with area names and Google Maps links
- **Updated Contact Info**: 
  - Email: support@theonesourceitsolutions.com
  - Phone Numbers: 97426 77711, 99860 92718, 97420 97199
  - Support Hours: Mon-Sat 9-6 PM, Sun 9-1 PM

## 📋 Features

### 🏠 Homepage
- Hero section with compelling value proposition
- Action cards for buying and selling
- Featured laptops showcase with real pricing
- Trust indicators and customer testimonials
- Professional design with The One Source IT Solutions branding

### 🛒 Buy Section
- Advanced filtering by brand, price, grade, RAM, storage
- Product grid with detailed laptop cards
- Grade system (A/B/C) with clear quality standards
- Real-time search and sorting options
- Shopping cart with localStorage persistence
- Product detail modals with full specifications

### 💰 Sell Section
- Step-by-step selling process (4 steps)
- Device selection and condition assessment
- Real-time price quote calculator
- Pickup scheduling with date/time selection (9 AM - 6 PM)
- Progress indicator for user guidance

### 📊 Grading System
- Transparent Grade A, B, C standards
- Quality check process explanation
- Warranty and pricing information
- Visual examples and expectations

### 📱 Responsive Design
- Mobile-first responsive design
- Optimized for desktop, tablet, and mobile
- Touch-friendly interface elements
- Cross-browser compatibility

## 🛠️ Technology Stack

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox/Grid, animations, and responsive design
- **JavaScript (Vanilla)**: Interactive functionality, cart management, filtering
- **Local Storage**: Cart persistence across sessions
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## 📁 File Structure

```
theonesource-laptop-marketplace/
├── index.html          # Main HTML file with all sections
├── style.css           # Complete CSS styling
├── app.js              # JavaScript functionality
├── logo.jpg            # The One Source IT Solutions logo
└── README.md           # This file
```

## 🚀 Quick Start

### Step-by-Step GitHub Pages Setup

1. **Create New Repository**
   - Go to GitHub.com and create a new repository
   - Name it: `theonesource-laptop-marketplace` (or any name)
   - Make it **Public** (required for free GitHub Pages)

2. **Upload These 5 Files**
   - `index.html`
   - `style.css` 
   - `app.js`
   - `README.md`
   - `logo.jpg` (your company logo - must be in root folder)

3. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Select **"Deploy from a branch"** → **"main"** branch
   - Click **Save**

4. **Your Website Will Be Live At:**
   ```
   https://yourusername.github.io/theonesource-laptop-marketplace
   ```

## 📍 Business Information

### 📧 Contact Details
- **Email**: support@theonesourceitsolutions.com
- **Phone Numbers**: 
  - 97426 77711
  - 99860 92718 
  - 97420 97199

### 📍 Store Locations (Bangalore)
1. **Malleshwaram**: [View on Google Maps](https://maps.app.goo.gl/n8usEuKw4NvEorQv9)
2. **Marathahalli**: [View on Google Maps](https://maps.app.goo.gl/pWuweXXqLs1r3xZR9)
3. **HSR Layout**: [View on Google Maps](https://maps.app.goo.gl/YibG1tzxtAUwktEE6)

### 🕒 Support Hours
- **Monday - Saturday**: 9:00 AM - 6:00 PM
- **Sunday**: 9:00 AM - 1:00 PM

## 🎨 Brand Integration

### Logo Placement
- Header: Logo + company name side by side
- Footer: Logo with company name below
- Responsive sizing for all devices

### Color Scheme
- Professional blue (#2563eb) and teal accents
- Clean white backgrounds with subtle shadows
- Trust-building color palette

### Typography
- Modern, clean Segoe UI font family
- Proper hierarchy and spacing
- Mobile-optimized text sizes

## 💡 Features Included

### Business Operations
- ✅ Multi-location support with Google Maps integration
- ✅ Professional contact information display
- ✅ Realistic business hours
- ✅ Email links for direct contact
- ✅ Phone number links for mobile calling

### Customer Experience
- ✅ Grade-based quality transparency
- ✅ Real-time price calculations
- ✅ Shopping cart with persistence
- ✅ Mobile-responsive design
- ✅ Interactive forms with validation

### Technical Features
- ✅ SEO-optimized HTML structure
- ✅ Fast loading with optimized CSS
- ✅ Cross-browser compatibility
- ✅ Accessible design patterns
- ✅ Progressive enhancement

## 🔧 Customization Options

### Update Inventory
Edit laptop data in `app.js`:
```javascript
const laptopData = {
    "laptops": [
        {
            "brand": "Dell",
            "model": "Your Model",
            "price": 25999,
            // ... add your laptops
        }
    ]
};
```

### Change Contact Information
Update in `index.html`:
- Phone numbers in contact section
- Email addresses
- Business addresses
- Support hours

### Modify Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1d4ed8;
    /* Customize as needed */
}
```

## 🎯 Key Business Benefits

1. **Professional Online Presence**: Modern, trustworthy design
2. **Lead Generation**: Contact forms and phone integration
3. **Customer Convenience**: Multiple Bangalore locations and flexible hours
4. **Transparent Pricing**: Clear grading and pricing system
5. **Mobile-First**: Optimized for smartphone users
6. **SEO-Ready**: Clean code structure for search engines

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)  
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔄 Future Enhancements

### Short Term
- [ ] Payment gateway integration (Razorpay/PayU)
- [ ] WhatsApp Business integration
- [ ] Live chat support
- [ ] Email notifications

### Long Term
- [ ] Backend API integration
- [ ] User authentication
- [ ] Inventory management system
- [ ] Analytics dashboard
- [ ] Multi-language support (Hindi/English)

## 🐛 Troubleshooting

### Common Issues

**Logo Not Showing:**
- Ensure `logo.jpg` is in root directory (same folder as index.html)
- Check file name is exactly `logo.jpg` (case-sensitive)
- Wait 5-10 minutes after upload for GitHub Pages to update

**Phone Numbers Not Clickable on Mobile:**
- Phone numbers are automatically clickable on mobile devices
- Format: `<a href="tel:+919742677711">97426 77711</a>`

**Google Maps Links Not Working:**
- Ensure links are properly formatted with `https://`
- Check that `target="_blank"` opens in new tab
- Test: Malleshwaram, Marathahalli, HSR Layout links

**Email Links Not Working:**
- Format: `<a href="mailto:support@theonesourceitsolutions.com">`
- Should open default email app

## 📄 Credits

- **Website Development**: Comprehensive marketplace solution
- **Design**: Modern, professional UI/UX
- **Developed by**: [RajMohanAcharya](https://rajmohanacharya.github.io/) - Site Reliability Engineer
- **Company**: The One Source IT Solutions

## 🤝 Support

For technical support or customizations:
- **Developer**: [RajMohanAcharya](https://rajmohanacharya.github.io/)
- **Email**: rajmohanacharya@outlook.com
- **Business Contact**: support@theonesourceitsolutions.com

## 📄 License

This project is customized for The One Source IT Solutions. Built with modern web standards and best practices.

---

**Made with ❤️ by [RajMohanAcharya](https://rajmohanacharya.github.io/)**

> Ready-to-deploy laptop marketplace for The One Source IT Solutions with professional features, mobile optimization, and business integration across 3 Bangalore locations.
