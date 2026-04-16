# Nectar - Grocery Delivery Web Application

A modern, fully responsive grocery delivery web application built with React, TypeScript, Tailwind CSS, and Zustand.

## 🚀 Features

### Authentication & Onboarding
- ✅ Splash screen with animated loading
- ✅ Multi-step onboarding carousel
- ✅ Login with email and password
- ✅ Sign up with validation
- ✅ OTP/Phone verification with countdown timer
- ✅ Location selection for delivery

### Main Application
- ✅ Home screen with category filters
- ✅ Product listing with search and filters
- ✅ Product detail page with ratings and reviews
- ✅ Advanced search with debouncing
- ✅ Category-based filtering
- ✅ Price range filtering
- ✅ Sorting (price, rating, newest)

### Shopping Features
- ✅ Add to cart with quantity selector
- ✅ Cart management with quantity update
- ✅ Favorites/Wishlist system
- ✅ Remove items from cart
- ✅ Cart summary with totals

### Checkout & Orders
- ✅ Checkout page with delivery address
- ✅ Multiple payment methods
- ✅ Promo code support (Try: WELCOME10)
- ✅ Order confirmation page
- ✅ Order failure handling
- ✅ Real-time order tracking

### User Account
- ✅ User profile management
- ✅ Delivery address management
- ✅ Order history view
- ✅ Payment methods
- ✅ Settings and preferences
- ✅ Help and support

### UI/UX Features
- ✅ Mobile-first responsive design
- ✅ Desktop optimized layouts
- ✅ Loading skeletons
- ✅ Empty states
- ✅ Error states
- ✅ Smooth transitions and animations
- ✅ Bottom navigation for mobile
- ✅ Sticky headers
- ✅ Keyboard accessibility

## 📱 Responsive Design

### Mobile (Primary)
- Matches Figma design closely
- Bottom navigation for easy access
- Touch-friendly buttons and inputs
- Card-based layout
- Optimized spacing and typography

### Desktop
- Max-width container (max-w-7xl)
- Product grid with 4-5 columns
- Sidebar navigation
- Sticky cart summary
- Horizontal layout optimization

## 🛠 Tech Stack

### Mandatory Stack
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Global state management
- **React Router v6** - Client-side routing

### State Management with Zustand
- **authStore** - Authentication and user state
- **cartStore** - Shopping cart management
- **favoritesStore** - Favorites/wishlist
- **productStore** - Products and filtering
- **locationStore** - Delivery locations

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── ProductCard.tsx
│   ├── Header.tsx
│   ├── BottomNavigation.tsx
│   ├── UI.tsx           # Skeleton, Empty, Error states
│   └── index.ts
├── screens/
│   ├── auth/            # Authentication screens
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   ├── VerificationScreen.tsx
│   │   ├── LocationSelectScreen.tsx
│   │   └── index.ts
│   └── app/             # Main application screens
│       ├── HomeScreen.tsx
│       ├── SearchScreen.tsx
│       ├── ProductDetailScreen.tsx
│       ├── CartScreen.tsx
│       ├── FavoritesScreen.tsx
│       ├── AccountScreen.tsx
│       ├── CheckoutScreen.tsx
│       ├── OrderSuccessScreen.tsx
│       ├── OrderFailureScreen.tsx
│       └── index.ts
├── stores/              # Zustand stores
│   ├── authStore.ts
│   ├── cartStore.ts
│   ├── favoritesStore.ts
│   ├── productStore.ts
│   └── locationStore.ts
├── types/
│   └── index.ts         # TypeScript interfaces and enums
├── utils/
│   └── helpers.ts       # Utility functions
├── data/
│   ├── mockProducts.ts  # Mock product data
│   └── mockLocations.ts # Mock location data
├── styles/
│   └── globals.css      # Global styles
├── App.tsx              # Main app with routing
└── main.tsx             # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. **Clone or navigate to the project:**
```bash
cd frontend_task
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start development server:**
```bash
npm run dev
# or
yarn dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🔑 Key Features Explained

### Authentication Flow
1. **Splash Screen** → Shows branding while checking auth state
2. **Onboarding** → Multi-slide carousel introducing app features
3. **Login/Signup** → Email and password authentication
4. **OTP Verification** → 4-digit code verification with countdown
5. **Location Selection** → Choose delivery address
6. **Home Screen** → Main app dashboard

### State Management

All global state is managed with Zustand stores:

```typescript
// Example: Adding to cart
import { useCartStore } from '@/stores/cartStore';

const { addItem, getTotalItems } = useCartStore();
addItem(product, quantity);
const total = getTotalItems();
```

### API Simulation

The app uses `simulateDelay()` utility for realistic API call simulation:

```typescript
import { simulateDelay } from '@/utils/helpers';

const handleSubmit = async () => {
  await simulateDelay(1500); // Simulate 1.5s API call
  // Handle success
};
```

## 💰 Testing Promo Codes

- **WELCOME10** - 10% discount on your order

## 📊 Styling Guidelines

### Colors
- **Primary Green**: `#22c55e` - Main brand color
- **Secondary Orange**: `#FC6A3F` - Accent color
- **Danger Red**: `#F4330F` - Error states
- **Warning Yellow**: `#FFD233` - Warnings

### Spacing
- Uses Tailwind spacing scale (4px base unit)
- Custom spacing: `4.5, 5.5, 6.5` units

### Typography
- Font family: System fonts with fallback
- Responsive text sizes
- Clear hierarchy with font weights

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Color contrast compliance (WCAG AA)
- Form validation with error messages

## 🚀 Deployment

The app is ready to deploy on:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Then drag and drop the dist folder to Netlify
```

### GitHub Pages
Update `vite.config.ts` with base URL and deploy the dist folder.

## 📝 Git Workflow

1. Initialize git: `git init`
2. Add all files: `git add .`
3. Commit: `git commit -m "Initial commit: Complete Nectar app"`
4. Add remote: `git remote add origin <your-repo-url>`
5. Push: `git push -u origin main`

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📞 Support

For issues or questions, please refer to the code comments and TypeScript types for guidance.

## 📄 License

This project is for educational purposes. Built as part of frontend internship assignment.

## ✨ Code Quality

- **TypeScript** - Strict mode enabled, no `any` types
- **ESLint** - Configured for React and TypeScript
- **Tailwind CSS** - Utility-first, no custom CSS needed
- **Type Safety** - Full type coverage with interfaces and enums
- **Performance** - Optimized renders, debounced search, lazy loading

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
#   N e o s o p h i c a l _ t a s k  
 