"use client";

import {
  useGetEventQuery,
  useGetScoutRegistrationsQuery,
} from "@/redux/features/scout/eventsApi";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { IoTimeOutline, IoCalendarOutline } from "react-icons/io5";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";

const EventDetailsPage = () => {
  const params = useParams();
  const eventId = params.id;

  const {
    data: event,
    isLoading: eventLoading,
    error: eventError,
  } = useGetEventQuery(Number(eventId));
  const { data: registrations, isLoading: regsLoading } =
    useGetScoutRegistrationsQuery();

  const isRegistered = registrations?.results
    ? registrations.results.some((reg: any) => reg.event === Number(eventId))
    : registrations?.some((reg: any) => reg.event === Number(eventId));

  if (eventLoading || regsLoading)
    return <div className="p-10 text-white">Loading event details...</div>;
  if (eventError || !event)
    return <div className="p-10 text-red-500">Error loading event details</div>;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Mock registered players
  const registeredPlayers = [
    {
      id: 1,
      name: "Lucas Martinez",
      role: "Midfielder",
      age: 17,
      country: "Spain",
      club: "FC Barcelona Youth",
      image: "/images/player-1.png",
    },
    {
      id: 2,
      name: "João Silva",
      role: "Forward",
      age: 18,
      country: "Portugal",
      club: "Benfica Academy",
      image: "/images/player-2.png",
    },
    {
      id: 3,
      name: "Marco Rossi",
      role: "Defender",
      age: 18,
      country: "Italy",
      club: "AC Milan Primavera",
      image: "/images/player-3.png",
    },
    {
      id: 4,
      name: "Thomas Müller Jr.",
      role: "Goalkeeper",
      age: 17,
      country: "Germany",
      club: "Bayern Munich Youth",
      image: "/images/player-4.png",
    },
    {
      id: 5,
      name: "Pierre Dubois",
      role: "Midfielder",
      age: 16,
      country: "France",
      club: "PSG Academy",
      image: "/images/player-1.png",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Forward",
      age: 17,
      country: "England",
      club: "Chelsea FC Academy",
      image: "/images/player-2.png",
    },
  ];

  return (
    <div className="max-w-[1240px] mx-auto pb-20 px-4">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/scout/events"
          className="text-white/60 hover:text-white flex items-center gap-2 text-sm transition-colors"
        >
          <span className="text-lg">←</span> Back to Events
        </Link>
      </div>

      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden mb-10 h-[500px]">
        <Image
          src="/images/event-banner.jpg"
          alt="Event Banner"
          fill
          className="object-cover"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/40 to-transparent" />

        <div className="absolute top-6 left-6 flex gap-3">
          <span className="bg-[#1DA1F2]/20 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-lg border border-[#1DA1F2]/30 uppercase tracking-wider">
            {event.event_type}
          </span>
        </div>

        {event.is_featured && (
          <div className="absolute top-6 right-6">
            <span className="bg-[#00E5FF] text-black text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)]">
              Featured Event
            </span>
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute bottom-10 left-10 right-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            {event.event_name}
          </h1>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 relative">
              <Image
                src="/images/club-logo.png"
                alt="Club Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-xl font-bold text-[#00E5FF]">
                {event.venue_name || "FC Barcelona Youth"}
              </p>
              <div className="flex items-center gap-2 text-white/70">
                <CiLocationOn className="text-[#00E5FF]" />
                <span className="text-sm">
                  {event.city}, {event.country || "Spain"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Event Details Grid */}
          <div className="bg-[#0D1424] border border-white/5 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-8 border-l-4 border-[#00E5FF] pl-4">
              Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="flex items-start gap-4">
                <div className="bg-[#00E5FF]/10 p-3 rounded-xl">
                  <IoCalendarOutline className="text-[#00E5FF] text-xl" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                    Date
                  </p>
                  <p className="text-white font-semibold">
                    {formatDate(event.event_date)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#00E5FF]/10 p-3 rounded-xl">
                  <IoTimeOutline className="text-[#00E5FF] text-xl" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                    Time
                  </p>
                  <p className="text-white font-semibold">
                    {event.start_time.substring(0, 5)} -{" "}
                    {event.end_time.substring(0, 5)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#00E5FF]/10 p-3 rounded-xl">
                  <CiLocationOn className="text-[#00E5FF] text-xl" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                    Location
                  </p>
                  <p className="text-white font-semibold">{event.venue_name}</p>
                  <p className="text-white/60 text-sm mt-0.5">
                    {event.street_address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#00E5FF]/10 p-3 rounded-xl">
                  <span className="text-[#00E5FF] font-bold text-sm">$</span>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                    Entry Fee
                  </p>
                  <p className="text-white font-black text-xl">
                    {Number(event.registration_fee) === 0
                      ? "Free"
                      : `$${event.registration_fee}`}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#00E5FF]/10 p-3 rounded-xl">
                  <FaUserFriends className="text-[#00E5FF] text-xl" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                    Age Group
                  </p>
                  <p className="text-white font-semibold italic">
                    U{event.minimum_age} - U{event.maximum_age}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#00E5FF]/10 p-3 rounded-xl">
                  <BsCheckCircleFill className="text-[#00E5FF] text-xl" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                    Scouts Registered
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-black text-xl">
                      {event.registered_count}
                    </span>
                    <span className="text-white/40 text-sm">
                      / {event.maximum_capacity} Registered
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* About This Event */}
            <div className="mt-12 pt-10 border-t border-white/5">
              <h2 className="text-xl font-bold text-white mb-6">
                About This Event
              </h2>
              <p className="text-white/70 leading-relaxed text-sm">
                {event.description ||
                  "No description available for this event."}
              </p>
            </div>
          </div>

          {/* Registered Players Section */}
          <div>
            <div className="flex items-end gap-3 mb-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                Registered Players
              </h2>
              <p className="text-white/40 text-sm mb-1">
                {registeredPlayers.length} players participating
              </p>
            </div>

            <div className="space-y-4">
              {registeredPlayers.map((player) => (
                <div
                  key={player.id}
                  className="bg-[#0D1424] border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:border-[#00E5FF]/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-white/10 group-hover:border-[#00E5FF]/50 transition-colors">
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">
                        {player.name}
                      </h4>
                      <p className="text-sm flex items-center gap-2 text-white/50">
                        <span className="text-[#00E5FF] font-medium">
                          {player.role}
                        </span>
                        <span>•</span>
                        <span>{player.age} years</span>
                        <span>•</span>
                        <span>{player.country}</span>
                      </p>
                      <p className="text-xs text-white/30 mt-1">
                        {player.club}
                      </p>
                    </div>
                  </div>
                  <button className="bg-[#1DA1F2]/10 text-[#1DA1F2] border border-[#1DA1F2]/20 hover:bg-[#1DA1F2] hover:text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
                    <MdOutlineMail size={18} />
                    Contact
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="space-y-6">
          {/* Registration Card */}
          <div className="bg-[#0D1424] border border-white/5 rounded-3xl p-8 sticky top-6">
            <h3 className="text-xl font-bold text-white mb-2 italic">
              Register as Scout
            </h3>
            <p className="text-white/40 text-xs mb-8">
              Register to observe players and access full event details
            </p>

            <Link
              href={
                isRegistered ? "#" : `/scout/eventRegister?eventId=${event.id}`
              }
              className={`w-full ${isRegistered ? "bg-gray-600 cursor-not-allowed" : "bg-[#00E5FF] hover:bg-[#00E5FF]/90"} text-black font-black py-4 rounded-xl text-center block transition-all shadow-[0_4px_20px_rgba(0,229,255,0.2)] mb-4 uppercase tracking-wider`}
            >
              {isRegistered ? "Registered" : "Register Now"}
            </Link>

            <p className="flex items-center justify-center gap-2 text-white/30 text-[10px] uppercase tracking-widest font-bold">
              <FaUserFriends />
              {event.maximum_capacity - event.registered_count} spots remaining
            </p>

            <div className="mt-10 pt-8 border-t border-white/5 space-y-6">
              <h4 className="text-white font-bold flex items-center gap-2">
                <GoOrganization className="text-[#00E5FF] text-xl" />
                Event Organizer
              </h4>

              <div className="space-y-4">
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">
                    Contact Person
                  </p>
                  <p className="text-white font-bold text-sm">
                    Carlos Rodriguez
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <MdOutlineMail className="text-white/60" />
                  </div>
                  <span className="text-xs text-[#00E5FF] font-medium break-all underline decoration-[#00E5FF]/30">
                    {/* {event.contact_email} */}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <MdOutlinePhone className="text-white/60" />
                  </div>
                  <span className="text-xs text-white/70 font-medium font-mono">
                   {/* {event.phone_number} */}
                  </span>
                </div>
              </div>

              <button className="w-full border border-white/10 hover:border-[#00E5FF]/50 text-white/60 hover:text-white py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 mt-4">
                <MdOutlineMail />
                Contact Organizer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Remove duplicate import at the bottom
export default EventDetailsPage;
