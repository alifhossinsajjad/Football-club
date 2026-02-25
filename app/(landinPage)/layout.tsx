import Footer from "@/components/sheard/Footer";
import Navbar from "@/components/sheard/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
};

export default RootLayout;
