'use client'

import { useGetEventQuery } from "@/redux/features/scout/eventsApi";
import Image from "next/image";
import Link from "next/link";


const EventDetailsPage = () => {




  return (
    <div>
      <div>
        <div className="flex items-center gap-4 mb-4">
          <Link
            href={"/scout/events"}
            className="hover:underline bg-transparent border-none"
          
          >
            ← Back to Event Details
          </Link>
        </div>
        <div>
          <Image
            src={"/images/event-banner.jpg"}
            alt={"Event Banner"}
            width={1100}
            height={570}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
