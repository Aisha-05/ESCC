import ESCC from "@/components/ESCC";
import AboutUsCards from "@/components/AboutUsCards";
import AOS from "@/components/AOS";

export default function AboutUs() {
  return (
    <AOS
      as="section"
      className="brand2-light-section about-section w-screen min-h-[42rem] overflow-hidden relative py-16 md:min-h-[62rem] md:py-28"
      id="about"
      animation="fade-up"
      offset={180}
    >
      <div
        className="relative z-10 mx-auto grid w-[min(1320px,94vw)] grid-cols-1 gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-20 items-center"
        id="aboutus"
      >
        <ESCC />

        <AOS
          as="div"
          animation="fade-right"
          delay={120}
          className="relative flex flex-col items-start gap-5 mx-auto w-full min-w-0 md:max-w-2xl"
        >
          <h2 className="about-title text-left">About Us</h2>
          <p className="about-copy max-w-xl font-lexend text-base md:text-lg text-left">
            ESCC creates a space where students can learn, connect, and grow
            beyond the classroom through sports, culture, and community spirit.
            Our mission is to inspire creativity, teamwork, and personal
            development by encouraging students to explore their talents and
            passions through a variety of cultural events, scientific
            initiatives, and athletic activities.
          </p>
          <div className="about-rule" />
        </AOS>

        <AOS as="div" animation="fade-left" delay={180} className="relative z-10 w-full min-w-0">
          <AboutUsCards />
        </AOS>
      </div>
    </AOS>
  );
}
