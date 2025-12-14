# Qubot - AI Chat Assistant

## Project Documentation

---

## Abstract

Qubot is an advanced AI-powered chat assistant web application designed to facilitate efficient communication and intelligent problem-solving through natural language interactions. Built on modern web technologies including Next.js 16, React 19, and TypeScript, the system integrates multiple AI models to provide users with versatile conversational capabilities. The application employs a robust authentication system using Better Auth, persistent data storage with PostgreSQL via Prisma ORM, and a responsive user interface built with Radix UI components and Tailwind CSS. Qubot enables users to engage in multi-turn conversations, manage chat history, switch between different AI models, and maintain personalized sessions across devices. The system architecture follows a client-server model with RESTful API endpoints, real-time streaming responses, and comprehensive SEO optimization for enhanced discoverability. This project demonstrates the practical implementation of modern web development practices, including Progressive Web App (PWA) capabilities, server-side rendering, and scalable database design.

---

## Introduction

### Background

The rapid advancement of artificial intelligence and natural language processing has revolutionized human-computer interaction. Conversational AI systems have become increasingly sophisticated, enabling users to obtain information, solve problems, and automate tasks through intuitive dialogue interfaces. However, many existing solutions are either proprietary, limited in functionality, or lack the flexibility to integrate multiple AI models.

### Problem Statement

Users require a versatile, accessible, and user-friendly platform that:

- Provides access to multiple AI models within a single interface
- Maintains conversation context and history across sessions
- Offers secure authentication and personalized user experiences
- Delivers responsive, real-time interactions with minimal latency
- Ensures data privacy and secure storage of user conversations
- Provides seamless cross-device accessibility

### Proposed Solution

Qubot addresses these challenges by implementing a full-stack web application that combines:

- **Multi-model AI Integration**: Support for various AI models through the Vercel AI SDK
- **Persistent Chat Management**: Database-backed conversation storage and retrieval
- **Secure Authentication**: OAuth-based authentication with GitHub integration
- **Modern UI/UX**: Responsive design with dark mode support and accessibility features
- **Real-time Streaming**: Server-sent events for immediate response delivery
- **Progressive Enhancement**: PWA capabilities for offline access and app-like experience

### Technology Stack

| Layer                | Technology               | Purpose                                       |
| -------------------- | ------------------------ | --------------------------------------------- |
| **Frontend**         | Next.js 16, React 19     | Server-side rendering, routing, UI components |
| **Styling**          | Tailwind CSS 4, Radix UI | Responsive design, accessible components      |
| **Backend**          | Next.js API Routes       | RESTful endpoints, server actions             |
| **Database**         | PostgreSQL, Prisma ORM   | Data persistence, type-safe queries           |
| **Authentication**   | Better Auth              | OAuth, session management                     |
| **AI Integration**   | Vercel AI SDK, OpenAI    | Model abstraction, streaming responses        |
| **State Management** | Zustand, React Query     | Client state, server state caching            |
| **Deployment**       | Vercel Platform          | Hosting, CI/CD, edge functions                |

---

## Objectives

### Primary Objectives

1. **Develop a Functional AI Chat Interface**

   - Implement real-time message streaming with AI models
   - Support multi-turn conversations with context retention
   - Enable users to create, view, and manage multiple chat sessions

2. **Implement Secure User Authentication**

   - Integrate OAuth 2.0 authentication with GitHub provider
   - Manage user sessions with secure token-based authentication
   - Protect user data and conversations with proper authorization

3. **Design a Scalable Database Architecture**

   - Create normalized database schema for users, sessions, chats, and messages
   - Implement efficient indexing for query optimization
   - Ensure data integrity through proper relationships and constraints

4. **Build a Responsive User Interface**
   - Develop mobile-first, responsive layouts
   - Implement dark/light theme switching
   - Ensure accessibility compliance (WCAG 2.1)
   - Create intuitive navigation and chat management

### Secondary Objectives

5. **Optimize for Search Engines**

   - Implement comprehensive SEO metadata
   - Generate dynamic sitemaps and robots.txt
   - Add structured data (JSON-LD) for rich snippets
   - Configure Open Graph and Twitter Card metadata

6. **Enable Progressive Web App Features**

   - Create web app manifest for installability
   - Implement service workers for offline capabilities
   - Optimize performance metrics (Core Web Vitals)

7. **Implement Model Selection**

   - Allow users to switch between different AI models
   - Display model-specific capabilities and limitations
   - Persist model preferences per conversation

8. **Ensure Code Quality and Maintainability**
   - Follow TypeScript best practices for type safety
   - Implement ESLint rules for code consistency
   - Structure components for reusability
   - Document API endpoints and data models

---

## Data Flow Diagrams (DFD)

### Level 0 DFD - Context Diagram

```mermaid
flowchart TB
    User((User))
    System[Qubot AI Chat System]
    AI[AI Model Provider<br/>OpenAI API]
    DB[(PostgreSQL<br/>Database)]
    Auth[GitHub OAuth<br/>Provider]

    User -->|Chat Messages| System
    System -->|AI Responses| User
    System -->|Authentication Request| Auth
    Auth -->|User Credentials| System
    System -->|AI Prompts| AI
    AI -->|Generated Responses| System
    System -->|Store/Retrieve Data| DB
    DB -->|User & Chat Data| System

    style User fill:#D1FE17,stroke:#333,stroke-width:2px,color:#000
    style System fill:#1a1a1a,stroke:#D1FE17,stroke-width:3px,color:#fff
    style AI fill:#4a9eff,stroke:#333,stroke-width:2px,color:#fff
    style DB fill:#ff6b6b,stroke:#333,stroke-width:2px,color:#fff
    style Auth fill:#51cf66,stroke:#333,stroke-width:2px,color:#fff
```

### Level 1 DFD - Main Processes

```mermaid
flowchart TB
    User((User))

    subgraph Qubot["Qubot System"]
        P1[1.0<br/>User Authentication]
        P2[2.0<br/>Chat Management]
        P3[3.0<br/>Message Processing]
        P4[4.0<br/>AI Integration]
        P5[5.0<br/>Session Management]
    end

    DB1[(User Store)]
    DB2[(Chat Store)]
    DB3[(Message Store)]
    DB4[(Session Store)]
    AI[AI Provider]
    OAuth[OAuth Provider]

    User -->|Login Request| P1
    P1 -->|Auth Token| User
    P1 <-->|Verify/Create User| DB1
    P1 <-->|OAuth Flow| OAuth

    User -->|Create/View Chats| P2
    P2 -->|Chat List| User
    P2 <-->|CRUD Operations| DB2

    User -->|Send Message| P3
    P3 -->|Display Response| User
    P3 -->|Store Message| DB3
    P3 -->|AI Request| P4

    P4 -->|Generated Text| P3
    P4 <-->|API Calls| AI

    P5 <-->|Session Data| DB4
    P1 --> P5
    P2 --> P5
    P3 --> P5

    style User fill:#D1FE17,stroke:#333,stroke-width:2px,color:#000
    style Qubot fill:#1a1a1a,stroke:#D1FE17,stroke-width:2px,color:#fff
```

### Level 2 DFD - Message Processing Detail

```mermaid
flowchart TB
    User((User))

    subgraph MessageProcessing["3.0 Message Processing"]
        P31[3.1<br/>Validate Input]
        P32[3.2<br/>Store User Message]
        P33[3.3<br/>Prepare AI Context]
        P34[3.4<br/>Stream AI Response]
        P35[3.5<br/>Store AI Message]
    end

    DB2[(Chat Store)]
    DB3[(Message Store)]
    AI[AI Model]

    User -->|Raw Message| P31
    P31 -->|Validated Message| P32
    P32 -->|Message ID| P33
    P32 -->|Save| DB3

    P33 -->|Chat History| DB2
    P33 -->|Context + Prompt| P34
    P34 <-->|Streaming API| AI
    P34 -->|Streamed Chunks| User
    P34 -->|Complete Response| P35
    P35 -->|Save| DB3
    P35 -->|Update Chat| DB2

    style User fill:#D1FE17,stroke:#333,stroke-width:2px,color:#000
    style MessageProcessing fill:#1a1a1a,stroke:#D1FE17,stroke-width:2px,color:#fff
```

---

## ER Diagrams

### Entity-Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ SESSION : has
    USER ||--o{ ACCOUNT : has
    USER ||--o{ CHAT : creates
    CHAT ||--o{ MESSAGE : contains

    USER {
        string id PK
        string name
        string email UK
        boolean emailVerified
        string image
        datetime createdAt
        datetime updatedAt
    }

    SESSION {
        string id PK
        datetime expiresAt
        string token UK
        datetime createdAt
        datetime updatedAt
        string ipAddress
        string userAgent
        string userId FK
    }

    ACCOUNT {
        string id PK
        string accountId
        string providerId
        string userId FK
        string accessToken
        string refreshToken
        string idToken
        datetime accessTokenExpiresAt
        datetime refreshTokenExpiresAt
        string scope
        string password
        datetime createdAt
        datetime updatedAt
    }

    CHAT {
        string id PK
        string title
        string model
        string userId FK
        datetime createdAt
        datetime updatedAt
    }

    MESSAGE {
        string id PK
        enum messageRole
        enum messageType
        text content
        string model
        string chatId FK
        datetime createdAt
        datetime updatedAt
    }

    VERIFICATION {
        string id PK
        string identifier
        string value
        datetime expiresAt
        datetime createdAt
        datetime updatedAt
    }
```

### Database Schema Details

#### User Entity

- **Primary Key**: `id` (String, unique identifier)
- **Attributes**: name, email (unique), emailVerified, image, timestamps
- **Relationships**: One-to-Many with Session, Account, and Chat

#### Session Entity

- **Primary Key**: `id` (String)
- **Foreign Key**: `userId` references User(id) with CASCADE delete
- **Attributes**: expiresAt, token (unique), ipAddress, userAgent, timestamps
- **Indexes**: userId for efficient lookups

#### Account Entity

- **Primary Key**: `id` (String)
- **Foreign Key**: `userId` references User(id) with CASCADE delete
- **Attributes**: OAuth tokens, provider information, timestamps
- **Purpose**: Stores third-party authentication credentials

#### Chat Entity

- **Primary Key**: `id` (CUID, auto-generated)
- **Foreign Key**: `userId` references User(id) with CASCADE delete
- **Attributes**: title, model, timestamps
- **Indexes**: Composite index on (userId, updatedAt) for efficient queries
- **Relationships**: One-to-Many with Message

#### Message Entity

- **Primary Key**: `id` (CUID, auto-generated)
- **Foreign Key**: `chatId` references Chat(id) with CASCADE delete
- **Attributes**: messageRole (USER/ASSISTANT), messageType (NORMAL/ERROR/TOOL_CALL), content (Text), model, timestamps
- **Indexes**: Composite index on (chatId, updatedAt)

#### Verification Entity

- **Primary Key**: `id` (String)
- **Attributes**: identifier, value, expiresAt, timestamps
- **Purpose**: Email verification and password reset tokens

---

## Methodology

### Development Approach

The project follows an **Agile development methodology** with iterative sprints focusing on incremental feature delivery and continuous integration.

#### Phase 1: Planning and Design (Week 1-2)

1. **Requirements Gathering**

   - Define user stories and use cases
   - Identify functional and non-functional requirements
   - Create wireframes and mockups

2. **System Architecture Design**

   - Design database schema with normalization
   - Plan API endpoint structure
   - Define component hierarchy
   - Select technology stack

3. **Environment Setup**
   - Initialize Next.js project with TypeScript
   - Configure Tailwind CSS and UI component library
   - Set up PostgreSQL database with Docker
   - Configure Prisma ORM

#### Phase 2: Core Development (Week 3-6)

1. **Authentication Implementation**

   - Integrate Better Auth library
   - Configure GitHub OAuth provider
   - Implement session management
   - Create protected routes and middleware

2. **Database Implementation**

   - Define Prisma schema models
   - Generate Prisma Client
   - Create database migrations
   - Implement seed data for testing

3. **API Development**

   - Create RESTful endpoints for CRUD operations
   - Implement chat creation and retrieval
   - Build message storage and retrieval
   - Integrate AI SDK for model communication

4. **Frontend Development**
   - Build authentication UI (sign-in/sign-out)
   - Create chat interface with message list
   - Implement sidebar for chat navigation
   - Develop message input form with streaming
   - Add model selector component

#### Phase 3: Feature Enhancement (Week 7-8)

1. **UI/UX Improvements**

   - Implement dark/light theme toggle
   - Add responsive design for mobile devices
   - Create loading states and error handling
   - Implement toast notifications

2. **Advanced Features**

   - Add chat search functionality
   - Implement chat grouping by date
   - Create user profile management
   - Add settings panel for preferences

3. **Performance Optimization**
   - Implement React Query for caching
   - Optimize database queries with indexes
   - Add lazy loading for chat history
   - Minimize bundle size with code splitting

#### Phase 4: Testing and Deployment (Week 9-10)

1. **Testing**

   - Unit testing for utility functions
   - Integration testing for API endpoints
   - End-to-end testing for user flows
   - Performance testing and optimization

2. **SEO and PWA**

   - Configure metadata and Open Graph tags
   - Generate sitemap and robots.txt
   - Create web app manifest
   - Implement service workers

3. **Deployment**
   - Deploy to Vercel platform
   - Configure environment variables
   - Set up custom domain (qubot.online)
   - Monitor application performance

### Development Tools and Practices

| Category                | Tools/Practices                    |
| ----------------------- | ---------------------------------- |
| **Version Control**     | Git, GitHub                        |
| **Code Editor**         | VS Code with TypeScript extensions |
| **Package Manager**     | npm                                |
| **Database Management** | Docker Compose, Prisma Studio      |
| **API Testing**         | Postman, Thunder Client            |
| **Code Quality**        | ESLint, TypeScript strict mode     |
| **Documentation**       | JSDoc comments, README files       |

### Coding Standards

- **TypeScript**: Strict mode enabled, explicit type annotations
- **Component Structure**: Functional components with hooks
- **File Organization**: Feature-based folder structure
- **Naming Conventions**: camelCase for variables, PascalCase for components
- **Error Handling**: Try-catch blocks, error boundaries
- **Security**: Environment variables for secrets, input validation

---

## Expected Outcome

### Functional Outcomes

1. **Fully Functional Web Application**

   - Users can sign in using GitHub OAuth
   - Create and manage multiple chat conversations
   - Send messages and receive AI-generated responses in real-time
   - Switch between different AI models
   - View chat history organized by date
   - Search through existing conversations
   - Toggle between light and dark themes

2. **Responsive User Interface**

   - Mobile-friendly design (320px to 4K displays)
   - Accessible components meeting WCAG 2.1 standards
   - Smooth animations and transitions
   - Intuitive navigation with sidebar
   - Real-time message streaming with typing indicators

3. **Secure Data Management**

   - Encrypted user authentication tokens
   - Secure storage of chat history in PostgreSQL
   - User data isolation (users only access their own chats)
   - Session expiration and automatic logout
   - HTTPS encryption for all communications

4. **SEO-Optimized Platform**
   - Dynamic metadata generation
   - Structured data for search engines
   - Optimized page load times (< 3s)
   - Mobile-friendly test passing
   - High Lighthouse scores (90+ in all categories)

### Technical Outcomes

1. **Scalable Architecture**

   - Modular component structure for easy maintenance
   - Database schema supporting millions of messages
   - API endpoints with proper error handling
   - Efficient caching strategies reducing database load

2. **Performance Metrics**

   - First Contentful Paint (FCP): < 1.5s
   - Largest Contentful Paint (LCP): < 2.5s
   - Time to Interactive (TTI): < 3.5s
   - Cumulative Layout Shift (CLS): < 0.1
   - First Input Delay (FID): < 100ms

3. **Code Quality**
   - 100% TypeScript coverage
   - Zero ESLint errors
   - Comprehensive error handling
   - Reusable component library
   - Well-documented codebase

### User Experience Outcomes

1. **Seamless Interaction**

   - Instant message sending with optimistic updates
   - Smooth scrolling and navigation
   - Keyboard shortcuts for power users
   - Auto-save draft messages
   - Persistent state across page refreshes

2. **Personalization**

   - User-specific chat history
   - Customizable theme preferences
   - Model selection per conversation
   - Saved user settings

3. **Reliability**
   - 99.9% uptime on Vercel platform
   - Graceful error handling with user-friendly messages
   - Automatic retry for failed requests
   - Offline support with PWA capabilities

---

## Resources Required

### Hardware Resources

| Resource                | Specification                                       | Purpose                       |
| ----------------------- | --------------------------------------------------- | ----------------------------- |
| **Development Machine** | Intel i5/AMD Ryzen 5 or higher, 16GB RAM, 256GB SSD | Local development and testing |
| **Database Server**     | PostgreSQL 15+ (Docker container or cloud instance) | Data persistence              |
| **Production Server**   | Vercel Edge Network                                 | Application hosting           |

### Software Resources

#### Development Tools

- **Node.js**: v20.x or higher
- **npm**: v10.x or higher
- **Git**: v2.40 or higher
- **VS Code**: Latest stable version
- **Docker Desktop**: v24.x or higher (for local PostgreSQL)

#### Frameworks and Libraries

**Core Dependencies** (from package.json):

- `next`: 16.0.7 - React framework with SSR
- `react`: 19.2.0 - UI library
- `typescript`: ^5 - Type safety
- `prisma`: ^6.15.0 - Database ORM
- `better-auth`: ^1.4.5 - Authentication
- `ai`: ^5.0.113 - Vercel AI SDK
- `@tanstack/react-query`: ^5.90.12 - Server state management
- `zustand`: ^5.0.9 - Client state management
- `tailwindcss`: ^4 - Styling framework
- `lucide-react`: ^0.556.0 - Icon library
- `sonner`: ^2.0.7 - Toast notifications
- `react-markdown`: ^10.1.0 - Markdown rendering
- `zod`: ^4.1.13 - Schema validation

**UI Components**:

- Radix UI primitives (40+ components)
- Custom components built on Radix primitives
- Shadcn/ui component patterns

### Cloud Services

| Service            | Provider               | Purpose                                | Estimated Cost                  |
| ------------------ | ---------------------- | -------------------------------------- | ------------------------------- |
| **Hosting**        | Vercel                 | Application deployment, edge functions | Free tier (Hobby)               |
| **Database**       | Vercel Postgres / Neon | PostgreSQL database                    | Free tier: 512MB                |
| **Authentication** | GitHub OAuth           | User authentication                    | Free                            |
| **AI API**         | OpenAI                 | GPT model access                       | Pay-per-use (~$0.002/1K tokens) |
| **Domain**         | Namecheap/Cloudflare   | qubot.online                           | ~$10-15/year                    |
| **Analytics**      | Vercel Analytics       | Performance monitoring                 | Free tier                       |

### Human Resources

| Role                     | Responsibilities                            | Time Allocation |
| ------------------------ | ------------------------------------------- | --------------- |
| **Full-Stack Developer** | Architecture, backend API, database design  | 60%             |
| **Frontend Developer**   | UI/UX implementation, component development | 30%             |
| **DevOps Engineer**      | Deployment, CI/CD, monitoring               | 10%             |

_Note: For this project, a single developer (Amar) handles all roles._

### Development Environment

```bash
# Required Environment Variables
DATABASE_URL="postgresql://user:password@localhost:5432/qubot"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID="your-github-oauth-client-id"
GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"
OPENAI_API_KEY="your-openai-api-key"
```

### Time Resources

**Total Project Duration**: 10 weeks

| Phase                | Duration | Deliverables                                       |
| -------------------- | -------- | -------------------------------------------------- |
| Planning & Design    | 2 weeks  | Architecture diagrams, wireframes, database schema |
| Core Development     | 4 weeks  | Authentication, database, API, basic UI            |
| Feature Enhancement  | 2 weeks  | Advanced features, optimization                    |
| Testing & Deployment | 2 weeks  | Testing, SEO, PWA, production deployment           |

---

## References

### Documentation and Official Resources

1. **Next.js Documentation**  
   Vercel Inc. (2024). _Next.js 16 Documentation_.  
   https://nextjs.org/docs

2. **React Documentation**  
   Meta Platforms, Inc. (2024). _React 19 Documentation_.  
   https://react.dev

3. **Prisma Documentation**  
   Prisma Data, Inc. (2024). _Prisma ORM Documentation_.  
   https://www.prisma.io/docs

4. **Better Auth Documentation**  
   Better Auth Contributors. (2024). _Better Auth - Authentication Library_.  
   https://www.better-auth.com/docs

5. **Vercel AI SDK**  
   Vercel Inc. (2024). _AI SDK Documentation_.  
   https://sdk.vercel.ai/docs

6. **Tailwind CSS Documentation**  
   Tailwind Labs Inc. (2024). _Tailwind CSS v4 Documentation_.  
   https://tailwindcss.com/docs

7. **Radix UI Documentation**  
   WorkOS Inc. (2024). _Radix UI Primitives_.  
   https://www.radix-ui.com/primitives/docs/overview/introduction

8. **PostgreSQL Documentation**  
   PostgreSQL Global Development Group. (2024). _PostgreSQL 15 Documentation_.  
   https://www.postgresql.org/docs/15/

### Technical Articles and Guides

9. **OpenAI API Reference**  
   OpenAI. (2024). _OpenAI Platform Documentation_.  
   https://platform.openai.com/docs

10. **TypeScript Handbook**  
    Microsoft Corporation. (2024). _TypeScript Documentation_.  
    https://www.typescriptlang.org/docs/

11. **MDN Web Docs**  
    Mozilla Corporation. (2024). _Web APIs and Technologies_.  
    https://developer.mozilla.org/

12. **OAuth 2.0 Specification**  
    IETF. (2012). _RFC 6749 - The OAuth 2.0 Authorization Framework_.  
    https://datatracker.ietf.org/doc/html/rfc6749

### Design and UX Resources

13. **Web Content Accessibility Guidelines (WCAG)**  
    W3C. (2023). _WCAG 2.1 Guidelines_.  
    https://www.w3.org/WAI/WCAG21/quickref/

14. **Material Design**  
    Google LLC. (2024). _Material Design Guidelines_.  
    https://m3.material.io/

15. **Progressive Web Apps**  
    Google Developers. (2024). _PWA Documentation_.  
    https://web.dev/progressive-web-apps/

### Database and Architecture

16. **Database Normalization**  
    Codd, E. F. (1970). _A Relational Model of Data for Large Shared Data Banks_.  
    Communications of the ACM, 13(6), 377-387.

17. **RESTful API Design**  
    Fielding, R. T. (2000). _Architectural Styles and the Design of Network-based Software Architectures_.  
    Doctoral dissertation, University of California, Irvine.

### Performance and SEO

18. **Core Web Vitals**  
    Google. (2024). _Web Vitals - Essential metrics for a healthy site_.  
    https://web.dev/vitals/

19. **Schema.org**  
    Schema.org Community. (2024). _Structured Data Vocabulary_.  
    https://schema.org/

20. **Google Search Central**  
    Google. (2024). _SEO Starter Guide_.  
    https://developers.google.com/search/docs/fundamentals/seo-starter-guide

### Tools and Libraries

21. **React Query (TanStack Query)**  
    TanStack. (2024). _TanStack Query Documentation_.  
    https://tanstack.com/query/latest

22. **Zustand**  
    Poimandres. (2024). _Zustand - Bear necessities for state management_.  
    https://github.com/pmndrs/zustand

23. **Zod**  
    Colinhacks. (2024). _Zod - TypeScript-first schema validation_.  
    https://zod.dev/

24. **React Hook Form**  
    Bluebill Engineering. (2024). _React Hook Form Documentation_.  
    https://react-hook-form.com/

### GitHub Repositories

25. **Project Repository**  
    Murmu, A. (2024). _t3-chat - Qubot AI Chat Assistant_.  
    https://github.com/amarmurmu001/t3-chat

### Academic References

26. **Human-Computer Interaction**  
    Norman, D. A. (2013). _The Design of Everyday Things: Revised and Expanded Edition_.  
    Basic Books.

27. **Software Engineering Best Practices**  
    Martin, R. C. (2008). _Clean Code: A Handbook of Agile Software Craftsmanship_.  
    Prentice Hall.

28. **Web Application Security**  
    OWASP Foundation. (2024). _OWASP Top Ten Web Application Security Risks_.  
    https://owasp.org/www-project-top-ten/

---

## Appendix

### A. System Requirements

**Minimum Browser Requirements**:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Supported Devices**:

- Desktop (Windows, macOS, Linux)
- Mobile (iOS 14+, Android 10+)
- Tablet (iPad OS 14+, Android tablets)

### B. API Endpoints

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/sign-in`  | Initiate OAuth sign-in   |
| POST   | `/api/auth/sign-out` | Terminate user session   |
| GET    | `/api/auth/session`  | Get current session      |
| GET    | `/api/chats`         | List user's chats        |
| POST   | `/api/chats`         | Create new chat          |
| GET    | `/api/chats/[id]`    | Get chat details         |
| DELETE | `/api/chats/[id]`    | Delete chat              |
| POST   | `/api/chat`          | Send message (streaming) |

### C. Database Indexes

```sql
-- User table
CREATE UNIQUE INDEX user_email_idx ON "user"(email);

-- Session table
CREATE UNIQUE INDEX session_token_idx ON "session"(token);
CREATE INDEX session_userId_idx ON "session"(userId);

-- Account table
CREATE INDEX account_userId_idx ON "account"(userId);

-- Chat table
CREATE INDEX chat_userId_updatedAt_idx ON "chat"(userId, updatedAt);

-- Message table
CREATE INDEX message_chatId_updatedAt_idx ON "message"(chatId, updatedAt);

-- Verification table
CREATE INDEX verification_identifier_idx ON "verification"(identifier);
```

### D. Color Scheme

**Primary Color**: `#D1FE17` (Lime Green)

- Used for branding, CTAs, and accent elements

**Theme Colors**:

- Light mode background: `#FFFFFF`
- Dark mode background: `#0A0A0A`
- Text (light): `#171717`
- Text (dark): `#FAFAFA`

---

**Document Version**: 1.0  
**Last Updated**: December 15, 2024  
**Author**: Amar Murmu  
**Project**: Qubot - AI Chat Assistant  
**Domain**: https://qubot.online
