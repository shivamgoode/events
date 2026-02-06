import cron from "node-cron";
import { scrapeEventbrite } from "../scrapers/eventbrite.js";
import { scrapeMeetup } from "../scrapers/meetup.js";
import {
  syncEvents,
  markStaleEventsInactive,
} from "../services/syncService.js";

let isRunning = false;

export const startScraperJob = () => {
  cron.schedule("* * * * *", async () => {
    if (isRunning) return;

    isRunning = true;
    console.log("🕒 Running scraper job");

    try {
      const eventbrite = await scrapeEventbrite();
      const meetup = await scrapeMeetup();

      await syncEvents([...eventbrite, ...meetup]);
      console.log("✅ Scraper job completed");
    } catch (err) {
      console.error("❌ Scraper failed:", err);
    } finally {
      isRunning = false;
    }
  });

  cron.schedule("0 * * * *", async () => {
    await markStaleEventsInactive(6);
  });

  console.log("🗓️ Scraper runs every minute");
};
