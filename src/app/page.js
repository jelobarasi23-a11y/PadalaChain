"use client";
import { useState, useEffect, useRef } from "react";
import SendRemittance from "../components/SendRemittance";
import FamilyDashboard from "../components/FamilyDashboard";
import Link from "next/link";

/* ── animated counter ── */
function Counter({ target, suffix = "", duration = 1800, decimals = 0 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        setValue(parseFloat((prog * target).toFixed(decimals)));
        if (prog < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, decimals]);
  return <span ref={ref}>{value.toLocaleString("en-PH", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

/* ── live ticker ── */
const TICKER_ITEMS = [
  "🇵🇭 OFW from Dubai just sent ₱12,400.00 for Tuition",
  "🇸🇦 Transfer to Cebu confirmed in 9 seconds",
  "🇦🇪 Family in Iloilo received Medical funds",
  "🇸🇬 Singapore OFW saved ₱1,260.00 vs. Western Union",
  "🇯🇵 Tokyo → Davao Bills payment on-chain",
  "🇭🇰 Hong Kong OFW sent Food money in < 15s",
  "🇺🇸 US → Manila transfer: 0 bank fees",
];

function LiveTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      background: "#163300", padding: "12px 0", overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div className="ticker-inner">
        {items.map((item, i) => (
          <span key={i} style={{
            fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.75)",
            whiteSpace: "nowrap", fontFamily: "var(--font-body)",
          }}>
            <span style={{ color: "#6EFFC1", marginRight: "6px" }}>●</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("send");

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* LIVE TICKER */}
      <LiveTicker />

      {/* HERO */}
      <div style={{ background: "linear-gradient(160deg, #0e2800 0%, #163300 60%, #1a3d00 100%)", color: "#fff", padding: "72px 28px 80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="hero-grid">
          <div className="fade-up fade-up-1">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "12px", color: "#9EE8C3", background: "rgba(0,182,122,0.15)",
              border: "1.5px solid rgba(0,182,122,0.3)",
              padding: "6px 16px", borderRadius: "24px", marginBottom: "28px",
              fontWeight: "700", fontFamily: "var(--font-body)",
            }}>
              🇵🇭 Built for Filipino OFWs · Morph L2
            </div>
            <h1 style={{
              fontSize: "clamp(34px, 4.5vw, 58px)", fontWeight: "800",
              fontFamily: "var(--font-display)", lineHeight: "1.06",
              letterSpacing: "-1.5px", marginBottom: "22px", color: "#fff",
            }}>
              Send money home.<br />
              <span style={{ color: "#6EFFC1" }}>Keep every peso.</span>
            </h1>
            <p style={{
              fontSize: "18px", color: "rgba(255,255,255,0.7)", lineHeight: "1.75",
              maxWidth: "460px", marginBottom: "36px", fontWeight: "400",
              fontFamily: "var(--font-body)",
            }}>
              Cheaper and faster than banks or remittance centers. Cut transfer fees from{" "}
              <span style={{ color: "#FF7070", fontWeight: "700" }}>₱1,500.00</span> down to just{" "}
              <span style={{ color: "#6EFFC1", fontWeight: "700" }}>₱240.00</span> — in under 15 seconds.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: "36px", marginBottom: "36px" }}>
              {[
                { val: "84", suffix: "%", label: "Lower fees" },
                { val: "15", suffix: "s", label: "Transfer time" },
                { val: "1260", suffix: ".00", label: "₱ Avg savings", prefix: "₱" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: "30px", fontWeight: "800", fontFamily: "var(--font-display)", color: "#6EFFC1", letterSpacing: "-0.5px" }}>
                    {s.prefix || ""}<Counter target={parseInt(s.val)} suffix={s.suffix} duration={1600} />
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", marginTop: "4px", fontWeight: "500" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/" onClick={() => setActiveTab("send")} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "15px 28px", borderRadius: "14px",
                background: "linear-gradient(135deg, #00B67A, #008C5C)",
                color: "#fff", textDecoration: "none",
                fontSize: "15px", fontWeight: "700", fontFamily: "var(--font-display)",
                boxShadow: "0 6px 24px rgba(0,182,122,0.4)",
                transition: "all 0.2s", letterSpacing: "-0.2px",
              }}>
                ↗ Start Sending
              </Link>
              <Link href="/how-it-works" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "15px 28px", borderRadius: "14px",
                background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)",
                color: "#fff", textDecoration: "none",
                fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-body)",
                transition: "all 0.2s",
              }}>
                How It Works →
              </Link>
            </div>
          </div>

          {/* Fee comparison card */}
          <div className="fade-up fade-up-2" style={{
            background: "#fff", borderRadius: "24px", padding: "32px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.3)", color: "var(--text)",
          }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-muted)", marginBottom: "20px", fontFamily: "var(--font-body)", letterSpacing: "0.5px" }}>
              FEE COMPARISON — ₱48,500.00 SENT
            </div>
            {[
              { name: "Western Union / GCash", fee: "₱1,500.00", color: "#DC2626", bg: "#FEF2F2", border: "#FECACA", icon: "🏦" },
              { name: "Bank Wire Transfer",    fee: "₱1,200.00", color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", icon: "🏧" },
              { name: "PadalaChain",           fee: "₱240.00",   color: "#00B67A", bg: "#E8FAF2", border: "#A7D9C0", badge: "SAVE ₱1,260.00", icon: "⛓️" },
            ].map((r, i) => (
              <div key={i} style={{
                background: r.bg, border: `2px solid ${r.border}`,
                borderRadius: "14px", padding: "16px 20px",
                marginBottom: i < 2 ? "10px" : 0,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                transition: "transform 0.15s",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "16px" }}>{r.icon}</span>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-body)" }}>{r.name}</span>
                  </div>
                  {r.badge && (
                    <span style={{ fontSize: "10px", fontWeight: "800", color: "#00B67A", background: "rgba(0,182,122,0.12)", padding: "2px 10px", borderRadius: "12px", fontFamily: "var(--font-body)" }}>
                      {r.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "26px", fontWeight: "800", color: r.color, fontFamily: "var(--font-display)", letterSpacing: "-1px" }}>{r.fee}</div>
              </div>
            ))}
            <div style={{ marginTop: "20px", padding: "14px", borderRadius: "12px", background: "var(--green-light)", border: "1.5px solid var(--green-border)", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--green)", fontFamily: "var(--font-body)" }}>
                🔒 Every transaction recorded on blockchain · Verified & transparent
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST BADGES */}
      <div className="fade-up fade-up-3" style={{ background: "#fff", borderBottom: "1.5px solid var(--border)", padding: "20px 28px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
          {[
            { icon: "⛓️", label: "On-Chain Verified" },
            { icon: "⚡", label: "< 15 Second Transfers" },
            { icon: "🔐", label: "MetaMask Secured" },
            { icon: "📊", label: "Real-Time Dashboard" },
            { icon: "🇵🇭", label: "Built for OFWs" },
          ].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "600", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>
              <span style={{ fontSize: "18px" }}>{b.icon}</span> {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN APP PANELS */}
      <div className="fade-up fade-up-3" style={{ maxWidth: "1100px", margin: "48px auto", padding: "0 28px" }}>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {[
            { id: "send",   label: "↗ Send Money",        icon: "↗" },
            { id: "family", label: "🏠 Family Dashboard",  icon: "🏠" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "12px 24px", borderRadius: "12px", cursor: "pointer",
              fontSize: "15px", fontWeight: "700", fontFamily: "var(--font-display)",
              border: activeTab === tab.id ? "2px solid var(--green-border)" : "2px solid var(--border)",
              background: activeTab === tab.id ? "var(--green-light)" : "#fff",
              color: activeTab === tab.id ? "var(--green)" : "var(--text-dim)",
              transition: "all 0.18s",
              letterSpacing: "-0.2px",
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div key={activeTab} className="scale-in card" style={{ marginBottom: "32px" }}>
          {activeTab === "send" ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "var(--green-light)", border: "2px solid var(--green-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>↗</div>
                <div>
                  <div style={{ fontSize: "21px", fontWeight: "800", color: "var(--text)", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>Send Money</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "3px", fontFamily: "var(--font-body)", fontWeight: "500" }}>Secure · On-chain · Instant</div>
                </div>
              </div>
              <div style={{ height: "1.5px", background: "var(--border)", margin: "22px 0" }}/>
              <SendRemittance />
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "#EEF2FF", border: "2px solid #C7D2FE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>🏠</div>
                <div>
                  <div style={{ fontSize: "21px", fontWeight: "800", color: "var(--text)", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>Family Dashboard</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "3px", fontFamily: "var(--font-body)", fontWeight: "500" }}>View all received transfers</div>
                </div>
              </div>
              <div style={{ height: "1.5px", background: "var(--border)", margin: "22px 0" }}/>
              <FamilyDashboard familyAddress="0x3A7475E964B5babE75D9a62D81f0ae8974Cc91d4" />
            </div>
          )}
        </div>
      </div>

      {/* HOW IT WORKS PREVIEW */}
      <div className="fade-up fade-up-4" style={{ maxWidth: "1100px", margin: "0 auto 20px", padding: "0 28px" }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--text)", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>
              How it works
            </div>
            <Link href="/how-it-works" style={{
              fontSize: "14px", fontWeight: "700", color: "var(--green)",
              textDecoration: "none", fontFamily: "var(--font-body)",
              display: "flex", alignItems: "center", gap: "4px",
            }}>
              See full guide →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0" }} className="steps-grid">
            {[
              { n: "1", label: "Connect Wallet",  desc: "Link your MetaMask to get started safely", icon: "🔐", color: "#00B67A", bg: "#E8FAF2" },
              { n: "2", label: "Approve Amount",  desc: "Allow the app to use your mUSDC tokens",   icon: "✅", color: "#2563EB", bg: "#EEF2FF" },
              { n: "3", label: "Send Money",      desc: "Choose a spending category and confirm",   icon: "↗", color: "#D97706", bg: "#FFFBEB" },
              { n: "4", label: "Family Sees It",  desc: "Dashboard updates in under 15 seconds",   icon: "📊", color: "#DB2777", bg: "#FDF2F8" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "0 24px",
                borderRight: i < 3 ? "1.5px solid var(--border)" : "none",
                display: "flex", flexDirection: "column", gap: "10px",
              }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "800", color: s.color, fontFamily: "var(--font-display)" }}>
                  {s.n}
                </div>
                <div style={{ fontSize: "22px" }}>{s.icon}</div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-display)" }}>{s.label}</div>
                <div style={{ fontSize: "13px", color: "var(--text-dim)", lineHeight: "1.65", fontFamily: "var(--font-body)" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA BANNER */}
      <div className="fade-up fade-up-5" style={{ maxWidth: "1100px", margin: "0 auto 80px", padding: "0 28px" }}>
        <div style={{
          background: "linear-gradient(135deg, #163300 0%, #1f4200 100%)",
          borderRadius: "24px", padding: "48px 44px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "28px",
        }}>
          <div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#fff", fontFamily: "var(--font-display)", letterSpacing: "-0.5px", marginBottom: "10px" }}>
              Ready to save ₱1,260.00 on your next remittance?
            </div>
            <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)", fontWeight: "500" }}>
              Join OFWs who already send money home without the fees.
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/how-it-works" style={{
              padding: "14px 28px", borderRadius: "14px",
              background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.2)",
              color: "#fff", textDecoration: "none",
              fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-body)",
            }}>
              Learn More
            </Link>
            <button onClick={() => { setActiveTab("send"); window.scrollTo({ top: 400, behavior: "smooth" }); }} style={{
              padding: "14px 28px", borderRadius: "14px",
              background: "linear-gradient(135deg, #00B67A, #008C5C)",
              color: "#fff", border: "none",
              fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-display)",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,182,122,0.4)",
            }}>
              Send Money Now →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .steps-grid > div { border-right: none !important; border-bottom: 1.5px solid var(--border); padding-bottom: 24px; }
          .steps-grid > div:nth-child(3),
          .steps-grid > div:nth-child(4) { border-bottom: none !important; }
        }
        @media (max-width: 540px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .steps-grid > div { border-bottom: 1.5px solid var(--border) !important; }
          .steps-grid > div:last-child { border-bottom: none !important; }
        }
      `}</style>
    </main>
  );
}
