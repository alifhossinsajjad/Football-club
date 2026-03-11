"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Search, 
  MapPin, 
  Calendar, 
  User
} from "lucide-react";
import { useGetEventsQuery } from "../../../redux/features/player/eventsDirectoryApi";

const EventsDirectoryPage = () => {
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [locationFilter, setLocationFilter] = useState("All Locations");

  const { data: events = [], isLoading: isEventsLoading } = useGetEventsQuery();

  const filteredEvents = useMemo(() => {
    return events.filter((event: any) => {
      const matchesSearch = event.event_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "All Types" || event.event_type === typeFilter;
      const matchesLocation = locationFilter === "All Locations" || event.venue_name.includes(locationFilter);
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [events, searchTerm, typeFilter, locationFilter]);

  const handleViewDetails = (id: number) => {
    router.push(`/player/eventsDirectory/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-8">
        Events Directory
      </h1>

      {/* Filters */}
      <div className="bg-[#121433] border border-[#1E2550] rounded-2xl p-6 mb-8 grid md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Event Type</label>
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-[#0B0E1E] border border-[#1E2550] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all font-sans"
          >
            <option>All Types</option>
            <option>TOURNAMENT</option>
            <option>TRIAL</option>
            <option>SHOWCASE</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Location</label>
          <select 
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full bg-[#0B0E1E] border border-[#1E2550] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all font-sans"
          >
            <option>All Locations</option>
            {/* Unique locations from events could be mapped here */}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Date Range</label>
          <input type="date" className="w-full bg-[#0B0E1E] border border-[#1E2550] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all font-sans" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Search</label>
          <div className="relative">
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search.."
              className="w-full bg-[#0B0E1E] border border-[#1E2550] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all font-sans"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {isEventsLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#04B5A3]"></div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredEvents.map((event: any) => (
            <div key={event.id} className="bg-[#121433] border border-[#1E2550] rounded-[24px] overflow-hidden hover:border-cyan-400/30 transition-all group">
              <div className="p-7">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{event.event_name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar size={14} className="text-[#04B5A3]" />
                        {event.event_date}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <MapPin size={14} className="text-[#04B5A3]" />
                        {event.venue_name}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <User size={14} className="text-[#04B5A3]" />
                        Elite Academy {/* Fallback */}
                      </div>
                    </div>
                  </div>
                  {event.registered_count > 0 && (
                    <span className="bg-[#04B5A3]/10 text-[#04B5A3] px-3 py-1 rounded-full text-[10px] uppercase font-black">Registered</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-[#1E2550]">
                  <span className="text-2xl font-bold text-white">€{parseFloat(event.registration_fee || "0").toFixed(0)}</span>
                  <button 
                    onClick={() => handleViewDetails(event.id)}
                    className="px-6 py-2.5 rounded-xl border border-[#04B5A3] text-[#04B5A3] font-bold hover:bg-[#04B5A3] hover:text-white transition-all shadow-[0_4px_12px_rgba(4,181,163,0.1)]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsDirectoryPage;
