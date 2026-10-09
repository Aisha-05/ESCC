import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-brand-card w-screen col xl:h-[calc(40vh)] relative p-4 text-white text-center pt-4 md:pt-20 xl:pt-40 md:px-40 mx-auto center overflow-hidden">

      <Image src="/svg/misc/footer-wave.svg" alt="Scroll Down" width={1920} height={1080} className="absolute z-20 block w-full border-0 outline-none md:-top-10 -top-2" />

      <div className="container mx-auto grid md:gap-0 md:grid-cols-2 h-full z-30 ">

        <div className="center col md:pl-10 pt-10">
          <p className="md:text-2xl font-bold text-nowrap">Developed by</p>

          <div className="center md:gap-8 my-4 font-black md:text-5xl text-xl text-nowrap gap-4">
            <Image src="/svg/misc/logo.svg" alt="ESC CLUB" width={35} height={35}  />
            <h4 className="colored font-bold">ESC CLUB</h4>
          </div>
          <p className="md:text-xl font-bold text-nowrap">&copy; 2025 ESCC
          </p>

        </div>

        <div className="center md:pr-10 md:gap-12 gap-4">
          <Link href="mailto:escc@ensia.edu.com" target="_blank" className="w-max h-max"><Image className="click w-8" src="/svg/icon/social/gmail.svg" alt="gmail" width={40} height={40} /></Link>
          <Link href="https://dz.linkedin.com/company/ensia-sports-culture-club" target="_blank" className="w-max h-max"><Image className="click w-8" src="/svg/icon/social/linkedin.svg" alt="linkedin" width={40} height={40} /></Link>
          <Link href="https://www.tiktok.com/@escclub" target="_blank" className="w-max h-max"><Image className="click w-8" src="/svg/icon/social/tiktok.svg" alt="tiktok" width={40} height={40} /></Link>
          <Link href="https://www.instagram.com/ensia.sport.culture.club/?hl=en" target="_blank" className="w-max h-max"><Image className="click w-8" src="/svg/icon/social/instagram.svg" alt="instagram" width={40} height={40} /></Link>
        </div>

      </div>

      <div className="center mt-10">
        by &nbsp;
        <Link href={'https://github.com/mohaneddz'} className="underline md:text-secondary-light text-white/80 font-bold" target="_blank" rel="noopener noreferrer">
          MANAA Mohaned
        </Link>
      </div>

    </footer>
  );
};
