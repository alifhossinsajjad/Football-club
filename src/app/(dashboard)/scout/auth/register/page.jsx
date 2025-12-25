import RegisterPageComponent from "@/components/auth/RegisterPage";

export default function ScoutRegisterPage() {
  return (
    <RegisterPageComponent
      role="Scout"
      logo="/player/logo.png"
      welcomeSubtitle="Create your NextGen Pros scout account"
    />
  );
}