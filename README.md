# Blog Box UI

A modern, responsive blog aggregator and reading platform built with Next.js 14, TypeScript, and Tailwind CSS. Features a beautiful UI with dark mode support, article categorization, and a dynamic reading experience.

## 🚀 Features

- **Modern UI/UX**: Clean and responsive design with smooth animations
- **Dark Mode Support**: Built-in theme switching capability
- **Article Management**: 
  - Grid-based article feed with masonry layout
  - Article categorization and filtering
  - Reading time estimation
  - Difficulty levels for articles
- **Dynamic Filtering**:
  - Filter by tags
  - Filter by authors
  - Real-time updates
- **Responsive Layout**:
  - Adaptive grid (1-4 columns based on screen size)
  - Collapsible sidebar
  - Mobile-friendly design

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **API Integration**: Native Fetch API
- **Icons**: Lucide Icons

### Directory Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── page.tsx           # Home page
│   └── profile/           # Profile page
├── components/
│   ├── common/            # Shared components
│   ├── features/          # Feature-specific components
│   │   ├── activity/      # Activity feed components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── profile/       # Profile components
│   │   └── reading/       # Reading components
│   ├── layout/            # Layout components
│   ├── providers/         # Context providers
│   └── ui/                # UI components (shadcn)
├── constants/             # Constants and configurations
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── services/              # API services
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

### Key Components

#### Layout Components
- `NavBar`: Main navigation with theme toggle and user menu
- `Sidebar`: Collapsible sidebar with filtering options
- `Footer`: Application footer

#### Feature Components
- `ArticleFeed`: Masonry grid layout for articles
- `ArticleCard`: Individual article display with variants
- `Dashboard`: Main dashboard with tabs and filters
- `Statistics`: User reading statistics
- `ReadingProgress`: Reading progress tracking
- `ReadingHistory`: History of read articles

#### Common Components
- `ModeToggle`: Theme switcher
- `UserNav`: User navigation menu
- `Button`, `Card`, etc.: Reusable UI components

## 🔄 Data Flow

1. **API Layer** (`services/api.ts`):
   - Handles HTTP requests to the backend
   - Manages API endpoints for articles

2. **Service Layer** (`services/articleService.ts`):
   - Transforms raw data into application models
   - Handles business logic

3. **Components**:
   - Use custom hooks for data fetching
   - Implement presentation logic
   - Handle user interactions

## 🎨 Styling

- Uses Tailwind CSS for utility-first styling
- Custom theme configuration with dark mode support
- Consistent spacing and color schemes
- Responsive design breakpoints:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Large Desktop: 4 columns

## 🛠️ Development

### Prerequisites
- Node.js 18+
- Yarn or npm

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/blog-box-UI.git

# Install dependencies
cd blog-box-UI
yarn install

# Start development server
yarn dev
```

### Build
```bash
# Create production build
yarn build

# Start production server
yarn start
```

## 📝 Type System

The application uses TypeScript with strict type checking. Key types include:

```typescript
interface Article {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishDate: string;
  readTime: number;
  image?: string;
  link: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  saves: number;
}

interface Author {
  _id: string;
  name: string;
  avatar: string;
  bio?: string;
}
```

## 🔐 Environment Variables

Required environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 📚 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 