import LoginPageComponent from "@/components/auth/LoginPage";

export default function PlayerLogin() {
  return (
    <LoginPageComponent
      role="Scout"
      logo="/player/logo.png"
      welcomeSubtitle="Sign in to access your scout dashboard"
    />
  );
}
