# Medium Blog Clone

Deployed Backend Url = https://backend.pranaydwivedi444.workers.dev

Medium Blog Clone
Overview
This is a full-stack Medium Blog Clone project built using modern web development technologies. The frontend is powered by React and TypeScript, styled with TailwindCSS, and includes TinyMCE for rich-text editing. The backend is built with Hono.js and deployed on Cloudflare Workers. It features CRUD operations with Postgres, Prisma ORM, JWT authentication (using cookies), and Zod for validation. The project is designed for high scalability and modern development practices with TypeScript support across both the frontend and backend.
## Features

### Current Features

#### Frontend
- **React & TypeScript**: Type-safe and modular architecture.
- **TailwindCSS**: Utility-first, responsive design.
- **TinyMCE**: Rich-text blog post creation and editing.
- **Reusable UI Components**: Includes Buttons, Checkboxes, and Navbar.
- **Routing**: Smooth navigation using React Router for Signup, Signin, and Blog management.
- **State Management**: Utilizes React Hooks for local state management.
- **CRUD Operations**: Manage blogs and users effectively.
- **API Integration**: Handles authentication, blog fetching, creation, and editing with backend.
- **Input Validation**: Supabase validation with Zod for safe input handling.

#### Backend
- **Hono.js**: Lightweight server-side framework deployed on Cloudflare Workers.
- **JWT Authentication**: Secure sessions using cookies.
- **Postgres Database**: Managed with Prisma ORM for relational data.
- **API Validation**: Zod validation schema for type-safe APIs.
- **User Authentication**: Integrated with Supabase for authentication and storage solutions.

### Planned Features
- **State Management**: Integrate React Context for global state handling.
- **Data Management**: Optionally use React Recoil or React Query for asynchronous data management.
- **Caching**: Implement Redis for caching frequently accessed data.
- **Infinite Scroll**: Add Bottom Loading/Infinite Scroll for improved UX on blog lists.
- **AI Integration**: Integrate Google Bard AI for blog summarization and enhanced user experience.

## Installation

Clone whole project then  cd into Front end and backend 

```bash
npm install 
```

## Usage
Set up environment variables: Create a .env file in the root directory and add your TinyMCE API key:
```javascript
# For Front ,  env keys example :
VITE_tinyMCE_API_KEY=your-api-key-here


# For Backend ,  env keys example :
DATABASE_URL=your-postgres-url
# In Wrangler.toml
DATABASE_URL="your pool connection url"
 JWT_SECRET = "jwt secret"
 COOKIE_SECRET = "cookie secret"
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

