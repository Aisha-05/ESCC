import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const socialLink = [
  {
    title: "Email",
    href: "mailto:escc@ensia.edu.dz",
    icon: "/svg/icon/social/gmail.svg",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/ensia.sport.culture.club/?hl=en",
    icon: "/svg/icon/social/instagram.svg",
  },
  {
    title: "TikTok",
    href: "https://www.tiktok.com/@escclub",
    icon: "/svg/icon/social/tiktok.svg",
  },
  {
    title: "LinkedIn",
    href: "https://dz.linkedin.com/company/ensia-sports-culture-club",
    icon: "/svg/icon/social/linkedin.svg",
  },
];

interface SocialMediaProps {
  className?: string;
  iconClassName?: string;
}

export default function SocialMedia({
  className,
  iconClassName,
}: SocialMediaProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      {socialLink.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          target={item.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={item.title}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border border-white/50 p-2 transition-colors hover:bg-white/15",
            iconClassName,
          )}
        >
          <Image src={item.icon} alt="" width={24} height={24} />
        </Link>
      ))}
    </div>
  );
}
