# Contributing to DevFest Nairobi 2025 Website

First off, thank you for considering contributing to DevFest Nairobi 2025! 🎉 It's people like you that make DevFest Nairobi such a great event for the East African tech community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Guidelines](#coding-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Getting Help](#getting-help)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior via GitHub Issues.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected
- **Include screenshots** if relevant
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **Include mockups or examples** if applicable

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good-first-issue` - Good for newcomers
- `help-wanted` - Extra attention needed
- `documentation` - Documentation improvements

### Pull Requests

- Fill in the required PR template
- Follow the coding guidelines
- Include screenshots for UI changes
- Update documentation as needed
- Add tests if applicable

## Development Setup

### Prerequisites

- **Node.js**: v18.17.0 or v20.3.0 or >=21.0.0
- **pnpm**: 9.15.0 or higher (recommended package manager)
- **Git**: Latest version

### Setup Steps

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR-USERNAME/devfest-2025-website.git
   cd devfest-2025-website
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Sanity credentials:
   - `PUBLIC_SANITY_PROJECT_ID` - Get from [Sanity Dashboard](https://www.sanity.io/manage)
   - `PUBLIC_SANITY_DATASET` - Usually `production`
   - `SANITY_WRITE_TOKEN` - Create from Sanity project settings (for seeding data)

4. **Set up Sanity Studio (optional, for CMS changes)**

   ```bash
   cd sanity-studio
   pnpm install
   pnpm dev
   ```

   Sanity Studio will run at <http://localhost:3333>

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   The site will be available at <http://localhost:5173>

### Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm fmt              # Format code with Prettier
pnpm fmt.check        # Check formatting
pnpm build.types      # Type check with TypeScript

# Sanity CMS
pnpm seed:schedule    # Seed schedule data (requires SANITY_WRITE_TOKEN)

# Deployment
pnpm deploy           # Deploy to Cloudflare Pages
pnpm serve            # Serve built site locally
```

## Project Structure

```
devfest-nairobi-2025/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # UI primitives (buttons, cards)
│   │   ├── layout/      # Layout components
│   │   ├── icons/       # Icon components
│   │   └── sections/    # Page sections
│   ├── routes/          # Qwik file-based routing
│   ├── lib/             # Utilities and configurations
│   │   ├── sanity.ts   # Sanity CMS client
│   │   ├── types.ts    # TypeScript types
│   │   └── utils.ts    # Utility functions
│   └── styles/          # Global styles
├── sanity-studio/       # Sanity Studio (CMS)
│   └── schemaTypes/    # Content schemas
├── public/              # Static assets
└── scripts/             # Build/utility scripts
```

## Coding Guidelines

### TypeScript

- Use TypeScript for all new files
- Define explicit types for component props
- Avoid `any` - use proper types or `unknown`
- Use interfaces for objects, types for unions/primitives

```typescript
// ✅ Good
interface ButtonProps {
  variant?: "primary" | "secondary";
  onClick$?: QRL<() => void>;
}

// ❌ Bad
interface ButtonProps {
  variant?: any;
  onClick$?: any;
}
```

### Qwik Components

- Use `component$` for all components
- Props should have typed interfaces
- Use signals (`useSignal`) for reactive state
- Leverage Qwik's lazy loading capabilities

```typescript
import { component$, useSignal } from "@builder.io/qwik";

interface MyComponentProps {
  title: string;
}

export const MyComponent = component$<MyComponentProps>(({ title }) => {
  const count = useSignal(0);

  return <div>{title}</div>;
});
```

### Styling

- Use Tailwind CSS for styling
- Follow Tailwind v4 syntax (use `bg-linear-*` not `bg-gradient-*`)
- Use semantic class names
- Prefer utility classes over custom CSS

```tsx
// ✅ Good
<button class="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
  Click me
</button>

// ❌ Avoid custom styles
<button style="background: blue; padding: 8px 16px;">
  Click me
</button>
```

### Accessibility

- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers when possible

```tsx
// ✅ Good
<button
  onClick$={handleClick}
  aria-label="Close dialog"
  type="button"
>
  ✕
</button>

// ❌ Bad
<div onClick$={handleClick}>✕</div>
```

### File Naming

- **Components**: PascalCase - `SessionCard.tsx`
- **Utilities**: camelCase - `schedule-utils.ts`
- **Types**: camelCase - `types.ts`
- **Constants**: UPPER_SNAKE_CASE - `const MAX_SESSIONS = 10`

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(schedule): add filter by track functionality

Added a new TrackFilter component that allows users to filter
sessions by track category.

Closes #123

---

fix(header): mobile menu not closing on navigation

The mobile menu now properly closes when a navigation link is clicked.

---

docs(contributing): add accessibility guidelines

Added section on accessibility requirements for components.
```

## Pull Request Process

1. **Create a feature branch**

   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow coding guidelines
   - Add tests if applicable

3. **Test your changes**

   ```bash
   pnpm lint          # Check linting
   pnpm fmt.check     # Check formatting
   pnpm build.types   # Type check
   pnpm build         # Test build
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat(scope): your descriptive message"
   ```

5. **Push to your fork**

   ```bash
   git push origin feat/your-feature-name
   ```

6. **Create a Pull Request**
   - Use a clear title and description
   - Reference any related issues
   - Add screenshots for UI changes
   - Request review from maintainers

7. **Address review feedback**
   - Make requested changes
   - Push updates to the same branch
   - Respond to comments

8. **Merge**
   - Once approved, a maintainer will merge your PR
   - Your contribution will be part of the next release!

### PR Checklist

Before submitting your PR, ensure:

- [ ] Code follows project style guidelines
- [ ] Commit messages follow conventional commits
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No linting errors
- [ ] Screenshots included for UI changes
- [ ] Accessibility requirements met
- [ ] Browser testing completed (Chrome, Firefox, Safari, Edge)

## Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and community discussions
- **Discord**: Real-time community chat (link in README)

### Maintainers

For urgent matters or security concerns, use GitHub Issues or Discussions.

- **GDG Nairobi**: [@gdgnairobi](https://twitter.com/gdgnairobi)

## Recognition

Contributors will be recognized in:

- GitHub contributors page
- CONTRIBUTORS.md file
- DevFest website (for significant contributions)
- Event credits

---

Thank you for contributing to DevFest Nairobi 2025! 🎉

Together we grow, together we build! 🌱
