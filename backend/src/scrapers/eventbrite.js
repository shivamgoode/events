import puppeteer from "puppeteer";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const scrapeEventbrite = async () => {
  console.log("🟡 Eventbrite scrape started");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36",
  );

  await page.goto("https://www.eventbrite.com.au/d/australia--sydney/events/", {
    waitUntil: "networkidle2",
    timeout: 60000,
  });

  await page.waitForSelector("a[href*='/e/']", { timeout: 30000 });

  // Scroll more slowly
  for (let i = 0; i < 8; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await sleep(1500);
  }

  const events = await page.$$eval("a[href*='/e/']", (links) => {
    const seen = new Set();
    return links
      .map((a) => ({
        title: a.querySelector("h3")?.innerText?.trim(),
        sourceUrl: a.href,
        source: "Eventbrite",
        city: "Sydney",
      }))
      .filter(
        (e) =>
          e.title &&
          e.sourceUrl &&
          !seen.has(e.sourceUrl) &&
          seen.add(e.sourceUrl),
      );
  });

  const results = [];

  for (const event of events) {
    try {
      const p = await browser.newPage();
      await p.goto(event.sourceUrl, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });

      await p.waitForSelector("body", { timeout: 30000 });

      const details = await p.evaluate(() => {
        const text = (el) => el?.textContent?.trim() || null;

        return {
          datetime:
            document.querySelector("time")?.getAttribute("datetime") || null,

          venue:
            text(document.querySelector("address")) ||
            text(document.querySelector("[data-testid*='location']")),

          description:
            text(document.querySelector("meta[name='description']")) ||
            text(document.querySelector("[data-testid*='description']")),

          imageUrl:
            document.querySelector("meta[property='og:image']")?.content ||
            document.querySelector("img")?.src ||
            null,

          category: Array.from(
            document.querySelectorAll("a[href*='category']"),
          ).map((c) => c.textContent.trim()),
        };
      });

      await p.close();

      results.push({
        ...event,
        ...details,
        status: "new",
        lastScrapedAt: new Date(),
      });

      await sleep(1200);
    } catch (err) {
      console.error("❌ Eventbrite detail failed:", event.sourceUrl);
    }
  }

  await browser.close();
  console.log("🟢 Eventbrite events:", results.length);

  return results;
};
