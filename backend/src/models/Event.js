import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: String,
    datetime: Date,
    venue: String,
    address: String,
    city: { type: String, default: "Sydney" },
    description: String,
    category: [String],
    imageUrl: String,
    source: String,
    sourceUrl: { type: String, unique: true },
    status: {
      type: String,
      enum: ["new", "updated", "inactive", "imported"],
      default: "new",
    },
    importedAt: Date,
    importedBy: String,
    importNotes: String,
    lastScrapedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Event", EventSchema);
