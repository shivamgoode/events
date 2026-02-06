import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import eventRoutes from "./routes/event.routes.js";
import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import "./config/passport.js";

const app = express();
app.get("/__test", (req, res) => {
  res.status(200).send("TEST OK");
});

// 🔥 TEMP: OPEN CORS (NO BLOCKING)
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// 🔥 DEBUG LOGGER
app.use((req, res, next) => {
  console.log("➡️", req.method, req.originalUrl);
  next();
});

app.use("/api/events", authRoutes, eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (_, res) => res.send("API running"));

export default app;
