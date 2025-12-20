import React from "react";
import { useSelector } from "react-redux";

export default function ScoutFooter() {
      const theme = useSelector((state) => state.theme);
  return (
    <div
      className=" flex items-center border-t-2 border-[#04B5A3] justify-end px-4 lg:px-8 "
      style={{
        backgroundColor: theme.colors.backgroundDark,
        borderColor: `${theme.colors.primaryCyan}1A`,
      }}
    >
      <p className="text-xs sm:text-sm text-gray-500 py-4 ">© 2025 NextGen Pros. All rights reserved.</p>
    </div>
  );
}
