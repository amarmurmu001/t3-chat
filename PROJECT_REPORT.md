# A PROJECT REPORT

ON

## QUBOT - AI CHAT ASSISTANT

_Submitted in partial fulfillment of the requirements for the award of the degree of_

**[DEGREE NAME, e.g., BACHELOR OF TECHNOLOGY]**
IN
**[BRANCH NAME, e.g., COMPUTER SCIENCE AND ENGINEERING]**

Submitted by:
**Amar Murmu**
[Roll No: ____________]

Under the Guidance of:
**[GUIDE NAME]**
[Designation]

![College Logo](placeholder_logo.png)

**[DEPARTMENT NAME]**
**[COLLEGE NAME]**
**[UNIVERSITY NAME]**
**[YEAR]**

---

# CERTIFICATE

This is to certify that the project report entitled **"QUBOT - AI CHAT ASSISTANT"** submitted by **Amar Murmu** in partial fulfillment of the requirements for the award of the degree of **[Degree Name]** in **[Branch Name]** of **[University Name]**, is a bona fide record of the work carried out under my supervision and guidance.

To the best of my knowledge and belief, this work has not been submitted elsewhere for the award of any other degree or diploma.

**Signature of Guide** **Signature of HOD**
[Name] [Name]
[Designation] [Designation]

**External Examiner**

---

# ACKNOWLEDGEMENT

I would like to express my deep sense of gratitude to my project guide, **[Guide Name]**, for their valuable guidance, constant encouragement, and constructive criticism during the development of this project. Their insights were instrumental in shaping the direction of this work.

I am also thankful to **[HOD Name]**, Head of the Department of **[Department Name]**, for providing the necessary facilities and support to carry out this project.

I would like to extend my sincere thanks to all the faculty members and staff of the department for their help and cooperation.

Finally, I would like to thank my family and friends for their unwavering support and encouragement throughout this journey.

**Amar Murmu**

---

# ABSTRACT

**Qubot** is an advanced AI-powered chat assistant web application designed to facilitate efficient communication and intelligent problem-solving through natural language interactions. Built on modern web technologies including Next.js 16, React 19, and TypeScript, the system integrates multiple AI models to provide users with versatile conversational capabilities.

The application employs a robust authentication system using Better Auth, persistent data storage with PostgreSQL via Prisma ORM, and a responsive user interface built with Radix UI components and Tailwind CSS. Qubot enables users to engage in multi-turn conversations, manage chat history, switch between different AI models, and maintain personalized sessions across devices.

The system architecture follows a client-server model with RESTful API endpoints, real-time streaming responses, and comprehensive SEO optimization for enhanced discoverability. This project demonstrates the practical implementation of modern web development practices, including Progressive Web App (PWA) capabilities, server-side rendering, and scalable database design.

---

# TABLE OF CONTENTS

| Chapter | Title                            | Page No. |
| :------ | :------------------------------- | :------- |
| **1**   | **INTRODUCTION**                 |          |
| 1.1     | Background                       |          |
| 1.2     | Problem Statement                |          |
| 1.3     | Proposed Solution                |          |
| 1.4     | Objectives                       |          |
| **2**   | **SYSTEM ANALYSIS**              |          |
| 2.1     | Existing System                  |          |
| 2.2     | Feasibility Study                |          |
| **3**   | **SYSTEM DESIGN**                |          |
| 3.1     | System Architecture              |          |
| 3.2     | Data Flow Diagrams (DFD)         |          |
| 3.3     | Entity-Relationship (ER) Diagram |          |
| 3.4     | Database Schema                  |          |
| **4**   | **IMPLEMENTATION**               |          |
| 4.1     | Technology Stack                 |          |
| 4.2     | Development Methodology          |          |
| 4.3     | Key Modules                      |          |
| **5**   | **TESTING & RESULTS**            |          |
| 5.1     | Testing Strategies               |          |
| 5.2     | Expected Outcomes                |          |
| **6**   | **CONCLUSION & FUTURE SCOPE**    |          |
| 6.1     | Conclusion                       |          |
| 6.2     | Future Scope                     |          |
| **7**   | **REFERENCES**                   |          |

---

# CHAPTER 1: INTRODUCTION

## 1.1 Background

The rapid advancement of artificial intelligence and natural language processing has revolutionized human-computer interaction. Conversational AI systems have become increasingly sophisticated, enabling users to obtain information, solve problems, and automate tasks through intuitive dialogue interfaces. However, many existing solutions are either proprietary, limited in functionality, or lack the flexibility to integrate multiple AI models.

## 1.2 Problem Statement

Users require a versatile, accessible, and user-friendly platform that:

- Provides access to multiple AI models within a single interface.
- Maintains conversation context and history across sessions.
- Offers secure authentication and personalized user experiences.
- Delivers responsive, real-time interactions with minimal latency.
- Ensures data privacy and secure storage of user conversations.
- Provides seamless cross-device accessibility.

## 1.3 Proposed Solution

Qubot addresses these challenges by implementing a full-stack web application that combines:

- **Multi-model AI Integration**: Support for various AI models through the Vercel AI SDK.
- **Persistent Chat Management**: Database-backed conversation storage and retrieval.
- **Secure Authentication**: OAuth-based authentication with GitHub integration.
- **Modern UI/UX**: Responsive design with dark mode support and accessibility features.
- **Real-time Streaming**: Server-sent events for immediate response delivery.
- **Progressive Enhancement**: PWA capabilities for offline access and app-like experience.

## 1.4 Objectives

### Primary Objectives

1. **Develop a Functional AI Chat Interface**: Implement real-time message streaming, support multi-turn conversations, and enable chat management.
2. **Implement Secure User Authentication**: Integrate OAuth 2.0 with GitHub and manage secure user sessions.
3. **Design a Scalable Database Architecture**: Create a normalized schema for users, sessions, chats, and messages using PostgreSQL.
4. **Build a Responsive User Interface**: Develop mobile-first layouts with accessibility compliance.

### Secondary Objectives

1. **Optimize for Search Engines**: Implement SEO metadata, sitemaps, and structured data.
2. **Enable PWA Features**: Create a web app manifest and service workers for offline capabilities.
3. **Implement Model Selection**: Allow users to switch between different AI models.

---

# CHAPTER 2: SYSTEM ANALYSIS

## 2.1 Existing System

Currently, users often rely on fragmented tools for AI interaction. They might use one platform for GPT models, another for open-source models, and have no unified history or context. Most free or basic implementations lack:

- **Persistence**: chats are lost upon refresh.
- **Security**: no user accounts or private history.
- **Integration**: limited to a single model provider.

## 2.2 Feasibility Study

### Technical Feasibility

The project uses standard, well-documented technologies (Next.js, PostgreSQL, OpenAI API). The clear documentation and active community support for these tools ensure technical feasibility.

### Economic Feasibility

The project utilizes free tiers of cloud services (Vercel, Neon DB) and pay-per-use AI APIs, making it cost-effective for development and initial deployment.

### Operational Feasibility

The user interface is designed to be intuitive, requiring no special training for users. The web-based nature ensures accessibility across devices without installation.

---

# CHAPTER 3: SYSTEM DESIGN

## 3.1 System Architecture

The system follows a modern **Client-Server Architecture**.

- **Client**: A Next.js (React) Single Page Application (SPA) that handles the UI, state management, and user interactions.
- **Server**: Next.js API Routes / Server Actions that act as the backend, communicating with the database and external AI services.
- **Database**: PostgreSQL database accessed via Prisma ORM for structured data storage.
- **External Services**: GitHub for Authentication (OAuth) and OpenAI/Vercel AI SDK for model inference.

## 3.2 Data Flow Diagrams (DFD)

### Level 0 DFD - Context Diagram

_Ref: Project Documentation Section 4.1_
The User interacts with the Qubot System, which in turn communicates with the AI Model Provider, Database (PostgreSQL), and Auth Provider (GitHub).

### Level 1 DFD - Main Processes

The system is decomposed into five main processes:

1. **User Authentication**: Login requests, token verification.
2. **Chat Management**: CRUD operations for chat sessions.
3. **Message Processing**: Sending messages, storing history.
4. **AI Integration**: Forwarding prompts to AI, streaming responses.
5. **Session Management**: Handling user sessions and security.

## 3.3 Entity-Relationship (ER) Diagram

The data model consists of the following core entities:

- **USER**: Stores user profile information.
- **SESSION**: Manages active login sessions.
- **ACCOUNT**: link to OAuth providers (GitHub).
- **CHAT**: Represents a conversation thread.
- **MESSAGE**: Individual messages within a chat.

_(For detailed diagram, refer to the project documentation)_

## 3.4 Database Schema

**User Entity**:

- `id` (PK), `name`, `email`, `image`.
  **Chat Entity**:
- `id` (PK), `title`, `model`, `userId` (FK).
  **Message Entity**:
- `id` (PK), `content`, `role` (user/assistant), `chatId` (FK).

---

# CHAPTER 4: IMPLEMENTATION

## 4.1 Technology Stack

| Layer        | Technology               | Description                           |
| :----------- | :----------------------- | :------------------------------------ |
| **Frontend** | Next.js 16, React 19     | Server-side rendering, UI components. |
| **Styling**  | Tailwind CSS 4, Radix UI | Responsive, accessible design.        |
| **Backend**  | Next.js API Routes       | Serverless functions for logic.       |
| **Database** | PostgreSQL, Prisma ORM   | Relational data storage.              |
| **Auth**     | Better Auth              | OAuth authentication handling.        |
| **AI**       | Vercel AI SDK            | Streaming and model abstraction.      |

## 4.2 Development Methodology

The project followed an **Agile** approach:

1. **Planning**: Requirement analysis and schema design.
2. **Core Dev**: Implementing Auth, DB, and Basic Chat.
3. **Enhancement**: Adding UI polish, themes, and model selectors.
4. **Testing/Deploy**: SEO optimization and Vercel deployment.

## 4.3 Key Modules

1. **Authentication Module**: Handles secure sign-in flows using GitHub.
2. **Chat Interface Module**: The main UI for sending logic, rendering markdown responses.
3. **Streaming Engine**: Manages the real-time data stream from the AI provider to the client.

---

# CHAPTER 5: TESTING & RESULTS

## 5.1 Testing Strategies

- **Unit Testing**: Testing individual utility functions.
- **Integration Testing**: Verifying API endpoints and database interactions.
- **End-to-End Testing**: Validating the complete user flow from login to chatting.
- **Performance Testing**: Checking load times and responsiveness (Core Web Vitals).

## 5.2 Expected Outcomes

- **Functional**: Users can successfully log in, create chats, and receive intelligent responses.
- **Performance**: High Lighthouse scores (>90) for Performance, Accessibility, and SEO.
- **Reliability**: Secure data persistence and graceful error handling.

---

# CHAPTER 6: CONCLUSION & FUTURE SCOPE

## 6.1 Conclusion

Qubot successfully demonstrates the implementation of a modern, full-stack AI application. It bridges the gap between complex AI models and end-users by providing a clean, accessible interface. The project meets all primary objectives, offering secure authentication, persistent history, and real-time interaction. It stands as a testament to the power of the Next.js ecosystem combined with robust backend services.

## 6.2 Future Scope

- **Voice Interface**: Adding Speech-to-Text and Text-to-Speech capabilities.
- **File Analysis**: Allowing users to upload documents for the AI to analyze.
- **Multi-Modal Support**: Integrating image generation and vision capabilities.
- **Collaborative/Shared Chats**: allowing multiple users to participate in a single session.

---

# REFERENCES

1. **Next.js Documentation**. Vercel Inc. https://nextjs.org/docs
2. **React Documentation**. Meta Platforms. https://react.dev
3. **Prisma ORM**. Prisma Data, Inc. https://www.prisma.io/docs
4. **Better Auth**. https://www.better-auth.com/docs
5. **Vercel AI SDK**. https://sdk.vercel.ai/docs
6. **Tailwind CSS**. https://tailwindcss.com/docs
7. **PostgreSQL Documentation**. https://www.postgresql.org/docs/
