"use client";
import { useState } from "react";
import Link from "next/link";

const STEPS = [
  {
    n: "01", icon: "🔐", label: "Install MetaMask",
    color: "#00B67A", bg: "#E8FAF2", border: "rgba(0,182,122,0.3)",
    desc: "Download MetaMask from metamask.io and create a wallet. MetaMask is a browser extension that acts as your blockchain wallet — like a digital ID card for sending crypto.",
    tip: "Use a strong password and store your 12-word seed phrase somewhere safe offline.",
    substeps: ["Go to metamask.io", "Click 'Install MetaMask for Chrome'", "Create a new wallet", "Back up your secret phrase"],
  },
  {
    n: "02", icon: "🌐", label: "Add Morph Hoodi Network",
    color: "#2563EB", bg: "#EEF2FF", border: "rgba(37,99,235,0.3)",
    desc: "PadalaChain runs on Morph Hoodi — a fast, low-fee Layer 2 blockchain. You need to add this network to your MetaMask so it knows where to send the transaction.",
    tip: "Chain ID is 2910, RPC URL is https://rpc-hoodi.morph.network",
    substeps: ["Open MetaMask → Settings → Networks", "Click 'Add a network manually'", "Enter Chain ID: 2910 and RPC URL", "Save and switch to Morph Hoodi"],
  },
  {
    n: "03", icon: "💰", label: "Get mUSDC Tokens",
    color: "#D97706", bg: "#FFFBEB", border: "rgba(217,119,6,0.3)",
    desc: "mUSDC is the mock stablecoin used on PadalaChain. For the demo, you can mint free test tokens using the faucet function in Remix. Each faucet call gives you 500 mUSDC.",
    tip: "This is testnet — no real money involved. Perfect for trying it out.",
    substeps: ["Open Remix IDE (remix.ethereum.org)", "Connect MetaMask to Remix", "Find PadalaToken contract", "Call the faucet() function"],
  },
  {
    n: "04", icon: "✅", label: "Approve the Transfer",
    color: "#DB2777", bg: "#FDF2F8", border: "rgba(219,39,119,0.3)",
    desc: "Before sending, you must approve the remittance contract to spend your mUSDC. MetaMask will pop up asking you to confirm this approval. This is a standard ERC-20 safety step.",
    tip: "The approval is triggered automatically when you click 'Send'. Just confirm the MetaMask popup.",
    substeps: ["Fill in receiver address", "Enter the amount", "Click Send", "Confirm 'Approve' in MetaMask"],
  },
  {
    n: "05", icon: "↗", label: "Send Remittance",
    color: "#00B67A", bg: "#E8FAF2", border: "rgba(0,182,122,0.3)",
    desc: "Select a spending category — Tuition, Bills, Food, or Medical — then confirm the send. A second MetaMask popup will appear to confirm the on-chain transaction.",
    tip: "Category tags help your family see what the money is for.",
    substeps: ["Choose a category (🎓 🏠 🍚 💊)", "Confirm second MetaMask popup", "Wait < 15 seconds", "Transaction confirmed on Morph"],
  },
  {
    n: "06", icon: "📊", label: "Family Checks Dashboard",
    color: "#2563EB", bg: "#EEF2FF", border: "rgba(37,99,235,0.3)",
    desc: "Your family opens their dashboard and sees the transfer logged in real-time — amount, category, timestamp, and a link to the blockchain explorer to verify it themselves.",
    tip: "Every transaction is immutably stored on Morph L2 and cannot be changed.",
    substeps: ["Family opens PadalaChain", "Clicks 'Load Transfer History'", "Sees breakdown by category", "Views blockchain receipt link"],
  },
];

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "80px" }}>

      {/* HEADER */}
      <div style={{ background: "#163300", color: "#fff", padding: "56px 28px 64px" }}>
        <div className="page-container fade-up fade-up-1">
          <div className="section-tag" style={{ background: "rgba(0,182,122,0.15)", border: "1.5px solid rgba(0,182,122,0.3)", color: "#9EE8C3" }}>
            ⚡ Simple 6-step process
          </div>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "800", fontFamily: "var(--font-display)", letterSpacing: "-1px", color: "#fff", marginBottom: "16px", lineHeight: 1.1 }}>
            How PadalaChain Works
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7", maxWidth: "560px", fontFamily: "var(--font-body)", margin: 0 }}>
            From setting up your wallet to your family seeing the funds — it takes under 2 minutes. Here&apos;s the full picture.
          </p>
        </div>
      </div>

      {/* INTERACTIVE STEPS */}
      <div className="page-container" style={{ marginTop: "48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "24px" }} className="how-grid">

          {/* Step nav */}
          <div className="fade-up fade-up-2" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {STEPS.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)} style={{
                padding: "16px 18px", borderRadius: "16px", cursor: "pointer",
                textAlign: "left", display: "flex", alignItems: "center", gap: "14px",
                border: activeStep === i ? `2px solid ${s.border}` : "2px solid var(--border)",
                background: activeStep === i ? s.bg : "#fff",
                transition: "all 0.2s",
              }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                  background: activeStep === i ? s.bg : "#F0FBF6",
                  border: activeStep === i ? `2px solid ${s.border}` : "2px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px",
                }}>
                  {activeStep > i ? "✓" : s.icon}
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: activeStep === i ? s.color : "var(--text-muted)", fontFamily: "var(--font-body)" }}>STEP {s.n}</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: activeStep === i ? "var(--text)" : "var(--text-dim)", fontFamily: "var(--font-display)" }}>{s.label}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Step detail */}
          <div key={activeStep} className="fade-up fade-up-2 card">
            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "24px" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "18px", flexShrink: 0,
                background: step.bg, border: `2px solid ${step.border}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px",
              }}>
                {step.icon}
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: step.color, fontFamily: "var(--font-body)", marginBottom: "6px" }}>STEP {step.n}</div>
                <h2 style={{ fontSize: "26px", fontWeight: "800", fontFamily: "var(--font-display)", color: "var(--text)", letterSpacing: "-0.5px", margin: 0 }}>{step.label}</h2>
              </div>
            </div>

            <p style={{ fontSize: "16px", color: "var(--text-dim)", lineHeight: "1.75", fontFamily: "var(--font-body)", marginBottom: "28px" }}>
              {step.desc}
            </p>

            {/* Sub-steps */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-muted)", marginBottom: "14px", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>
                WHAT TO DO
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {step.substeps.map((sub, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                      background: step.bg, border: `1.5px solid ${step.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: "800", color: step.color, fontFamily: "var(--font-display)",
                    }}>{i + 1}</div>
                    <span style={{ fontSize: "14px", fontWeight: "500", color: "var(--text)", fontFamily: "var(--font-body)" }}>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div style={{ padding: "16px 20px", borderRadius: "14px", background: "#FFFBEB", border: "1.5px solid #FDE68A" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#92400E", marginBottom: "4px", fontFamily: "var(--font-display)" }}>💡 Pro Tip</div>
              <div style={{ fontSize: "14px", color: "#78350F", fontFamily: "var(--font-body)", lineHeight: "1.6" }}>{step.tip}</div>
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px" }}>
              <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0} style={{
                padding: "12px 24px", borderRadius: "12px", cursor: activeStep === 0 ? "default" : "pointer",
                background: "#F7FBF9", border: "1.5px solid var(--border)",
                color: activeStep === 0 ? "var(--text-muted)" : "var(--text-dim)",
                fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-body)",
                opacity: activeStep === 0 ? 0.5 : 1,
              }}>
                ← Previous
              </button>
              {activeStep < STEPS.length - 1 ? (
                <button onClick={() => setActiveStep(activeStep + 1)} style={{
                  padding: "12px 24px", borderRadius: "12px", cursor: "pointer",
                  background: "linear-gradient(135deg, #00B67A, #008C5C)",
                  border: "none", color: "#fff",
                  fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-display)",
                  boxShadow: "0 4px 14px rgba(0,182,122,0.3)",
                }}>
                  Next Step →
                </button>
              ) : (
                <Link href="/" style={{
                  padding: "12px 24px", borderRadius: "12px",
                  background: "linear-gradient(135deg, #00B67A, #008C5C)",
                  color: "#fff", textDecoration: "none",
                  fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-display)",
                  boxShadow: "0 4px 14px rgba(0,182,122,0.3)",
                }}>
                  Start Sending ↗
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .how-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
