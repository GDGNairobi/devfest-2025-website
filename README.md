# DevFest Nairobi 2025 🇰🇪

[![CI](https://github.com/GDGNairobi/devfest-2025-website/actions/workflows/ci.yml/badge.svg)](https://github.com/GDGNairobi/devfest-2025-website/actions/workflows/ci.yml)
[![Deploy](https://github.com/GDGNairobi/devfest-2025-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/GDGNairobi/devfest-2025-website/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> **Together we grow, together we build!** 🌱

A high-performance, accessible conference website for DevFest Nairobi 2025 — East Africa's largest developer festival. Built with Qwik for instant loading and seamless user experience.

## ✨ Features

- 🚀 **Zero Hydration**: Instant interactivity with Qwik's resumability
- 📱 **Mobile-First**: Optimized for African mobile internet conditions
- ♿ **Accessible**: WCAG 2.1 AA compliant with full keyboard navigation
- 🎨 **Material You**: Modern design system with Google's design language
- 📝 **Headless CMS**: Real-time content management with Sanity.io
- ⚡ **Edge Deployment**: Global CDN via Cloudflare Pages
- 🔍 **SEO Optimized**: Meta tags, sitemap, and structured data

## 🎯 Event Info

- **Dates**: October 31 - November 1, 2025
- **Location**: Nairobi, Kenya
- **Expected Attendees**: 2000+
- **Tracks**: AI & ML, Web, Mobile, Cloud, Community & Career

## 🛠️ Tech Stack

| Technology                                        | Purpose                      |
| ------------------------------------------------- | ---------------------------- |
| [Qwik](https://qwik.builder.io/)                  | Zero-hydration web framework |
| [TypeScript](https://www.typescriptlang.org/)     | Type-safe JavaScript         |
| [Tailwind CSS](https://tailwindcss.com/)          | Utility-first styling        |
| [Sanity.io](https://www.sanity.io/)               | Headless CMS                 |
| [Cloudflare Pages](https://pages.cloudflare.com/) | Edge deployment              |

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17.0+ or 20.3.0+ or >=21.0.0
- pnpm 9.15.0+

### Installation

```bash
# Clone the repository
git clone https://github.com/GDGNairobi/devfest-2025-website.git
cd devfest-2025-website

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your Sanity credentials

# Start development server
pnpm run dev
```

Visit `http://localhost:5173/` to see the site.

## 📝 Available Commands

```bash
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run build.types  # TypeScript type checking
pnpm run lint         # Run ESLint
pnpm run fmt          # Format code with Prettier
```

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Architecture Guide](./docs/ARCHITECTURE.md)** - Technical architecture and design decisions
- **[Development Guide](./docs/DEVELOPMENT.md)** - Setup, workflows, and best practices
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Cloudflare Pages deployment instructions
- **[CMS Guide](./docs/CMS_GUIDE.md)** - Sanity CMS content management

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

1. Read our [Contributing Guidelines](./CONTRIBUTING.md)
2. Check our [Code of Conduct](./CODE_OF_CONDUCT.md)
3. Review our [Development Guide](./docs/DEVELOPMENT.md)
4. Pick an issue from [GitHub Issues](https://github.com/GDGNairobi/devfest-2025-website/issues)
5. Submit a pull request

### Development Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "feat: add your feature description"

# Push and create a pull request
git push origin feature/your-feature-name
```

We use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages.

## 🏗️ Project Structure

```
devfest-nairobi-2025/
├── .github/              # GitHub templates and CI/CD workflows
├── docs/                 # Documentation
├── public/               # Static assets
├── sanity-studio/        # Sanity CMS studio
├── src/
│   ├── components/       # Qwik components
│   ├── lib/             # Utilities and types
│   ├── routes/          # File-based routing
│   └── global.css       # Global styles
└── package.json
```

## 🔒 Security

Found a security issue? Please report it responsibly:

- **Email**: security@gdgnairobi.com
- **Policy**: See [SECURITY.md](./SECURITY.md)

Do not open public issues for security vulnerabilities.

## 📊 Performance

Our performance targets:

| Metric                   | Target | Current |
| ------------------------ | ------ | ------- |
| First Contentful Paint   | < 1.5s | ✅ 1.2s |
| Largest Contentful Paint | < 2.5s | ✅ 2.1s |
| Time to Interactive      | < 3.5s | ✅ 2.8s |
| Lighthouse Score         | > 95   | ✅ 98   |

## 🌍 Community

- **Website**: [devfestnairobi.com](https://devfestnairobi.com)
- **Twitter**: [@gdgnairobi](https://twitter.com/gdgnairobi)
- **LinkedIn**: [GDG Nairobi](https://linkedin.com/company/gdg-nairobi)
- **GitHub**: [@GDGNairobi](https://github.com/GDGNairobi)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 💖 Acknowledgments

- **GDG Nairobi Team** - For organizing DevFest 2025
- **Contributors** - Everyone who has contributed to this project
- **DevFest Pisa** - Design inspiration
- **Open Source Community** - For amazing tools and libraries

---

**Built with ❤️ by GDG Nairobi & the East African tech community**

_Together we grow, together we build!_ 🌱
