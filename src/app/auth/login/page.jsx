import LoginPageComponent from "@/components/auth/LoginPage";

export default function Login() {
  return (
    <LoginPageComponent
      role="club"
      logo="/player/logo.png"
      welcomeSubtitle="Sign in to access your  dashboard"
    />
  );
}
