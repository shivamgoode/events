import mongoose from "mongoose";

const TicketLeadSchema = new mongoose.Schema(
  {
    email: String,
    consent: Boolean,
    eventId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true },
);

export default mongoose.model("TicketLead", TicketLeadSchema);
