import LoginPageComponent from "@/components/auth/LoginPage";

export default function PlayerLogin() {
  return (
    <LoginPageComponent
      role="Player"
      logo="/player/logo.png"
      welcomeSubtitle="Sign in to access your player dashboard"
    />
  );
}
