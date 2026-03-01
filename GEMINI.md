# GEMINI.md - Gold ROI Calculator

## Project Overview
The **Gold ROI Calculator** is a React-based web application designed to help users calculate the return on investment (ROI) for gold transactions. It is specifically tailored for the Cambodian market, supporting local units such as **Xi** and **Domlang**, as well as the international **Ounce**.

### Key Technologies
- **Framework:** [React 18](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Internationalization:** Custom i18n implementation supporting English (EN), Khmer (KM), and Chinese (ZH).

### Architecture
- **`src/App.tsx`**: The main entry point and state manager for the calculator.
- **`src/components/`**: Contains reusable UI components like `PriceInput`, `QuantityInput`, and `ResultCard`.
- **`src/utils/goldConversion.ts`**: Centralized logic for unit normalization (Xi, Domlang, Ounce) and ROI calculations.
- **`src/i18n/`**: Handles multi-language support and translations.
- **`src/services/goldPriceService.ts`**: Service layer for fetching gold prices (currently mocked).

---

## Building and Running

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Key Commands
- `npm install`: Install project dependencies.
- `npm run dev`: Start the local development server with HMR.
- `npm run build`: Build the project for production (runs `tsc` and `vite build`).
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Locally preview the production build.

---

## Development Conventions

### Coding Style
- **Functional Components**: Use React functional components with hooks (`useState`, `useMemo`, `useCallback`).
- **TypeScript**: Strictly type all props, state, and utility functions.
- **Tailwind CSS**: Use utility classes for styling. Follow the existing "glassmorphism" and clean aesthetic.

### Internationalization (i18n)
- All user-facing strings must be added to `src/i18n/translations.ts`.
- Use the `useLanguage` hook and the `t()` function to retrieve translated strings.

### Business Logic
- Gold units are normalized to **Xi** for internal calculations.
- Unit conversion factors:
  - 1 Ounce = 8.23 Xi
  - 1 Domlang = 4 Xi

### Testing & Validation
- Ensure calculations in `goldConversion.ts` are verified when adding new units.
- Test the UI across different languages (EN, KM, ZH) to ensure layout stability (especially for Khmer script).
