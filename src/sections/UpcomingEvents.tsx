import Image from "next/image";

import UpcomingSlider from "@/components/UpcomingSlider";
import UpcomingCarousel from "@/components/UpcomingCarousel";
import AOS from "@/components/AOS";

export default function UpcomingEvents() {
  return (
    <section className="relative bg-primary/10 screen py-8 md:py-10 center col" id="events">
      <Image
        src="/svg/misc/upcoming-light-2.svg"
        alt="Upcoming Events"
        fill
        className="full z-10 absolute right-0"
      />
      <Image
        src="/svg/misc/upcoming-light-1.svg"
        alt="Upcoming Events"
        fill
        className="full z-10 absolute left-0"
      />
      <Image
        src="/svg/misc/upcoming-background.svg"
        alt="Upcoming Events"
        fill
        className="full z-0"
        style={{ objectFit: "cover" }}
      />

      <AOS animation="fade-up" className="relative text-center z-30 white mb-12">
        <h2 className="relative text-center z-30 white mb-12">Upcoming</h2>
      </AOS>

      <AOS as="div" animation="fade-up" delay={120} className="relative z-30 w-full">
        <UpcomingCarousel />
      </AOS>

      <AOS as="div" animation="fade-up" delay={200} className="hidden md:flex z-30 overflow-visible">
        <UpcomingSlider />
      </AOS>
    </section>
  );
}
