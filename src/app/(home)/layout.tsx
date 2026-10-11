import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import "@/style/home-mobile.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="home-site">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
