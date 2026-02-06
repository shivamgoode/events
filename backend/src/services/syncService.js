import Event from "../models/Event.js";

const sanitizeEvent = (event) => {
  const cleaned = {};
  Object.entries(event).forEach(([key, value]) => {
    if (value !== undefined) cleaned[key] = value;
  });
  return cleaned;
};

export const syncEvents = async (scrapedEvents) => {
  const urls = scrapedEvents.map((e) => e.sourceUrl).filter(Boolean);

  if (urls.length > 0) {
    await Event.updateMany(
      { sourceUrl: { $nin: urls } },
      { status: "inactive" },
    );
  }

  const now = new Date();
  const ops = scrapedEvents.map((raw) => {
    const normalized = sanitizeEvent({
      ...raw,
      datetime: raw.datetime ? new Date(raw.datetime) : null,
      lastScrapedAt: now,
    });

    return {
      updateOne: {
        filter: { sourceUrl: normalized.sourceUrl },
        update: {
          $set: { ...normalized, status: "updated" },
        },
        upsert: true,
      },
    };
  });

  if (ops.length > 0) {
    await Event.bulkWrite(ops, { ordered: false });
  }
};

export const markStaleEventsInactive = async (hours = 6) => {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  await Event.updateMany(
    { lastScrapedAt: { $lt: cutoff } },
    { status: "inactive" },
  );
};
