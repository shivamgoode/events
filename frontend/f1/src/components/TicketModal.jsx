import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import api from "../services/api.js";

export default function TicketModal({ event, onClose }) {
  console.log("✅ TicketModal rendered:", event.title);

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  const submit = async () => {
    if (!email || !consent) {
      alert("Email and consent required");
      return;
    }

    setLoading(true);
    await api.post("/leads", {
      email,
      consent,
      eventId: event._id,
    });

    window.location.href = event.sourceUrl;
  };

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          background: "#111",
          color: "#fff",
          padding: "24px",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "12px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            background: "transparent",
            color: "#fff",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2 style={{ fontSize: "20px", fontWeight: 600 }}>{event.title}</h2>

        <p style={{ fontSize: "14px", opacity: 0.7, marginTop: 4 }}>
          {event.datetime
            ? new Date(event.datetime).toLocaleString()
            : "Date TBA"}
        </p>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "10px",
            background: "#000",
            border: "1px solid #444",
            color: "#fff",
            borderRadius: "6px",
          }}
        />

        <label style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span style={{ fontSize: "14px", opacity: 0.8 }}>
            I agree to receive event emails
          </span>
        </label>

        <button
          onClick={submit}
          disabled={loading}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            background: "#6366f1",
            border: "none",
            color: "#fff",
            borderRadius: "999px",
            cursor: "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Processing…" : "Continue"}
        </button>
      </div>
    </div>,
    document.body,
  );
}
