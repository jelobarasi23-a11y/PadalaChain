"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/",             label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about",        label: "About Us" },
  { href: "/faq",          label: "FAQ" },
  { href: "/contact",      label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
        borderBottom: "1.5px solid var(--border)",
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "0 1px 6px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.25s, background 0.25s",
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          padding: "0 28px", height: "66px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "12px",
              background: "linear-gradient(135deg, #00B67A 0%, #008C5C 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,182,122,0.35)",
              flexShrink: 0,
              overflow: "hidden",
              padding: "4px",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/favicon.ico" alt="PadalaChain Logo" style={{ width: "16px", height: "16px", imageRendering: "pixelated" }} />
            </div>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text)", fontFamily: "var(--font-display)", letterSpacing: "-0.4px", lineHeight: 1 }}>
                PadalaChain
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px", fontFamily: "var(--font-body)", fontWeight: "500" }}>
                OFW Money Transfer
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="desktop-nav">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} style={{
                  padding: "8px 16px", borderRadius: "10px",
                  fontSize: "14px", fontWeight: active ? "700" : "600",
                  color: active ? "var(--green)" : "var(--text-dim)",
                  background: active ? "var(--green-light)" : "transparent",
                  textDecoration: "none", fontFamily: "var(--font-body)",
                  transition: "all 0.18s",
                  border: active ? "1.5px solid var(--green-border)" : "1.5px solid transparent",
                }}>
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="desktop-nav">
            <div style={{
              display: "flex", alignItems: "center", gap: "7px",
              fontSize: "13px", color: "var(--green)", background: "var(--green-light)",
              border: "1.5px solid var(--green-border)",
              padding: "7px 14px", borderRadius: "24px", fontWeight: "700",
              fontFamily: "var(--font-body)",
            }}>
              <span className="blink" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--green)", display: "inline-block" }}/>
              Live
            </div>
            <Link href="/" style={{
              padding: "10px 22px", borderRadius: "12px",
              background: "linear-gradient(135deg, #00B67A, #008C5C)",
              color: "#fff", textDecoration: "none",
              fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-display)",
              boxShadow: "0 4px 14px rgba(0,182,122,0.35)",
              transition: "all 0.18s", letterSpacing: "-0.2px",
            }}>
              Send Money →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "8px", borderRadius: "8px",
              display: "none",
            }}
          >
            <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{
                display: "block", height: "2px", background: "var(--text)",
                borderRadius: "2px",
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                transition: "transform 0.25s",
              }}/>
              <span style={{
                display: "block", height: "2px", background: "var(--text)",
                borderRadius: "2px",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s",
              }}/>
              <span style={{
                display: "block", height: "2px", background: "var(--text)",
                borderRadius: "2px",
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                transition: "transform 0.25s",
              }}/>
            </div>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{
            borderTop: "1.5px solid var(--border)",
            background: "#fff",
            padding: "16px 20px 20px",
          }} className="mobile-menu">
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "16px" }}>
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link key={href} href={href} style={{
                    padding: "12px 16px", borderRadius: "12px",
                    fontSize: "15px", fontWeight: active ? "700" : "600",
                    color: active ? "var(--green)" : "var(--text)",
                    background: active ? "var(--green-light)" : "transparent",
                    textDecoration: "none", fontFamily: "var(--font-body)",
                    border: active ? "1.5px solid var(--green-border)" : "1.5px solid transparent",
                  }}>
                    {label}
                  </Link>
                );
              })}
            </div>
            <Link href="/" style={{
              display: "block", textAlign: "center",
              padding: "14px", borderRadius: "12px",
              background: "linear-gradient(135deg, #00B67A, #008C5C)",
              color: "#fff", textDecoration: "none",
              fontSize: "15px", fontWeight: "700", fontFamily: "var(--font-display)",
            }}>
              Send Money Now →
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
