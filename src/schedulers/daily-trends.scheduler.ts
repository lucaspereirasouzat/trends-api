import type { SyncDailyTrendsUseCase } from "../use-cases/sync-daily-trends.use-case";

export interface DailyTrendsSchedulerOptions {
  geos: string[];
  time: string;
  timeZone: string;
}

const DEFAULT_OPTIONS: DailyTrendsSchedulerOptions = {
  geos: ["US"],
  time: "06:15",
  timeZone: "UTC",
};

/**
 * A small in-process daily cron. It checks each minute, so timezone/DST handling
 * stays with Intl instead of duplicating timezone arithmetic in the application.
 */
export class DailyTrendsScheduler {
  private timer: ReturnType<typeof setInterval> | undefined;
  private lastRunKey: string | undefined;
  private readonly options: DailyTrendsSchedulerOptions;

  constructor(
    private readonly syncDailyTrends: SyncDailyTrendsUseCase,
    options: Partial<DailyTrendsSchedulerOptions> = {},
  ) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.validateOptions();
  }

  start(): void {
    if (this.timer) return;
    this.check();
    this.timer = setInterval(() => this.check(), 60_000);
  }

  stop(): void {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = undefined;
  }

  private check(): void {
    const now = this.zonedParts(new Date());
    const [hour, minute] = this.options.time.split(":");

    if (now.hour !== hour || now.minute !== minute) return;

    const trendDate = `${now.year}-${now.month}-${now.day}`;
    if (this.lastRunKey === trendDate) return;
    this.lastRunKey = trendDate;

    void this.run(trendDate);
  }

  private async run(trendDate: string): Promise<void> {
    const results = await Promise.allSettled(
      this.options.geos.map((geo) =>
        this.syncDailyTrends.execute({ geo, trendDate }),
      ),
    );

    for (const [index, result] of results.entries()) {
      if (result.status === "rejected") {
        console.error(
          `Failed to persist daily trends for ${this.options.geos[index]}:`,
          result.reason,
        );
      }
    }
  }

  private zonedParts(
    date: Date,
  ): Record<"year" | "month" | "day" | "hour" | "minute", string> {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: this.options.timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date);

    return Object.fromEntries(
      parts
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, part.value]),
    ) as Record<"year" | "month" | "day" | "hour" | "minute", string>;
  }

  private validateOptions(): void {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(this.options.time)) {
      throw new Error("DAILY_TRENDS_CRON_TIME must use HH:mm (24-hour) format");
    }

    if (
      this.options.geos.length === 0 ||
      this.options.geos.some((geo) => !geo)
    ) {
      throw new Error("DAILY_TRENDS_GEOS must contain at least one geo");
    }

    new Intl.DateTimeFormat("en-US", { timeZone: this.options.timeZone });
  }
}
