# Deployment Guide

This guide covers deploying the Nectar Grocery Delivery App to production.

## 🚀 Quick Deploy to Vercel (Recommended)

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd frontend_task
vercel

# For production deployment
vercel --prod
```

### Option 2: GitHub Integration (Easiest)

1. **Push code to GitHub:**
```bash
git remote add origin <your-github-repo>
git branch -M main
git push -u origin main
```

2. **Connect to Vercel:**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Select your GitHub repository
- Vercel automatically detects Vite
- Click "Deploy"

3. **Automatic Deployments:**
- Every push to main will trigger a deployment
- Preview URLs for pull requests

## 🔗 Netlify Deployment

### Option 1: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Option 2: Drag & Drop

1. **Build the project:**
```bash
npm run build
```

2. **Deploy:**
- Go to [netlify.com](https://netlify.com)
- Drag and drop the `dist` folder
- Your site is live!

### Option 3: GitHub Integration

1. **Push to GitHub** (same as Vercel steps above)
2. **Connect Netlify:**
- Go to [netlify.com](https://netlify.com)
- Click "New site from Git"
- Select GitHub and your repository
- Build command: `npm run build`
- Publish directory: `dist`

## 🔧 Environment Configuration

### Vercel Environment Variables

1. Go to Project Settings → Environment Variables
2. Add any needed variables:
```
VITE_API_URL=https://api.example.com
VITE_ENVIRONMENT=production
```

### Update your .env file locally:
```
VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## ✅ Pre-deployment Checklist

- [ ] Run `npm run build` - no errors
- [ ] Run `npm run lint` - all checks pass
- [ ] Test all routes and flows
- [ ] Test on mobile and desktop
- [ ] Check image optimization
- [ ] Review TypeScript types (strict mode)
- [ ] Test in production-like environment
- [ ] Update README with live URL
- [ ] Set up domain/custom domain
- [ ] Enable HTTPS (automatic)
- [ ] Configure redirects if needed

## 🎯 Performance Optimization

### Before Deployment

1. **Optimize Images:**
```bash
# Convert to WebP for smaller file sizes
# Use image compression tools
```

2. **Check Bundle Size:**
```bash
npm run build
# Check the output size in terminal
```

3. **Enable Compression:**
- Already handled by Vercel/Netlify

4. **Cache Strategy:**
- Static assets are cached automatically
- Set cache expiration in vercel.json if needed

### vercel.json Configuration (Optional)

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "VITE_API_URL": "@vite_api_url"
  },
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/index.html"
    }
  ]
}
```

## 🔐 Security Checklist

- [ ] No sensitive keys in code
- [ ] Use environment variables for secrets
- [ ] TypeScript strict mode enabled
- [ ] No `eval()` or unsafe functions
- [ ] Content Security Policy headers (if configured)
- [ ] HTTPS enabled (automatic)
- [ ] Build process verified
- [ ] Dependencies up to date

## 🌍 Custom Domain Setup

### With Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. SSL/TLS certificate auto-provisioned

### With Netlify:
1. Go to Site Settings → Domain Management
2. Add Domain
3. Update DNS records
4. Certificate auto-provisioned

## 📊 Monitoring & Analytics

### Enable Vercel Analytics:
1. Install package:
```bash
npm install @vercel/analytics @vercel/web-vitals
```

2. Add to App.tsx:
```typescript
import { Analytics } from '@vercel/analytics/react';

export const App = () => (
  <>
    <Router>
      {/* ... routes ... */}
    </Router>
    <Analytics />
  </>
);
```

### Enable Sentry for Error Monitoring (Optional):
```bash
npm install @sentry/react
```

## 🔄 CI/CD Pipeline

### GitHub Actions (Automatic Testing)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

## 🐛 Troubleshooting

### Build Fails on Vercel/Netlify

1. **Check Node version:**
```bash
node --version  # Should be 16+
```

2. **Clear build cache:**
- Vercel: Project Settings → Caching → Purge Everything
- Netlify: Site Settings → Clear Cache and Deploy

3. **Check logs:**
- Vercel: Deployments → View Details
- Netlify: Deploys → Deploy Logs

### 404 on Refresh

If you get 404 on page refresh, add this configuration:

**vercel.json:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**netlify.toml:**
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📈 Staging Environment

### Deploy to Staging First

```bash
# Staging branch
git checkout -b staging
git push -u origin staging

# Vercel auto-creates preview environments
# Test everything before merging to main
```

## 🎉 Post-Deployment

1. Test live URL thoroughly
2. Check analytics
3. Monitor error logs
4. Gather user feedback
5. Plan next features/updates
6. Document deployment process

## 📚 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Best Practices](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Your Nectar app is now ready for the world! 🚀
