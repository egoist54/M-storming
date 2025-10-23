# M-storming Quiz Platform

## Overview

M-storming is a viral quiz web application designed to engage users with interactive personality tests and K-culture themed quizzes. The platform focuses on social sharing and mobile-first experiences, allowing users to discover personality insights through fun, shareable quiz results. Built as a static web application with Firebase backend for real-time visitor tracking and participant counting.

**Primary Goal**: Create engaging, viral quiz experiences optimized for mobile sharing across international audiences (Korean, English, Japanese, Spanish, Portuguese).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript and Vite
- **Routing**: wouter for lightweight client-side routing
- **State Management**: React Context for language preferences, TanStack Query for data fetching
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens following viral quiz aesthetics
- **Animations**: Framer Motion for smooth transitions between quiz questions and results

**Design Philosophy**: Mobile-first with Instagram/BuzzFeed-inspired viral quiz patterns. Heavy emphasis on immediate visual feedback, thumb-friendly interactions, and share-optimized result cards.

**Key Pages**:
- `HomePage`: Quiz listing with visitor counter and participant counts
- `QuizPage`: Question-by-question interface with progress tracking
- `ResultPage`: Shareable result card with social media integration

### Data Architecture

**Quiz Data Storage**: Static JSON files served from `/public/quizzes/`
- Quiz index at `quizzes/index.json` lists available quizzes
- Individual quiz data files (e.g., `kvibe.json`, `k-travel.json`, `personality.json`)
- Multi-language support with locale-keyed content objects

**Quiz Types**:
1. **MBTI-AT quizzes**: Uses 5-dimensional scoring (E/I, S/N, T/F, J/P, A/T) with 32 possible result types
   - **K-VIBE** (Korean Food): 15 questions matching users to Korean food personalities
   - **K-Travel** (Korean Destinations): 18 questions matching users to Korean travel destinations
2. **Simple personality quizzes**: Numeric scoring leading to categorized results

**Result Calculation**:
- MBTI quizzes: Count responses per dimension, determine dominant traits
- Personality quizzes: Average scores mapped to result categories

### Real-time Data Layer

**Firebase Realtime Database**: Tracks engagement metrics without requiring authentication
- Visitor counter: Global total access count incremented on homepage load
- Quiz participants: Individual counters per quiz incremented on result page
- Data structure: Simple key-value store (`visitors/total`, `quizzes/{quizId}/participants`)

**Implementation Pattern**: Direct client-side Firebase SDK integration with transaction-based counting to prevent race conditions.

### Internationalization

**Multi-language Support**: Language context provider with localStorage persistence
- Supported languages: Korean (ko), English (en), Japanese (ja), Spanish (es), Portuguese (pt)
- Translation structure: Nested objects for UI strings and quiz content
- Language switching: Dropdown menu in header, persists user preference

**Content Localization**: Quiz questions, answers, and results all include translations in structured JSON format with language keys.

### Backend Architecture

**Express Server** (development/production):
- Serves Vite-built static assets in production
- Development: Vite middleware with HMR support
- Minimal API surface - primarily static file serving

**Database Schema** (Drizzle ORM with PostgreSQL):
- Currently includes user schema (username/password) as template
- **Note**: Quiz data currently uses static JSON; database integration is prepared but not active for quiz content
- Session management via `connect-pg-simple` (configured but minimal usage)

**Architectural Decision**: Static quiz content over database storage for simpler deployment to GitHub Pages and faster content delivery. Firebase handles dynamic data (counters) to avoid backend complexity.

### Component Architecture

**Reusable Components**:
- `QuizCard`: Displays quiz preview with thumbnail, category badge, participant count
- `QuestionCard`: Question display with animated answer options
- `ResultCard`: Result presentation optimized for screenshots/sharing
- `ShareButtons`: Social media sharing (KakaoTalk, Facebook, Twitter, link copy)
- `VisitorCounter`: Real-time visitor count display
- `LanguageSwitcher`: Language selection dropdown

**UI Component Library**: shadcn/ui provides 40+ styled Radix UI components with consistent theming through CSS custom properties.

### Design System

**Color Palette**:
- Primary: Vibrant purple-pink (280 85% 65%) for brand identity
- Secondary: Bright cyan (200 90% 50%) for accents
- Emotion colors: Green (positive), yellow (neutral), pink (special)

**Typography**: Pretendard Variable font optimized for Korean readability with systematic size scale (Hero: 4xl-5xl, Body: base, Caption: sm).

**Spacing System**: 4px-based increments (4, 6, 8, 12, 16, 20, 24) for consistent rhythm.

## External Dependencies

### Third-party Services

**Firebase**:
- **Service**: Firebase Realtime Database
- **Purpose**: Real-time visitor counting and quiz participant tracking
- **Configuration**: Environment variables for API keys and project settings
- **Security**: Read/write rules configured for counter nodes only

**GitHub Pages**:
- **Purpose**: Static site hosting
- **Deployment**: Deploy from branch mode (main/docs)
- **Build Process**: 
  - `deploy-gh-pages.sh` 스크립트로 자동 빌드
  - Git remote에서 repository 이름 자동 감지
  - User/Organization vs Project 페이지 자동 구분
  - 올바른 base path로 Vite 빌드
  - docs 폴더로 빌드 출력 복사
  - .nojekyll 파일 자동 생성

### Key NPM Dependencies

**UI & Styling**:
- `@radix-ui/*`: Accessible component primitives (40+ packages)
- `tailwindcss`: Utility-first CSS framework
- `framer-motion`: Animation library for transitions
- `class-variance-authority`: Component variant management

**Data & State**:
- `@tanstack/react-query`: Server state management and caching
- `firebase`: Firebase JavaScript SDK
- `drizzle-orm`: Type-safe SQL ORM
- `@neondatabase/serverless`: Postgres connection driver

**Routing & Forms**:
- `wouter`: Lightweight routing library
- `react-hook-form`: Form state management
- `zod`: Schema validation with `drizzle-zod` integration

**Development Tools**:
- `vite`: Build tool and dev server
- `typescript`: Type safety
- `esbuild`: Server-side bundling

### Asset Management

**Images**: Stored in `/attached_assets/generated_images/` with Korean filenames, imported via Vite aliases (`@assets`).

**Font Loading**: Pretendard Variable loaded via CDN (jsdelivr) with preconnect optimization.