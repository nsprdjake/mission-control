# Deployment Guide for Mission Control 🚀

## Quick Deploy to Vercel (Recommended)

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `mission-control`
3. Keep it private or public (your choice)
4. Don't initialize with README (we already have one)

### Step 2: Push Code to GitHub

```bash
cd /Users/jack/.openclaw/workspace/mission-control

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/mission-control.git

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. Click "Import Project"
4. Select your `mission-control` repository
5. Vercel will auto-detect Next.js - keep all default settings
6. Click "Deploy"
7. Wait ~2 minutes for deployment to complete

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project directory
cd /Users/jack/.openclaw/workspace/mission-control
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? mission-control
# - In which directory is your code located? ./
# - Auto-detected settings? Yes
```

### Step 4: Configure Custom Domain (hub.nsprd.com)

**In Vercel Dashboard:**

1. Go to your project settings
2. Click "Domains" in the sidebar
3. Enter `hub.nsprd.com` in the domain field
4. Click "Add"
5. Vercel will show you DNS configuration needed

**In DreamHost (DNS Configuration):**

1. Log into [panel.dreamhost.com](https://panel.dreamhost.com)
2. Navigate to "Manage Domains"
3. Click "DNS" next to `nsprd.com`
4. Add a new CNAME record:
   - **Name/Host:** `hub`
   - **Type:** `CNAME`
   - **Value/Target:** `cname.vercel-dns.com`
   - **TTL:** 14400 (or default)
5. Click "Add Record Now!"

**Wait for DNS Propagation:**
- Usually takes 5-30 minutes
- Can take up to 48 hours in rare cases
- Check status at [dnschecker.org](https://dnschecker.org/#CNAME/hub.nsprd.com)

### Step 5: Verify Deployment

Once DNS has propagated:

1. Visit [https://hub.nsprd.com](https://hub.nsprd.com)
2. Check that all project cards load
3. Test the "Refresh Status" button
4. Verify mobile responsiveness
5. Check all project links work

## Environment Configuration

This project doesn't require environment variables! All project URLs are hardcoded in `app/page.tsx`.

If you need to add environment variables later:

```bash
# In Vercel dashboard:
# Settings → Environment Variables

# Or using CLI:
vercel env add VARIABLE_NAME
```

## Updating the Site

After making changes:

```bash
# Commit changes
git add .
git commit -m "Description of changes"
git push origin main

# Vercel will automatically redeploy!
```

## Monitoring

**Vercel Analytics:**
- Automatically enabled
- View at: vercel.com/your-username/mission-control/analytics

**Status Checks:**
- The app checks all live project URLs every time you click "Refresh Status"
- Status API endpoint: `/api/check-status?url=https://example.com`

## Troubleshooting

### Build Fails on Vercel

Check the build logs in Vercel dashboard. Common issues:
- TypeScript errors → fix in code
- Missing dependencies → check `package.json`

### Domain Not Working

1. Verify DNS records in DreamHost
2. Check DNS propagation: `dig hub.nsprd.com`
3. Ensure CNAME points to `cname.vercel-dns.com`
4. Wait longer (DNS can take time)

### Status Checks Not Working

- Some sites may block HEAD requests
- CORS may prevent client-side checks
- The API route should handle most cases

### Performance Issues

- Vercel Edge Network is globally distributed
- Should be <1s load time worldwide
- Check Vercel Speed Insights for metrics

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build locally
npm run build

# Test production build
npm start
```

## Custom Modifications

### Add a New Project

Edit `app/page.tsx`:

```typescript
const projects: Project[] = [
  // ... existing projects
  {
    id: 'new-project',
    name: 'New Project',
    emoji: '🎯',
    description: 'Project description',
    url: 'https://newproject.nsprd.com',
    status: 'live', // or 'in-progress' or 'coming-soon'
  },
];
```

### Add a New Quick Action

Edit `app/page.tsx`:

```typescript
const quickActions = [
  // ... existing actions
  { 
    id: 'newaction', 
    name: 'New Action', 
    icon: '🎯', 
    description: 'Action description' 
  },
];
```

Then update the `handleClick` function in `components/QuickAction.tsx` to add functionality.

### Change Colors/Theme

Edit `tailwind.config.ts` or component styles in:
- `components/ProjectCard.tsx`
- `components/QuickAction.tsx`
- `app/page.tsx`

## Support

For issues or questions:
- Check Vercel docs: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)

---

**Status:** ✅ Ready to deploy
**Time to deploy:** ~10 minutes
**Cost:** Free (Vercel free tier)
