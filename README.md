# KiwiTrade App Frontend

KiwiTrade is the premium online classifieds platform for New Zealand. Buy, Sell, and Trade. Edit anytime. Post & Buy Now!

## Prerequisites

- Node.js >= 22.0.0
- Yarn >= 1.22.0
- Git

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Query
- React Router
- React Helmet Async (SEO)
- Vitest
- Testing Library
- ESLint
- Prettier
- Husky
- Commitlint
- i18n

## Getting Started

```bash
# Clone the repository
git clone https://github.com/sagarbhirde/kiwitrade-app-frontend.git

# If yarn is not installed then enter following command
npm install -g yarn

# Install dependencies
yarn install

# Start development server
yarn dev
```

## Project Structure

```
src/
├── components/
│   ├── common/       # Reusable components
│   ├── layout/       # Layout components
│   └── seo/          # SEO-related components
├── config/           # Configuration files
├── constants/        # Constants and enums
├── hooks/            # Custom React hooks
├── locales/         # i18n translations
├── pages/           # Page components
├── services/        # API services
├── tests/           # Test utilities
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Git Strategy

We follow the GitFlow workflow:

- `main` - Production branch
- `dev` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `release/*` - Release branches
- `hotfix/*` - Hotfix branches

### Commit Convention

We use conventional commits:

```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Available Scripts

```bash
# Development
yarn dev

# Production build
yarn build

# Preview production build
yarn preview

# Run tests
yarn test

# Run tests with coverage
yarn test:coverage

# Lint code
yarn lint

# Format code
yarn format
```

## Environment Configuration

The project uses three environments:

- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.test` - Test environment

## Testing

We use Vitest and Testing Library for testing. Example:

```typescript
import { render, screen } from '@testing-library/react';
import { Welcome } from '../Welcome';

test('renders welcome message', () => {
  render(<Welcome name="John" />);
  expect(screen.getByText(/John/)).toBeInTheDocument();
});
```

## Internationalization

The project supports multiple languages using i18next. Example usage:

```typescript
import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation();
  return <h1>{t('welcome.message')}</h1>;
}
```

## CI/CD

GitHub Actions workflow is set up for:

- Linting
- Testing
- Building
- Deployment

## SEO

The project includes comprehensive SEO setup:

- Default SEO settings
- Page-specific SEO components
- Structured data support
- Open Graph and Twitter card support
- Canonical URL handling
- Schema.org integration

## License

MIT# kiwitrade-app-frontend-dev
