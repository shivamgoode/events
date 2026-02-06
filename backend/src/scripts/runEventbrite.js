import { connectDB } from "../config/db.js";
import { scrapeEventbrite } from "../scrapers/eventbrite.js";

(async () => {
  try {
    console.log("🚀 Running Eventbrite scraper manually");

    await connectDB();
    await scrapeEventbrite();

    console.log("✅ Scraper finished successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Scraper failed:", error);
    process.exit(1);
  }
})();
