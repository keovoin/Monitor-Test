# Vercel Deployment Instructions for Cambodia Variant

## ⚠️ CRITICAL: Set Environment Variable

To deploy the Cambodia variant to Vercel, you **MUST** set the environment variable:

### In Vercel Dashboard:

1. Go to your project: https://vercel.com/[your-username]/[project-name]
2. Click **Settings** tab
3. Click **Environment Variables** in the left sidebar
4. Add a new variable:
   - **Name**: `VITE_VARIANT`
   - **Value**: `cambodia`
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**
6. **Redeploy** your site (go to Deployments tab → click ⋯ on latest deployment → Redeploy)

### Via Vercel CLI:

```bash
# Set environment variable
vercel env add VITE_VARIANT
# When prompted, enter: cambodia
# Select: Production, Preview, Development

# Then redeploy
vercel --prod
```

## Verification

After deployment, verify the Cambodia variant is active:

### 1. Check Map Position
- Map should automatically center on Cambodia (12.5657°N, 104.991°E)
- Zoom level should be around 7.5 (country-level)

### 2. Check News Sources
- Should see Phnom Penh Post, Khmer Times, VOA Cambodia
- Thai news should only show Cambodia-related articles
- No irrelevant global news

### 3. Browser Console Check
Open browser console (F12) and run:
```javascript
console.log(import.meta.env.VITE_VARIANT);
// Should output: "cambodia"
```

### 4. Check Local Storage
In browser console:
```javascript
console.log(localStorage.getItem('worldmonitor-variant'));
// Should output: "cambodia" or null (will use env var)
```

## Troubleshooting

### Problem: Still showing global view

**Solution 1**: Verify environment variable
```bash
vercel env ls
# Should show VITE_VARIANT = cambodia
```

**Solution 2**: Clear build cache
```bash
vercel --prod --force
```

**Solution 3**: Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Or clear localStorage:
  ```javascript
  localStorage.clear();
  location.reload();
  ```

### Problem: News not filtered correctly

**Check filter function**:
```javascript
import { isCambodiaRelevant } from './src/config/cambodia-config';
isCambodiaRelevant('Test headline about Cambodia');
// Should return: true
```

### Problem: Build failing

**Check build logs**:
1. Go to Vercel dashboard → Deployments
2. Click on failed deployment
3. Check build logs for errors

**Common issues**:
- Missing dependencies: `npm install`
- TypeScript errors: `npm run typecheck`
- Build command: Should be `npm run build:cambodia`

## Build Commands

### For Cambodia Variant

Set in Vercel dashboard under **Settings → General → Build & Development Settings**:

- **Build Command**: `npm run build:cambodia`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Alternative: Use Environment Variable

If you keep the default build command (`npm run build`), the variant will be determined by the `VITE_VARIANT` environment variable.

## Multiple Deployments

If you want to run multiple variants simultaneously:

### Option 1: Separate Projects

1. Create separate Vercel projects:
   - `worldmonitor-cambodia` → VITE_VARIANT=cambodia
   - `worldmonitor-global` → VITE_VARIANT=full
   - `worldmonitor-tech` → VITE_VARIANT=tech

### Option 2: Git Branches

1. Create branches:
   ```bash
   git checkout -b cambodia
   git checkout -b tech
   ```

2. In Vercel, connect different branches to different deployments

### Option 3: Deployment Contexts

Set different environment variables per context:
- **Production**: `VITE_VARIANT=cambodia`
- **Preview**: `VITE_VARIANT=cambodia`
- **Development**: `VITE_VARIANT=cambodia`

## Custom Domain Setup

### For Cambodia-Specific Domain

1. Add domain in Vercel (e.g., `cambodia.worldmonitor.app`)
2. Set DNS records:
   ```
   Type: CNAME
   Name: cambodia
   Value: cname.vercel-dns.com
   ```
3. Wait for SSL certificate (automatic)

## Environment Variables Checklist

### Required for Cambodia Variant
- ✅ `VITE_VARIANT=cambodia`

### Recommended API Keys
- ✅ `GROQ_API_KEY` - For AI classification
- ✅ `UPSTASH_REDIS_REST_URL` - For caching
- ✅ `UPSTASH_REDIS_REST_TOKEN` - For caching
- ✅ `ACLED_ACCESS_TOKEN` - For protest data
- ✅ `NASA_FIRMS_API_KEY` - For fire detection

### Optional Enhancements
- `FINNHUB_API_KEY` - For financial data
- `FRED_API_KEY` - For economic indicators
- `WINGBITS_API_KEY` - For flight tracking
- `AISSTREAM_API_KEY` - For maritime tracking

## Deployment Workflow

### Initial Setup
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Link project
vercel link

# 4. Set environment variable
vercel env add VITE_VARIANT
# Enter: cambodia

# 5. Deploy
vercel --prod
```

### Subsequent Deploys
```bash
# Just push to GitHub - Vercel will auto-deploy
git add .
git commit -m "Update Cambodia config"
git push origin main

# Or manual deploy
vercel --prod
```

## Performance Optimization

### For Cambodia Variant

1. **Enable Edge Caching**
   - API responses are cached automatically
   - RSS feeds cached for 5-10 minutes

2. **Enable Compression**
   - Gzip compression enabled by default
   - Reduces bandwidth by ~80%

3. **CDN Distribution**
   - Static assets served from global CDN
   - Fastest edge location selected automatically

## Monitoring

### Vercel Analytics
Enable in Vercel dashboard:
- **Analytics** → Enable
- Track page views, Core Web Vitals

### Custom Monitoring
Add to your `.env`:
```bash
VITE_ENABLE_LOGGING=true
```

Check browser console for:
- News filtering stats
- Map initialization
- API call timing

## Cost Considerations

### Vercel Free Tier Limits
- ✅ 100 GB bandwidth/month
- ✅ 100 deployments/day
- ✅ Automatic HTTPS
- ✅ Global CDN

### API Key Costs
Most APIs have free tiers:
- Groq: 14,400 requests/day (free)
- Upstash Redis: 10,000 commands/day (free)
- ACLED: Free for researchers
- NASA FIRMS: Free

## Security

### Environment Variables
- ✅ API keys stored in Vercel (server-side)
- ✅ Never committed to Git
- ✅ Not exposed to browser

### CORS Configuration
Edit `api/_cors.js` if needed:
```javascript
const ALLOWED_ORIGINS = [
  'https://your-domain.vercel.app',
  'https://cambodia.worldmonitor.app',
  'http://localhost:3000',
];
```

## Support

If you encounter issues:

1. **Check Vercel logs**: Dashboard → Deployments → Function Logs
2. **Check browser console**: F12 → Console tab
3. **Verify environment variables**: `vercel env ls`
4. **Test locally**: `VITE_VARIANT=cambodia vercel dev`

## Quick Reference

```bash
# Deploy Cambodia variant
VITE_VARIANT=cambodia vercel --prod

# Check current variant
vercel env ls | grep VITE_VARIANT

# Update environment variable
vercel env rm VITE_VARIANT
vercel env add VITE_VARIANT  # Enter: cambodia

# Force rebuild
vercel --prod --force

# View logs
vercel logs [deployment-url]
```

---

**Last Updated**: February 2026  
**Vercel Docs**: https://vercel.com/docs  
**Project Support**: Open an issue on GitHub
