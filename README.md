# trends-api

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Daily snapshots

The service stores a daily `daily-trends` snapshot in SQLite and exposes it at
`GET /daily-trends/stored?trendDate=YYYY-MM-DD&geo=US`.

The in-process scheduler runs every day at `06:15 UTC` by default. Configure it
with `SQLITE_DATABASE_PATH`, `DAILY_TRENDS_GEOS` (comma-separated),
`DAILY_TRENDS_CRON_TIME` (`HH:mm`), and `DAILY_TRENDS_TIME_ZONE`.

This project was created using `bun init` in bun v1.3.6. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
