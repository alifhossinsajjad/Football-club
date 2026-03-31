import Image from "next/image";
import React from "react";
import { useGetPublicSettingsQuery } from "@/redux/features/home/homeApi";

const Logo = () => {
  const { data: settings } = useGetPublicSettingsQuery();

  return (
    <div>
      <Image
        src={settings?.platformLogo || "/images/logo.png"}
        alt={settings?.platformName || "NextGen Pros Logo"}
        width={140}
        height={40}
        priority
        unoptimized
        style={{ width: "auto", height: "auto", maxHeight: "40px" }}
      />
    </div>
  );
};

export default Logo;
