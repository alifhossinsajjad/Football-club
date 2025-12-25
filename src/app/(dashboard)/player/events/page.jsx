"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/player/select";
import { Calendar, MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import PlayerTitle from "@/components/player/playerTitle";

export default function EventsDirectoryPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  const [eventType, setEventType] = useState("all");
  const [location, setLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("");
  
  const clearFilters = () => {
    setEventType("all");
    setLocation("all");
    setSearchQuery("");
    setDateRange("");
  };

  const events = [
    {
      id: 1,
      title: "Elite Youth Trial",
      date: "15/09/2025",
      location: "Madrid, Spain",
      organizer: "Elite Football Academy",
      price: 50,
      registered: true,
      spots: 45,
      totalSpots: 100,
    },
    {
      id: 2,
      title: "Football Academy Showcase",
      date: "20/09/2025",
      location: "Barcelona, Spain",
      organizer: "FC Barcelona Youth",
      price: 75,
      registered: true,
      spots: 32,
      totalSpots: 80,
    },
    {
      id: 3,
      title: "Talent Scouting Day",
      date: "25/09/2025",
      location: "Lisbon, Portugal",
      organizer: "Portuguese FA",
      price: 40,
      registered: false,
      spots: 68,
      totalSpots: 100,
    },
    {
      id: 4,
      title: "Youth Championship Trial",
      date: "30/09/2025",
      location: "Paris, France",
      organizer: "Paris Saint-Germain",
      price: 60,
      registered: false,
      spots: 55,
      totalSpots: 100,
    },
  ];

  // Filter events based on selected criteria
  const filteredEvents = events.filter(event => {
    // Filter by event type
    if (eventType !== "all") {
      if (eventType === "trial" && !event.title.toLowerCase().includes("trial")) return false;
      if (eventType === "showcase" && !event.title.toLowerCase().includes("showcase")) return false;
      if (eventType === "scouting" && !event.title.toLowerCase().includes("scouting")) return false;
    }
    
    // Filter by location
    if (location !== "all") {
      const locationMap = {
        "spain": ["spain", "madrid", "barcelona"],
        "portugal": ["portugal", "lisbon"],
        "france": ["france", "paris"]
      };
      const locationKeywords = locationMap[location];
      if (!locationKeywords.some(keyword => 
        event.location.toLowerCase().includes(keyword)
      )) {
        return false;
      }
    }
    
    // Filter by search query
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !event.organizer.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by date range if selected
    if (dateRange) {
      // Convert event date (dd/mm/yyyy) to ISO format for comparison
      const [day, month, year] = event.date.split('/').map(Number);
      const eventDate = new Date(year, month - 1, day);
      const selectedDate = new Date(dateRange);
      
      // Compare dates by ignoring time component
      const eventDateStr = eventDate.toISOString().split('T')[0];
      const selectedDateStr = selectedDate.toISOString().split('T')[0];
      
      if (eventDateStr !== selectedDateStr) {
        return false;
      }
    }
    
    return true;
  });

  const handleViewDetails = (eventId) => {
    router.push(`/player/events/${eventId}`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <PlayerTitle title="Events Directory" />
      </div>

      {/* Filters */}
      <div
        className="p-6 rounded-xl border"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Event Type
            </label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="trial">Trials</SelectItem>
                <SelectItem value="showcase">Showcases</SelectItem>
                <SelectItem value="scouting">Scouting Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Location</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="spain">Spain</SelectItem>
                <SelectItem value="portugal">Portugal</SelectItem>
                <SelectItem value="france">France</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Date Range
            </label>
            <Input 
              type="date" 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="h-12" 
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
        
        {/* Clear Filters Button */}
        <div className="mt-4 flex justify-end">
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-xl p-6 border relative"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              {event.registered && (
                <div
                  className="absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${theme.colors.greenBg}`,
                    color: "#05DF72",
                  }}
                >
                  Registered
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-4">{event.title}</h3>

              <div className="space-y-3 mb-6 text-gray-300">
                <p className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {event.location}
                </p>
                <p className="text-sm text-gray-400">{event.organizer}</p>
              </div>

              <div className="flex items-center justify-between">
                <p
                  className="text-3xl font-bold"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  €{event.price}
                </p>
                <Button
                  variant="outline"
                  onClick={() => handleViewDetails(event.id)}
                  className=" px-6"
                  style={{
                    backgroundColor: event.registered
                      ? "transparent"
                      : theme.colors.button,
                    border: event.registered
                      ? `2px solid ${theme.colors.primaryCyan}`
                      : "none",
                    color: event.registered ? theme.colors.primaryCyan : "white",
                  }}
                >
                  {event.registered ? "View Details" : "Register Now"}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">No events found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
