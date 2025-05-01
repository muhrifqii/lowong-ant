# LowongAnt – Mini Job Board

A simple yet modern job board platform where companies can post jobs and users can search, filter, and explore opportunities.

---

## Live Demo

🔗 [https://lowong-ant.vercel.app](https://lowong-ant.vercel.app)

---

## Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, shadcn/ui, React Table
- **Backend:** Supabase (Auth + PostgreSQL + RLS)
- **Auth:** Supabase Auth with email-based signup
- **Deploy:** Vercel

---

## Features

- Authentication (signup, login)
- Post a job (title, company, location, type, description)
- Public job board with filters (location, job type, title search)
- User dashboard with CRUD for jobs
- Responsive UI styled with shadcn & Tailwind
- Real-time querying with RLS + pagination-ready hooks

---

## Setup Instructions

1. Clone the repo
   ```bash
   git clone git@github.com:muhrifqii/lowong-ant.git
   cd lowong-ant
   ```
1. Add your own [supabase](https://supabase.com) backend and set it to `.env` file
   ```.env
   NEXT_PUBLIC_SUPABASE_URL=<YOUR_SUPABASE_URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
   ```
1. If bun is not yet installed, go to [https://bun.sh/](https://bun.sh/) and install it on local machine. If bun is ready, install all dependencies, then run it
   ```bash
   bun install
   bun dev
   ```

## Architecture Overview

- Semi-Atomized & Clean Architecture with many reusable components
- Building blocks of atom, moleculs, organism components as dummy as it can be
- Encapsulation: Custom Hook encapsulate logics and state handling
- Separation of Concerns: Each module/files has their own responsibility
- Tables on Dashboard is using tanstack table
- Layout is split by scope

## Project Structure Overview

- `/app`: Nextjs App Routing
- `/assets`: Assets
- `/components`: Consist of molecus and organism that is generic and commonly used
  - `/components/ui`: Consist of atom components, modified version from Shadcn UI
  - `/components/auth`: Consist of organisms and templates specific to auth scope
  - `/components/dashboard`: Consist of organisms and templates specific to dashboard scope
  - `/components/landing`: Consist of organisms and templates specific to landing page scope
- `/hooks`: Custom hooks and business logics
- `/lib`: Helper functions and logics
- `/types`: Dictionary for types and data structures
  - `/types/db.ts`: Supabase Schema and Table Types
- `/middleware.ts`: Nextjs middleware function

## What Would I Improve with More Time?

- Implement unit tests
- Add image/logo uploads for companies (Supabase storage)
- Implement Captcha on Sign Up Page for rate limiting the account registration
- Add resend email verification function
- Add pagination UI and deep link support to /jobs
- Polish Dashboard features
- Implement User (Job Hunter) Auth & Registration
- Add Authz using simple RBAC on Supabase
- Use Supabase Edge Functions for better filtering logic
- SSR caching for faster public job list performance
- Accessibility polish and skeleton loaders
- Pricing Models
