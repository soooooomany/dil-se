# Dil Se - Artisan Bakery E-commerce

A modern e-commerce platform for an artisan bakery built with Next.js 14+.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Authentication**: NextAuth.js with Prisma adapter
- **Database**: PostgreSQL with Prisma ORM
- **Animation**: Framer Motion
- **Testing**: Vitest, Playwright, Testing Library
- **Deployment**: Vercel

## Features

- Modern, responsive design with custom bakery theme
- Real-time product filtering and sorting
- Shopping cart with persistence
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
