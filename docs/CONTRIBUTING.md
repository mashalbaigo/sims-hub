# Contributing to Sims Hub

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/sims-hub.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Follow the development setup in [SETUP.md](./SETUP.md)

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules (run `npm run lint`)
- Format code with Prettier (run `npm run format`)
- Write meaningful variable and function names

### Commit Messages

```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Code style changes
refactor: Code refactoring
test: Add/update tests
chore: Dependency updates
```

Example:
```
feat: Add duplicate mod detection

- Scan mods folder for duplicate packages
- Highlight duplicates in UI
- Allow users to delete duplicates
```

### Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass: `npm run test`
4. Run linting: `npm run lint`
5. Create a descriptive PR title and description
6. Link related issues

### Branch Naming

- `feature/short-description` - New features
- `bugfix/short-description` - Bug fixes
- `docs/short-description` - Documentation
- `refactor/short-description` - Code refactoring

## Areas to Contribute

### 👨‍💻 Code

- Implement features from the roadmap
- Fix reported bugs
- Improve performance
- Add tests

### 📚 Documentation

- Update README
- Add code comments
- Create tutorials
- Fix typos

### 🐛 Testing

- Report bugs
- Test new features
- Suggest improvements
- Provide feedback

### 🎨 Design

- Improve UI/UX
- Create icons
- Design mockups
- Suggest color schemes

## Technology Stack

- **Frontend:** React 18, TypeScript
- **Desktop:** Electron 27
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Database:** SQLite
- **Build:** Vite

## File Structure for New Features

When adding a new feature, follow this structure:

```
Feature: Mod Recommendations
├── src/services/recommendations.ts    # Business logic
├── src/renderer/pages/Recommendations.tsx  # Page component
├── src/renderer/components/RecommendationCard.tsx  # UI component
├── src/renderer/store/recommendationStore.ts  # State management
└── tests/recommendations.test.ts      # Tests
```

## Common Tasks

### Adding a New Page

1. Create `src/renderer/pages/YourPage.tsx`
2. Add route in `src/renderer/App.tsx`
3. Add navigation link in `src/renderer/components/Navbar.tsx`
4. Create related store if needed
5. Add tests

### Adding a New Service

1. Create `src/services/yourService.ts`
2. Export functions and types
3. Add error handling
4. Add tests
5. Document in code comments

### Adding a New Component

1. Create `src/renderer/components/YourComponent.tsx`
2. Define prop interfaces
3. Add TypeScript types
4. Style with Tailwind CSS
5. Create example usage in Storybook (if applicable)

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Coverage report
npm run test:coverage
```

## Performance Tips

- Use React.memo for expensive components
- Lazy load heavy modules
- Optimize database queries
- Minimize re-renders with Zustand selectors
- Use virtual scrolling for large lists

## Security Considerations

- Never commit API keys or secrets
- Use `.env.local` for sensitive data
- Validate user input
- Sanitize file paths
- Check file sizes before processing
- Validate error logs before AI processing

## Review Process

1. Maintainers review your PR
2. Address feedback and suggestions
3. Ensure CI/CD passes
4. Get approval from maintainers
5. Merge when ready!

## Questions?

- Check existing [issues](https://github.com/mashalbaigo/sims-hub/issues)
- Ask in [discussions](https://github.com/mashalbaigo/sims-hub/discussions)
- Reach out on Discord (link coming soon)

## Recognition

Contributors will be:
- Added to the README
- Credited in release notes
- Featured in the community

---

**Thank you for contributing to Sims Hub!** 🎮❤️
