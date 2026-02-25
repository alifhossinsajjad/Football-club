"use client";

import { useSelector } from "react-redux";
import { Eye, MessageSquare, Calendar, StarIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import GradientTitle from "@/components/scout/reusable/GradientTitle";
import StatCards from "@/components/ui/scout/StatCards";
import ShortlistedPlayerCard from "@/components/ui/scout/ShortlistedPlayerCard";
import UpcomingEvent from "@/components/ui/scout/UpcomingEvent";
import Messages from "@/components/ui/scout/Messages";
import RecentPlayerView from "@/components/ui/scout/RecentPlayerView";

export default function ScoutDashboard() {
  //   const theme = useSelector((state) => state.theme);
  const theme = useSelector((state) => state.theme);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <GradientTitle text="Welcome Back, Michael!" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 lg:gap-6">
        <StatCards
          icon={Eye}
          title="Players Viewed"
          value="342"
          status="+48 this week"
          theme={theme}
        />
        <StatCards
          icon={StarIcon}
          title="Shortlisted Players"
          value="28"
          status="12 active"
          theme={theme}
        />
        <StatCards
          icon={Calendar}
          title="Upcoming Events"
          value="6"
          status="Next: Sep 15"
          theme={theme}
        />
        <StatCards
          icon={MessageSquare}
          title="Active Conversations"
          status="5 unread"
          value="5"
          theme={theme}
        />
      </div>

      {/* shortlisted players */}
      <div
        className=" border rounded-lg  p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center pb-4  gap-2">
          <Star className="text-[#00E5FF] w-5 h-5" />
          <h3 className="font-bold text-xl">Shortlisted Players</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3  gap-4 lg:gap-6">
          <ShortlistedPlayerCard
            image="/Scout/Shortlisted-player/John.png"
            title="John Doe"
            role="midfielder"
            nationality="spain"
            age="19 years"
            theme={theme}
          />
          <ShortlistedPlayerCard
            image="/Scout/Shortlisted-player/John.png"
            title="John Doe"
            role="midfielder"
            nationality="spain"
            age="19 years"
            theme={theme}
          />
          <ShortlistedPlayerCard
            image="/Scout/Shortlisted-player/John.png"
            title="John Doe"
            role="midfielder"
            nationality="spain"
            age="19 years"
            theme={theme}
          />
        </div>
      </div>
      {/* Upcoming Events */}
      <div
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-3">
            <Calendar
              className="w-5 h-5"
              style={{ color: theme.colors.primaryCyan }}
            />
            Upcoming Scouting Events
          </h2>
        </div>
        <div className="space-y-4">
          <UpcomingEvent
            logo="/Scout/upcoming-event/madrid.png"
            title="Elite Youth Trial"
            academy="Elite Football Academy"
            location="Madrid, Spain"
            date="19/09/2025"
            time="10:00 AM"
            theme={theme}
          />
          <UpcomingEvent
            logo="/Scout/upcoming-event/barcelona.png"
            title="Football Academy Showcase"
            academy="FC Barcelona Youth"
            location="Barcelona, Spain"
            date="20/09/2025"
            time="2:00 PM"
            theme={theme}
          />
          <UpcomingEvent
            logo="/Scout/upcoming-event/portugal.png"
            title="Talent Scouting Day"
            academy="Portuguese FA"
            location="Lisbon, Portugal"
            date="25/09/2025"
            time="9:00 AM"
            theme={theme}
          />
          <div className="px-4">
            <Button
              variant="outline"
              size="icon"
              className="flex items-center gap-2 w-full"
            >
              <span className="text-[#00E5FF]"> View All Events</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* recent players view */}
        <div
          className="border rounded-lg p-4 lg:p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              Recent Player Views
            </h2>
          </div>
          <div className="space-y-4">
            <RecentPlayerView
              logo="/Scout/Shortlisted-player/John.png"
              name="Player 1"
              role="Midfielder"
              country="Spain"
              time="2h ago"
              unread={true}
              theme={theme}
            />
            <RecentPlayerView
              logo="/Scout/Shortlisted-player/Sarah.png"
              name="Player 2"
              role="Midfielder"
              country="Spain"
              time="2h ago"
              unread={true}
              theme={theme}
            />
            <RecentPlayerView
              logo="/Scout/Shortlisted-player/Mike.png"
              name="Player 1"
              role="Midfielder"
              country="Spain"
              time="2h ago"
              unread={true}
              theme={theme}
            />
            <RecentPlayerView
              logo="/Scout/Shortlisted-player/John.png"
              name="Player 1"
              role="Midfielder"
              country="Spain"
              time="2h ago"
              unread={true}
              theme={theme}
            />
          </div>
        </div>
        {/* Recent Messages */}
        <div
          className="border rounded-lg p-4 lg:p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              Recent Messages
            </h2>
          </div>
          <div className="space-y-4">
            <Messages
              logo="/Scout/Shortlisted-player/John.png"
              name="FC Barcelona Youth"
              message="We are interested in your profile..."
              time="2h ago"
              unread={true}
              theme={theme}
            />
            <Messages
              logo="/player/dashboard/mike.png"
              name="Mike Scout"
              message="Great highlight reel! Would love to..."
              time="5h ago"
              unread={true}
              theme={theme}
            />
            <Messages
              logo="/Scout/Shortlisted-player/Sarah.png"
              name="Real Madrid Academy"
              message="Thank you for your interest..."
              time="1d ago"
              unread={false}
              theme={theme}
            />
            <div className="px-4 pt-6">
              <Button
                variant="outline"
                size="icon"
                className="flex items-center gap-2 w-full"
              >
                <span className="text-[#00E5FF]"> View All Messages</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
