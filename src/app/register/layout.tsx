import type { Metadata } from "next";
import "@/style/registration.css";

export const metadata: Metadata = { title: "Registrations closed", description: "ESCC membership registrations are currently closed. Follow us for updates about the next registration period." };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
