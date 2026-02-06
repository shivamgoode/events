import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5001;

connectDB().then(async () => {
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    if (process.env.RUN_SCRAPER === "true") {
      const { startScraperJob } = await import("./jobs/scrape.job.js");
      startScraperJob();
    }
  });
});
