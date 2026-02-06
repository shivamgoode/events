import React from "react";

export default function EventCard({ event, onGetTickets }) {
  return (
    /* Outer wrapper with fixed dimensions and requested margin */
    <div className="group perspective-1000 m-[6px] w-[450px] h-[400px] flex items-center justify-center">
      {/* Main Card Container: Systematic Vertical Layout */}
      <div
        className="
        relative w-[400px] h-[350px] bg-[#0f172a] border border-white/10 
        rounded-[24px] overflow-hidden transition-all duration-500 
        hover:shadow-[0_20px_50px_rgba(79,70,229,0.2)] 
        hover:-translate-y-2 hover:border-indigo-500/30
        flex flex-col
      "
      >
        {/* SECTION 1: Image Zone (Fixed Aspect Ratio) */}
        <div className="relative aspect-video w-full bg-slate-800 overflow-hidden shrink-0 border-b border-white/5">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
              No Image Available
            </div>
          )}
          {/* Category Overlay */}
          <div className="absolute top-3 right-3">
            <span className="bg-indigo-600/80 backdrop-blur-md text-[9px] px-3 py-1 rounded-full text-white font-black tracking-tighter uppercase">
              {event.category || "General"}
            </span>
          </div>
        </div>

        {/* SECTION 2: Content Zone (Flexible but Systematic) */}
        <div className="p-5 flex flex-col flex-grow justify-between overflow-hidden">
          {/* Main Info Area: Title and Organizer */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <span className="text-indigo-400 text-[10px] font-bold">
                  {event.organizer?.[0] || "S"}
                </span>
              </div>
              <p className="text-[11px] text-indigo-400 font-bold uppercase tracking-widest truncate">
                {event.organizer || "Sydney Events"}
              </p>
            </div>

            {/* Title: Line-clamp ensures long titles don't push content out of the box */}
            <h2 className="text-[17px] font-bold text-white leading-tight line-clamp-2 min-h-[42px]">
              {event.title}
            </h2>
          </div>

          {/* Footer Action Area: Date and Oval Button */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center ">
            <div className="flex flex-col m-[15px] ">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
                Event Date
              </span>
              <span className="text-[12px] text-slate-200 font-semibold">
                {event.datetime
                  ? new Date(event.datetime).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                    })
                  : "Date TBA"}
              </span>
            </div>

            {/* Oval Button with Attractive Background Gradient */}
            <button
              onClick={onGetTickets}
              className="
                px-6 py-2.5 rounded-full text-[11px] font-black text-white
                bg-gradient-to-r from-indigo-600 to-purple-600 
                hover:from-indigo-500 hover:to-purple-500
                transition-all duration-300 transform active:scale-95
                shadow-[0_0_15px_rgba(79,70,229,0.4)]
                uppercase tracking-widest border border-white/10
              "
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
