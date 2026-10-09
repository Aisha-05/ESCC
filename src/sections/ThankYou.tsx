"use client";

import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="registration-success">
      <span className="registration-success-icon"><Check size={36} aria-hidden="true" /></span>
      <p className="registration-eyebrow">APPLICATION RECEIVED</p>
      <h1>You’re one step<br />closer to <span>your people.</span></h1>
      <p>Thank you for applying to ESCC. Your application will be reviewed soon. Stay tuned!</p>
      <Link className="registration-button registration-button-primary" href="/">Back to home<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div>
  );
}
