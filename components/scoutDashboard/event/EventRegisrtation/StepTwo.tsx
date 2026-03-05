import { useFormContext } from "react-hook-form";

type FormValues = {
  agency_name: string;
};

export default function StepTwo() {
  const { register } = useFormContext<FormValues>();

  return (
    <div className="space-y-4">
      <input
        {...register("agency_name", { required: true })}
        placeholder="Agency Name"
        className="input"
      />
    </div>
  );
}