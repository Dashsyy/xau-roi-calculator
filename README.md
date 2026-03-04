# Gold ROI Calculator (XAU PNL)

A Next.js-based web application designed to help users calculate the return on investment (ROI) for gold transactions. It is specifically tailored for the Cambodian market, supporting local units such as **Xi** and **Domlang**, alongside the international **Ounce**.

## Features

- **Multi-Unit Support:** Seamlessly calculate ROI across different gold units:
  - Ounce (International)
  - Domlang (Cambodian)
  - Xi (Cambodian)
- **Internationalization (i18n):** Full support for English (EN), Khmer (KM), and Chinese (ZH).
- **Responsive Design:** Clean, modern interface built with Tailwind CSS.
- **Fast & Modern Tech Stack:** Powered by Next.js 14, React 18, and TypeScript.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Testing:** [Vitest](https://vitest.dev/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository (if you haven't already) and navigate into the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run test`: Runs the Vitest test suite.

## Core Logic & Architecture

- **`app/`**: Next.js App Router containing the main entry points and layouts.
- **`src/components/`**: Reusable UI components like `PriceInput`, `QuantityInput`, and `ResultCard`.
- **`src/utils/goldConversion.ts`**: Centralized logic for unit normalization and ROI calculations.
  - 1 Ounce = 8.23 Xi
  - 1 Domlang = 4 Xi
- **`src/i18n/`**: Handles multi-language context and translations.

## Testing

This project uses Vitest for unit testing to verify the accuracy of the gold conversion logic and other utilities.
To run the tests:

```bash
npm run test
```
