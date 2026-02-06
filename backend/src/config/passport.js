import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

dotenv.config();

const clientID = process.env.GOOGLE_ID;
const clientSecret = process.env.GOOGLE_SECRET;
const callbackURL =
  process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback";

if (!clientID || !clientSecret) {
  throw new Error("Missing GOOGLE_ID or GOOGLE_SECRET in environment");
}

passport.use(
  new GoogleStrategy(
    { clientID, clientSecret, callbackURL },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
