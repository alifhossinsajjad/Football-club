"use client";

import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function EventDetailsPage({ params }) {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  const event = {
    id: 3,
    title: "Talent Scouting Day",
    location: "Lisbon, Portugal",
    date: "25/09/2025",
    time: "10:00 AM – 5:00 PM",
    venue: "Estádio da Luz",
    organizer: "Portuguese FA",
    price: 40,
    spotsAvailable: 68,
    totalSpots: 100,
    registered: false,
    contact: {
      email: "contact@pfacademy.com",
      phone: "+351 123 456 789",
    },
  };

  const schedule = [
    { time: "10:00 AM", activity: "Registration & Check-in" },
    { time: "10:30 AM", activity: "Warm-up Session" },
    { time: "11:00 AM", activity: "Technical Skills Assessment" },
    { time: "01:00 PM", activity: "Lunch Break" },
    { time: "02:00 PM", activity: "Practice Match" },
    { time: "04:00 PM", activity: "Closing & Feedback" },
  ];

  const requirements = [
    "Age Requirement: Players must be between 16-18 years old",
    "Experience Level: Minimum 2 years of competitive football experience required",
    "Medical Clearance: Completed medical clearance form must be submitted before the event",
    "Equipment: Bring your own football boots, shin guards, and training gear",
    "Photo ID: Valid identification document required for check-in",
  ];

  const handleRegister = () => {
    router.push(`/player/events/${event.id}/register`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Back & Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => router.push("/player/events")}
          className=" hover:underline bg-none border-none "
          style={{
            color: theme.colors.primaryCyan,
          }}
        >
          ← Back to Events Directory
        </Button>
      </div>

      <div
        className="flex items-center justify-between p-6 rounded-lg"
        style={{
          background: `linear-gradient(90deg, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
          borderTop: `1.25px solid ${theme.colors.primaryCyan}4D`,
        }}
      >
        <div>
          <h1 className="text-3xl font-bold text-white">{event.title}</h1>
          <p className="text-gray-300 flex items-center gap-2 mt-2">
            <MapPin className="w-5 h-5" />
            {event.location}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Registration Fee</p>
          <p
            className="text-4xl font-bold"
            style={{ color: theme.colors.primaryCyan }}
          >
            €{event.price}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div
            className="rounded-xl p-8"
            style={{
              backgroundColor: theme.colors.backgroundCard,
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              About This Event
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Join us for an exclusive opportunity to showcase your talent in
              front of top scouts and coaches. This trial event is designed for
              young players aged 16-18 looking to take their career to the next
              level.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              Our experienced coaching staff will evaluate your technical
              skills, tactical awareness, physical fitness, and mental strength.
              This is a unique opportunity to get noticed by professional clubs
              and academies across Europe.
            </p>
          </div>

          {/* Schedule */}
          <div
            className="rounded-xl p-8"
            style={{
              backgroundColor: theme.colors.backgroundCard,
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Event Schedule
            </h2>
            <div className="space-y-4">
              {schedule.map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-primaryCyan font-medium w-24">
                    {item.time}
                  </span>
                  <span className="text-gray-300">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div
            className="rounded-xl p-8"
            style={{
              backgroundColor: theme.colors.backgroundCard,
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
            <ul className="space-y-3">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="text-primaryCyan mt-1">✓</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Event Info */}
          <div
            className="rounded-xl p-8"
            style={{
              backgroundColor: theme.colors.backgroundCard,
            }}
          >
            <h3 className="text-xl font-bold text-white mb-6">
              Event Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primaryCyan" />
                <div>
                  <p className="text-gray-400 text-sm">Date & Time</p>
                  <p className="text-white">{event.date}</p>
                  <p className="text-white">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primaryCyan" />
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">{event.venue}</p>
                  <p className="text-white">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primaryCyan" />
                <div>
                  <p className="text-gray-400 text-sm">Organizer</p>
                  <p className="text-white">{event.organizer}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div
            className="rounded-xl p-8"
            style={{
              backgroundColor: theme.colors.backgroundCard,
            }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Availability</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Spots Available</span>
                <span className="text-white font-bold">
                  {event.spotsAvailable} / {event.totalSpots}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${
                      (event.spotsAvailable / event.totalSpots) * 100
                    }%`,
                    backgroundColor: theme.colors.primaryCyan,
                  }}
                />
              </div>
              <p className="text-sm text-orange-400">
                Hurry! Limited spots remaining
              </p>
            </div>
          </div>

          {/* Contact */}
          <div
            className="rounded-xl p-8"
            style={{
              backgroundColor: theme.colors.backgroundCard,
            }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primaryCyan" />
                <a
                  href="mailto:contact@pfacademy.com"
                  className="text-gray-300 hover:text-primaryCyan"
                >
                  {event.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primaryCyan" />
                <span className="text-gray-300">{event.contact.phone}</span>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <Button
            variant="common"
            onClick={handleRegister}
            className="w-full  py-6 text-lg"
          >
            {event.registered ? "Already Registered" : "Register for Event"}
          </Button>
        </div>
      </div>
    </div>
  );
}
