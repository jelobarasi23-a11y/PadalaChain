"use client";
import Link from "next/link";

const TEAM = [
  { name: "Juan Angelo Barasi", role: "Founder & Lead Developer", emoji: "👨‍💻", desc: "An IT student from AMA College University, who is passionate about using blockchain to solve real-world financial inclusion problems for OFW families." },
  { name: "PadalaChain", role: "The Mission", emoji: "🇵🇭", desc: "Every year, 10 million OFWs send $36 billion home but lose billions in fees. We're here to change that with transparent, on-chain remittance." },
];

const MILESTONES = [
  { year: "2024", label: "Problem Identified", desc: "Realized OFW remittance fees were needlessly expensive and opaque.", icon: "💡" },
  { year: "2025 Q1", label: "Smart Contracts Deployed", desc: "PadalaToken and PadalaRemittance contracts live on Morph Hoodi testnet.", icon: "⛓️" },
  { year: "2025 Q2", label: "Frontend Launched", desc: "Next.js dApp with MetaMask integration, category tagging, and family dashboard.", icon: "🚀" },
  { year: "2025 Q3", label: "Morph Hackathon", desc: "Submitted to Morph L2 hackathon. Aiming to bring real stablecoin support.", icon: "🏆" },
];

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "80px" }}>

      {/* HEADER */}
      <div style={{ background: "#163300", color: "#fff", padding: "56px 28px 64px" }}>
        <div className="page-container fade-up fade-up-1">
          <div className="section-tag" style={{ background: "rgba(0,182,122,0.15)", border: "1.5px solid rgba(0,182,122,0.3)", color: "#9EE8C3" }}>
            🇵🇭 Our Story
          </div>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "800", fontFamily: "var(--font-display)", letterSpacing: "-1px", color: "#fff", marginBottom: "16px", lineHeight: 1.1 }}>
            About PadalaChain
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7", maxWidth: "560px", fontFamily: "var(--font-body)", margin: 0 }}>
            We&apos;re on a mission to eliminate remittance fees for Filipino OFWs using blockchain technology — not because it&apos;s trendy, but because families deserve every peso.
          </p>
        </div>
      </div>

      <div className="page-container" style={{ marginTop: "48px" }}>

        {/* MISSION STATEMENT */}
        <div className="fade-up fade-up-1 card" style={{ marginBottom: "24px", background: "linear-gradient(135deg, #F0FBF6, #E8FAF2)", border: "2px solid var(--green-border)" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--green)", marginBottom: "12px", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>OUR MISSION</div>
          <div style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: "800", color: "var(--text)", fontFamily: "var(--font-display)", lineHeight: "1.35", letterSpacing: "-0.5px" }}>
            &ldquo;Every peso lost to fees is a peso that doesn&apos;t reach a child&apos;s education, a family&apos;s dinner table, or a loved one&apos;s medicine. PadalaChain is our answer to that.&rdquo;
          </div>
        </div>

        {/* STATS */}
        <div className="fade-up fade-up-2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }} className="stats-grid fade-up fade-up-2">
          {[
            { val: "10M+",   label: "OFWs worldwide",       icon: "👨‍👩‍👧‍👦", color: "#00B67A", bg: "#E8FAF2", border: "rgba(0,182,122,0.3)" },
            { val: "$36B",   label: "Sent home yearly",     icon: "💸", color: "#2563EB", bg: "#EEF2FF", border: "rgba(37,99,235,0.3)" },
            { val: "₱1,500", label: "Avg fee lost per txn", icon: "😞", color: "#DC2626", bg: "#FEF2F2", border: "rgba(220,38,38,0.3)" },
            { val: "₱240",   label: "PadalaChain fee",      icon: "🎉", color: "#00B67A", bg: "#E8FAF2", border: "rgba(0,182,122,0.3)" },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, border: `2px solid ${s.border}`, borderRadius: "20px", padding: "24px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{s.icon}</div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: s.color, fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "6px" }}>{s.val}</div>
              <div style={{ fontSize: "13px", color: "var(--text-dim)", fontFamily: "var(--font-body)", fontWeight: "500" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* THE PROBLEM */}
        <div className="fade-up fade-up-2 card" style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-muted)", marginBottom: "12px", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>THE PROBLEM</div>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "var(--text)", fontFamily: "var(--font-display)", letterSpacing: "-0.3px", marginBottom: "16px" }}>
            Why do Filipino families pay so much to receive their own money?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="problem-grid">
            {[
              { title: "High transfer fees", desc: "Traditional services like Western Union charge ₱1,200–₱1,500 per transfer, totaling billions lost annually.", icon: "💸" },
              { title: "No transparency", desc: "Families have no idea what the money is for — tuition, food, or medicine — creating financial confusion at home.", icon: "🔍" },
              { title: "Slow processing", desc: "Bank wires can take 1–3 business days. In emergencies, that delay can be life-altering.", icon: "⏱️" },
              { title: "No proof of purpose", desc: "There's no way to tag money for a specific purpose, making budgeting and family financial planning impossible.", icon: "📋" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", padding: "20px", background: "#F7FBF9", borderRadius: "16px", border: "1.5px solid var(--border)" }}>
                <div style={{ fontSize: "24px", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-display)", marginBottom: "6px" }}>{item.title}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-dim)", lineHeight: "1.65", fontFamily: "var(--font-body)" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OUR SOLUTION */}
        <div className="fade-up fade-up-3 card" style={{ marginBottom: "24px", border: "2px solid var(--green-border)" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--green)", marginBottom: "12px", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>OUR SOLUTION</div>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "var(--text)", fontFamily: "var(--font-display)", letterSpacing: "-0.3px", marginBottom: "16px" }}>
            Blockchain remittance that puts families first
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }} className="solution-grid">
            {[
              { title: "84% lower fees", desc: "₱240 vs. ₱1,500 — more money reaches your family.", icon: "💚", color: "#00B67A", bg: "#E8FAF2" },
              { title: "Category tagging", desc: "Tag money as Tuition, Bills, Food, or Medical.", icon: "🏷️", color: "#2563EB", bg: "#EEF2FF" },
              { title: "< 15 seconds", desc: "Transfers confirmed on Morph L2 nearly instantly.", icon: "⚡", color: "#D97706", bg: "#FFFBEB" },
              { title: "On-chain proof", desc: "Every transaction is immutably logged on blockchain.", icon: "🔒", color: "#DB2777", bg: "#FDF2F8" },
              { title: "Family dashboard", desc: "Real-time view of all received transfers with breakdown.", icon: "📊", color: "#00B67A", bg: "#E8FAF2" },
              { title: "Open source", desc: "Fully auditable smart contracts on Morph Hoodi.", icon: "🌐", color: "#2563EB", bg: "#EEF2FF" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "20px", background: item.bg, borderRadius: "16px", border: `1.5px solid ${item.color}33` }}>
                <div style={{ fontSize: "22px", marginBottom: "10px" }}>{item.icon}</div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: item.color, fontFamily: "var(--font-display)", marginBottom: "6px" }}>{item.title}</div>
                <div style={{ fontSize: "13px", color: "var(--text-dim)", lineHeight: "1.6", fontFamily: "var(--font-body)" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TIMELINE */}
        <div className="fade-up fade-up-4 card" style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-muted)", marginBottom: "20px", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>MILESTONES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {MILESTONES.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: "20px", paddingBottom: i < MILESTONES.length - 1 ? "24px" : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "var(--green-light)", border: "2px solid var(--green-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                    {m.icon}
                  </div>
                  {i < MILESTONES.length - 1 && <div style={{ width: "2px", flex: 1, background: "var(--border)", marginTop: "8px", minHeight: "24px" }}/>}
                </div>
                <div style={{ paddingTop: "8px", paddingBottom: i < MILESTONES.length - 1 ? "0" : 0 }}>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--green)", fontFamily: "var(--font-body)", marginBottom: "4px" }}>{m.year}</div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-display)", marginBottom: "6px" }}>{m.label}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-dim)", fontFamily: "var(--font-body)", lineHeight: "1.6" }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TECH STACK */}
        <div className="fade-up fade-up-4 card" style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-muted)", marginBottom: "20px", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>TECH STACK</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px" }} className="tech-grid">
            {[
              ["Blockchain", "Morph Hoodi Testnet — Chain 2910"],
              ["Smart Contracts", "Solidity 0.8.20 + OpenZeppelin v5"],
              ["Token Standard", "ERC-20 (mock stablecoin, mUSDC)"],
              ["Frontend", "Next.js 16 + Tailwind CSS"],
              ["Wallet", "MetaMask + ethers.js v6"],
              ["Database", "Supabase (off-chain metadata)"],
            ].map(([label, val], i) => (
              <div key={i} style={{ padding: "16px", background: "#F7FBF9", borderRadius: "14px", border: "1.5px solid var(--border)" }}>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-muted)", marginBottom: "6px", fontFamily: "var(--font-body)" }}>{label.toUpperCase()}</div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-body)" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="fade-up fade-up-5" style={{ textAlign: "center", padding: "40px", background: "linear-gradient(135deg, #163300, #1f4200)", borderRadius: "24px", color: "#fff" }}>
          <div style={{ fontSize: "26px", fontWeight: "800", fontFamily: "var(--font-display)", letterSpacing: "-0.5px", marginBottom: "12px" }}>
            Ready to try PadalaChain?
          </div>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)", marginBottom: "28px" }}>
            Join thousands of OFWs who send money smarter.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/how-it-works" style={{ padding: "14px 28px", borderRadius: "14px", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.2)", color: "#fff", textDecoration: "none", fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-body)" }}>
              How It Works
            </Link>
            <Link href="/" style={{ padding: "14px 28px", borderRadius: "14px", background: "linear-gradient(135deg, #00B67A, #008C5C)", color: "#fff", textDecoration: "none", fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-display)", boxShadow: "0 4px 16px rgba(0,182,122,0.4)" }}>
              Start Sending →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        @media (max-width: 860px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .problem-grid { grid-template-columns: 1fr !important; }
          .solution-grid { grid-template-columns: 1fr 1fr !important; }
          .tech-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .solution-grid { grid-template-columns: 1fr !important; }
          .tech-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
