"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import SocialMedia from "@/components/SocialMedia";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  async function goToRegister() {
    window.location.href = "/register";
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // 🔹 Detect active section from hash or scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "events", "departments"];
      const scrollPosition = window.scrollY + 100;

      // Don't auto-update if hash is present
      if (window.location.hash) return;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(hash || "home");
    };

    handleHashChange();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Update active section when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(hash || "home");
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="navbar brand2-navbar w-screen py-4 flex justify-between items-center px-8 fixed top-0 backdrop-blur-sm z-50">
        {/* <div className="logo brand2-logo text-2xl font-black">ESC CLUB</div> */}
        <Image
          src="/svg/misc/logo-white.svg"
          alt="Logo"
          width={40}
          height={40}
          className="h-10 w-auto"
        />

        {/* Desktop Navigation */}
        <ul className="flex-1 hidden md:flex justify-center items-center gap-8">
          {["home", "events", "departments"].map((item) => (
            <Link key={item} href={`#${item}`}>
              <li
                className={`text-lg nav-item font-semibold font-lexend cursor-pointer transition-colors duration-300`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            </Link>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button variant="primary" className="click brand2-cta" onClick={goToRegister}>
            Register
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-2xl z-[60] relative text-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45" : ""
                }`}
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line
                x1="3"
                y1="12"
                x2="21"
                y2="12"
                className={isMobileMenuOpen ? "opacity-0" : ""}
              />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* 🔹 Animated Mobile Side Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              onClick={toggleMobileMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[55] md:hidden"
            />

            {/* Side Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="brand2-mobile-drawer fixed top-0 right-0 h-screen w-[280px] z-[60] shadow-2xl md:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="px-8 py-16">
                <div className="center">
                  <Image
                    src="/svg/misc/logo-gradient.svg"
                    alt="ESC CLUB"
                    width={116}
                    height={37}
                    className="h-auto w-[116px]"
                  />
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 flex flex-col justify-start gap-8 px-6">
                {[
                  ["home", "Home"],
                  ["events", "Events"],
                  ["departments", "Departments"],
                  ["team", "Team Members"],
                ].map(([item, label]) => (
                  <Link
                    key={item}
                    href={`#${item}`}
                    onClick={toggleMobileMenu}
                  >
                    <div
                      className={`brand2-mobile-link py-3 px-5 mb-2 text-center cursor-pointer transition-all ${activeSection === item
                          ? "brand2-mobile-active"
                          : "brand2-mobile-item"
                        }`}
                    >
                      {label}
                    </div>
                  </Link>
                ))}

                <Button variant="primary" className="brand2-mobile-cta mt-14" onClick={goToRegister}>
                  Register
                </Button>
              </div>

              <div className="border-t border-white/20 px-6 pb-8 pt-5">
                <p className="mb-3 text-center text-xs font-medium tracking-[0.12em] text-white/80">
                  Connect with us
                </p>
                <SocialMedia />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}