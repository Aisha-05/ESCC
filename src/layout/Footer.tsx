import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <svg className="site-footer-wave" viewBox="0 0 734 147" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M734.672 95.6313C734.672 95.6313 631.18 20.1728 560.093 25.7437C489.006 31.3145 446.277 55.9632 368.295 42.9696C290.312 29.976 63.6706 59.9055 -0.684725 146.048L-1 -1H736L734.672 95.6313Z" fill="white" />
      </svg>

      <div className="site-footer-content">
        <div className="site-footer-brand">
          <p className="site-footer-label">Developed by</p>
          <div className="site-footer-logo">
            <Image src="/svg/misc/logo.svg" alt="" width={35} height={35} />
            <h4 className="colored">ESC CLUB</h4>
          </div>
          <p>&copy; 2026 ESCC</p>
        </div>

        <div className="site-footer-socials">
          <Link href="mailto:escc@ensia.edu.com" target="_blank" rel="noopener noreferrer"><Image className="click" src="/svg/icon/social/gmail.svg" alt="gmail" width={32} height={32} /></Link>
          <Link href="https://dz.linkedin.com/company/ensia-sports-culture-club" target="_blank" rel="noopener noreferrer"><Image className="click" src="/svg/icon/social/linkedin.svg" alt="linkedin" width={32} height={32} /></Link>
          <Link href="https://www.tiktok.com/@escclub" target="_blank" rel="noopener noreferrer"><Image className="click" src="/svg/icon/social/tiktok.svg" alt="tiktok" width={32} height={32} /></Link>
          <Link href="https://www.instagram.com/ensia.sport.culture.club/?hl=en" target="_blank" rel="noopener noreferrer"><Image className="click" src="/svg/icon/social/instagram.svg" alt="instagram" width={32} height={32} /></Link>
        </div>
      </div>

      <p className="site-footer-credit">
        <span>by</span>
        <strong>Technical Department</strong>
      </p>
    </footer>
  );
};
