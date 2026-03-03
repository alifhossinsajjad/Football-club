"use client";

import { useGetAllEventsQuery } from "@/redux/features/scout/eventsApi";
import React from "react";

const Page = () => {
  const { data, isLoading, error } = useGetAllEventsQuery();
  console.log("Events data:", data);

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Events</h1>
      {data?.results.map((event) => (
        <div
          key={event.id}
          className="text-white  bg-[#12143A] rounded-lg p-4 mb-4 flex items-center gap-4"
        >
          <div>{/* image */}</div>
          <div>
            <h1>{event.event_name}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
