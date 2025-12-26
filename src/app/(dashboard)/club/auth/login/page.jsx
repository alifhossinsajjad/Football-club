import LoginPageComponent from "@/components/auth/LoginPage";

export default function ClubLogin() {
  return (
    <LoginPageComponent
      role="club"
      logo="/player/logo.png"
      welcomeSubtitle="Sign in to access your scout dashboard"
    />
  );
}
