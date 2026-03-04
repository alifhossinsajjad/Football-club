"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useGetEventQuery } from "@/redux/features/scout/eventsApi";
import EventRegistrationForm from "@/components/scoutDashboard/event/EventRegistretionForm";
import React from "react";

const EventRegister = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventIdParam = searchParams.get("eventId");

  // Validate and parse eventId
  const eventId = eventIdParam && !isNaN(Number(eventIdParam)) ? Number(eventIdParam) : null;

  const { data: event, isLoading, error } = useGetEventQuery(eventId!, {
    skip: !eventId, // Skip query if eventId is null or invalid
  });

  if (!eventId) {
    return <div className="text-white text-center mt-10">No valid event specified.</div>;
  }

  if (isLoading) {
    return <div className="text-white text-center mt-10">Loading event details...</div>;
  }

  if (error || !event) {
    return <div className="text-white text-center mt-10">Error loading event. Please try again.</div>;
  }

  const handleClose = () => {
    router.back();
  };

  const handleSuccess = () => {
    router.push("/scout/events?registered=true");
  };

  return (
    <div>
      <EventRegistrationForm
        event={event}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default EventRegister;