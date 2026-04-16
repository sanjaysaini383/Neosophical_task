# Quick Start Guide

Get up and running with Nectar in 5 minutes!

## 📋 Prerequisites

- Node.js 16+ (Download from [nodejs.org](https://nodejs.org))
- npm or yarn package manager
- Git (for version control)
- Code editor (VS Code recommended)

## ⚡ Quick Start

### 1. Install Dependencies

```bash
cd frontend_task
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will automatically open at `http://localhost:5173`

### 3. Login Flow

When you first run the app:
1. **Splash Screen** appears (2 seconds)
2. Auto-redirects to **Onboarding**
3. Click "Get Started" or "Skip"
4. **Login** to the app
   - Email: Can use any email
   - Password: Min 6 characters
5. **OTP Verification** (auto-filled works)
6. **Select Delivery Location**
7. Access to main **Home Screen**

## 🛍️ Try Features

### Navigation
- **Bottom Buttons** (Mobile): Shop → Explore → Cart → Favorites → Account
- **Home Screen**: Browse products, categories, search

### Shopping
1. Click any product to see details
2. Add to cart (adjust quantity first)
3. Go to Cart → Proceed to Checkout
4. Try promo code: `WELCOME10` (10% OFF)
5. Place order → Success screen

### Search & Filter
- Click "Explore" or search icon
- Search products by name
- Filter by category, price range
- Sort by price or rating

### Account
- View profile info
- Manage delivery addresses
- Logout and login again

## 💻 Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📁 Where to Make Changes

### Add a New Component
Create in `/src/components/MyComponent.tsx`:
```typescript
interface MyComponentProps {
  title: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return <div>{title}</div>;
};
```

### Update Store
Edit `/src/stores/cartStore.ts`:
```typescript
addCustomMethod: (data: Type) => {
  set({ /* ... */ });
}
```

### Add New Product
Edit `/src/data/mockProducts.ts`:
```typescript
{
  id: '21',
  name: 'New Product',
  // ... rest of fields
}
```

### Change Colors/Styles
Edit `/tailwind.config.js` for theme changes
Or use inline Tailwind classes in components

## 🔧 Debugging

### Use React Developer Tools
Install [React DevTools extension](https://chromewebstore.google.com/detail/react-developer-tools/) for Chrome

### Check Console
- Open DevTools: `F12` or `Ctrl+Shift+I`
- Check Console tab for errors
- All API calls are logged

### Redux DevTools for Zustand
Install [Redux DevTools](https://github.com/reduxjs/redux-devtools) to debug state

## ❓ Frequently Asked Questions

### How do I change the app name/logo?

1. Edit `src/App.tsx` - Change "Nectar" text
2. Replace emoji icons (🌾 etc)
3. Update `title.html` in the header tag

### How do I add real API calls?

Replace mock data with actual API calls:
```typescript
// Before (mock):
const products = mockProducts;

// After (real API):
const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  fetch('/api/products')
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);
```

### How do I persist data (cart, favorites)?

Use Zustand with localStorage:
```typescript
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartStore>(
  persist(
    (set) => ({ /* ... */ }),
    { name: 'cart-storage' }
  )
);
```

### Why is TypeScript being strict?

It's a feature! Prevents bugs. Fix errors by:
- Using proper types: `const items: Product[] = []`
- Checking null/undefined: `if (user) { }`
- Avoiding `any`: Use proper interfaces

### How do I deploy?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps.

Quick deploy to Vercel:
```bash
npm install -g vercel
vercel
```

## 📚 Learning Resources

### React
- [React Official Docs](https://react.dev)
- [React Tutorial](https://react.dev/learn)
- [React Router Guide](https://reactrouter.com)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript for React](https://www.typescriptlang.org/docs/handbook/react.html)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind Component Examples](https://tailwindcss.com/docs/examples)

### Zustand
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [State Management Guide](https://zustand-demo.vercel.app/)

## 🚨 Troubleshooting

### Port 5173 Already in Use
```bash
# Kill the process or use different port
npm run dev -- --port 3000
```

### Module Not Found Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript Errors
```bash
# Check types without building
npx tsc --noEmit

# Strict mode - add types to variables
const items: Product[] = [];
```

### Styles Not Applying
```bash
# Make sure Tailwind file is imported
// Check src/main.tsx
import './styles/globals.css'

# Rebuild if needed
npm run dev
```

## 📞 Need Help?

1. **Check existing code** - Similar patterns likely exist
2. **Read comments** - Code has helpful explanations
3. **Check types** - TypeScript gives accurate error messages
4. **Check Resources** - Links in this guide
5. **Check git history** - See what changed and why

## ✅ Project Checklist

- [x] React + TypeScript setup
- [x] Tailwind CSS configured
- [x] Zustand stores created
- [x] All screens implemented
- [x] Responsive design (mobile + desktop)
- [x] State management
- [x] Mock data
- [x] Error handling
- [x] Loading states
- [x] Form validation

## 🎉 You're All Set!

Now you can:
- ✅ Run the app locally
- ✅ Make changes and see them hot-reload
- ✅ Add new features
- ✅ Deploy to production

Happy coding! 🚀

---

**Next Steps:**
1. Explore `/src` directory
2. Make a small change (change a color, text, etc)
3. See it update instantly (hot reload)
4. Deploy when ready!
