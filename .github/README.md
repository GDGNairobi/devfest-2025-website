# GitHub Configuration

This directory contains GitHub-specific configuration files including issue templates, pull request templates, and CI/CD workflows.

## Issue Templates

- **bug_report.md** - Template for reporting bugs or issues
- **feature_request.md** - Template for suggesting new features or enhancements

## Pull Request Template

The PR template ensures all contributors provide consistent information including:

- Description of changes
- Type of change
- Related issues
- Testing checklist
- Code review checklist

## Workflows

### CI Workflow (`ci.yml`)

Runs on every push to `main` and on all pull requests. Includes:

1. **Lint and Type Check**
   - Runs ESLint to check code quality
   - Runs TypeScript type checking
2. **Build**
   - Builds the project to ensure no build errors
   - Uploads build artifacts

### Deploy Workflow (`deploy.yml`)

Deploys to Cloudflare Pages automatically on push to `main` branch.

#### Required Secrets

To enable Cloudflare Pages deployment, add these secrets to your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following repository secrets:

| Secret Name             | Description                                 | How to Get                                                                                                   |
| ----------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARE_API_TOKEN`  | Cloudflare API token with Pages permissions | Go to Cloudflare Dashboard → Profile → API Tokens → Create Token → Select "Edit Cloudflare Workers" template |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID                  | Found in Cloudflare Dashboard → Workers & Pages → Overview (right sidebar)                                   |

#### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** → **Deploy to Cloudflare Pages**
2. Click **Run workflow**
3. Select branch and click **Run workflow**

## Using the Templates

### Creating Issues

When creating a new issue, GitHub will automatically prompt you to choose between:

- 🐛 Bug Report
- ✨ Feature Request

### Creating Pull Requests

The PR template will automatically populate when you create a new pull request. Fill out all relevant sections and check off completed items in the checklist.

## Workflow Status

You can view the status of workflows:

- In pull requests (checks section)
- On the Actions tab
- As badges in the README (optional)

## Contributing

For detailed contribution guidelines, see [CONTRIBUTING.md](../CONTRIBUTING.md).
