"use client";

import { useGetAllClubsQuery } from "@/redux/features/scout/clubDireactoryApi";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { FaLocationArrow, FaUsers } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { GoTrophy } from "react-icons/go";
import { PiBuildingOfficeLight } from "react-icons/pi";

const ClubDirectoryPage = () => {
  const { data, isLoading, error } = useGetAllClubsQuery();

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Something went wrong</p>;

  return (
    <div className="p-6">
      <h1 className="text-[#00E5FF] text-2xl font-bold mb-6">
        Player Discovery
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
        {data?.results?.map((club) => (
          <div
            key={club.id}
            className="bg-[#11163C] rounded-xl p-4 shadow-lg hover:scale-105 transition border border-[#04B5A3]/30 space-y-5"
          >
            <div className="flex justify-around  items-center gap-15">
              <div>
                {club.club_logo ? (
                  <Image
                    src={club.club_logo}
                    alt={club.club_name}
                    width={300}
                    height={200}
                    className=" object-cover rounded-full"
                  />
                ) : (
                  <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-white font-bold">I</span>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {club.club_name}
                </h2>

                <p className="text-gray-400 text-sm">
                  <CiLocationOn
                    className="text-[#04B5A3] mr-2 inline-block"
                    size={20}
                  />{" "}
                  {club.location}
                </p>

                <p className="text-gray-400 text-sm">
                  {" "}
                  <PiBuildingOfficeLight
                    className="text-[#04B5A3] mr-2 inline-block"
                    size={20}
                  />
                  {club.club_type}
                </p>
              </div>
            </div>
            <div className="flex justify-around items-center">
              <div className="space-y-2">
                <div className="flex items-center">
                  <FaUsers
                    className="text-[#04B5A3] mr-2 inline-block"
                    size={20}
                  />{" "}
                  <p>Players</p>
                </div>
                <span>{club.current_players}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <GoTrophy
                    className="text-[#04B5A3] mr-2 inline-block"
                    size={20}
                  />{" "}
                  <p className="text-gray-400 text-sm">Established</p>
                </div>
                <span> {club.established_year}</span>
              </div>
            </div>
            <div className="text-center">
              <p>Recent Achievement</p>
              <span>: {club.recent_achievement}</span>
            </div>
            <div className="flex items-center justify-around">
              <button className="bg-[#04B5A3] text-white px-4 py-2 rounded-lg hover:bg-[#00E5FF] transition">
                View Details
              </button>
              <div className="border border-[#04B5A3]/70 flex justify-center items-center p-2 rounded-lg">
                <FaMessage />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubDirectoryPage;
