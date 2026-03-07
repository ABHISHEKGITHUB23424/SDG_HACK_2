# Staff-Centric Academic Risk & Success Intelligence Platform

A production-ready comprehensive platform aimed at academic staff for monitoring student engagement, managing alerts with simluated AI voice calls (via Vapi), and automating WhatsApp nudges (via Twilio).

## Features
- **Automated Alert & Calling Dashboard**: View hackathon and contest attendance dynamically. Trigger calls and nudges.
- **OD Recommendation Engine**: Custom Random Forest rule-based engine predicting and evaluating OD request statuses based on student historic CGPA, Hackathons, and GitHub patterns. 
- **Progress Tracker & Handover Report**: Semester by semester comparisons. Rule-based deterministic AI generation of Risk Summaries.

## Tech Stack
- Frontend: Next.js 14 (App Router)
- Styling: Tailwind CSS & shadcn/ui
- Database: PostgreSQL, Prisma ORM
- Auth: NextAuth.js
- Visuals: Recharts & Lucide React

## Setup Instructions

1. **Clone the repository and install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Ensure `.env` matches your local database setup. The default `.env` assumes a PostgreSQL database at `postgresql://postgres:postgres@localhost:5432/seghack`. You can easily adjust `DATABASE_URL` in `.env`.

3. **Migrate the Database**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   # or npx prisma db push
   ```

4. **Seed the Test Data**
   Run the seeding script to populate Staff credentials and mock Students/Contests:
   ```bash
   npm run prisma seed
   ```
   **Staff Credentials**: 
   - Email: `staff@academy.edu`
   - Password: `staff123`

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

Navigate to `http://localhost:3000` to log in and use the platform.

### Stub Integrations Note
All third-party integrations (Vapi for voice calls, Twilio for WhatsApp) are explicitly marked with `[STUB]` logs and simulated delays inside `/lib/stubs/*` and their associated API routes. They simulate complete application flow locally without real API keys.
