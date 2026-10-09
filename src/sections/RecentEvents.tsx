import RecentCarousel from "@/components/RecentCarousel";
import ESCC from "@/components/ESCC";
import AOS from "@/components/AOS";

export default function RecentEvents() {
  return (
    <AOS
      as="section"
      className="relative overflow-hidden h-[80vh] w-screen md:h-[100vh] center col text-white lg:py-24 lg:px-20 md:mb-8"
      id="recentevents"
      animation="fade-up"
      offset={140}
    >
      <ESCC />

      <AOS as="h2" animation="fade-up" delay={100} className="z-20">
        Latest Events
      </AOS>

      <AOS as="div" animation="fade-up" delay={180} className="container mx-auto lg:h-[70vh] w-full">
        <RecentCarousel />
      </AOS>
    </AOS>
  );
}
