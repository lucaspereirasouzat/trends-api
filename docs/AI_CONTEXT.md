# trends-api - AI Context

## Project Overview

A REST API that wraps the `google-trends-api` npm package, providing a clean HTTP interface to Google Trends data. Built with **Bun** and **Elysia**.

- **Runtime:** Bun v1.3.6
- **Framework:** Elysia v1.4.19
- **Data source:** google-trends-api v4.9.2
- **Language:** TypeScript (strict mode, ESNext target, bundler module resolution)
- **Port:** 3000

## Architecture

Three-layer architecture with dependency injection:

```
HTTP Request
    |
    v
Controllers (src/controllers/)   -- Thin Elysia route handlers, extract query params
    |
    v
Use-Cases (src/use-cases/)       -- Validation, option building, date parsing
    |
    v
Gateway (src/gateway/)           -- Wraps google-trends-api, handles JSON parsing
```

Data flow: Controller receives request -> delegates to Use-Case -> Use-Case validates params, builds options object -> calls Gateway -> Gateway calls google-trends-api and parses JSON -> result flows back up.

## Folder Structure

```
trends-api/
├── index.ts                           # Entry point: imports app, calls listen(3000)
├── package.json                       # Scripts: dev, start, test, test:watch
├── src/
│   ├── app.ts                         # Composition root: wires gateway -> use-cases -> controllers
│   ├── types/
│   │   └── google-trends-api.d.ts     # Ambient TypeScript declarations for google-trends-api
│   ├── gateway/
│   │   └── google-trends.gateway.ts   # GoogleTrendsGateway interface + GoogleTrendsGatewayImpl
│   ├── use-cases/
│   │   ├── autocomplete.use-case.ts
│   │   ├── interest-over-time.use-case.ts
│   │   ├── interest-by-region.use-case.ts
│   │   ├── related-queries.use-case.ts
│   │   ├── related-topics.use-case.ts
│   │   ├── realtime-trends.use-case.ts
│   │   └── daily-trends.use-case.ts
│   └── controllers/
│       ├── autocomplete.controller.ts
│       ├── interest-over-time.controller.ts
│       ├── interest-by-region.controller.ts
│       ├── related-queries.controller.ts
│       ├── related-topics.controller.ts
│       ├── realtime-trends.controller.ts
│       └── daily-trends.controller.ts
├── tests/
│   ├── gateway/                       # Gateway tests (mock google-trends-api module)
│   ├── use-cases/                     # Use-case tests (mock gateway interface)
│   └── controllers/                   # Controller tests (mock use-case, use app.handle())
└── docs/
    └── AI_CONTEXT.md                  # This file
```

## Endpoints Reference

| Path | Required Params | Optional Params | Defaults |
|------|----------------|-----------------|----------|
| `GET /autocomplete` | `keyword` | - | - |
| `GET /interest-over-time` | `keyword` | `startTime`, `endTime`, `geo`, `granularTimeResolution` | - |
| `GET /interest-by-region` | `keyword` | `startTime`, `endTime`, `geo`, `resolution` | - |
| `GET /related-queries` | `keyword` | `startTime`, `endTime`, `geo` | - |
| `GET /related-topics` | `keyword` | `startTime`, `endTime`, `geo` | - |
| `GET /realtime-trends` | - | `geo`, `category` | `geo=US`, `category=all` |
| `GET /daily-trends` | - | `geo`, `trendDate` | `geo=US` |
| `GET /` | - | - | Returns API documentation JSON |

**Response format:**
- Success: `{ "data": <parsed JSON from google-trends-api> }`
- Error: `{ "error": "<message>" }`

**Special behaviors:**
- `interest-over-time`: comma-separated keywords are split into an array (e.g., `?keyword=bitcoin,ethereum` becomes `["bitcoin", "ethereum"]`)
- `interest-by-region`: keywords are NOT split (always passed as a single string)
- `granularTimeResolution`: only the exact string `"true"` activates it (boolean conversion)
- Date params (`startTime`, `endTime`, `trendDate`) are converted from strings to `Date` objects

## How to Run

```bash
bun install          # Install dependencies
bun run dev          # Start with --watch (auto-reload)
bun run start        # Start without watch
```

## How to Test

```bash
bun test             # Run all tests
bun test --watch     # Watch mode
bun test tests/use-cases/   # Run only use-case tests
```

## Key Patterns

### Dependency Injection
Use-cases receive the gateway via constructor. Controllers receive use-cases via factory function arguments. This enables easy mocking in tests.

### Controller Factory Pattern
Each controller is a factory function `createXController(useCase)` that returns a new `Elysia` instance with the route registered. The app composes them via `.use()`.

### Return Convention
Use-cases return `{ data: unknown }` on success or `{ error: string }` on failure. Errors are not thrown - they are returned as JSON objects for backward compatibility.

### Testing with app.handle()
Controller tests use `app.handle(new Request(...))` to simulate HTTP requests without binding to a real port. This makes tests fast and parallelizable.

## Extending the API

To add a new endpoint:

1. **Gateway:** Add the method to `GoogleTrendsGateway` interface and `GoogleTrendsGatewayImpl` class
2. **Use-Case:** Create `src/use-cases/<name>.use-case.ts` - define request type, class with `execute()` method
3. **Controller:** Create `src/controllers/<name>.controller.ts` - factory function that returns Elysia route
4. **App:** Register the new controller in `src/app.ts` via `.use()`
5. **Tests:** Add tests in all three layers (gateway, use-case, controller)
6. **Docs:** Update the endpoints object in `src/app.ts` root route and this file

## google-trends-api Notes

- Returns JSON strings (always needs `JSON.parse()` - handled by gateway)
- Has no TypeScript declarations (we maintain our own in `src/types/google-trends-api.d.ts`)
- `interestOverTime` accepts `keyword` as `string` or `string[]`
- `interestByRegion` accepts `keyword` only as `string`
- All methods return `Promise<string>`
