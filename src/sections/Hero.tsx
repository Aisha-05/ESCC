import Image from "next/image";
import Link from "next/link";

import AOS from "@/components/AOS";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="hero-brand2 relative w-screen h-[80vh] md:h-screen" id="home">
      <Image
        src="/image/misc/hero.png"
        alt="Hero Image"
        width={1920}
        height={1080}
        className="object-cover absolute inset-0 blur-xs overflow-hidden h-[96%] w-full"
        priority
      />
      <div className="hero-brand2-overlay absolute inset-0 opacity-70" />

      <AOS
        as="div"
        animation="fade-up"
        className="relative container mx-8 md:mx-24 mt-20 flex col gap-16 sm:gap-10 md:gap-16"
        offset={160}
      >
        <AOS
          as="h1"
          animation="fade-up"
          className="text-7xl xl:text-8xl font-extrabold text-left text-white pt-40 md:pt-20 xl:pt-30"
        >
          Ensia Sport <br />
          & Culture Club
        </AOS>

        <AOS
          as="p"
          animation="fade-up"
          delay={120}
          className="text-white text-2xl lg:text-3xl xl:text-3xl font-lexend w-[40ch]"
        >
          Inspiring minds, moving bodies, shaping culture. We bring together
          passion, knowledge, and creativity.
        </AOS>

        <AOS as="div" animation="fade-up" delay={200} className="grid grid-cols-2 w-max gap-6 z-30">
          <Link href="/register">
            <Button className="brand2-cta w-40" variant="primary">
              Register
            </Button>
          </Link>
          <Link href="#recentevents">
            <Button className="brand2-outline w-40" variant="outline">
              Explore
            </Button>
          </Link>
        </AOS>
      </AOS>

      <Image
        src="/svg/misc/logo.svg"
        alt="Scroll Down"
        width={20}
        height={20}
        className="hero-brand2-logo lg:w-[25vw] md:w-[30vw] w-[35vw] absolute bottom-0 right-20 md:right-50 z-10 float-animation"
      />

      <Image
        src="/svg/misc/hero-wave.svg"
        alt="Scroll Down"
        width={1920}
        height={1080}
        className="absolute bottom-0 z-20 block w-full border-0 outline-none"
      />
    </section>
  );
}
