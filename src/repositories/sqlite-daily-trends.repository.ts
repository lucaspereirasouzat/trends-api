import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import type {
  DailyTrendsRepository,
  StoredDailyTrends,
} from "./daily-trends.repository";

interface DailyTrendsRow {
  geo: string;
  trend_date: string;
  payload: string;
  fetched_at: string;
}

/** SQLite implementation for the daily Google Trends snapshots. */
export class SqliteDailyTrendsRepository implements DailyTrendsRepository {
  private readonly database: Database;

  constructor(
    databasePath = process.env.SQLITE_DATABASE_PATH ?? "data/trends.sqlite",
  ) {
    if (databasePath !== ":memory:") {
      mkdirSync(dirname(databasePath), { recursive: true });
    }

    this.database = new Database(databasePath, { create: true });
    this.database.run("PRAGMA journal_mode = WAL");
    this.database.run(`
      CREATE TABLE IF NOT EXISTS daily_trends (
        geo TEXT NOT NULL,
        trend_date TEXT NOT NULL,
        payload TEXT NOT NULL,
        fetched_at TEXT NOT NULL,
        PRIMARY KEY (geo, trend_date)
      )
    `);
  }

  save(record: StoredDailyTrends): void {
    this.database.run(
      `INSERT INTO daily_trends (geo, trend_date, payload, fetched_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(geo, trend_date) DO UPDATE SET
         payload = excluded.payload,
         fetched_at = excluded.fetched_at`,
      [
        record.geo,
        record.trendDate,
        JSON.stringify(record.data),
        record.fetchedAt,
      ],
    );
  }

  findByGeoAndDate(geo: string, trendDate: string): StoredDailyTrends | null {
    const row = this.database
      .query<DailyTrendsRow, [string, string]>(
        "SELECT geo, trend_date, payload, fetched_at FROM daily_trends WHERE geo = ? AND trend_date = ?",
      )
      .get(geo, trendDate);

    if (!row) return null;

    return {
      geo: row.geo,
      trendDate: row.trend_date,
      data: JSON.parse(row.payload),
      fetchedAt: row.fetched_at,
    };
  }
}
