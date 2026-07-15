# Deploying HostLore

> HostLore works in two modes:
> - **Static** (no backend) — open `index.html` directly or deploy to any CDN
> - **Dynamic** (with backend) — run the Express server for the Ask API + GitHub issue auto-creation

---

## Option 1 — GitHub Pages (static, free, 5 minutes)

Best for: Portfolio / demo deployment with no backend features.

```bash
# 1. Push your code to GitHub
git push origin main

# 2. Go to repository Settings → Pages
# 3. Source: "Deploy from a branch"
# 4. Branch: main, folder: / (root)
# 5. Save

# Your site is live at:
# https://<your-username>.github.io/WEB-HOSTING/
```

> **Note:** In static mode, "Ask HostLore" matches topics client-side and opens GitHub Issues manually (new tab). The backend API is not available.

---

## Option 2 — Railway (dynamic backend, free tier)

Railway auto-detects Node.js projects and has a generous free tier.

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. From the project root:
railway init

# 4. Set environment variables in Railway dashboard:
#    GITHUB_TOKEN  — your GitHub PAT
#    GITHUB_OWNER  — nandinigoyaldev (or your fork)
#    GITHUB_REPO   — WEB-HOSTING
#    ADMIN_KEY     — a random secret string

# 5. Deploy
railway up

# Railway will give you a URL like:
# https://hostlore-production-abc1.up.railway.app
```

---

## Option 3 — Render (dynamic backend, free tier)

```bash
# 1. Go to https://render.com → New → Web Service
# 2. Connect your GitHub repo
# 3. Configure:
#    Build Command:  npm install
#    Start Command:  node server.js
#    Environment:    Node

# 4. Add environment variables in Render dashboard:
#    GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, ADMIN_KEY

# 5. Click "Create Web Service"
#    ⚠️  Free tier spins down after 15 min inactivity (30s cold start)
```

---

## Option 4 — Vercel (static frontend only)

Vercel is great for the frontend but **does not run the Express backend** on its free tier the same way.

```bash
npm install -g vercel
vercel --prod
# Follow prompts, select "Other" as framework
# → Static frontend deployed, Ask feature falls back to client-side mode
```

> For full backend support on Vercel, you would need to convert `server.js` into Vercel Serverless Functions. That's a more advanced setup — stick with Railway or Render for the backend.

---

## Option 5 — DigitalOcean Droplet (VPS, $6/month)

For the most control:

```bash
# 1. Create a Ubuntu 22.04 Droplet ($6/month)

# 2. SSH into your droplet
ssh root@YOUR_DROPLET_IP

# 3. Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 4. Clone your repo
git clone https://github.com/nandinigoyaldev/WEB-HOSTING.git
cd WEB-HOSTING

# 5. Install dependencies
npm install

# 6. Create .env
cp .env.example .env
nano .env  # Fill in GITHUB_TOKEN, ADMIN_KEY, PORT=3000

# 7. Install PM2 (process manager)
npm install -g pm2

# 8. Start with PM2
pm2 start server.js --name hostlore
pm2 startup
pm2 save

# 9. (Optional) Set up Nginx as reverse proxy on port 80
apt install nginx
# Configure nginx to proxy_pass to localhost:3000
```

---

## Environment variables reference

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `3000` | Port the server listens on |
| `GITHUB_TOKEN` | For auto-issues | — | GitHub Personal Access Token (`public_repo` scope) |
| `GITHUB_OWNER` | No | `nandinigoyaldev` | GitHub username |
| `GITHUB_REPO` | No | `WEB-HOSTING` | Repository name |
| `ADMIN_KEY` | For admin API | — | Secret key for `GET /api/questions` |

---

## Creating a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens → **Generate new token (classic)**
2. Name: `hostlore-backend`
3. Scopes: check only `public_repo`
4. Copy the token and set it as `GITHUB_TOKEN` in your `.env`

---

## Verifying your deployment

```bash
# Check health
curl https://YOUR_URL/api/health

# Expected:
# {"status":"ok","service":"HostLore","version":"1.0.0","githubEnabled":true,...}

# Test the Ask API
curl -X POST https://YOUR_URL/api/questions \
  -H "Content-Type: application/json" \
  -d '{"question":"What is DNS?"}'

# Expected:
# {"success":true,"matched":true,"section":"journey","label":"DNS Lookup (Step 2)"}
```
