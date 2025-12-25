"use client";

import { Lock, Clock, MapPin, Users, Mail, Phone } from "lucide-react";
import SectionTitel from "./ReUseable/SectionTitle";
import { useSelector } from "react-redux";

export default function UpcomingEvent() {
  const theme = useSelector((state) => state.theme);
  const events = [
    {
      id: 1,
      category: "Training",
      categoryColor: "text-[#06A295]",
      date: "10 sept 2025",
      dateColor: "text-[#06A295]",
      title: "Youth Championship Finals",
      time: "14:00",
      location: "Wembley Stadium, London",
      capacity: "50",
      email: "johndue@gmail.com",
      phone: "24966-7486",
    },
    {
      id: 2,
      category: "Nutrition",
      categoryColor: "text-yellow-500",
      date: "18 sept 2025",
      dateColor: "text-[#06A295]",
      title: "Premier League Trials",
      time: "08:30",
      location: "Manchester, UK",
      capacity: "50",
      email: "davidbackham@gmail.com",
      phone: "685699-5654",
    },
  ];

  return (
    <div className=" text-white">
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <SectionTitel
          className="max-w-xl mx-auto text-center"
          title="UPCOMING EVENTS"
          subtitle="Stay updated on football trials, comps, tournaments, and happening near you. Discover event details, participation fees, and contact  organisers directly."
        />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {events.map((event) => (
            <div
              key={event.id}
              className=" rounded-2xl p-8 "
              style={{
                backgroundColor: theme.colors.backgroundCard,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`${event.categoryColor} font-semibold text-sm uppercase tracking-wider`}
                >
                  {event.category}
                </span>
                <span className={`${event.dateColor} font-medium text-sm`}>
                  {event.date}
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-bold mb-8 text-white leading-tight">
                {event.title}
              </h2>

              <div className="space-y-4 mb-8 pb-8 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <Clock
                    className="w-5 h-5 text-cyan-400 flex-shrink-0"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                  <span className=" text-[#06A295]">{event.time}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin
                    className="w-5 h-5 text-cyan-400 flex-shrink-0"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                  <span className="text-[#06A295]">{event.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users
                    className="w-5 h-5 text-cyan-400 flex-shrink-0"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                  <span className="text-[#06A295]">{event.capacity}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-gray-400 font-semibold mb-4">
                  Contact information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail
                      className="w-4 h-4 text-cyan-400 flex-shrink-0"
                      style={{ color: theme.colors.primaryCyan }}
                    />
                    <span className="text-[#06A295] text-sm">
                      {event.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone
                      className="w-4 h-4 text-cyan-400 flex-shrink-0"
                      style={{ color: theme.colors.primaryCyan }}
                    />
                    <span className="text-[#06A295] text-sm">
                      {event.phone}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full  text-white font-semibold py-3 rounded-full transition-colors duration-200"
                style={{ backgroundColor: theme.colors.primaryCyan }}
              >
                See more details
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-purple-600 hover:bg-purple-600 text-white font-semibold rounded-full transition-all duration-300">
            View All Events
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
