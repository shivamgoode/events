import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import EventCard from "../components/EventCard";
import TicketModal from "../components/TicketModal";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    api
      .get("/events?city=Sydney")
      .then((res) => setEvents(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 ">
        <header className="h-[50px] bg-[#4F4D9D] flex justify-between alignitem-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Sydney <span className="text-indigo-500">Events</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">
            Browse through the latest happenings
          </p>
          <div className="mt-6 flex justify-end">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-white to-white-600 text-white text-sm font-semibold shadow-lg shadow-indigo-900/30 ring-1 ring-white/10 hover:from-indigo-500 hover:to-fuchsia-500 hover:shadow-indigo-900/40 transition"
            >
              Go to Dashboard →
            </Link>
          </div>
        </header>

        <main className="pb-32">
          {/* Changed from flex to grid:
            - gap-8: Adds perfect margin between each card.
            - grid-cols-1/2/3/4: Ensures cards are always the same size 
              based on screen width.
          */}
          <div className="flex flex-wrap justify-center  flex-wrap gap-2">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onGetTickets={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </main>
      </div>

      {selectedEvent && (
        <TicketModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
