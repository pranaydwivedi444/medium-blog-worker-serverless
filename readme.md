# Medium Blog Clone

Deployed Backend Url = https://backend.pranaydwivedi444.workers.dev

Medium Blog Clone
Overview
This is a full-stack Medium Blog Clone project built using modern web development technologies. The frontend is powered by React and TypeScript, styled with TailwindCSS, and includes TinyMCE for rich-text editing. The backend is built with Hono.js and deployed on Cloudflare Workers. It features CRUD operations with Postgres, Prisma ORM, JWT authentication (using cookies), and Zod for validation. The project is designed for high scalability and modern development practices with TypeScript support across both the frontend and backend.
Current Features
Frontend:

React & TypeScript for a type-safe and modular architecture
TailwindCSS for utility-first, responsive design
TinyMCE for rich-text blog post creation and editing
Reusable UI Components like Buttons, Checkboxes, and Navbar
Routing with React Router for smooth navigation (Signup, Signin, Blog management)
State Management with React Hooks
CRUD Operations for blogs and users
API Integration with the backend to handle authentication, blog fetching, creation, and editing
Supabase validation with Zod for safe input handling
Backend:

Hono.js as the lightweight server-side framework deployed on Cloudflare Workers
JWT Authentication with cookies for secure sessions
Postgres database with Prisma ORM for handling relational data
Zod validation schema for ensuring type-safe APIs
Supabase for user authentication and storage solutions
Planned Features
State Management:
Integrate React Context for global state handling
Optionally use React Recoil or React Query for asynchronous data management
Caching:
Implement Redis for caching frequently accessed data
Infinite Scroll:
Add Bottom Loading/Infinite Scroll for a better UX on blog lists
AI Integration:
Integrate Google Bard AI for blog summarization and enhanced user experience
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

