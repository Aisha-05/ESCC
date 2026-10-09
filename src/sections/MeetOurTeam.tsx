import TeamCarousel from "@/components/TeamCarousel";
import ESCC from "@/components/ESCC";
import AOS from "@/components/AOS";

export default function MeetOurTeam() {
  return (
    <AOS
      as="section"
      className="w-screen min-h-0 md:min-h-[100vh] relative center py-8 md:py-12 col gap-5 md:gap-10"
      animation="fade-up"
      id="team"
      offset={150}
    >
      <ESCC variant="secondary" rotate={-15} />

      <AOS animation="fade-up" delay={100}>
        <h2 className="text-4xl md:text-6xl">Meet Our Team</h2>
      </AOS>

      <AOS as="div" animation="fade-up" delay={180} className="w-full max-w-6xl mt-2 md:mt-4">
        <TeamCarousel />
      </AOS>
    </AOS>
  );
}