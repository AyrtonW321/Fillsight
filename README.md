# Fillsight

A GTA fuel-price analytics portfolio project. The initial release will use approved public regional datasets; station reporting is a later phase.

## Current state

The responsive demo includes a home page with featured stations, a searchable station explorer with an interactive schematic map, individual station profiles, an insights page, and an about/data page. Hash-based navigation supports static hosts without server rewrites.

All station identities, addresses, coordinates, prices, histories, distances and amenities are synthetic fixtures in `src/data/stations.ts`. No live data, geolocation, API key or backend is connected. Never use these records for navigation or purchase decisions.

The design uses warm neutrals, olive and lime, with responsive list/map layouts and accessible chart tables. Recharts is loaded separately from the main application bundle.

## Requirements and setup

Use Node.js 24 LTS (see `.nvmrc`) and npm. No API keys, environment variables, database, or paid services are needed.

```sh
npm ci
npm run dev
```

Run commands from the repository root. Vite prints the development address. The development server binds to all interfaces for cloud development; use `npm run dev -- --host 127.0.0.1` to restrict it to the local machine.

## Checks and production build

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

The static production output is in `dist/`. Asset paths are relative to support hosting beneath a repository subpath. No deployment is configured or published. Future client-side routing will require a separate hosting/path decision.

The GitHub Actions workflow runs lint, component tests, and the production build. Confirm account/repository free-runner allowances before enabling Actions; no deployment or paid integrations are configured.

## Structure

- `index.html`: document metadata and React mount point.
- `src/App.tsx`: home, explorer, station profiles, insights, about, and hash navigation.
- `src/data/stations.ts`: typed synthetic fixtures; replace through a validated data adapter.
- `src/components/StationMap.tsx`: provider-neutral map props and interactive schematic placeholder.
- `src/components/PriceChart.tsx`: historical chart component.
- `src/main.tsx`: application entry point.
- `src/styles.css`: visual system and responsive layouts.
- `src/test/` and `src/App.test.tsx`: test setup and accessibility/navigation smoke checks.
- `docs/PROJECT_PLAN.md`: detailed scope, milestones, and future roadmap.

## Next steps

Verify public dataset licences and formats, then replace the demo fixtures with validated observations. Prices must retain source attribution, observation dates, geographic scope, and units. Never present placeholder or regional values as actual station prices.

## Browser checks

```sh
npx playwright install chromium
npm run test:e2e
```

The browser suite checks desktop and mobile journeys, station selection, fuel filtering, detail history, and page overflow. It uses system Chromium when `/usr/bin/chromium` is available; otherwise it uses Playwright’s installed browser. Screenshots are written to the system temporary directory (`/tmp` in the cloud environment).

## Connecting real data and maps later

Keep synthetic fixtures separate from production observations. Validate external records with Zod, preserve units and timestamps, and represent missing fields explicitly rather than falling back to demo values. Replace the schematic inside `StationMap` using its `StationMapProps` contract: station records with geographic coordinates, selected ID, selected fuel, and selection callback. The `x`/`y` coordinates are illustration-only; a real provider must use verified `lat`/`lng`. Review map licensing, key restrictions, attribution, and free usage limits before enabling a provider.
