import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import DashboardButton from "@/components/DashboardButton";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Footer />
      <DashboardButton />
      
    </>
  );
}