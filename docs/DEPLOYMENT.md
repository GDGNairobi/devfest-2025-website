# Deployment Guide

## Overview

The DevFest Nairobi 2025 website is deployed to Cloudflare Pages, leveraging their global edge network for optimal performance and reliability.

## Deployment Platforms

### Primary: Cloudflare Pages

**Why Cloudflare Pages?**

- Global edge network with 275+ locations
- Automatic HTTPS and SSL certificates
- DDoS protection included
- Perfect integration with Qwik
- Zero configuration deployments
- Preview deployments for PRs

## Prerequisites

### Required Accounts

1. **GitHub Account**: Repository access
2. **Cloudflare Account**: [Sign up here](https://dash.cloudflare.com/sign-up/pages)
3. **Sanity Account**: For CMS access

### Required Secrets

Add these to your GitHub repository secrets (Settings → Secrets and variables → Actions):

| Secret Name             | Description                | How to Get                                                    |
| ----------------------- | -------------------------- | ------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | API token for Wrangler     | Cloudflare Dashboard → Profile → API Tokens → Create Token    |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID | Cloudflare Dashboard → Workers & Pages → Account ID (sidebar) |

## Automated Deployment (Recommended)

### GitHub Actions Workflow

The project includes automated deployment via GitHub Actions (`.github/workflows/deploy.yml`).

**Triggers:**

- Push to `main` branch
- Manual workflow dispatch

**Process:**

1. Checkout code
2. Install dependencies (pnpm with caching)
3. Build project (`pnpm run build`)
4. Deploy to Cloudflare Pages using Wrangler

### Setup Steps

1. **Configure Secrets**:

   ```bash
   # Go to your GitHub repository
   # Settings → Secrets and variables → Actions
   # Add CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID
   ```

2. **Push to Main**:

   ```bash
   git push origin main
   ```

3. **Monitor Deployment**:
   - Go to Actions tab in GitHub
   - Watch deployment progress
   - View deployment summary when complete

### Manual Trigger

You can manually trigger deployment:

1. Go to **Actions** tab in GitHub
2. Select **Deploy to Cloudflare Pages**
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## Manual Deployment

### Using Wrangler CLI

1. **Install Wrangler**:

   ```bash
   pnpm install -g wrangler
   ```

2. **Login to Cloudflare**:

   ```bash
   wrangler login
   ```

3. **Build the Project**:

   ```bash
   pnpm install
   pnpm run build
   ```

4. **Deploy**:
   ```bash
   wrangler pages deploy dist --project-name=devfest-nairobi-2025
   ```

### First-time Setup

If deploying for the first time:

```bash
# Create a new Pages project
wrangler pages project create devfest-nairobi-2025

# Deploy
wrangler pages deploy dist --project-name=devfest-nairobi-2025
```

## Environment Variables

### Production Environment Variables

Configure in Cloudflare Pages Dashboard:

1. Go to **Workers & Pages** → Your project
2. Click **Settings** → **Environment variables**
3. Add the following variables:

| Variable                    | Value           | Description                         |
| --------------------------- | --------------- | ----------------------------------- |
| `PUBLIC_SANITY_PROJECT_ID`  | Your project ID | Found in Sanity project settings    |
| `PUBLIC_SANITY_DATASET`     | `production`    | Dataset name (usually 'production') |
| `PUBLIC_SANITY_API_VERSION` | `2024-01-01`    | API version date                    |

### Local Development Variables

Create a `.env.local` file:

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Note**: Never commit `.env.local` to version control!

## Build Configuration

### Cloudflare Pages Settings

If setting up manually in Cloudflare Dashboard:

| Setting                    | Value            |
| -------------------------- | ---------------- |
| **Build command**          | `pnpm run build` |
| **Build output directory** | `dist`           |
| **Root directory**         | `/`              |
| **Node version**           | `20.x`           |

### Build Optimization

The build process:

1. Installs dependencies with pnpm
2. Runs TypeScript type checking
3. Builds Qwik application
4. Optimizes assets (images, CSS, JS)
5. Generates static files and edge functions

## Custom Domain Setup

### Adding a Custom Domain

1. **In Cloudflare Pages**:
   - Go to your project → **Custom domains**
   - Click **Set up a custom domain**
   - Enter your domain (e.g., `devfest.gdgnairobi.com`)

2. **DNS Configuration**:

   ```
   CNAME devfest pointing to your-project.pages.dev
   ```

3. **SSL Certificate**:
   - Automatically provisioned by Cloudflare
   - Usually takes 1-5 minutes

### Domain Verification

Wait for DNS propagation (up to 24 hours), then verify:

```bash
dig devfest.gdgnairobi.com +short
```

## Preview Deployments

### Automatic Preview Deployments

Every pull request automatically gets a preview deployment:

1. **Create PR** → Triggers preview build
2. **Comment Added** → Link to preview deployment
3. **Test Changes** → Review in isolated environment
4. **Merge** → Deploys to production

### Preview URL Format

```
https://[commit-hash].devfest-nairobi-2025.pages.dev
```

## Rollback Procedure

### Using Cloudflare Dashboard

1. Go to **Deployments** tab
2. Find the previous working deployment
3. Click **︙** → **Rollback to this deployment**
4. Confirm rollback

### Using Git

```bash
# Find the last working commit
git log --oneline

# Revert to that commit
git revert HEAD
git push origin main

# Or reset (use with caution)
git reset --hard <commit-hash>
git push --force origin main
```

## Monitoring & Debugging

### Deployment Logs

**GitHub Actions**:

- Go to **Actions** tab
- Click on workflow run
- View detailed logs

**Cloudflare Pages**:

- Go to your project → **Deployments**
- Click on deployment
- View build logs

### Common Issues

#### Build Fails

**Symptom**: Build fails in CI/CD
**Solution**:

```bash
# Test locally first
pnpm run build

# Check TypeScript errors
pnpm run build.types

# Check for linting issues
pnpm run lint
```

#### Missing Environment Variables

**Symptom**: App works locally but fails in production
**Solution**:

- Verify all env vars are set in Cloudflare Pages
- Check variable names match exactly (including `PUBLIC_` prefix)

#### Slow Build Times

**Solution**:

- Cloudflare Pages caches dependencies automatically
- GitHub Actions uses pnpm caching
- Typical build time: 2-4 minutes

### Performance Monitoring

**Cloudflare Analytics**:

- Go to your project → **Analytics**
- Monitor page views, bandwidth, requests
- Track Core Web Vitals

**External Tools**:

- Google Analytics 4
- Google Search Console
- Lighthouse CI

## Best Practices

### Pre-deployment Checklist

- [ ] All tests pass locally
- [ ] TypeScript compiles without errors
- [ ] ESLint passes without errors
- [ ] Build succeeds locally
- [ ] Environment variables configured
- [ ] Preview deployment tested
- [ ] No console errors in browser

### Deployment Schedule

**Recommended**:

- **Major updates**: Outside peak traffic hours
- **Hotfixes**: As needed (automated rollback available)
- **Content updates**: Anytime (via Sanity CMS)

### Security Considerations

1. **Never commit secrets** to version control
2. **Rotate API tokens** regularly (every 90 days)
3. **Use least-privilege** access for API tokens
4. **Enable 2FA** on all accounts
5. **Review deployment logs** regularly

## Troubleshooting

### Deployment Fails

```bash
# Check GitHub Actions logs
# Common causes:
# 1. Missing secrets
# 2. Build errors
# 3. Invalid Wrangler configuration
```

### Site Not Updating

```bash
# Clear Cloudflare cache
# In Cloudflare Dashboard:
# Caching → Configuration → Purge Everything

# Or use API:
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### SSL Certificate Issues

```bash
# Usually resolves automatically
# If persists:
# 1. Verify DNS is correct
# 2. Wait 24 hours for propagation
# 3. Contact Cloudflare support
```

## Support

### Resources

- **Cloudflare Docs**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/)
- **Wrangler Docs**: [developers.cloudflare.com/workers/wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **GitHub Actions Docs**: [docs.github.com/actions](https://docs.github.com/actions)

### Getting Help

- **Cloudflare Community**: [community.cloudflare.com](https://community.cloudflare.com/)
- **GitHub Issues**: Project repository issues
- **GDG Nairobi**: tech@gdgnairobi.com
