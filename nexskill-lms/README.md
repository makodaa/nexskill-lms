# NexSkill LMS

A comprehensive Learning Management System built with React, TypeScript, and Vite. Features multi-role support, dark mode, AI-powered learning tools, and a modern user interface.

## Features

- 🎓 **Multi-Role System**: Student, Coach, Admin, Platform Owner, Sub-Coach, Content Editor, Community Manager, Support Staff, and Org Owner roles
- 🌓 **Dark Mode**: Full dark mode support with system theme detection
- 🤖 **AI Integration**: AI-powered study plans, recommendations, and coaching insights
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🎨 **Modern UI**: Beautiful gradients, animations, and interactive components
- 📊 **Analytics Dashboard**: Comprehensive dashboards for each role
- 🔐 **Role-Based Access**: Protected routes and role-specific layouts
- 📜 **Blockchain Certificates**: Certificate verification and sharing

## Quick Start

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app runs on `http://localhost:5173` by default.

## Deployment to Vercel

### Option 1: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your repository
5. Click "Deploy"

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
nexskill-lms/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── admin/        # Admin-specific components
│   │   ├── ai/           # AI-powered components
│   │   ├── auth/         # Authentication components
│   │   ├── coach/        # Coach-specific components
│   │   └── ...           # Other role-specific components
│   ├── context/          # React Context providers
│   ├── layouts/          # Layout components for each role
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin pages
│   │   ├── auth/         # Authentication pages
│   │   ├── coach/        # Coach pages
│   │   ├── student/      # Student pages
│   │   └── ...           # Other role pages
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component with routing
│   └── main.tsx          # App entry point
├── public/               # Static assets
├── dist/                 # Production build (generated)
└── vercel.json          # Vercel configuration
```

## Available Roles

Access different portals by logging in with these roles:

- **Student** (`/student/*`): Course enrollment, learning, certificates
- **Coach** (`/coach/*`): Course creation, student management, earnings
- **Admin** (`/admin/*`): Platform analytics, user management, system health
- **Platform Owner** (`/owner/*`): Full platform control, role management
- **Sub-Coach** (`/subcoach/*`): Assistant teaching, grading, sessions
- **Content Editor** (`/content/*`): Content review, translations, resources
- **Community Manager** (`/community/*`): Forum moderation, engagement
- **Support Staff** (`/support/*`): Ticket management, student support
- **Org Owner** (`/org/*`): Team management, seat allocation, billing

## Dark Mode

Dark mode is implemented using:
- Tailwind CSS `dark:` variant
- `UiPreferencesContext` for state management
- localStorage for persistence
- System theme detection

Toggle dark mode from the user menu in any layout.

## Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file for local development (optional):

```env
VITE_API_URL=https://api.nexskill.com
VITE_APP_NAME=NexSkill LMS
```

## Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [DARK_MODE_README.md](./DARK_MODE_README.md) - Dark mode implementation
- [COURSE_BUILDER_README.md](./COURSE_BUILDER_README.md) - Course builder guide
- [SYSTEM_ERROR_README.md](./SYSTEM_ERROR_README.md) - Error handling guide

## License

Private - All Rights Reserved

## Support

For issues or questions, contact the development team.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
