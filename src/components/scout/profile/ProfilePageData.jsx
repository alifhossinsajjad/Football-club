"use client";
import { useSearchParams } from "next/navigation";
import ProfileDetails from "./ProfileDetails";


export default function PlayerProfilePage() {
  const searchParams = useSearchParams();
  const rawData = searchParams.get("data");

  const parsedData = rawData ? JSON.parse(rawData) : {};

  const playerProfileData = {
    profile: {
      name: parsedData.name,
      position: parsedData.position,
      nationality: parsedData.nationality,
      age: parsedData.age,

      // OPTIONAL FIELDS (future ready)
      height: parsedData.height,
      weight: parsedData.weight,
      preferredFoot: parsedData.preferredFoot,
      dateOfBirth: parsedData.dateOfBirth,
      jerseyNumber: parsedData.jerseyNumber,
      location: parsedData.location,
      status: parsedData.status || "Available",
    },
    profileImage: parsedData.image,
  };

  return <ProfileDetails playerProfileData={playerProfileData} />;
}
