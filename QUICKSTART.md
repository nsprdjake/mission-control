# Quick Start - Deploy Mission Control in 10 Minutes ⚡

## Prerequisites
- GitHub account
- Vercel account (free - sign up with GitHub at vercel.com)
- Access to DreamHost DNS for nsprd.com

## Step-by-Step Deployment

### 1. Create GitHub Repo (2 min)

```bash
# Go to: https://github.com/new
# Repository name: mission-control
# Private or Public: Your choice
# Don't check any initialization options
# Click "Create repository"
```

### 2. Push Code (1 min)

```bash
cd /Users/jack/.openclaw/workspace/mission-control

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mission-control.git

# Push
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel (2 min)

```bash
# Visit: https://vercel.com/new
# Click "Import Project"
# Select "mission-control" from your repos
# Keep all default settings
# Click "Deploy"
# Wait ~2 minutes ☕
```

### 4. Add Custom Domain (2 min)

**In Vercel:**
1. Go to project → Settings → Domains
2. Enter: `hub.nsprd.com`
3. Click "Add"
4. Note the CNAME instructions

**In DreamHost:**
1. Go to: https://panel.dreamhost.com
2. Manage Domains → DNS for nsprd.com
3. Add CNAME:
   - Name: `hub`
   - Type: `CNAME`  
   - Value: `cname.vercel-dns.com`
4. Save

### 5. Wait & Test (5-30 min)

DNS takes 5-30 minutes to propagate.

Check status:
```bash
# Check DNS
dig hub.nsprd.com

# Or visit
https://dnschecker.org/#CNAME/hub.nsprd.com
```

Once propagated:
- Visit: https://hub.nsprd.com
- Test all project links
- Click "Refresh Status"
- Check on mobile

## Done! 🎉

Your Mission Control is now live at **hub.nsprd.com**

## Quick Reference

**Project Location:**
```
/Users/jack/.openclaw/workspace/mission-control
```

**Update Site:**
```bash
cd /Users/jack/.openclaw/workspace/mission-control
# Make changes
git add .
git commit -m "Update description"
git push
# Vercel auto-deploys!
```

**Run Locally:**
```bash
cd /Users/jack/.openclaw/workspace/mission-control
npm run dev
# Visit http://localhost:3000
```

## Troubleshooting

**Domain not working?**
- Wait longer (DNS can take time)
- Check CNAME is correct in DreamHost
- Verify domain added in Vercel

**Build failed?**
- Check Vercel build logs
- Ensure package.json is in repo
- Try rebuilding from Vercel dashboard

**Status checks not working?**
- Normal - some sites block HEAD requests
- Check browser console for errors
- API route should handle most cases

## Need Help?

See full documentation:
- README.md - Complete docs
- DEPLOYMENT.md - Detailed deployment guide
- SUMMARY.md - Project overview

---

**Total Time:** ~10 minutes (+ DNS propagation)
**Cost:** $0 (Vercel free tier)
**Status:** Let's go! 🚀
