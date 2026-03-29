"use client";

import Image from "next/image";
import { CiLocationOn, CiCalendar, CiLink, CiClock1 } from "react-icons/ci";
import {
  FaUsers,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { MdEmail, MdPhone, MdLanguage } from "react-icons/md";
import { BsGrid3X3 } from "react-icons/bs";
import { useGetClubQuery } from "@/redux/features/scout/clubDireactoryApi";
import { useCreateConversationMutation } from "@/redux/features/chat/chatApi";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { BiLeftArrow } from "react-icons/bi";
import { LuBadge, LuMessageCircle } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import { X, Info, Mail, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const ClubDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  if (!id)
    return <p className="text-white text-center py-10">Params id not found!</p>;

  const { data: club, isLoading, error } = useGetClubQuery(Number(id));
  const [createConversation, { isLoading: isSendingMessage }] = useCreateConversationMutation();

  const handleSendMessage = async () => {
    if (!messageText.trim() || !club) return;

    try {
      const receiverId = (club as any).user?.id || club.id;
      if (!receiverId) throw new Error("Invalid club recipient");

      await createConversation({
        receiver_id: receiverId,
        message: messageText.trim(),
      }).unwrap();

      toast.success(`Message sent to ${club.club_name}`);
      setIsMessageModalOpen(false);
      setMessageText("");

      // Redirect with role to help virtual conversation logic
      router.push(`/scout/messaging?userId=${club.id}&role=CLUB_ACADEMY`);
    } catch (error) {
      console.error("Message error:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const aboutAcademy = {
    overview:
      "FC Barcelona Youth Academy, also known as La Masia, is one of the most prestigious youth development programs in world football. It is dedicated to providing a high-quality education and training for young players from all over the world. The academy has produced many talented footballers who have gone on to become successful players in professional football clubs around the world.",
    mission:
      "Our mission is to identify, develop, and nurture young football talent while building a strong infrastructure that supports their growth and development. We aim to provide them with the best possible opportunities to reach their full potential and achieve their dreams.",
  };

  const age = ["10", "12", "14", "16", "18", "20"];

  const facilities = [
    "State-of-the-art training center",
    "Multiple full-size pitches",
    "Indoor training facilities",
    "Medical and rehabilitation center",
    "Educational facilities",
    "Accommodation for academy players",
  ];
const achievements = [
  {
    year: "2023",
    text: "FC Barcelona Youth Academy won the Spanish Youth Championship.",
    title: "Spanish Youth Champions 2023",
    description: "FC Barcelona's youth academy showcased incredible talent and secured the championship title in 2023."
  },
  {
    year: "2022",
    text: 'La Masia Football School was awarded the title of "Best School" by the Ministry of Education.',
    title: "Best Football School 2022",
    description: "La Masia Football School was officially recognized as the best football school by the Ministry of Education."
  },
  {
    year: "2021",
    text: "FC Barcelona Youth Academy won the Spanish Youth Championship.",
    title: "Spanish Youth Champions 2021",
    description: "FC Barcelona's youth academy demonstrated excellent performance to win the Spanish Youth Championship in 2021."
  },
];

  const events = [
    {
      title: "Open House: Hola Bala",
      date: "10th October",
      time: "7pm",
      location: "https://www.balacademy.com/",
    },
    {
      title: "Invitation to the Shinehouse",
      date: "11th October",
      time: "8pm",
      location: "https://www.shinehouse.com/",
    },
    {
      title: "Youth Training Camp",
      date: "12th October",
      time: "9am",
      location: "https://www.youthtrainingcamp.com/",
    },
  ];

  const gallery = [1, 2, 3];

  const featuredPlayers = [
    {
      name: "Neymar Junior",
      position: "Midfielder",
      age: 17,
      club: "Paris Saint-Germain",
    },
    { name: "Vinicius Junior", position: "Forward", age: 18, club: "Flamengo" },
    { name: "Pedro Neto Junior", position: "Defender", age: 16, club: "Porto" },
    {
      name: "Antonio Nocerino Junior",
      position: "Defender",
      age: 15,
      club: "Benfica",
    },
  ];

  const contact = {
    tel: "+34 91 123 456",
    email: "info@nextgenpros.com",
    website: "www.nextgenpros.com",
  };
  const address = ["Carrer d'Aristides Maillol, 08028 Barcelona, Spain"];

  const socials = [
    { name: "Facebook", icon: FaFacebookF, url: "#" },
    { name: "Instagram", icon: FaInstagram, url: "#" },
    { name: "Twitter", icon: FaTwitter, url: "#" },
    { name: "YouTube", icon: FaYoutube, url: "#" },
  ];

  const platforms = [
    "Coursera",
    "Udemy",
    "Pluralsight",
    "Lynda.com",
    "Skillshare",
    "Class Central",
    "FreeCodeCamp",
    "Codecademy",
    "HackerRank",
    "LeetCode",
    "GeeksforGeeks",
    "HackerEarth",
    "Codewars",
  ];

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#04B5A3]"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-red-500">
          Something went wrong. Please try again later.
        </p>
      </div>
    );

  if (!club)
    return (
      <div className="min-h-screen bg-[#0B0D2C] text-white flex items-center justify-center">
        <p className="text-gray-400">Club not found</p>
      </div>
    );

  return (
    <div className="min-h-screen  text-white">
      {/* Stats Bar - exactly as Figma */}
      <div className="relative w-full">
        {/* Banner */}
        <div className="relative w-full h-[400px]">
          <Image
            src="/images/clubBanner.png"
            alt="club banner"
            fill
            className="object-cover rounded-2xl"
          />

          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <Link
              href="/scout/club-directory"
              className="flex items-center gap-2 text-white bg-[#12143A] px-3 py-1 rounded-lg hover:bg-red-500/30 transition"
            >
              <BiLeftArrow /> Back to Directory
            </Link>
          </div>
        </div>

        {/* Club Info Card */}
        <div className="relative max-w-6xl mx-auto -mt-32 bg-[#12143A] rounded-3xl px-12 py-8 md:px-20 md:py-12 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-6 z-10">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden shadow-xl bg-white">
              <Image
                src={"/images/logo.png"}
                alt={club.club_name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2 text-left">
            <p className="flex items-center gap-1 text-[#00D3F2]">
              <PiBuildingOfficeLight size={20} className="text-[#04B5A3]" />
              {club.club_type}
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {club.club_name}
            </h1>

            <span className="text-lg text-gray-400">
              Developing Champions Since 1979
            </span>

            {/* Club Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-3">
              <div className="flex items-center gap-2">
                <CiLocationOn className="text-gray-300 text-xl" />
                <span className="text-gray-300">{club.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <GoTrophy className="text-[#FDC700] text-xl" />
                <span className="text-gray-300">
                  Est. {club.established_year}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaUsers className="text-[#C27AFF] text-xl" />
                <span className="text-gray-300">
                  {club.current_players} Players
                </span>
              </div>
            </div>

            {/* Contact Button */}
            <div className="mt-4">
              <button 
                onClick={() => setIsMessageModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-[#04B5A3] hover:bg-[#00E5FF] transition"
              >
                <LuMessageCircle size={20} />
                Contact Club
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 mt-20">
        {/* About the Academy (spans both Overview & Mission) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 ">
          {/* About Section → 8 Columns */}
          <section className="md:col-span-8 space-y-6 bg-[#12143A] p-6 rounded-xl border border-[#04B5A3]/70 ">
            <h2
              className="text-4xl font-bold mb-6 inline-block pb-2 
               bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] 
               bg-clip-text text-transparent"
            >
              About the Academy
            </h2>

            <div className="space-y-6">
              <div className=" p-6 rounded-xl ">
                <h3 className="text-xl font-semibold mb-2 text-[#04B5A3]">
                  Overview
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {aboutAcademy.overview}
                </p>
              </div>

              <div className="p-6 rounded-xl ">
                <h3 className="text-xl font-semibold mb-2 text-[#04B5A3]">
                  Our Mission
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {aboutAcademy.mission}
                </p>
              </div>
            </div>
          </section>

          {/* Right Side → 4 Columns */}
          <div className="md:col-span-4 space-y-8">
            {/* Age Groups */}
            <section className="bg-[#12143A] p-6 rounded-xl border border-[#04B5A3]/70 ">
              <h2 className="text-xl font-bold mb-4">Age Groups</h2>

              <ul className="flex flex-wrap gap-3">
                {age.map((item, index) => (
                  <li
                    key={index}
                    className="bg-[#0B0D2C] text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    U-{item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Facilities */}
            <section className="bg-[#12143A] p-6 rounded-xl border border border-[#04B5A3]/70 ">
              <h2 className="text-2xl font-bold mb-4  pb-2 inline-block">
                Facilities
              </h2>

              <ul className="space-y-3">
                {facilities.map((item, index) => (
                  <li key={index} className="">
                    <span className=" bg-[#04B5A3] rounded-full"></span>
                    <div className="flex items-center gap-2">
                      <LuBadge />
                      {item}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Recent Achievements */}
        <section className="mb-20">
          {/* Heading */}
          <h2
            className="text-4xl font-bold mb-10 
    bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] 
    bg-clip-text text-transparent inline-block"
          >
            Recent Achievements
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0B0D2C] p-6 rounded-2xl 
        border border-[#1E214E] 
        hover:border-[#04B5A3] 
        transition-all duration-300 
        hover:shadow-lg hover:shadow-[#04B5A3]/20"
              >
                {/* Top Row */}
                <div className="flex items-center gap-3 mb-4">
                  <GoTrophy className="text-yellow-400 text-xl" />
                  <span className="text-[#00E5FF] font-semibold text-sm">
                    {item.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white text-lg font-semibold mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="text-4xl font-bold mb-6 inline-block pb-2 
               bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] 
               bg-clip-text text-transparent"
          >
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/70 hover:border-[#04B5A3]/70 hover:shadow-xl hover:shadow-[#04B5A3]/10 transition-all duration-300 flex flex-col"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4 group-hover:text-[#04B5A3] transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-3 text-gray-300 text-sm flex-1">
                  <p className="flex items-center gap-3">
                    <CiCalendar
                      size={20}
                      className="text-[#04B5A3] min-w-[20px]"
                    />
                    <span>{event.date}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <CiClock1
                      size={20}
                      className="text-[#04B5A3] min-w-[20px]"
                    />
                    <span>{event.time}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <CiLink size={20} className="text-[#04B5A3] min-w-[20px]" />
                    <a
                      href={event.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#04B5A3] transition-colors truncate"
                    >
                      {event.location.replace(/^https?:\/\//, "")}
                    </a>
                  </p>
                </div>
                {/* Optional: Add a small CTA if your Figma has one */}
                {/* <button className="mt-6 self-start px-5 py-2 bg-[#04B5A3]/10 hover:bg-[#04B5A3]/30 text-[#04B5A3] rounded-lg text-sm font-medium transition">Register Now</button> */}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="text-4xl font-bold mb-6 inline-block pb-2 
               bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] 
               bg-clip-text text-transparent"
          >
            Photo Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {gallery.map((image, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl aspect-square border border-gray-700 hover:border-[#04B5A3] transition-all duration-300 shadow-md hover:shadow-[#04B5A3]/20 hover:scale-[1.03]"
              >
                {/* Replace with your actual image URLs from Figma export */}
                <img
                  src={`https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&${idx}`} // example placeholders
                  alt={`Gallery image ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">
                    Youth Training Moment
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Optional: View More button if in Figma */}
          {/* <div className="text-center mt-8">
    <button className="px-8 py-3 bg-[#04B5A3]/20 hover:bg-[#04B5A3]/40 text-[#04B5A3] rounded-xl font-medium transition">View Full Gallery</button>
  </div> */}
        </section>

        <section className="mb-12">
          <h2
            className="text-4xl font-bold mb-6 inline-block pb-2 
               bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] 
               bg-clip-text text-transparent"
          >
            Featured Players
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {featuredPlayers.map((player, idx) => (
              <div
                key={idx}
                className="group bg-gray-900/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-[#04B5A3] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#04B5A3]/10"
              >
                <div className="relative w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden border-4 border-[#04B5A3]/30 group-hover:border-[#04B5A3] transition-all duration-300">
                  {/* Use real player photo URL from Figma */}
                  <img
                    src={`https://images.unsplash.com/photo-1546410630-7a6a-40d2-9f3f-6a0d91e3feda?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80&${idx}`}
                    alt={player.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-bold group-hover:text-[#04B5A3] transition-colors">
                  {player.name}
                </h3>
                <p className="text-[#04B5A3] text-sm font-medium mt-1">
                  {player.position}
                </p>
                <div className="mt-4 text-xs text-gray-400 space-y-1.5">
                  <p>Age: {player.age}</p>
                  <p>Club: {player.club}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          {/* Heading */}
          <h2
            className="text-4xl font-bold mb-10 
    bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] 
    bg-clip-text text-transparent inline-block"
          >
            Contact Information
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT CARD */}
            <div className="bg-[#0B0D2C] p-8 rounded-2xl border border-[#1E214E] shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-white">
                Get in Touch
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <MdEmail className="text-[#04B5A3]" size={20} />
                    Email
                  </div>
                  <p className="text-gray-200">{contact.email}</p>
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <MdPhone className="text-[#04B5A3]" size={20} />
                    Phone
                  </div>
                  <p className="text-gray-200">{contact.tel}</p>
                </div>

                {/* Website */}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <MdLanguage className="text-[#04B5A3]" size={20} />
                    Website
                  </div>
                  <a
                    href={contact.website}
                    target="_blank"
                    className="text-gray-200 hover:text-[#04B5A3] transition"
                  >
                    {contact.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>

                {/* Address */}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <FiMapPin className="text-[#04B5A3]" size={20} />
                    Address
                  </div>
                  <p className="text-gray-200">
                    Carrer d'Aristides Maillol, 08028 Barcelona, Spain
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-8">
              {/* FOLLOW US CARD */}
              <div className="bg-[#0B0D2C] p-8 rounded-2xl border border-[#1E214E] shadow-lg">
                <h3 className="text-xl font-semibold mb-6 text-white">
                  Follow Us
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {socials.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-[#12143A] px-4 py-3 rounded-xl 
              border border-[#1E214E] text-gray-300 
              hover:border-[#04B5A3] hover:bg-[#04B5A3]/10 
              transition"
                    >
                      <social.icon className="text-[#04B5A3]" />
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* SEND MESSAGE CARD */}
              <div className="bg-[#0B0D2C] p-8 rounded-2xl border border-[#1E214E] shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Send a Message
                </h3>

                <p className="text-gray-400 mb-6">
                  Interested in joining our academy? Send us a message and we'll
                  get back to you within 24 hours.
                </p>

                <button
                  onClick={() => setIsMessageModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl 
          text-white bg-gradient-to-r from-[#04B5A3] to-[#00E5FF] 
          hover:opacity-90 transition"
                >
                  <LuMessageCircle size={18} />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Messaging Modal */}
      {isMessageModalOpen && club && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#12143A] border border-[#1E2550] rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1E2550]">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full border-2 border-[#04B5A3]/30 overflow-hidden bg-white">
                  <Image
                    src={"/images/logo.png"}
                    alt={club.club_name || "Club"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Message {club.club_name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Club Academy
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Your Message
                </label>
                <textarea
                  autoFocus
                  className="w-full h-40 p-4 rounded-2xl bg-[#0B0E1E] border border-[#1E2550] text-white focus:outline-none focus:border-[#04B5A3]/50 transition-all resize-none placeholder:text-gray-600"
                  placeholder={`Hi ${club.club_name}, we are interested in your academy...`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 text-amber-500/80 bg-amber-500/5 rounded-xl p-3 border border-amber-500/10">
                <Info size={16} className="shrink-0" />
                <p className="text-[10px] leading-tight">
                  Your message will be sent directly to the club's inbox.
                  They will be notified immediately.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-2 flex gap-3">
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="flex-1 h-14 rounded-xl border border-[#1E2550] text-gray-400 font-bold hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim() || isSendingMessage}
                className="flex-[2] h-14 rounded-xl bg-gradient-to-r from-[#04B5A3] to-[#039d8f] text-white font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_8px_20px_-5px_rgba(4,181,163,0.3)] flex items-center justify-center gap-2"
              >
                {isSendingMessage ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Mail size={18} />
                )}
                {isSendingMessage ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubDetailsPage;
