import { DiscoveryPlayer } from "@/types/scout/playerDicoverType";
import Image from "next/image";

export const Avatar = ({
  player,
  size = 48,
}: {
  player: DiscoveryPlayer;
  size?: number;
}) => {
  const name = `${player?.first_name || ""}${player?.last_name || ""}`;

  const hue =
    name
      .split("")
      .reduce((a, c) => a + c.charCodeAt(0), 0) % 360;

  const imageSrc = player?.profile_image?.trim();

  // ✅ If image exists → show image
  if (imageSrc) {
    return (
      <div
        className="relative rounded-full overflow-hidden border-2 border-[#1d3a55] flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src={imageSrc}
          alt={name || "Player"}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  // ✅ Fallback avatar (NO IMAGE)
  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-bold border-2 border-[#1d3a55] flex-shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: `hsl(${hue}, 60%, 50%)`,
      }}
    >
      {player?.first_name?.[0] || "P"}
    </div>
  );
};