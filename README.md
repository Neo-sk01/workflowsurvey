# Workflow Automation Readiness Assessment

A modern web application that helps businesses assess their readiness for AI-powered workflow automation.

## Overview

This application provides an interactive survey to evaluate how businesses can transform their operations through AI-powered automation solutions. It includes a user-friendly interface built with React and a robust backend powered by Express.

## Features

- Interactive assessment survey
- Beautiful, responsive UI built with Tailwind CSS and Shadcn UI components
- Client-side routing with Wouter
- Data visualization with Recharts
- Server-side data processing and storage

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
- In-memory data storage with session support

### Build Tools
- Vite for frontend bundling
- ESBuild for server bundling
- TSX for development

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

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
│   ├── storage.ts        # Data storage logic
│   └── vite.ts           # Vite configuration for development
├── public/               # Static assets
├── shared/               # Shared code between client and server
└── dist/                 # Production build output
```

## License

MIT 