'use client'
import React, { useState } from 'react';

const ClubProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [clubData, setClubData] = useState({
    name: "FC Barcelona Youth",
    tagline: "International Football Academy",
    location: "Barcelona, Spain",
    foundedYear: "1899",
    ageGroups: "U-7 to U-23",
    totalPlayers: "745",
    email: "academy@fcbbarcelona.com",
    phone: "+34 93 496 36 00",
    website: "www.fcbarcelona.com",
    address: "Carrer d'Arístides Maillol, 08028 Barcelona, Spain",
    facebook: "FCBarcelonaYouth",
    twitter: "@FCBYouth",
    instagram: "@lcbtyouth",
    youtube: "FCBarcelonaYouth",
    overview: "La Masia, one of the most prestigious youth academies...",
    mission: "Our mission is to identify, develop, and nurture young football talent...",
    facilities: [
      "6 natural turf training fields",
      "2 artificial turf pitches",
      "State-of-the-art gym and fitness center",
      "Medical and physiotherapy facilities",
      "Video analysis room",
      "Accommodation for academy players",
    ],
    achievements: [
      { title: "UEFA Youth League Winners", year: "2023" },
      { title: "U-16 Liga Champions", year: "2024" },
      { title: "Conner Bay Youth Trophy", year: "2023" },
    ],
    upcomingEvents: [
      { title: "Open Youth Trials 2025", date: "15/05/2025", location: "Camp Nou Training Centre" },
      { title: "International Youth Showcase", date: "22/02/2025", location: "Barcelona" },
      { title: "Summer Training Camp", date: "01/07/2025", location: "BCN Sports Village" },
    ],
    featuredPlayers: [
      { name: "John Adams", ageGroup: "U-17", position: "Striker" },
      { name: "Lucas Martin", ageGroup: "U-19", position: "Midfielder" },
      { name: "Omar Hassan", ageGroup: "U-15", position: "Defender" },
      { name: "Tom Williams", ageGroup: "U-18", position: "Goalkeeper" },
    ],
    photoGallery: [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg",
      "https://example.com/photo3.jpg",
      "https://example.com/photo4.jpg",
      "https://example.com/photo5.jpg",
      "https://example.com/photo6.jpg",
    ],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClubData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlayerChange = (index: number, field: string, value: string) => {
    setClubData(prev => {
      const newPlayers = [...prev.featuredPlayers];
      (newPlayers[index] as any)[field] = value;
      return { ...prev, featuredPlayers: newPlayers };
    });
  };

  const handleSave = () => {
    console.log("Saving:", clubData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white pb-16">

      {/* ── Header / Cover ── */}
      <div className="relative">
        <div className="h-64 md:h-80 bg-gray-800 relative overflow-hidden">
          <img
            src="/cover-placeholder.jpg"
            alt="Cover"
            className="w-full h-full object-cover opacity-70"
          />
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">
                Upload Cover Photo
              </button>
            </div>
          )}
        </div>

        <div className="absolute -bottom-16 left-6 md:left-12 flex items-end gap-5">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-900 bg-gray-700 overflow-hidden">
            <img src="/logo-placeholder.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="mb-4">
            {isEditing ? (
              <>
                <input
                  name="name"
                  value={clubData.name}
                  onChange={handleInputChange}
                  className="text-3xl md:text-4xl font-bold bg-transparent border-b border-gray-500 focus:border-blue-500 outline-none"
                />
                <input
                  name="tagline"
                  value={clubData.tagline}
                  onChange={handleInputChange}
                  className="text-lg text-gray-400 bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none block mt-1"
                />
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-5xl font-bold">{clubData.name}</h1>
                <p className="text-lg md:text-xl text-gray-400">{clubData.tagline}</p>
              </>
            )}
          </div>
        </div>

        <div className="absolute top-4 right-6 md:right-12">
          {isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* ── Main Grid – swapped columns ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: Main content (now lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-8">

          {/* About */}
          <section className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">About the Academy</h2>
            {isEditing ? (
              <>
                <textarea name="overview" value={clubData.overview} onChange={handleInputChange} rows={5}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-3 mb-4 focus:border-blue-600 outline-none" />
                <textarea name="mission" value={clubData.mission} onChange={handleInputChange} rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-3 focus:border-blue-600 outline-none" />
              </>
            ) : (
              <>
                <p className="mb-4">{clubData.overview}</p>
                <p>{clubData.mission}</p>
              </>
            )}
          </section>

          {/* Facilities */}
          <section className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Facilities</h2>
              {isEditing && <button className="text-blue-400 hover:text-blue-300 text-sm">+ Add Facility</button>}
            </div>
            <ul className="space-y-2">
              {clubData.facilities.map((item, i) => (
                <li key={i} className="flex items-center justify-between">
                  {isEditing ? (
                    <input value={item} className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2" />
                  ) : <span>{item}</span>}
                  {isEditing && <button className="text-red-400 hover:text-red-300 ml-3">×</button>}
                </li>
              ))}
            </ul>
          </section>

          {/* Achievements, Events, Featured Players – same as before, just omitted for brevity */}

          {/* Photo Gallery – added here */}
          <section className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold">Photo Gallery</h2>
              {isEditing && <button className="text-blue-400 hover:text-blue-300">+ Add Photo</button>}
            </div>
            {isEditing ? (
              <div className="space-y-3">
                {clubData.photoGallery.map((url, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      value={url}
                      onChange={() => {}} // todo: implement
                      className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2"
                    />
                    <button className="text-red-400 hover:text-red-300">Remove</button>
                  </div>
                ))}
                <button className="text-blue-400 hover:text-blue-300 mt-2">+ Add new photo URL</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {clubData.photoGallery.map((url, i) => (
                  <div key={i} className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                    <img src={url} alt={`Gallery ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* RIGHT: Sidebar – now lg:col-span-1 */}
        <div className="lg:col-span-1 space-y-6 order-first lg:order-last">

          {/* Basic Information */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-5">Basic Information</h2>
            <div className="space-y-4">
              {['name', 'tagline', 'location', 'foundedYear', 'ageGroups', 'totalPlayers'].map(key => (
                <div key={key}>
                  <label className="text-gray-400 text-sm capitalize block">{key.replace(/([A-Z])/g, ' $1')}</label>
                  {isEditing ? (
                    <input
                      name={key}
                      value={(clubData as any)[key]}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 focus:border-blue-600 outline-none"
                    />
                  ) : (
                    <p className="font-medium">{(clubData as any)[key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-5">Contact Information</h2>
            <div className="space-y-3">
              {['email', 'phone', 'website', 'address'].map(key => (
                <div key={key}>
                  <label className="text-gray-400 text-sm capitalize block">{key}</label>
                  {isEditing ? (
                    <input
                      name={key}
                      value={(clubData as any)[key]}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 focus:border-blue-600 outline-none"
                    />
                  ) : (
                    <p className="break-words">{(clubData as any)[key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Media – added */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-5">Social Media</h2>
            <div className="space-y-4">
              {[
                { label: "Facebook", key: "facebook" },
                { label: "Twitter / X", key: "twitter" },
                { label: "Instagram", key: "instagram" },
                { label: "YouTube", key: "youtube" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="text-gray-400 text-sm block">{label}</label>
                  {isEditing ? (
                    <input
                      name={key}
                      value={(clubData as any)[key]}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 focus:border-blue-600 outline-none"
                    />
                  ) : (
                    <p className="font-medium">{(clubData as any)[key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfilePage;