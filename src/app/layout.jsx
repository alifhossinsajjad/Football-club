import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";

export const metadata = {
  title: "NextGen Pros",
  description:
    "Next-generation digital platform for youth football talent discovery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
