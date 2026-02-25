"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Mail,
  Phone,
  CheckCircle,
  User,
  MessagesSquare,
  Building,
  Euro,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function ScoutEventDetailsPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const { id } = useParams();

  // In Next.js App Router, params in client components need to be handled differently
  // We'll use a useEffect to get the id after component mounts
  const [eventId, setEventId] = React.useState(null);

  React.useEffect(() => {
    setEventId(id);
    console.log("Event ID from URL:", id);
  }, [id]);

  // Mock data - same as in the events page
  const mockEvents = [
    {
      id: 1,
      image: "/Scout/events/banner.jpg",
      title: "Elite Youth Showcase 2025",
      type: "Showcase",
      date: "Monday 15 December 2025",
      time: "10:00 AM - 5:00 PM",
      duration: "50.00",
      location: "Camp Nou Training Ground",
      address: "C/ Aristides Maillol, 12, Barcelona, Spain",
      organizer: "FC Barcelona Youth",
      organizerLogo: "/clubs/barcelona.png",
      entryFee: "Free",
      spots: 32, // spots taken
      totalSpots: 100,
      featured: true,
      contact: {
        name: "Carlos Rodriguez",
        email: "events@fcbarcelona.com",
        phone: "+34 93 496 3600",
      },
      description:
        "Join us for an exclusive showcase event featuring the best youth talents from across Europe. This event provides an excellent opportunity for scouts and agents to observe players in competitive matches and training sessions. Our experienced coaching staff will evaluate technical skills, tactical awareness, physical fitness, and mental strength in a high-level environment.",
    },
    {
      id: 2,
      image: "/Scout/events/banner.jpg",
      title: "Winter Trials - U18",
      type: "Trial",
      date: "Monday 20 December 2025", // Updated format
      time: "09:00 AM - 3:00 PM",
      duration: "50.00",
      location: "Stamford Bridge Training Ground", // Updated location
      address: "Ford Field, London, England", // Added address
      organizer: "Chelsea FC Academy",
      organizerLogo: "/clubs/barcelona.png",
      entryFee: "€25",
      spots: 35, // spots taken
      totalSpots: 80,
      featured: false,
      contact: {
        name: "Thomas Smith",
        email: "trials@chelseafc.com",
        phone: "+44 20 7494 1874",
      },
      description:
        "Join us for our annual winter trials for under-18 players. This is a great opportunity for young talents to showcase their skills in front of our academy scouts. Players should arrive 30 minutes early for registration and warm-up.",
    },
    {
      id: 3,
      image: "/Scout/events/event.jpg",
      title: "International Youth Tournament",
      type: "Tournament",
      date: "Monday 28 December 2025", // Updated format
      time: "All Day",
      duration: "50.00",
      location: "San Siro Training Complex", // Updated location
      address: "Via Nicola Canal, 12, Milan, Italy", // Added address
      organizer: "AC Milan Primavera",
      organizerLogo: "/clubs/barcelona.png",
      entryFee: "€50",
      spots: 32, // spots taken
      totalSpots: 64,
      featured: false,
      contact: {
        name: "Marco Giuseppe",
        email: "tournament@acmilan.com",
        phone: "+39 02 6228 1",
      },
      description:
        "An international youth tournament featuring academy teams from across Europe. Teams will compete in a group stage followed by knockout rounds. This is an excellent opportunity for scouts to observe players in competitive match situations.",
    },
    {
      id: 4,
      image: "/Scout/events/event.jpg",
      title: "Technical Skills Workshop",
      type: "Workshop",
      date: "Thursday 05 January 2026", // Updated format
      time: "10:00 AM - 2:00 PM",
      duration: "50.00",
      location: "Ajax Training Centre", // Updated location
      address: "Ten Cateweg 10, Amsterdam, Netherlands", // Added address
      organizer: "Ajax Youth Academy",
      organizerLogo: "/clubs/barcelona.png",
      entryFee: "€35",
      spots: 10, // spots taken
      totalSpots: 60,
      featured: false,
      contact: {
        name: "Johan De Boer",
        email: "workshop@ajax.nl",
        phone: "+31 20 676 8888",
      },
      description:
        "A comprehensive workshop focused on developing technical skills for young players. Expert coaches will provide hands-on training in ball control, passing, shooting, and tactical awareness. Limited spaces available.",
    },
    {
      id: 5,
      image: "/Scout/events/event.jpg",
      title: "Summer Showcase Series",
      type: "Showcase",
      date: "Friday 15 January 2026", // Updated format
      time: "09:00 AM - 4:00 PM",
      duration: "50.00",
      location: "Arena Corinthians", // Updated location
      address: "Av. Miguel Ignácio Curi, 111, São Paulo, Brazil", // Added address
      organizer: "São Paulo FC Academy",
      organizerLogo: "/clubs/barcelona.png",
      entryFee: "Free",
      spots: 30, // spots taken
      totalSpots: 150,
      featured: false,
      contact: {
        name: "Roberto Silva",
        email: "showcase@sao-paulo.com",
        phone: "+55 11 2575 5000",
      },
      description:
        "A showcase series featuring the most promising talents from South American academies. Scouts from top European clubs will be in attendance to identify the next generation of football stars.",
    },
    {
      id: 6,
      image: "/Scout/events/event.jpg",
      title: "Regional Academy Trials",
      type: "Trial",
      date: "Tuesday 20 January 2026", // Updated format
      time: "10:00 AM - 3:00 PM",
      duration: "50.00",
      location: "Parc des Princes", // Updated location
      address: "55 Route de Suresnes, 92400 Courbevoie, France", // Added address
      organizer: "PSG Academy",
      organizerLogo: "/clubs/barcelona.png",
      entryFee: "€30",
      spots: 45, // spots taken
      totalSpots: 100,
      featured: false,
      contact: {
        name: "Pierre Dubois",
        email: "trials@psg.fr",
        phone: "+33 1 47 49 40 00",
      },
      description:
        "Regional academy trials open to players aged 16-20. Our scouting team will evaluate players across all positions. Participants should bring their own training gear and be prepared for intensive training sessions.",
    },
  ];

  // Find the event that matches the ID from the URL
  const event = eventId
    ? mockEvents.find((e) => e.id === parseInt(eventId))
    : mockEvents[0]; // Default to first event if eventId is not yet set

  // Show loading state if event ID is not yet available
  if (eventId === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white">Loading event details...</p>
      </div>
    );
  }

  // Calculate spots available based on spots taken and total spots
  const spotsAvailable = event?.totalSpots - event.spots;

  const registeredPlayers = [
    {
      id: 1,
      image: "/players/Lucas_Martinez.png",
      age: 17,
      name: "Lucas Martinez",
      position: "Midfielder",
      nationality: "Spain",
      club: "Valencia Youth",
    },
    {
      id: 2,
      image: "/players/Lucas_Martinez.png",
      age: 17,
      name: "João Silva",
      position: "Forward",
      nationality: "Portugal",
      club: "Benfica Academy",
    },
    {
      id: 3,
      image: "/players/Lucas_Martinez.png",
      age: 17,
      name: "Marco Rossi",
      position: "Defender",
      nationality: "Italy",
      club: "Juventus Primavera",
    },
    {
      id: 4,
      image: "/players/Lucas_Martinez.png",
      age: 17,
      name: "Thomas Müller Jr.",
      position: "Midfielder",
      nationality: "Germany",
      club: "Bayern Munich II",
    },
    {
      id: 5,
      image: "/players/Lucas_Martinez.png",
      age: 17,
      name: "Pierre Dubois",
      position: "Goalkeeper",
      nationality: "France",
      club: "PSG Academy",
    },
    {
      id: 6,
      image: "/players/Lucas_Martinez.png",
      age: 17,
      name: "James Wilson",
      position: "Forward",
      nationality: "England",
      club: "Manchester United Youth",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Image */}
      <div className="relative h-[60vh] rounded-2xl overflow-hidden ">
        <Image
          src={event.image}
          alt={event.title}
          fill
          quality={70}
          className="object-cover"
        />
        {/* Featured Badge */}
        <div className="absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-medium">
          {event.featured ? "Featured Event" : "Event"}
        </div>

        {/* Title & Organizer */}
        <div className="absolute bottom-0 text-white  bg-[#00000082]  w-full px-8 py-8  bg-opacity-60">
          <h1 className="text-3xl font-semibold my-2">{event.title}</h1>
          <div className="flex items-center gap-4">
            <Image
              src={event.organizerLogo}
              alt={event.organizer}
              width={50}
              height={50}
              className="rounded-lg"
            />
            <div className="">
              <p
                className={`text-md font-medium text-[${theme.colors.primaryCyan}]`}
              >
                {event.organizer}
              </p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <p className="text-xs text-gray-400">{event.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div
          className="lg:col-span-2 space-y-8"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          {/* Event Details Card */}
          <div
            className="rounded-xl p-8 border "
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div className="flex flex-col items-start text-left gap-4">
                <div className="flex items-center gap-2">
                  <Calendar
                    className="w-6 h-6 text-primaryCyan "
                    style={{
                      color: theme.colors.primaryCyan,
                    }}
                  />
                  <p className="text-gray-400">Date</p>
                </div>
                <p className="text-gray-300 font-medium">{event.date}</p>
              </div>
              <div className="flex flex-col items-start text-left gap-4">
                <div className="flex items-center gap-2">
                  <Clock
                    className="w-6 h-6 text-primaryCyan mt-1"
                    style={{
                      color: theme.colors.primaryCyan,
                    }}
                  />
                  <p className="text-gray-400">Time</p>
                </div>
                <p className="text-gray-300 font-medium">{event.time}</p>
              </div>

              <div className="flex flex-col items-start text-left gap-1">
                <div className="flex items-center gap-2">
                  <MapPin
                    className="w-6 h-6 text-primaryCyan "
                    style={{
                      color: theme.colors.primaryCyan,
                    }}
                  />
                  <p className="text-gray-400">Location</p>
                </div>
                <p className="text-white font-medium">{event.location}</p>
                <p className="text-sm">{event.address}</p>
              </div>

              <div className="flex flex-col items-start gap-2">
                <div className="flex gap-2">
                  <Euro className="w-6 h-6 text-primaryCyan mt-1 font-bold text-[#FDC700]" />
                  <p className="text-gray-400 ml-1">Entry Fee</p>
                </div>
                <div>
                  <p className="text-2xl font-bold ml-2">{event.entryFee}</p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4">
                <div className="flex gap-2 items-center">
                  <Users
                    className="w-6 h-6 text-primaryCyan mt-1"
                    style={{
                      color: theme.colors.primaryCyan,
                    }}
                  />
                  <p className="text-gray-400">Age Group</p>
                </div>
                <div>
                  <p className="text-white font-medium">U16-U18</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users
                  className="w-6 h-6 text-primaryCyan mt-1"
                  style={{
                    color: theme.colors.primaryCyan,
                  }}
                />
                <div>
                  <p className="text-gray-400">Spots Available</p>
                  <p className="text-white font-medium">
                    {spotsAvailable} / {event?.totalSpots}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <h2 className="text-lg font-bold text-white mb-6">
                About This Event
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Register Card */}
          <div
            className="rounded-xl p-8 border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Register as Scout
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Register to observe players and gain access to full profiles.
            </p>
            <Button
              variant="common"
              className="w-full rounded-lg py-4 text-lg font-medium mb-4"
              onClick={() => router.push(`/scout/events/${eventId}/register`)}
            >
              Register Now
            </Button>
            <p className="text-sm text-gray-400 text-center">
              {spotsAvailable} spots remaining
            </p>
          </div>

          {/* Event Organizer */}
          <div
            className="rounded-xl p-8 border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h3 className="text-base font-semibold text-white mb-6">
              <Building
                className="w-5 h-5 inline-block mr-2"
                style={{
                  color: theme.colors.primaryCyan,
                }}
              />
              Event Organizer
            </h3>
            <div className="space-y-4">
              <div className="">
                <p className="text-sm text-gray-400">Contact Person</p>
                <p className="text-white font-medium">
                  {event.contact?.name || "Event Coordinator"}
                </p>
              </div>
              <div className="space-y-3 text-gray-300 text-sm">
                <Link
                  href={`mailto:${event.contact?.email || "info@example.com"}`}
                  className="flex items-center gap-3 hover:text-primaryCyan"
                  style={{
                    color: theme.colors.primaryCyan,
                  }}
                >
                  <Mail className="w-5 h-5 text-white" />
                  {event.contact?.email || "info@example.com"}
                </Link>
                <Link
                  href={`tel:${event.contact?.phone || "+1234567890"}`}
                  className="flex items-center gap-3 hover:text-primaryCyan"
                >
                  <Phone className="w-5 h-5" />
                  {event.contact?.phone || "+1234567890"}
                </Link>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="mt-2 w-full"
                style={{
                  borderColor: theme.colors.primaryCyan,
                  color: theme.colors.primaryCyan,
                }}
              >
                <MessagesSquare className="w-4 h-4 mr-2" />
                Contact Organizer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Registered Players */}
      <div
        className="rounded-xl p-8 border"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          Registered Players
        </h2>
        <div className="text-sm text-gray-400 mb-6">
          {" "}
          {registeredPlayers.length} Players participating
        </div>
        <div className="space-y-4">
          {registeredPlayers.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-4 rounded-lg"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                border: `1px solid ${theme.colors.primaryCyan}33`,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-16 h-16 rounded-full  flex items-center justify-center">
                  <Image
                    src={player.image}
                    alt={player.name}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-white font-medium text-base">
                    {player.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    <span
                      style={{
                        color: theme.colors.primaryCyan,
                      }}
                    >
                      {player.position}
                    </span>{" "}
                    • {player.age} years • {player.nationality}
                  </p>
                  <p className="text-sm text-gray-400">{player.club}</p>
                </div>
              </div>
              <div className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 "
                  style={{
                    borderColor: theme.colors.primaryCyan,
                    color: theme.colors.primaryCyan,
                  }}
                >
                  <MessagesSquare className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
