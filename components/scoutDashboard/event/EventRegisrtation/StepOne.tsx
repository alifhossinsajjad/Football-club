import { useFormContext } from "react-hook-form";

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  agency_name: string;
  event: number;
};

export default function StepOne() {
  const { register } = useFormContext<FormValues>();

  return (
    <div className="grid grid-cols-2 gap-4">
      <input {...register("first_name", { required: true })} placeholder="First Name" className="input"/>
      <input {...register("last_name", { required: true })} placeholder="Last Name" className="input"/>
      <input {...register("email", { required: true })} placeholder="Email" className="input col-span-2"/>
      <input {...register("phone_number", { required: true })} placeholder="Phone Number" className="input col-span-2"/>
    </div>
  );
}