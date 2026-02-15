# Jake's Mission Control 🚀

Central hub for all of Jake's projects and tools at **hub.nsprd.com**.

## Features

### 🎯 Project Dashboard
- Grid view of all active projects
- Live status indicators for each site
- Direct links to each project
- Status badges (Live, In Progress, Coming Soon)

### ⚡ Quick Actions
- Access to AI agents (DevBot, ChatBot, CreativeBot, BizBot, ResearchBot)
- Today's reminders
- Recent wins tracker
- Bailey walk tracker

### 📊 System Overview
- Real-time system health checks
- Project statistics
- Quick action counters

## Projects

1. 🎯 **LifeOS** (pd.nsprd.com) - Life tracking dashboard
2. 🎮 **LYNE** (rp1.nsprd.com) - Generational wealth platform
3. 💼 **Inspired Design Portal** (portal.nsprd.com) - Business manager
4. 🧠 **Memory Palace** (memory.nsprd.com) - Memory archive
5. 🎬 **Faggnation Archive** (faggnation.nsprd.com) - Podcast archive
6. 🎨 **Desert Vibe Check** (vibe.nsprd.com) - Fun project

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial Mission Control setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mission-control.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

### 3. Configure Custom Domain

In Vercel dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add domain: `hub.nsprd.com`
4. Follow Vercel's DNS instructions

### 4. DreamHost DNS Setup

In DreamHost control panel:
1. Go to "Manage Domains"
2. Click "DNS" for nsprd.com
3. Add CNAME record:
   - Name: `hub`
   - Type: `CNAME`
   - Value: `cname.vercel-dns.com`
4. Save changes

DNS propagation may take a few minutes to 48 hours.

## Performance

- ⚡ Target load time: <1s
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Dark theme with smooth animations
- ♿ Accessible and semantic HTML

## File Structure

```
mission-control/
├── app/
│   ├── api/
│   │   └── check-status/
│   │       └── route.ts          # Status check API endpoint
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main dashboard page
├── components/
│   ├── ProjectCard.tsx            # Project card component
│   ├── QuickAction.tsx            # Quick action button component
│   └── StatusIndicator.tsx        # Status indicator dot
├── public/                        # Static assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## License

Private project for Jake's personal use.

---

Built with ❤️ using Next.js 15 & Tailwind CSS
