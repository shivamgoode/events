import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeMeetup = async () => {
  console.log("🟡 Meetup scrape started");

  const { data } = await axios.get(
    "https://www.meetup.com/find/?location=au--sydney",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122",
      },
    },
  );

  const $ = cheerio.load(data);
  const links = $("a[href^='/']").toArray();

  const events = links
    .map((el) => ({
      title: $(el).text().trim(),
      sourceUrl: "https://www.meetup.com" + $(el).attr("href"),
      source: "Meetup",
      city: "Sydney",
    }))
    .filter((e) => e.title && e.sourceUrl.includes("/events/"));

  const detailed = [];

  for (const event of events) {
    try {
      const { data: html } = await axios.get(event.sourceUrl);
      const d = cheerio.load(html);

      detailed.push({
        ...event,
        datetime:
          d("time").attr("datetime") ||
          d("meta[property='event:start_time']").attr("content") ||
          null,

        venue: d("address").text().trim() || null,
        description:
          d("meta[property='og:description']").attr("content") || null,

        imageUrl: d("meta[property='og:image']").attr("content") || null,

        category: [],
        status: "new",
        lastScrapedAt: new Date(),
      });
    } catch (err) {
      console.error("❌ Meetup failed:", event.sourceUrl);
    }
  }

  console.log("🟢 Meetup events:", detailed.length);
  return detailed;
};
