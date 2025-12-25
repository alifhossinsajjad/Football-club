"use client"

import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSelector } from "react-redux"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ClubProfileEditPage() {
  const theme = useSelector((state) => state.theme)
  const router = useRouter()

  // State variables for club profile information
  const [clubName, setClubName] = useState("FC Barcelona Youth")
  const [tagline, setTagline] = useState("International Football Academy")
  const [location, setLocation] = useState("Barcelona, Spain")
  const [established, setEstablished] = useState("1999")
  const [totalPlayers, setTotalPlayers] = useState("745")
  const [email, setEmail] = useState("info@fcbarcelonayouth.com")
  const [phone, setPhone] = useState("+34 931 234 567")
  const [website, setWebsite] = useState("www.fcbarcelonayouth.com")
  const [address, setAddress] = useState("Camp Nou, Barcelona, Spain")
  const [overview, setOverview] = useState(
    "FC Barcelona Youth is a renowned football academy dedicated to nurturing young talent and fostering a passion for the beautiful game.",
  )
  const [mission, setMission] = useState(
    "Our mission is to provide top-tier football education, develop well-rounded athletes, and instill values of teamwork, discipline, and sportsmanship.",
  )
  const [facebook, setFacebook] = useState("@FCBarcelonaYouth")
  const [twitter, setTwitter] = useState("@FCBarcelonaYouth")
  const [instagram, setInstagram] = useState("@FCBarcelonaYouth")
  const [youtube, setYoutube] = useState("@FCBarcelonaYouth")

  // State variables for dynamic sections
  const [facilities, setFacilities] = useState([
    "State-of-the-art training grounds",
    "Modern gymnasium",
    "Player lounge and cafeteria",
  ])
  const [achievements, setAchievements] = useState([
    { year: "2023", title: "La Liga Youth Champions", description: "Won the U-19 La Liga youth league title." },
    {
      year: "2022",
      title: "European Youth Cup Winners",
      description: "Secured victory in the prestigious European Youth Cup.",
    },
  ])
  const [events, setEvents] = useState([
    { title: "Summer Training Camp", date: "15/07/2024", location: "Academy Grounds" },
    { title: "Annual Youth Tournament", date: "20/09/2024", location: "Camp Nou Annex" },
  ])
  const [players, setPlayers] = useState([
    { name: "Alejandro Valdés", position: "Midfielder", age: "17" },
    { name: "Jordi Cruyff Jr.", position: "Forward", age: "18" },
  ])

  // Handlers for adding/removing items in dynamic sections
  const addFacility = () => {
    setFacilities([...facilities, ""])
  }

  const updateFacility = (index, value) => {
    const newFacilities = [...facilities]
    newFacilities[index] = value
    setFacilities(newFacilities)
  }

  const removeFacility = (index) => {
    setFacilities(facilities.filter((_, i) => i !== index))
  }

  const addAchievement = () => {
    setAchievements([...achievements, { year: "", title: "", description: "" }])
  }

  const updateAchievement = (index, field, value) => {
    const newAchievements = [...achievements]
    newAchievements[index][field] = value
    setAchievements(newAchievements)
  }

  const removeAchievement = (index) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }

  const addEvent = () => {
    setEvents([...events, { title: "", date: "", location: "" }])
  }

  const updateEvent = (index, field, value) => {
    const newEvents = [...events]
    newEvents[index][field] = value
    setEvents(newEvents)
  }

  const removeEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index))
  }

  const addPlayer = () => {
    setPlayers([...players, { name: "", position: "", age: "" }])
  }

  const updatePlayer = (index, field, value) => {
    const newPlayers = [...players]
    newPlayers[index][field] = value
    setPlayers(newPlayers)
  }

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index))
  }

  // Handler for saving changes
  const handleSave = () => {
    // Logic to save the updated club profile
    console.log("Saving club profile...")
    router.back() // Navigate back after saving
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.backgroundDark }}>
      <header
        className="sticky top-0 h-16 border-b flex items-center justify-between px-6 z-30"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}1A`,
        }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-80"
          style={{ color: theme.colors.primaryCyan }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Profile</span>
        </button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="text-sm"
            style={{ borderColor: `${theme.colors.primaryCyan}40`, color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="text-sm"
            style={{ backgroundColor: theme.colors.neonAccent, backgroundImage: "none" }}
          >
            Save Changes
          </Button>
        </div>
      </header>

      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div
          className="border rounded-xl p-6 mb-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}1A`,
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
            <h2 className="text-lg font-bold text-white">Upload Cover Photo</h2>
          </div>
          <div
            className="relative h-48 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer group transition-all hover:border-opacity-60"
            style={{
              borderColor: `${theme.colors.primaryCyan}33`,
              backgroundColor: `${theme.colors.backgroundDark}80`,
            }}
          >
            <div className="text-center">
              <Upload
                className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform"
                style={{ color: theme.colors.primaryCyan }}
              />
              <p className="text-white text-sm font-medium">Click to upload cover photo</p>
              <p className="text-gray-400 text-xs mt-1">Please upload a cover photo (logo, hero image)</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-6">Suggested dimensions: 1920x1080 pixels</p>

            <div
              className="relative w-40 h-40 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer mx-auto group transition-all hover:border-opacity-60"
              style={{
                borderColor: `${theme.colors.primaryCyan}33`,
                backgroundColor: `${theme.colors.backgroundDark}80`,
              }}
            >
              <div className="text-center">
                <Upload
                  className="w-7 h-7 mx-auto mb-1 group-hover:scale-110 transition-transform"
                  style={{ color: theme.colors.primaryCyan }}
                />
                <p className="text-white text-xs font-medium">Upload Photo</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">Please upload a square logo (round shape)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div
            className="border rounded-xl p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}1A`,
            }}
          >
            <h2 className="text-lg font-bold text-white mb-5">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Club Name</label>
                <Input
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Tagline</label>
                <Input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="International Football Academy"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Location</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Founded Year</label>
                  <Input
                    value={established}
                    onChange={(e) => setEstablished(e.target.value)}
                    placeholder="1999"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">Total Players</label>
                  <Input
                    value={totalPlayers}
                    onChange={(e) => setTotalPlayers(e.target.value)}
                    placeholder="745"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Age Groups</label>
                <Input
                  placeholder="U-7 U-9 U-11 U-13"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className="border rounded-xl p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}1A`,
            }}
          >
            <h2 className="text-lg font-bold text-white mb-5">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Phone Number</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Website</label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* About the Academy */}
          <div
            className="border rounded-xl p-6 lg:col-span-2"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}1A`,
            }}
          >
            <h2 className="text-lg font-bold text-white mb-5">About the Academy</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Overview</label>
                <textarea
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Describe your academy..."
                  rows={4}
                  className="w-full rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Our Mission</label>
                <textarea
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  placeholder="What is your academy's mission?"
                  rows={3}
                  className="w-full rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Key Coaches</label>
                <Input
                  placeholder="List key coaches and their expertise"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">What to wear for an academy day?</label>
                <Input
                  placeholder="Describe academy dress code or requirements"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div
            className="border rounded-xl p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}1A`,
            }}
          >
            <h2 className="text-lg font-bold text-white mb-5">Social Media</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Facebook</label>
                <Input
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="@FCBarcelonaYouth"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Twitter / X</label>
                <Input
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="@FCBarcelonaYouth"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Instagram</label>
                <Input
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@FCBarcelonaYouth"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">YouTube</label>
                <Input
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  placeholder="@FCBarcelonaYouth"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div
            className="border rounded-xl p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}1A`,
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Facilities</h2>
              <button
                onClick={addFacility}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                style={{ color: theme.colors.primaryCyan, backgroundColor: `${theme.colors.primaryCyan}15` }}
              >
                <Plus className="w-3.5 h-3.5" />
                Add Facility
              </button>
            </div>
            <div className="space-y-3">
              {facilities.map((facility, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={facility}
                    onChange={(e) => updateFacility(index, e.target.value)}
                    placeholder="Enter facility name"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                  <button
                    onClick={() => removeFacility(index)}
                    className="p-2 rounded-lg transition-colors hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" style={{ color: "#FF6467" }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div
            className="border rounded-xl p-6 lg:col-span-2"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}1A`,
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Recent Achievements</h2>
              <button
                onClick={addAchievement}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                style={{ color: theme.colors.primaryCyan, backgroundColor: `${theme.colors.primaryCyan}15` }}
              >
                <Plus className="w-3.5 h-3.5" />
                Add Achievement
              </button>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg space-y-3"
                  style={{ backgroundColor: theme.colors.backgroundDark }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <Input
                        value={achievement.year}
                        onChange={(e) => updateAchievement(index, "year", e.target.value)}
                        placeholder="2023"
                        style={{
                          backgroundColor: theme.colors.backgroundCard,
                          borderColor: `${theme.colors.primaryCyan}33`,
                        }}
                      />
                      <Input
                        value={achievement.title}
                        onChange={(e) => updateAchievement(index, "title", e.target.value)}
                        placeholder="Achievement title"
                        className="sm:col-span-3"
                        style={{
                          backgroundColor: theme.colors.backgroundCard,
                          borderColor: `${theme.colors.primaryCyan}33`,
                        }}
                      />
                    </div>
                    <button
                      onClick={() => removeAchievement(index)}
                      className="p-2 rounded-lg transition-colors hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" style={{ color: "#FF6467" }} />
                    </button>
                  </div>
                  <Input
                    value={achievement.description}
                    onChange={(e) => updateAchievement(index, "description", e.target.value)}
                    placeholder="Brief description of the achievement"
                    style={{
                      backgroundColor: theme.colors.backgroundCard,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div
            className="border rounded-xl p-6 lg:col-span-2"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}1A`,
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Upcoming Events</h2>
              <button
                onClick={addEvent}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                style={{ color: theme.colors.primaryCyan, backgroundColor: `${theme.colors.primaryCyan}15` }}
              >
                <Plus className="w-3.5 h-3.5" />
                Add Event
              </button>
            </div>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.backgroundDark }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Input
                        value={event.title}
                        onChange={(e) => updateEvent(index, "title", e.target.value)}
                        placeholder="Event title"
                        style={{
                          backgroundColor: theme.colors.backgroundCard,
                          borderColor: `${theme.colors.primaryCyan}33`,
                        }}
                      />
                      <Input
                        value={event.date}
                        onChange={(e) => updateEvent(index, "date", e.target.value)}
                        placeholder="DD/MM/YYYY"
                        style={{
                          backgroundColor: theme.colors.backgroundCard,
                          borderColor: `${theme.colors.primaryCyan}33`,
                        }}
                      />
                      <Input
                        value={event.location}
                        onChange={(e) => updateEvent(index, "location", e.target.value)}
                        placeholder="Location"
                        style={{
                          backgroundColor: theme.colors.backgroundCard,
                          borderColor: `${theme.colors.primaryCyan}33`,
                        }}
                      />
                    </div>
                    <button
                      onClick={() => removeEvent(index)}
                      className="p-2 rounded-lg transition-colors hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" style={{ color: "#FF6467" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Players */}
          <div
            className="border rounded-xl p-6 lg:col-span-2"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}1A`,
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Featured Players</h2>
              <button
                onClick={addPlayer}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                style={{ color: theme.colors.primaryCyan, backgroundColor: `${theme.colors.primaryCyan}15` }}
              >
                <Plus className="w-3.5 h-3.5" />
                Add Player
              </button>
            </div>
            <div className="space-y-4">
              {players.map((player, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.backgroundDark }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Input
                        value={player.name}
                        onChange={(e) => updatePlayer(index, "name", e.target.value)}
                        placeholder="Player name"
                        style={{
                          backgroundColor: theme.colors.backgroundCard,
                          borderColor: `${theme.colors.primaryCyan}33`,
                        }}
                      />
                      <Input
                        value={player.position}
                        onChange={(e) => updatePlayer(index, "position", e.target.value)}
                        placeholder="Position"
                        style={{
                          backgroundColor: theme.colors.backgroundCard,
                          borderColor: `${theme.colors.primaryCyan}33`,
                        }}
                      />
                      <Input
                        value={player.age}
                        onChange={(e) => updatePlayer(index, "age", e.target.value)}
                        placeholder="Age group"
                        style={{
                          backgroundColor: theme.colors.backgroundCard,
                          borderColor: `${theme.colors.primaryCyan}33`,
                        }}
                      />
                    </div>
                    <button
                      onClick={() => removePlayer(index)}
                      className="p-2 rounded-lg transition-colors hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" style={{ color: "#FF6467" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex justify-end gap-3 mt-8 pt-6 border-t"
          style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
        >
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="px-6 text-sm"
            style={{ borderColor: `${theme.colors.primaryCyan}40`, color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="px-6 text-sm"
            style={{ backgroundColor: theme.colors.neonAccent, backgroundImage: "none" }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
