import Navbar from "@/components/sheard/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;
