"use client";

import { useEffect } from "react";
import { useGetGeneralSettingsQuery } from "@/redux/features/admin/adminSettingsApi";

export function DynamicConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: config, isLoading } = useGetGeneralSettingsQuery();

  useEffect(() => {
    if (config) {
      const root = document.documentElement;

      // 1. Inject Dynamic Theme (CSS Variables)
      if (config.brandColors) {
        root.style.setProperty("--primary", config.brandColors.primaryCyan);
        root.style.setProperty("--secondary", config.brandColors.primaryMagenta);
        // Assuming backgroundDark maps to background, backgroundCard maps to card etc:
        root.style.setProperty("--background", config.brandColors.backgroundDark);
        root.style.setProperty("--card", config.brandColors.backgroundCard);
      }

      // 2. Real-time Title Injection (Client-side sync)
      if (config.platformName) {
        document.title = config.platformName;
      }

      // 3. Dynamic Favicon sync
      if (config.favicon) {
        let link: HTMLLinkElement | null = document.querySelector(
          "link[rel~='icon']"
        );
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }
        link.href = config.favicon;
      }
    }
  }, [config]);

  if (isLoading) {
    // We render children while loading to not block hydration/layout, Next.js metadata covers initial load.
  }

  return <>{children}</>;
}
