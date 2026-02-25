"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import {
  LayoutDashboard,
  X,
  Menu,
  Users,
  Building,
  CalendarSearch,
  ShieldIcon,
  InboxIcon,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { path: "/scout/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/scout/player-discovery", icon: Users, label: "Player Discovery" },
  { path: "/scout/club-directory", icon: Building, label: "Club Directory" },
  {
    path: "/scout/events",
    icon: CalendarSearch,
    label: "Events",
  },

  {
    path: "/scout/scout-directory",
    icon: ShieldIcon,
    label: "Scout Directory",
  },
  { path: "/scout/messages", icon: InboxIcon, label: "Messaging" },
  { path: "/scout/settings", icon: Settings2, label: "Settings" },
];

export default function ScoutSidebar() {
  const pathname = usePathname();
  const theme = useSelector((state) => state.theme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Check if path starts with the menu item path (for nested routes)
  const isActiveRoute = (itemPath) => {
    return pathname === itemPath || pathname.startsWith(itemPath + "/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg"
        style={{
          backgroundColor: theme.colors.backgroundCard,
        }}
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 border-r flex flex-col z-50 transition-transform duration-300",
          "lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}1A`,
        }}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg"
          style={{
            backgroundColor: theme.colors.backgroundDark,
          }}
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Logo */}
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          // className="flex items-center justify-center border-b px-6 py-3"
          className="w-[255px] h-[152px] px-6 py-3 border-b-[1.25px] flex items-center justify-center gap-1"
          // className="h-20 flex items-center justify-center border-b px-4"
          style={{
            borderColor: `${theme.colors.primaryCyan}1A`,
          }}
        >
          <Image
            src="/logo.png"
            alt="NextGen Pros"
            width={150}
            height={48}
            priority
          />
        </Button>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "sidebar-item flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200",
                      "rounded-[10px] border border-transparent",
                      isActive
                        ? "text-white active"
                        : "text-gray-400 hover:text-white"
                    )}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{
                        color: isActive ? theme.colors.primaryCyan : "inherit",
                      }}
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
