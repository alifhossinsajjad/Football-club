"use client";

import React, { useEffect } from "react";
import { useGetPublicSettingsQuery } from "@/redux/features/home/homeApi";

export const BrandingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: settings } = useGetPublicSettingsQuery();

  useEffect(() => {
    if (settings?.brandColors) {
      const root = document.documentElement;
      root.style.setProperty("--primary-cyan", settings.brandColors.primaryCyan);
      root.style.setProperty("--primary-magenta", settings.brandColors.primaryMagenta);
      root.style.setProperty("--bg-dark", settings.brandColors.backgroundDark);
      root.style.setProperty("--bg-card", settings.brandColors.backgroundCard);

      // Update favicon dynamically
      if (settings.favicon) {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = settings.favicon;
      }

      // Update title if needed
      if (settings.platformName) {
        document.title = settings.platformName;
      }
    }
  }, [settings]);

  return <>{children}</>;
};
