"use client"

import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Edit,
  MapPin,
  Calendar,
  Users,
  Mail,
  Phone,
  Globe,
  MapPinIcon,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Trophy,
  Dumbbell,
  Building2,
  Heart,
  Video,
  Home,
  Send,
} from "lucide-react"

export default function ClubProfilePage() {
  const theme = useSelector((state) => state.theme)
  const router = useRouter()

  const ageGroups = ["U-10", "U-12", "U-14", "U-16", "U-18"]

  const facilities = [
    { icon: Dumbbell, text: "State-of-the-art training center" },
    { icon: Building2, text: "Multiple full-size pitches" },
    { icon: Heart, text: "Medical and rehabilitation center" },
    { icon: Video, text: "Modern gym and fitness facilities" },
    { icon: Home, text: "Video analysis room" },
    { icon: Users, text: "Accommodation for academy players" },
  ]

  const achievements = [
    { year: "2023", title: "UEFA Youth League Winners", desc: "Champions of Europe's premier youth competition" },
    { year: "2024", title: "La Liga Youth Champions", desc: "Domestic league winners for the third consecutive" },
    { year: "2021", title: "Copa del Rey Youth Trophy", desc: "National cup competition winners" },
  ]

  const upcomingEvents = [
    {
      title: "Open Youth Trials 2024",
      date: "2024-02-15",
      time: "10:00 AM",
      location: "FC Barcelona Training Center",
      spots: "50 Spots",
      price: "Free",
      image: "/open-youth-trials-2024.jpg",
    },
    {
      title: "International Youth Showcase",
      date: "2024-03-01",
      time: "2:00 PM",
      location: "Camp Nou",
      spots: "30 Spots",
      price: "€25",
      image: "/international-youth-showcase.jpg",
    },
    {
      title: "Summer Training Camp",
      date: "2024-07-10",
      time: "9:00 AM",
      location: "FC Barcelona Training Center",
      spots: "20 Spots",
      price: "€500 (Week)",
      image: "/summer-training-camp.jpg",
    },
  ]

  const photoGallery = [
    "/phone-gallery-1.jpg",
    "/phone-gallery-2.jpg",
    "/phone-gallery-3.jpg",
    "/phone-gallery-4.jpg",
    "/phone-gallery-5.jpg",
    "/phone-gallery-6.jpg",
  ]

  const featuredPlayers = [
    { name: "Marc González", position: "Forward", age: "U-17", image: "/MarcusSilva-1.jpg" },
    { name: "Luca Martínez", position: "Midfielder", age: "U-16", image: "/EmmaRodriguez-2.jpg" },
    { name: "João Silva", position: "Defender", age: "U-16", image: "/joao-silva.jpg" },
    { name: "Ahmed Hassan", position: "Goalkeeper", age: "U-18", image: "/ahmed-hassan.jpg" },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.backgroundDark }}>
      <div className="relative h-64 lg:h-80">
        <img src="/club-profile-cover.jpg" alt="Club Cover" className="w-full h-full object-cover brightness-90" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all hover:opacity-90"
          style={{
            backgroundColor: "rgba(15, 16, 45, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <ArrowLeft className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
          <span className="text-white font-medium text-sm">Back to Directory</span>
        </button>

        <button
          onClick={() => router.push("/club/profile/edit")}
          className="absolute top-6 right-6 flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
          style={{
            backgroundColor: theme.colors.neonAccent,
          }}
        >
          <Edit className="w-4 h-4 text-white" />
          <span className="text-white">Edit Profile</span>
        </button>
      </div>

      <div className="px-4 lg:px-8 pb-8">
        <div
          className="relative -mt-16 border rounded-xl p-6 lg:p-8 mb-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}1A`,
          }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex-shrink-0 relative -mt-24 md:-mt-28">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{
                  backgroundColor: theme.colors.primaryCyan,
                }}
              />
              <div
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: "white",
                  padding: "16px",
                  border: `3px solid ${theme.colors.backgroundCard}`,
                }}
              >
                <img
                  src="/club-profile-main-logo.png"
                  alt="FC Barcelona Youth"
                  className="w-full h-full"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Building2 className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                <span className="text-xs font-semibold tracking-wide" style={{ color: theme.colors.primaryCyan }}>
                  Professional Academy
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">FC Barcelona Youth</h1>

              <p className="text-base text-gray-400 mb-4">Developing Champions since 1979</p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                  <span>Barcelona, Spain</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                  <span>Est. 1979</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                  <span>156 Players</span>
                </div>
              </div>
            </div>

            <button
              className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90 flex items-center gap-2 whitespace-nowrap"
              style={{ backgroundColor: theme.colors.neonAccent }}
            >
              <Users className="w-4 h-4 text-white" />
              <span className="text-white">Connect Club</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About the Academy */}
            <div
              className="border rounded-xl p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                About the Academy
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold text-base mb-3">Overview</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    FC Barcelona Youth Academy, also known as La Masia, is one of the most prestigious youth development
                    programs in world football. Our academy has produced some of the greatest players in football
                    history and is renowned for developing well-rounded individuals. With a focus on technical
                    excellence, tactical intelligence, and personal development, we prepare young talents for successful
                    careers while maintaining our philosophy that centers on possession-based football, creative play,
                    and nurturing talent from a young age.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-base mb-3">Our Mission</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Our mission is to identify, develop, and nurture young football talent while instilling the values
                    of respect, effort, ambition, teamwork, and humility. We aim to create not just exceptional
                    footballers, but exemplary individuals who will represent the club with pride and distinction.
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div
              className="border rounded-xl p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Recent Achievements
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: theme.colors.backgroundDark }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy className="w-5 h-5" style={{ color: "#FDC700" }} />
                      <span className="font-bold text-lg" style={{ color: theme.colors.primaryCyan }}>
                        {achievement.year}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2 leading-snug">{achievement.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div
              className="border rounded-xl p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Upcoming Events
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden transition-all hover:transform hover:scale-105"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      border: `1px solid ${theme.colors.primaryCyan}1A`,
                    }}
                  >
                    <div className="relative h-36">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: "rgba(15, 16, 45, 0.9)",
                          color: theme.colors.neonAccent,
                        }}
                      >
                        {event.spots}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-white font-semibold text-sm line-clamp-1">{event.title}</h3>
                      <div className="space-y-1.5 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" style={{ color: "#FDC700" }} />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5" style={{ color: "#FDC700" }} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" style={{ color: "#FDC700" }} />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{event.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery */}
            <div
              className="border rounded-xl p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Photo Gallery
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {photoGallery.map((photo, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden cursor-pointer group">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Players */}
            <div
              className="border rounded-xl p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Featured Players
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {featuredPlayers.map((player, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-3 relative group cursor-pointer">
                      <div
                        className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity"
                        style={{ backgroundColor: theme.colors.primaryCyan }}
                      />
                      <img
                        src={player.image || "/placeholder.svg"}
                        alt={player.name}
                        className="relative w-full aspect-square rounded-full object-cover border-2 transition-transform group-hover:scale-105"
                        style={{ borderColor: `${theme.colors.primaryCyan}40` }}
                      />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">{player.name}</h3>
                    <p className="text-xs font-medium mb-0.5" style={{ color: theme.colors.primaryCyan }}>
                      {player.position}
                    </p>
                    <p className="text-xs text-gray-400">{player.age}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <div
              className="border rounded-xl p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Age Groups</h2>
              <div className="flex flex-wrap gap-2">
                {ageGroups.map((group, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-lg font-semibold text-xs"
                    style={{
                      backgroundColor: `${theme.colors.primaryCyan}15`,
                      color: theme.colors.primaryCyan,
                      border: `1px solid ${theme.colors.primaryCyan}30`,
                    }}
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="border rounded-xl p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Facilities</h2>
              <div className="space-y-3">
                {facilities.map((facility, index) => {
                  const Icon = facility.icon
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: theme.colors.primaryCyan }} />
                      <span className="text-gray-300 text-sm leading-relaxed">{facility.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div
              className="border rounded-xl p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3">Get in Touch</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                      <span className="text-xs text-gray-400">Email</span>
                    </div>
                    <p className="text-white text-sm pl-6">academy@fcbarcelona.com</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                      <span className="text-xs text-gray-400">Phone</span>
                    </div>
                    <p className="text-white text-sm pl-6">+34 93 496 36 00</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                      <span className="text-xs text-gray-400">Website</span>
                    </div>
                    <p className="text-white text-sm pl-6">www.fcbarcelona.com</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPinIcon className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                      <span className="text-xs text-gray-400">Address</span>
                    </div>
                    <p className="text-white text-sm pl-6">Carrer de Aristides Maillol 08028 Barcelona, Spain</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="border rounded-xl p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg transition-all hover:opacity-80"
                  style={{ backgroundColor: theme.colors.backgroundDark }}
                >
                  <Facebook className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                  <span className="text-white text-sm">Facebook</span>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg transition-all hover:opacity-80"
                  style={{ backgroundColor: theme.colors.backgroundDark }}
                >
                  <Instagram className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                  <span className="text-white text-sm">Instagram</span>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg transition-all hover:opacity-80"
                  style={{ backgroundColor: theme.colors.backgroundDark }}
                >
                  <Twitter className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                  <span className="text-white text-sm">Twitter</span>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg transition-all hover:opacity-80"
                  style={{ backgroundColor: theme.colors.backgroundDark }}
                >
                  <Youtube className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                  <span className="text-white text-sm">YouTube</span>
                </a>
              </div>
            </div>

            <button
              className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: theme.colors.neonAccent }}
            >
              <Send className="w-5 h-5 text-white" />
              <span className="text-white">Send a Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
