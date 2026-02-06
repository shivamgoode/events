import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  // 1. New state for the search query
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    api.get("/events").then((res) => setEvents(res.data));
  }, []);

  // 2. Logic to filter events based on the title
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#020617] p-8 md:p-12 text-slate-200">
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
          Admin <span className="text-indigo-500">Console</span>
        </h1>
        <p className="text-slate-500 text-xs font-bold mt-2 tracking-[0.3em] uppercase">
          Event Management System
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {/* 3. Modern Search Bar Section */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by event title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-md shadow-inner"
            />
          </div>

          <aside className="relative ">
            <div className="sticky top-10 bg-slate-900 border border-white/10 p-10 rounded-[32px] shadow-2xl ">
              {selected ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 mx-[20px]">
                  <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black rounded-lg mb-6 uppercase tracking-widest">
                    Metadata Preview
                  </span>
                  <h2 className="text-2xl font-black text-white leading-tight mb-8">
                    {selected.title}
                  </h2>
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-white/5 ">
                      <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest block mb-2">
                        Event Summary
                      </label>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {selected.description ||
                          "No summary available for this entry."}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-24 px-6 border-2 border-dashed border-white/5 rounded-[24px]">
                  <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
                    Select an event <br /> to view Intelligence
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* 4. Display Filtered Events */}
          <div className="flex flex-wrap justify-center  flex-wrap gap-2 ">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((e) => (
                <div
                  key={e._id}
                  onClick={() => setSelected(e)}
                  className={`
                    group cursor-pointer p-6 rounded-[24px] border transition-all duration-300
                    flex flex-col md:flex-row md:items-center gap-6 m-[10px]
                    ${
                      selected?._id === e._id
                        ? "bg-indigo-600/10 border-indigo-500/50 shadow-xl"
                        : "bg-slate-900/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10"
                    }
                  `}
                >
                  <div className="flex flex-wrap justify-between  gap-2 mx-[10px] w-[280px] h-[180px] bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                        {e.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">
                        Reference: {e._id.slice(-8)}
                      </p>
                    </div>

                    <div className="flex items-center md:justify-end gap-8">
                      <div className="text-right">
                        <p className="text-[9px] text-slate-600 font-black uppercase tracking-tighter">
                          Status
                        </p>
                        <p
                          className={`text-xs font-bold uppercase mt-1 ${
                            e.status === "active"
                              ? "text-emerald-500"
                              : "text-amber-500"
                          }`}
                        >
                          {e.status || "Pending"}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-all">
                        <svg
                          className="w-4 h-4 text-slate-500 group-hover:text-indigo-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-900/20 border border-white/5 rounded-[24px]">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                  No matching events found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
