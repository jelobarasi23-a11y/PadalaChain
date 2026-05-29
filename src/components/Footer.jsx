"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "#163300", color: "#fff",
      padding: "60px 28px 32px",
      marginTop: "80px",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Top row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
          marginBottom: "48px",
        }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: "linear-gradient(135deg, #00B67A, #008C5C)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px", fontWeight: "800", color: "#fff",
                boxShadow: "0 4px 12px rgba(0,182,122,0.3)",
              }}>₱</div>
              <div>
                <div style={{ fontSize: "17px", fontWeight: "800", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>PadalaChain</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px", fontFamily: "var(--font-body)" }}>OFW Money Transfer</div>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: "1.75", fontFamily: "var(--font-body)", maxWidth: "280px", margin: "0 0 20px" }}>
              Blockchain-powered remittance built for over 10 million OFWs. Transparent, fast, and affordable — every peso matters.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {["🇵🇭 Built for OFWs", "Morph L2"].map((tag, i) => (
                <span key={i} style={{
                  fontSize: "11px", fontWeight: "700",
                  padding: "5px 12px", borderRadius: "20px",
                  background: "rgba(0,182,122,0.15)",
                  border: "1px solid rgba(0,182,122,0.3)",
                  color: "#6EFFC1", fontFamily: "var(--font-body)",
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: [
                { href: "/", label: "Send Money" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/faq", label: "FAQ" },
              ],
            },
            {
              title: "Company",
              links: [
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
              ],
            },
            {
              title: "Tech",
              links: [
                { href: "https://explorer-hoodi.morph.network", label: "Block Explorer ↗" },
                { href: "https://rpc-hoodi.morph.network", label: "RPC Endpoint ↗" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: "12px", fontWeight: "800", color: "rgba(255,255,255,0.4)", letterSpacing: "0.8px", marginBottom: "16px", fontFamily: "var(--font-body)", textTransform: "uppercase" }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map(({ href, label }) => (
                  <Link key={href} href={href} style={{
                    fontSize: "14px", color: "rgba(255,255,255,0.65)",
                    textDecoration: "none", fontFamily: "var(--font-body)", fontWeight: "500",
                    transition: "color 0.15s",
                  }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "24px" }}/>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", fontWeight: "500" }}>
            © 2025 PadalaChain · Powered by Morph L2 Blockchain · MIT License
          </div>
          <div style={{ display: "flex", gap: "20px", fontSize: "13px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", fontWeight: "600" }}>
            <span>Secure</span><span>·</span><span>Fast</span><span>·</span><span>Affordable</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
