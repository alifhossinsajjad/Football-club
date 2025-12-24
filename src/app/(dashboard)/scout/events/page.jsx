// ScoutEventPage.jsx (Updated for Events Directory)
"use client";

import GradientTitle from "@/components/scout/reusable/GradientTitle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import EventCard from "@/components/ui/scout/cards/EventCard";
import EventSearchFilters from "@/components/ui/scout/Filters/EventSearchFilters";

const mockEvents = [
  {
    id: 1,
    image: "/Scout/events/event.jpg",
    title: "Elite Youth Showcase 2025",
    type: "Showcase",
    date: "15 Dec 2025",
    time: "10:00 AM - 5:00 PM",
    duration: "50.00",
    location: "Barcelona, Spain",
    organizer: "FC Barcelona Youth",
    organizerLogo: "/clubs/barcelona.png",
    entryFee: "Free",
    spots: 68,
    totalSpots: 100,
    featured: true,
  },
  {
    id: 2,
    image: "/Scout/events/event.jpg",
    title: "Winter Trials - U18",
    type: "Trial",
    date: "20 Dec 2025",
    time: "09:00 AM - 3:00 PM",
    duration: "50.00",
    location: "London, England",
    organizer: "Chelsea FC Academy",
    organizerLogo: "/clubs/barcelona.png",
    entryFee: "€25",
    spots: 45,
    totalSpots: 80,
  },
  {
    id: 3,
    image: "/Scout/events/event.jpg",
    title: "International Youth Tournament",
    type: "Tournament",
    date: "28 Dec 2025",
    duration: "50.00",
    time: "All Day",
    location: "Milan, Italy",
    organizer: "AC Milan Primavera",
    organizerLogo: "/clubs/barcelona.png",
    entryFee: "€50",
    spots: 32,
    totalSpots: 64,
  },
  {
    id: 4,
    image: "/Scout/events/event.jpg",
    title: "Technical Skills Workshop",
    type: "Workshop",
    date: "05 Jan 2026",
    duration: "50.00",
    time: "10:00 AM - 2:00 PM",
    location: "Amsterdam, Netherlands",
    organizer: "Ajax Youth Academy",
    organizerLogo: "/clubs/barcelona.png",
    entryFee: "€35",
    spots: 50,
    totalSpots: 60,
  },
  {
    id: 5,
    image: "/Scout/events/event.jpg",
    title: "Summer Showcase Series",
    type: "Showcase",
    date: "15 Jan 2026",
    duration: "50.00",
    time: "09:00 AM - 4:00 PM",
    location: "São Paulo, Brazil",
    organizer: "São Paulo FC Academy",
    organizerLogo: "/clubs/barcelona.png",
    entryFee: "Free",
    spots: 120,
    totalSpots: 150,
  },
  {
    id: 6,
    image: "/Scout/events/event.jpg",
    title: "Regional Academy Trials",
    type: "Trial",
    date: "20 Jan 2026",
    duration: "50.00",
    time: "10:00 AM - 3:00 PM",
    location: "Paris, France",
    organizer: "PSG Academy",
    organizerLogo: "/clubs/barcelona.png",
    entryFee: "€30",
    spots: 55,
    totalSpots: 100,
  },
];

export default function ScoutEventsPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const [filters, setFilters] = useState({
    eventType: "All Types",
    location: "All Locations",
    sortBy: "date",
    searchQuery: "",
  });

  // Filter and sort events based on current filters
  let filteredEvents = mockEvents.filter((event) => {
    // Filter by event type
    if (filters.eventType !== "All Types" && event.type !== filters.eventType) {
      return false;
    }

    // Filter by location
    if (
      filters.location !== "All Locations" &&
      !event.location.includes(filters.location)
    ) {
      return false;
    }

    // Filter by search query
    if (
      filters.searchQuery &&
      !event.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !event.organizer.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Sort events based on the sortBy option
  filteredEvents.sort((a, b) => {
    switch (filters.sortBy) {
      case "date":
        // Sort by date (ascending)
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      case "date-desc":
        // Sort by date (descending)
        const dateA2 = new Date(a.date);
        const dateB2 = new Date(b.date);
        return dateB2 - dateA2;
      case "spots":
        // Sort by available spots (ascending)
        return a.totalSpots - a.spots - (b.totalSpots - b.spots);
      case "spots-desc":
        // Sort by available spots (descending)
        return b.totalSpots - b.spots - (a.totalSpots - a.spots);
      case "title":
        // Sort by title (alphabetical)
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <GradientTitle text="Events" />

      {/* Filters */}
      <EventSearchFilters theme={theme} onFilterChange={setFilters} />

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            image={event.image}
            title={event.title}
            type={event.type}
            date={event.date}
            time={event.time}
            location={event.location}
            organizer={event.organizer}
            entryFee={event.entryFee}
            spots={event.spots}
            totalSpots={event.totalSpots}
            featured={event.featured}
            organizerLogo={event.organizerLogo}
            duration={event.duration}
            theme={theme}
            onRegister={() => router.push(`/scout/events/${event.id}/register`)}
            onViewDetails={() => router.push(`/scout/events/${event.id}`)}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-12">
        <Button
          variant="common"
          className="px-12 py-4 rounded-md text-lg font-medium"
          style={{
            backgroundColor: `${theme.colors.primaryCyan}20`,
            color: theme.colors.primaryCyan,
            border: `1px solid ${theme.colors.primaryCyan}33`,
          }}
        >
          Load More Events
        </Button>
      </div>
    </div>
  );
}
