# 🤝 Contributing to Costo Acquisto Casa

Thank you for your interest in contributing to this project! Every contribution is welcome, from bug fixes to new features.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm
- Git

### Development Environment Setup

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/costo-acquisto-casa.git
   cd costo-acquisto-casa
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Start** the development server:
   ```bash
   npm run dev
   ```

## 📋 Types of Contributions

### 🐛 Bug Reports

- Use the issue template for bugs
- Include steps to reproduce the problem
- Specify browser and operating system version
- Attach screenshots if helpful

### ✨ Feature Requests

- Clearly describe the proposed functionality
- Explain why it would be useful
- Consider the impact on existing user experience

### 🔧 Pull Requests

- Reference the related issue
- Describe the changes made
- Ensure tests pass
- Keep code consistent with existing style

## 🏗️ Development Guidelines

### Code Structure

- **`src/store/`**: Business logic and state management
- **`src/*.tsx`**: UI components
- **`src/utils.ts`**: Common utilities

### Code Conventions

- **TypeScript**: Always use types, avoid `any`
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: Document complex business logic
- **Language**: Code and comments in English, UI text in Italian

### Business Logic

Calculation rules follow current Italian legislation:

- **Legal sources**: Always cite relevant laws
- **Tests**: Every business logic change must have tests
- **Validation**: Use Zod for data validation

### Style and Formatting

```bash
# Format code
npm run format

# Check style
npm run lint
```

## 🧪 Testing

### Running Tests

```bash
# All tests
npm run test

# Watch mode
npm run test:watch
```

### Writing Tests

- Tests required for business logic (`rules.ts`)
- Tests recommended for utilities and helpers
- Use Jest for unit testing
- Realistic examples in test cases

### Coverage

Maintain high test coverage, especially for:

- Tax calculations
- Input validation
- Data transformations

## 📝 Contribution Process

### 1. Planning

- Open an issue to discuss significant changes
- Check that similar issues don't already exist
- Wait for feedback before starting work

### 2. Development

- Create a branch from main: `git checkout -b feature/feature-name`
- Make atomic commits with descriptive messages
- Follow commit conventions: `feat:`, `fix:`, `docs:`, etc.

### 3. Testing

- Run all tests locally
- Add tests for new functionality
- Verify the build works: `npm run build`

### 4. Pull Request

- Use the PR template
- Describe what changes and why
- Link related issues
- Request review when ready

## 🎯 Contribution Areas

### 🔥 High Priority

- Bug fixes
- Performance improvements
- Accessibility (a11y)
- Test coverage

### 📈 Improvements

- New calculator features
- UX/UI improvements
- Documentation
- Usage examples

### 🌟 Future Ideas

- Support for other Italian regions
- PDF export
- Scenario comparison
- API integrations

## ❓ Questions and Support

- **Bugs or issues**: Open an [issue](https://github.com/albertoforni/costo-acquisto-casa/issues)
- **General questions**: Use [Discussions](https://github.com/albertoforni/costo-acquisto-casa/discussions)
- **Chat**: Contact maintainer via issue

## 📜 Legal Framework and Disclaimer

This project implements calculations based on Italian tax legislation.

**Important**:

- Calculation changes must be supported by official regulatory sources
- Always include references to relevant laws
- Maintain disclaimer that calculations are indicative estimates

## 🙏 Recognition

Contributors will be acknowledged in the project README. Thank you for your contribution to the Italian developer community!

---

**Remember**: Quality code is the best contribution. Take the time needed to do things right! 🚀
