import { useFormContext } from "react-hook-form";

export default function StepReview() {
  const { getValues } = useFormContext();

  const values = getValues();

  return (
    <div className="space-y-3 text-sm text-gray-300">
      <p><strong>Name:</strong> {values.first_name} {values.last_name}</p>
      <p><strong>Email:</strong> {values.email}</p>
      <p><strong>Phone:</strong> {values.phone_number}</p>
      <p><strong>Agency:</strong> {values.agency_name}</p>
    </div>
  );
}