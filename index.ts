import { app, dailyTrendsScheduler } from "./src/app";

const port = Number(process.env.PORT ?? 3001);

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

app.listen(port);
dailyTrendsScheduler.start();

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
