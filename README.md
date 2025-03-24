# Workflow Automation Readiness Assessment

A modern web application that helps businesses assess their readiness for AI-powered workflow automation with real-time industry insights.

## Overview

This application provides an interactive survey to evaluate how businesses can transform their operations through AI-powered automation solutions. It includes a user-friendly interface built with React, robust backend powered by Express, and AI-enhanced analytics with real-time web search capabilities.

## Features

- Interactive assessment survey with real-time AI recommendations
- Web search-enhanced analysis providing industry-specific insights
- Beautiful, responsive UI built with Tailwind CSS and Shadcn UI components
- Client-side routing with Wouter
- Data visualization with Recharts
- Server-side data processing and storage

## AI-Powered Features

### Real-time Recommendations
- **Dynamic Analysis**: Provides personalized recommendations as users complete the survey
- **Industry-Specific Insights**: Delivers benchmarks and trends relevant to the user's industry
- **Tool Recommendations**: Suggests automation tools tailored to the user's specific needs

### Enhanced Analytics
- **Industry Comparisons**: Shows how the user's automation readiness compares to industry averages
- **Relevant Case Studies**: Provides examples of successful automation implementations in similar businesses
- **ROI Projections**: Offers insights into typical timeframes and returns for automation investments

### OpenAI Web Search Integration
- **Website Analysis**: Analyzes the user's company website to better understand their industry and needs
- **Real-time Industry Data**: Leverages OpenAI's web search capabilities to provide up-to-date industry information
- **Tool Research**: Searches for the latest automation tools specifically suited to the user's needs
- **Personalized Benchmarks**: Combines survey responses with web data for highly relevant comparisons

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI (Radix UI components)
- Framer Motion for animations
- React Query for data fetching
- Wouter for routing
- Zod for form validation

### Backend
- Express.js
- TypeScript
- OpenAI API integration with web search capabilities
- Axios for HTTP requests
- In-memory data storage with session support

### Build Tools
- Vite for frontend bundling
- ESBuild for server bundling
- TSX for development

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd workflow-automation-survey
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=development
```

### Development

Run the development server:
```bash
npm run dev
```

This will start both the frontend and backend in development mode.

### Production Build

Build the application for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
├── client/               # Frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and configurations
│   │   ├── pages/        # Application pages
│   │   └── utils/        # Helper functions
│   └── index.html        # HTML template
├── server/               # Backend application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── ai-service.ts     # AI analysis engine
│   ├── web-search.ts     # OpenAI web search integration
│   ├── storage.ts        # Data storage logic
│   └── vite.ts           # Vite configuration for development
├── shared/               # Shared code between client and server
│   └── schema.ts         # TypeScript interfaces and Zod schemas
├── public/               # Static assets
└── dist/                 # Production build output
```

## License

MIT 