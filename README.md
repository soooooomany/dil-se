# Dil Se - Artisan Bakery E-commerce

A modern e-commerce platform for an artisan bakery built with Next.js 14+. Experience the warmth of freshly baked goods through our digital storefront.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Direct connection)
- **Authentication**: NextAuth.js
- **State Management**: Server Actions + Client State
- **Environment**: Bun for enhanced performance

## Features

- Modern, responsive design
- Product catalog with categories
- Shopping cart functionality
- User authentication
- Order management
- Admin dashboard

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dil-se.git
   cd dil-se
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up the database:
   ```bash
   # Create the database and tables
   psql -U postgres -f src/db/schema.sql
   ```

4. Create a `.env` file:
   ```env
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/dilse"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

5. Start the development server:
   ```bash
   bun run dev
   ```

## Prerequisites

- Node.js 18+ (or Bun 1.0+)
- PostgreSQL 15+
- Git
- User authentication and order management
- Admin dashboard for product and order management
- Animations and micro-interactions

## Getting Started

First, set up your environment:

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Push the database schema
npx prisma db push

# Run database seed
npm run seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
