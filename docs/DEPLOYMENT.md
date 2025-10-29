# Deployment

## Quick Deploy

The site auto-deploys to Cloudflare Pages when you push to `main` branch.

## Setup (One-time)

1. **Add GitHub Secrets** (Settings → Secrets → Actions):
   - `CLOUDFLARE_API_TOKEN` - Get from Cloudflare Dashboard → Profile → API Tokens
   - `CLOUDFLARE_ACCOUNT_ID` - Get from Cloudflare Dashboard → Workers & Pages

2. **Push to main**:
   ```bash
   git push origin main
   ```

3. **Done!** Check Actions tab for deployment status.

## Manual Deploy

```bash
# Install Wrangler
pnpm install -g wrangler

# Login
wrangler login

# Build and deploy
pnpm run build
wrangler pages deploy dist --project-name=devfest-nairobi-2025
```

## Environment Variables

Add in Cloudflare Pages Dashboard (Settings → Environment variables):

```
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Custom Domain

1. Go to Cloudflare Pages → Custom domains
2. Add your domain (e.g., `devfest.gdgnairobi.com`)
3. Update DNS: `CNAME devfest → your-project.pages.dev`
4. Wait for SSL (1-5 minutes)

## Rollback

Find previous deployment in Cloudflare Dashboard → Deployments → Click ︙ → Rollback.

## Troubleshooting

**Build fails?**
```bash
# Test locally first
pnpm run build
pnpm run build.types
```

**Site not updating?**
- Wait 1-2 minutes for cache
- Check if deployment succeeded in Actions tab
- Hard refresh browser (Cmd/Ctrl + Shift + R)

**Need help?**
- Check [Cloudflare Docs](https://developers.cloudflare.com/pages/)
- Open an issue on GitHub
