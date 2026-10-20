# Fillsight: project outline and delivery plan

Status: portfolio scope confirmed. The founder has authorized the visual website and interactive station-demo experience. Live data, a real map provider and production publication remain deferred.

## 1. Purpose and product promise

Fillsight will help Greater Toronto Area drivers understand fuel prices and make better purchasing decisions. Its proposed long-term distinction is station-level history, trustworthy freshness indicators, and evidence-based advice about where and when to fill up.

The supplied research document is an input to planning, not verified legal advice or a validated inventory of available feeds. Confirm source terms, availability, competitor capabilities, and dataset contents before depending on them. Historical findings about Toronto do not establish current pricing behaviour.

### Confirmed founder requirements

- The first release is a polished portfolio demo using public data.
- There is no strict deadline; delivery follows milestones.
- No paid services, subscriptions, paid APIs, or required purchases. Prefer options that do not require a payment card, and do not enable paid overages.
- One developer will build and maintain it.
- Mobile and desktop are both required, with responsive and accessible layouts.
- Start with regional data. Station reporting is a later extension, not a first-release dependency.

### Proposed initial scope

Use a staged release to avoid promising station-level intelligence before enough observations exist:

1. Regional analytics beta: Toronto market history, explanatory charts, data provenance, and an ingestion pipeline for approved open datasets.
2. Station reporting pilot: a small, explicitly defined service area with manually submitted, timestamped fuel prices and moderation.
3. Decision support: station comparisons and forecasts only after coverage and backtesting meet documented release thresholds.

Markham, Richmond Hill, and Scarborough are candidate pilot areas, not confirmed commitments. Toronto market observations must not be labelled as measurements of every GTA neighbourhood.

### Decisions required from the founder

| Question | Why it matters | Provisional assumption |
|---|---|---|
| Portfolio, research, or public service? | Changes reliability, security, and launch scope | Confirmed: polished portfolio demo with public data |
| Who is the first user? | Determines the main screen and success criteria | Regular GTA commuter buying regular gasoline |
| Timeline and available hours? | Determines how much fits in a release | Confirmed: no strict deadline; milestone-based delivery |
| Monthly spending limit? | Limits hosting, maps, email, and external feeds | Confirmed: zero budget; no paid services |
| Solo developer and experience? | Changes architecture and task sizing | Confirmed: solo developer; minimize infrastructure |
| Preferred language and framework? | Avoids an unsuitable stack | TypeScript web app, PostgreSQL |
| Reports at first launch? | Adds accounts, abuse handling, and moderation | Confirmed: regional data first; reporting later |
| Exact geographic boundary and fuel types? | Defines coverage and data validation | Toronto regional data; regular gasoline first |
| Will the operator moderate reports regularly? | Determines whether public submissions can launch | Reporting stays private until an owner exists |
| Commercial intent and jurisdiction? | Affects contracts, privacy, and incentives | Canada-first; no payments or prize draws initially |

Do not silently treat provisional assumptions as accepted requirements.

## 2. Outcomes and release boundaries

### Regional beta must provide

- A responsive overview with latest available regional observation, observation date, publication/fetch status, and source attribution.
- Historical price charts with date filtering, accessible summaries, and clearly stated units: Canadian cents per litre.
- Comparisons supported by the actual dataset, such as prior week and prior year, with missing periods handled explicitly.
- Methodology and source pages explaining geographic scope, update cadence, limitations, and corrections.
- A repeatable ingestion process with monitoring, raw-source provenance where permitted, and a safe retry path.
- A visible unavailable or stale state when data cannot be refreshed.

### Reporting pilot additionally requires

- A permitted station directory, station detail pages, authenticated manual reports, quality checks, report freshness, and operator moderation.
- Distinction between submitted observations, accepted observations, and the displayed current-price estimate.
- A measurable coverage report. Empty coverage must be presented honestly.

### Defer until justified

Photo/receipt OCR, prize draws, owner dashboards, native apps, broad GTA coverage, push notifications, loyalty programs, payments, automated leader/follower rankings, and Google fuel-price integration. Each introduces dependencies that are unnecessary for a first regional release.

### Portfolio success criteria

The first release succeeds when a visitor can understand the project, explore authentic regional fuel-price history on mobile and desktop, identify source and observation dates, and read a clear explanation of the methods and limitations. A reviewer must be able to reproduce the data preparation and run the app using documented commands. No station prices or forecasts are required for this release.

Verify layouts at representative small-phone, tablet and desktop widths, with no horizontal overflow, usable touch controls, readable charts and keyboard access. Include loading, empty, error and stale-data states. Provide project screenshots and a concise portfolio case study explaining the problem, data decisions, architecture and tradeoffs.

Measure chart and ingestion correctness first. For the pilot, measure stations with recent trusted reports, report rejection/correction rate, time until erroneous prices are corrected, and repeat reporting. Define “recent” by fuel type and observed local price volatility before launch. Product engagement measures can include returning users and station-detail usage; avoid collecting precise location history just to measure engagement. Forecast success requires performance against explicit baselines, not merely producing a number.

## 3. User journeys and pages

| Page/journey | Essential content and behaviour | Dependency |
|---|---|---|
| Home / regional overview | Region, latest observed price, age, trend, historical chart, source | Approved regional feed |
| History | Date range, supported fuel type, units, gaps, accessible table | Normalized historical data |
| Methodology / sources | Licences, collection methods, update schedule, uncertainties | Source register |
| Station directory | Search/filter and coverage state; list usable without map | Licensed station metadata |
| Station detail | Identity, location, report age, accepted price history | Reporting pilot |
| Submit report | Station, grade, price, observation time, confirmation | Authentication and validation |
| Account | Sign-in, privacy controls, deletion/contact pathway | Reporting pilot |
| Admin moderation | Review, reject, correct, audit, suspend abuse | Restricted operator access |
| Forecast / decision support | Horizon, confidence, evidence, unavailable state | Evaluated model and price coverage |

Wireframe mobile layouts before building components. Charts must support keyboard use, readable contrast, non-colour indicators, and textual equivalents. Request location permission only after the user chooses a nearby-station feature; manual region selection must work without it.

## 4. Data acquisition and legal feasibility

Complete this work before selecting production integrations.

### Source approval checklist

For every source, record: owner, canonical URL, exact dataset/resource identifier, geographic coverage, fuel types, observation versus publication dates, cadence, historical range, format/schema, licence version, attribution requirements, storage/redistribution permissions, retention limits, authentication, costs, rate limits, and last review date. Preserve evidence of approval and a contact route. Publicly viewable does not by itself mean licensed for automated collection or historical storage.

| Candidate source | Proposed role | Approval/technical work |
|---|---|---|
| Ontario fuels price survey | Regional history and baseline | Confirm resource identifiers, current licence, schema, units, cadence and Toronto coverage |
| Ontario wholesale datasets | Potential forecast inputs | Verify daily observation availability, actual publication delay and historical revisions |
| Statistics Canada | Optional context/validation | Confirm table dimensions, Toronto series and reuse requirements |
| Independently licensed station metadata | Station directory | Evaluate OSM or direct station input; document applicable attribution and database obligations |
| Direct user submissions | Station history | Establish contributor terms, moderation, provenance and privacy controls |
| Station agreements | Optional supply | Written agreement on display, retention, historical use and responsibility |
| Petro-Canada rack data | Optional signal | Review automation and reuse rights; exclude until approved |
| Gas Wizard / CAE | Optional forecast benchmark | Permission for collection/reuse; do not presume public pages are a feed |
| Google Places fuel data | Optional live feature | Separate terms review for storage, display, map and attribution restrictions; exclude from historical database without permission |

Do not use GasBuddy scraping or third-party scrapers as a planned dependency. Do not copy restricted source prices into user-report tables or use user submissions as a mechanism to import competitor datasets.

### Feasibility gate

Proceed with the regional beta only after a sample can be retrieved, parsed, attributed, and stored under confirmed terms. If station metadata or station prices remain unavailable, keep the product regional. If daily forecast inputs are published only weekly, they cannot support a next-day production forecast; choose a different approved input or defer that feature.

## 5. Proposed architecture

A provisional zero-cost stack for the portfolio release:

- React, TypeScript and Vite for the responsive interface and static production build. Tailwind CSS is configured; Recharts and Zod are installed for later charting and data validation.
- Versioned, normalized JSON or CSV snapshots generated from approved public datasets, rather than a hosted database for the first release.
- A TypeScript ingestion command run locally or in the existing cloud development workspace. Keep retrieval, validation and normalization separate from rendering.
- A chart library selected for accessibility and licence compatibility.
- Static hosting on an eligible free plan, selected after checking current terms, build limits, bandwidth, account requirements and payment-card requirements. GitHub Pages is a candidate if repository/account eligibility and framework configuration fit.
- Manual data refresh and redeployment as the baseline. Optional scheduled GitHub Actions only after verifying included quotas; no paid runner or overage dependency.

The site must render from its checked-in or bundled permitted snapshot without contacting an upstream source on every visit. Display snapshot age and source cadence honestly. Do not call the data live. Verify redistribution permission before committing snapshots; if redistribution is not permitted, choose another open source or document a supported build-time retrieval process.

No hosted database, authentication, transactional email, paid map integration or background server is required for the portfolio release. If a free public deployment cannot be achieved within verified limits, keep a fully runnable local demo and report deployment as unresolved rather than introducing a paid service.

PostgreSQL, managed authentication, server endpoints and moderation infrastructure are later-phase design options for station reporting, not initial requirements. Re-evaluate their free-plan feasibility before starting that phase. Avoid microservices and Kubernetes.

Suggested future repository layout:

```text
app/                  routes and page composition
components/           accessible interface elements
lib/                  domain logic, database access, validation
jobs/                 ingestion and maintenance entry points
migrations/           versioned database changes
fixtures/             small permitted source samples
tests/                unit, integration and browser checks
docs/                 product, source register and operational instructions
```

Confirm framework conventions before committing this layout. Pin the runtime and package manager, commit a lockfile, use frozen installation in CI, and document environment variable names without values.

## 6. Data model and correctness rules

For the portfolio release, implement only sources, regions, ingestion metadata and regional observations as typed files/schemas. The table below also sketches later station and forecasting entities; it does not require creating a database or unused tables now.

| Entity | Purpose and important fields |
|---|---|
| Source | Owner, resource identifier, licence reference, allowed use, attribution, cadence |
| Ingestion run | Source, start/end, result, row counts, errors, content hash, parser version |
| Region | Name, boundary definition, source geography identifier |
| Regional observation | Region, source, fuel type, observation date/period, price, publication availability and ingestion run |
| Station | Internal ID, provenance, name, address, coordinates, lifecycle status |
| User | Auth identity reference and minimum profile information |
| Price report | Station, fuel type, exact price, observed time, received time, contributor, provenance and review status |
| Moderation event | Actor, report, action, reason, timestamp; append-only audit history |
| Forecast | Model/version, issue time, target time, region, prediction, interval and input cutoff |

Use decimal/numeric or integer scaled units for prices; never binary floating point for canonical price storage. Explicitly preserve the common tenth of a cent per litre precision. Use UTC for instants and America/Toronto for local display and date boundaries; preserve source date-only observations without inventing an exact timestamp.

Keep cash, credit, member, and conditional discounts distinct. Do not merge regular, midgrade, premium, diesel or different octane definitions. Never invent station prices from a regional average. Preserve uncertainty and source identity.

Define idempotency keys and uniqueness rules per source. A source correction must update or version the corresponding observation rather than create an unrelated duplicate. Preserve original reports and record corrections through auditable actions.

## 7. Ingestion implementation plan

1. Obtain permitted samples and write down schema and semantics.
2. Build a source adapter with explicit timeouts, bounded retries/backoff, size limits, and HTTP error handling.
3. Validate headings, types, units, date formats, region identifiers, missing markers and duplicate rows.
4. Normalize data into a staging representation and produce an import summary.
5. Write normalized snapshot files atomically using source-specific idempotency keys; reserve transactional database imports for a later reporting phase.
6. Retain permitted raw responses or hashes plus retrieval metadata; avoid logging credentials.
7. Backfill a bounded historical period, inspect anomalies, then expand to the approved history range.
8. Run the import twice and verify no duplicate observations or incorrect changes.
9. Document manual refresh according to publication cadence; optionally schedule within verified free automation quotas. Prevent concurrent runs from conflicting.
10. Make failed refreshes, unexpected schema changes, unusual row counts and missing publications visible in command output and optional free CI notifications.
11. Document reprocessing, corrections, rollback and recovery.

Fixtures must include malformed rows, date-boundary cases, missing prices, revisions and unexpected schema changes. An upstream failure must preserve the last valid dataset and mark its age.

## 8. Reporting quality, privacy and security

For the pilot, begin with manual reports and authenticated contributors. Capture station, fuel type, price, observation time, and price conditions. GPS can support a proximity check when permission is granted; it is not proof of honesty and can be spoofed. Decide whether to retain coordinates at all; prefer retaining only the minimum verification result when sufficient.

Validate reasonable ranges and time windows, detect repeated submissions, rate limit endpoints, and flag disagreement with nearby observations. Treat outliers as review candidates rather than automatically false. Require corroboration for suspicious changes and retain operator override history. Avoid presenting a single unverified report as confirmed.

Before launch:

- Define report acceptance, expiry, correction, appeals and account suspension policies.
- Define ownership of moderation and a response process for wrong station details or prices.
- Document what personal information is collected, why, retention, deletion, processors and data location.
- Review applicable Canadian privacy obligations with qualified advice as needed; determine obligations from actual operation rather than assuming a particular law applies to everything.
- Enforce server-side authorization on submissions and admin actions; protect secrets and use least-privilege database credentials.
- Check authentication/session handling, input validation, injection protection, request forgery where applicable, dependency vulnerabilities and abuse limits.
- Keep precise user locations, tokens and future receipt images out of logs and analytics.

Receipt OCR requires a separate privacy review for payment and personal details, redaction, image retention, storage access and deletion. Do not add it casually to the manual-report pilot. Incentive draws require their own rules, budget and legal review.

## 9. Analytics and forecast plan

### Descriptive analytics first

Show comparable observations over time, with source cadence visible. A weekly survey cannot support intraday charts. Station consistency rankings need a defined time window, minimum comparable sample, freshness standard, and coverage-bias disclosure. Leader/follower behaviour needs sufficiently dense timestamps and a methodology that distinguishes reporting delay from actual price changes.

### Forecasting gate

1. Define the target precisely: region, fuel type, next local day or next observation period, and price level versus change.
2. Inventory inputs by when they were actually available, including publication delays and revisions.
3. Establish naive baselines: last observed price and appropriate simple change/history baselines.
4. Use rolling time-based evaluation, never randomly shuffled future and past observations.
5. Fit a simple interpretable model before considering complex alternatives.
6. Measure absolute error in cents/L, direction accuracy where meaningful, interval calibration, and performance by period.
7. Record model versions, input cutoffs and issue times so results can be reproduced.
8. Run forecasts privately in shadow mode and compare prospective results with backtests.
9. Set a minimum evaluation period and improvement threshold before displaying consumer advice. The thresholds require actual data; do not fabricate expected accuracy now.

“Fill now versus wait” also depends on litres purchased, travel distance, price freshness and uncertainty. Explain assumptions and show estimated savings only where supported. Avoid definitive advice when signals disagree or data is stale.

## 10. Delivery milestones and task sequence

M0–M5 are the portfolio release. M6–M9 are optional future roadmap items and must not delay portfolio completion. Solo capacity and zero cost take precedence over infrastructure suggestions below.

Effort bands are rough focused person-days for an experienced developer, not calendar promises. A beginner or part-time schedule, unavailable data, approval delays and design revisions can substantially extend them. Re-estimate after source feasibility and technical selection.

| Milestone | Tasks | Deliverable / exit criteria | Rough effort |
|---|---|---|---|
| M0: product decisions | Answer founder questions; define user, boundary, fuel, budget and beta success | Approved scope and explicit exclusions | 1–2 days |
| M1: source feasibility | Verify licences/resources; retrieve samples; inspect cadence and revisions | Source register and proven permitted regional sample; go/no-go | 2–5 days |
| M2: design and technical foundation | Mobile wireframes; choose eligible free static hosting; pin tools; scaffold app; snapshot schema; CI | Repeatable local/cloud setup and static preview build or local preview | 2–4 days |
| M3: reliable regional data | Adapter; schema validation; backfill; idempotency; manual refresh command; failure visibility | Verified history, repeat imports, operational runbook | 3–6 days |
| M4: regional interface | Overview; charts; filters; sources; stale/error/empty states; accessibility | End-to-end regional beta with real approved data | 3–6 days |
| M5: regional beta release | Review data, privacy, security, responsive behaviour, reproducibility and free-hosting limits; pilot feedback | Release checklist passes, reviewer can reproduce and run the demo | 2–4 days |
| M6: station pilot | Licensed directory; accounts; reports; quality rules; moderation; station pages | Private reporting pilot with audited accepted observations | 6–12 days |
| M7: coverage and history | Recruit reporters; monitor coverage; tune expiry; historical charts | Measured coverage supports stated product claims | Engineering 3–6 days plus observation/recruitment time |
| M8: forecast research | Availability audit; baselines; backtests; shadow predictions | Reproducible evidence supporting release or deferral | 4–8 days plus prospective observation time |
| M9: advice and expansion | Explain uncertainty; eligible comparisons; evaluate savings; expand carefully | Useful recommendations with ongoing monitoring | Re-estimate after M7/M8 |

Critical path for the regional beta: M0 → M1 → M2/M3 → M4 → M5. Station work does not block a regional beta. Production forecasts depend on verified timely inputs and prospective validation; they must not be implied by completing the regional interface.

### Suggested task breakdown for the first implementation cycle

- [ ] Confirm scope and choose one primary user journey.
- [ ] Record at least one approved regional source and a reproducible retrieval example.
- [ ] Review sample rows and data availability before choosing forecasting goals.
- [ ] Agree on homepage/history wireframes and design tokens.
- [ ] Verify static hosting eligibility, free limits and no required paid services.
- [ ] Scaffold repository with runtime pins, lockfile and environment template containing names only.
- [ ] Define typed snapshot schemas and a safe atomic file-generation process; no database required.
- [ ] Implement the first source adapter and meaningful fixture-based validation.
- [ ] Import a bounded dataset; manually compare sample observations with the source.
- [ ] Implement typed server queries and the regional pages.
- [ ] Add a documented manual refresh command, freshness indicator and clear failure output; automation optional.
- [ ] Complete CI and staging smoke tests.
- [ ] Reproduce the app from a clean checkout, test mobile and desktop, write the portfolio case study and review launch gates.

## 11. Testing and acceptance criteria

| Area | Required evidence |
|---|---|
| Ingestion | Expected fixture rows normalize correctly; malformed schemas fail clearly; retries bounded; second import is idempotent |
| Data fidelity | Representative source rows match stored dates, regions, grades and prices; corrections handled |
| Snapshot / later database | First release: snapshot schema and reproducible generation pass. Later reporting: migration and access-control checks |
| Web | Build/type checks pass; browser test loads real test data and exercises filters and error states |
| Accessibility | Keyboard navigation, focus, chart alternatives, labels, contrast and mobile layouts reviewed |
| Reporting | Unauthorized writes denied; invalid/duplicate reports handled; moderation actions auditable |
| Forecasts | Time-aware evaluation, no future leakage, baseline comparisons and shadow results recorded |
| Operations | Failed refresh visible; stale state correct; clean-checkout reproduction and prior-snapshot rollback verified |

Use unit tests for parsing and domain logic, snapshot-generation integration checks, and a small browser suite for core journeys. PostgreSQL integration tests apply only if a later phase introduces PostgreSQL. Never point automated write tests at production. Avoid substituting static screenshots or a successful HTTP response for functional correctness.

Set explicit page performance budgets after wireframes and hosting selection, and verify on representative mobile conditions and data volumes. Load test the intended beta traffic and write endpoints within an agreed budget. Keep production data out of fixtures.

## 12. Deployment, operations and cost control

For the confirmed portfolio scope, use static build artifacts, local preview and an eligible free static host. The broader operational checklist below applies proportionally: database backups, credentials, server monitoring and scheduled jobs are needed only if those services are actually introduced. They are not prerequisites for a snapshot-based demo.

Required portfolio workflow: retrieve approved public data → validate → generate snapshot → review changes → run tests/build → preview on mobile and desktop → deploy static output within verified free limits. Keep a prior valid snapshot/build available for rollback. A source outage must not prevent an existing snapshot from rendering.

No custom domain purchase is required; use the host-provided address. Prefer no-credit-card plans. Do not sign up for trials that convert to paid plans, enable billing, or require a paid upgrade to finish the project.

- Separate local development, staging and production environments.
- Use CI for dependency installation, type/build checks, meaningful tests and migration validation.
- Run preview/staging deployments before production releases; define who authorizes production publication.
- Store credentials in provider secret stores; document required names and privileges.
- Use managed TLS and confirm domain ownership/DNS before public launch.
- Schedule ingestion independently from browser visits; record last success and expected next update.
- Monitor ingestion errors, server errors, database capacity and cost. Set budget alerts and usage caps where supported.
- Define backup frequency, retention, recovery time and acceptable data loss according to beta needs; test restoration.
- Maintain incident, rollback, source-change, moderation and data-correction runbooks.
- Review auth/email quotas, database/storage/egress limits, map costs and observability costs. Free tiers are provisional, not a guarantee of zero cost.

The current cloud environment is a development workspace, not production hosting. Future tasks should use the existing checkout under `/workspace/Fillsight`; do not create worktrees unless explicitly requested. Once a stack exists, save tested dependency installation and startup instructions through the cloud environment configuration flow.

## 13. Release gates

### Regional beta gate

- [ ] Source rights and attribution are recorded.
- [ ] Actual source cadence and geography match every public claim.
- [ ] Historical values, units, dates and gaps have been checked.
- [ ] Manual data refresh and stale/error states have been exercised; any optional schedule stays within verified free quotas.
- [ ] Core browser flow, build and relevant tests pass.
- [ ] Accessibility, mobile layout, privacy/contact pages and security review complete.
- [ ] Clean-checkout reproduction and snapshot/build rollback are documented and tested.
- [ ] Solo maintenance steps are documented; every required service is free with paid overages disabled or unavailable.
- [ ] Site clearly distinguishes regional data from station observations.
- [ ] Mobile and desktop layouts pass review; screenshots and portfolio case study are complete.

### Station pilot gate

- [ ] Station metadata rights are established.
- [ ] Authentication, submission limits, privacy controls and moderation work.
- [ ] Report provenance, observation age and conditions are visible.
- [ ] Coverage thresholds and operator responsibilities are defined and met.
- [ ] Seed observations are authentic and distinguishable from synthetic test data.

### Advice gate

- [ ] Inputs are available at forecast issue time under permitted terms.
- [ ] Prospective evaluation supports the stated usefulness.
- [ ] Confidence and unavailable/stale behaviour are clear.
- [ ] Savings estimates state assumptions and account for travel where relevant.

## 14. Risks and responses

| Risk | Response |
|---|---|
| No usable free station feed | Regional beta first; collect direct reports or obtain agreements |
| Source licence or format changes | Source register, isolated adapters, schema alerts, fallback display |
| Sparse or biased user reporting | Small pilot, coverage metrics, minimum sample requirements |
| False or stale reports | Expiry, corroboration, moderation, provenance and corrections |
| Misleading forecasts | Simple baselines, availability-aware tests, shadow mode, deferral |
| Location/receipt privacy exposure | Data minimization, opt-in collection, defer OCR |
| Unexpected provider costs | Budget alerts, quotas, limited integrations, provider review |
| Solo operator overload | Limit features and area; delay public reports until moderation staffed |

## 15. Documents to produce as implementation progresses

1. Approved product brief and scope decisions.
2. Source/licence register and ingestion data dictionary.
3. Architecture decision records and provider cost comparison.
4. Wireframes and accessible interface specifications.
5. Contributor, privacy and moderation policies for reporting.
6. API/schema documentation and migration instructions.
7. Test strategy, CI instructions and release checklist evidence.
8. Deployment, backup/restore and incident runbooks.
9. Forecast methodology and evaluation report if forecasting proceeds.

The next planning action is to confirm coding experience and technology preferences, then finalize the source-feasibility checklist. If no preference is given, use the provisional TypeScript/static-snapshot approach. The current authorization covers a responsive visual demo, featured stations, a map/list explorer, and station profiles using clearly labelled synthetic metrics. Live feeds, paid subscriptions, user-data collection and publication remain outside that step.
