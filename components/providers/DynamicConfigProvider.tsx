"use client";

import { useEffect } from "react";
import { useGetPublicSettingsQuery } from "@/redux/features/home/homeApi";
import { useAppDispatch } from "@/redux/hooks";
import { setTheme } from "@/redux/features/themeSlice";

export function DynamicConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { data: config, isLoading } = useGetPublicSettingsQuery();

  useEffect(() => {
    if (config) {
      const root = document.documentElement;

      // 1. Inject Dynamic Theme (CSS Variables)
      if (config.brandColors) {
        // Standard Tailwind/Shadcn variables
        root.style.setProperty("--primary", config.brandColors.primaryCyan);
        root.style.setProperty("--secondary", config.brandColors.primaryMagenta);
        root.style.setProperty("--background", config.brandColors.backgroundDark);
        root.style.setProperty("--card", config.brandColors.backgroundCard);

        // Specific branding variables for direct use
        root.style.setProperty("--primary-cyan", config.brandColors.primaryCyan);
        root.style.setProperty("--primary-magenta", config.brandColors.primaryMagenta);
        root.style.setProperty("--bg-dark", config.brandColors.backgroundDark);
        root.style.setProperty("--bg-card", config.brandColors.backgroundCard);

        // SYNC REDUX state
        dispatch(setTheme({
          colors: {
            primaryCyan: config.brandColors.primaryCyan,
            primaryMagenta: config.brandColors.primaryMagenta,
            primaryGreen: config.brandColors.primaryCyan, // Fallback or mapping
            backgroundCard: config.brandColors.backgroundCard,
          }
        }));
      }

      // 2. Real-time Title Injection (Client-side sync)
      if (config.platformName) {
        document.title = config.platformName;
        dispatch(setTheme({ platformName: config.platformName }));
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
