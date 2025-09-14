# OX GitClient Scanner

A scalable GitClient repository scanner built with TypeScript, Apollo GraphQL, and React for OX Security technical assessment.

## 🚀 Features

- **GitHub Repository Scanning** with Octokit integration
- **Apollo GraphQL Server** with Zod validation and error handling
- **React Client** with Material UI and TypeScript
- **Circuit Breaker** and retry logic with exponential backoff
- **Rate Limiting** and comprehensive security measures
- **TypeScript** with strict mode and comprehensive type safety
- **ESLint + Prettier** for code quality
- **Performance Optimized** with parallel processing limits

## 🏗️ Architecture

```
ox-git-client-scanner/
├── server/          # Apollo GraphQL server
│   ├── src/
│   │   ├── scanners/     # Available scanners (GitHub)
│   │   ├── graphql/      # GraphQL schema & resolvers
│   │   ├── middleware/   # Security & logging
│   │   ├── utils/        # Circuit breaker, retry logic, shared utilities
│   │   ├── types/        # TypeScript type definitions
│   │   └── config/       # Configuration management
├── client/          # React TypeScript client
│   ├── src/
│   │   ├── components/   # Reusable UI and non UI components
│   │   ├── contexts/     # React Context providers
│   │   ├── core/         # Domain-specific components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── types/        # Types
│   │   └── apollo/       # Apollo client setup & queries
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Apollo Server** - GraphQL API server
- **Express** - Web framework
- **Octokit** - GitHub API client
- **TypeScript** - Type safety
- **Zod** - Runtime validation
- **p-limit** - Parallel processing control

### Frontend
- **React 18** - UI framework
- **Material UI** - Component library
- **Apollo Client** - GraphQL client
- **TypeScript** - Type safety

### DevOps & Quality
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 8+
- GitHub Personal Access Token with `repo` and `admin:repo_hook` scopes

### Installation

```bash
# Clone the repository
git clone <https://github.com/feroxes/ox-git-client-scanner.git>
cd ox-git-client-scanner

# Install all dependencies
npm install

# Start development servers
npm run dev
```

This will start:
- GraphQL server at `http://localhost:4000/graphql`
- React client at `http://localhost:3000`

## 📋 Usage

1. **Access the application** at `http://localhost:3000`
2. **Enter your GitHub token** with required scopes
3. **Browse repositories** - view list of your repositories
4. **View repository details** - click on any repository to see:
   - Repository information (name, size, owner, visibility)
   - File count
   - Active webhooks
   - YAML configuration files

## 🔧 Configuration

### GitHub Token Setup

1. Go to GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Generate new token with permissions:
   - Contents - read-only
   - Metadata - read-only
   - Webhooks - read-only
3. Copy token and enter in the application

## 🏛️ Architecture Details

### Circuit Breaker Pattern

Implements circuit breaker for external API calls:
- **Failure threshold**: 5 failures
- **Recovery timeout**: 30 seconds
- **Automatic recovery**: After timeout period

### Retry Logic

- **Max retries**: 2 attempts
- **Exponential backoff**: 1s → 2s → 4s
- **Retryable errors**: 429, 5xx, timeouts

### Security Features

- **CORS protection** with allowlist
- **Rate limiting** (100 requests per 15 minutes per IP)
- **Security headers** (XSS protection, content type sniffing)
- **Input validation** with Zod schemas


## 🔍 Performance Features

- **Parallel processing limit**: Maximum 2 concurrent GitHub API calls
- **Request timeouts**: 10-second timeout for all external calls
- **Connection pooling**: Efficient HTTP connection management
- **Caching**: Apollo Client caching for GraphQL queries

## 🛡️ Error Handling

Comprehensive error handling with user-friendly messages:

- **401/403**: "Invalid token or insufficient scopes"
- **404**: "Repository not found or no access"
- **429**: "Hit GitHub rate-limit — try again later"
- **5xx**: "GitHub server error - please try again later"
- **Timeout**: "GitHub is slow right now; please retry"

**Built with ❤️ for OX Security**
