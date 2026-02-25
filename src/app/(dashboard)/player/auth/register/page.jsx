import RegisterPageComponent from "@/components/auth/RegisterPage";

export default function PlayerRegisterPage() {
  return (
    <RegisterPageComponent
      role="Player"
      logo="/player/logo.png"
      welcomeSubtitle="Create your NextGen Pros player account"
    />
  );
}
