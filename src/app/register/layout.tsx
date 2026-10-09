import type { Metadata } from "next";
import "@/style/registration.css";

export const metadata: Metadata = { title: "Join the club", description: "Apply to join Ensia Sport & Culture Club. Find your team, share your interests, and start your ESCC journey." };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
