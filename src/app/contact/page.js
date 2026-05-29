"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const upd = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const ready = form.name && form.email && form.subject && form.message;

  function handleSubmit() {
    if (!ready) return;
    setSubmitted(true);
  }

  const inputStyle = (key) => ({
    width: "100%", padding: "15px 18px", borderRadius: "14px",
    border: `2px solid ${focused === key ? "var(--green)" : "var(--border)"}`,
    background: focused === key ? "#F0FBF6" : "#F7FBF9",
    color: "var(--text)", fontSize: "15px",
    outline: "none", fontFamily: "var(--font-body)",
    transition: "all 0.2s", fontWeight: "500",
    boxShadow: focused === key ? "0 0 0 3px rgba(0,182,122,0.12)" : "none",
  });

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "80px" }}>

      {/* HEADER */}
      <div style={{ background: "#163300", color: "#fff", padding: "56px 28px 64px" }}>
        <div className="page-container fade-up fade-up-1">
          <div className="section-tag" style={{ background: "rgba(0,182,122,0.15)", border: "1.5px solid rgba(0,182,122,0.3)", color: "#9EE8C3" }}>
            💬 Get in touch
          </div>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "800", fontFamily: "var(--font-display)", letterSpacing: "-1px", color: "#fff", marginBottom: "16px", lineHeight: 1.1 }}>
            Contact Us
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7", maxWidth: "540px", fontFamily: "var(--font-body)", margin: 0 }}>
            Have a question, found a bug, or want to collaborate? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="page-container" style={{ marginTop: "48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "24px", alignItems: "start" }} className="contact-grid">

          {/* FORM */}
          <div className="fade-up fade-up-1 card">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ fontSize: "56px", marginBottom: "20px" }}>🎉</div>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--text)", fontFamily: "var(--font-display)", letterSpacing: "-0.4px", marginBottom: "12px" }}>
                  Message sent!
                </div>
                <p style={{ fontSize: "15px", color: "var(--text-dim)", lineHeight: "1.7", fontFamily: "var(--font-body)", marginBottom: "28px", maxWidth: "360px", margin: "0 auto 28px" }}>
                  Thanks for reaching out, <strong>{form.name}</strong>. We&apos;ll get back to you at <strong>{form.email}</strong> soon.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }} style={{
                  padding: "13px 28px", borderRadius: "12px", cursor: "pointer",
                  background: "var(--green-light)", border: "2px solid var(--green-border)",
                  color: "var(--green)", fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-display)",
                }}>
                  Send another message
                </button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--text)", fontFamily: "var(--font-display)", letterSpacing: "-0.3px", marginBottom: "24px" }}>
                  Send us a message
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }} className="name-email-grid">
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "var(--text-dim)", marginBottom: "8px", fontFamily: "var(--font-body)" }}>
                      Your Name *
                    </label>
                    <input
                      style={inputStyle("name")} placeholder="Juan dela Cruz"
                      value={form.name} onChange={upd("name")}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "var(--text-dim)", marginBottom: "8px", fontFamily: "var(--font-body)" }}>
                      Email Address *
                    </label>
                    <input
                      style={inputStyle("email")} placeholder="juan@email.com"
                      type="email" value={form.email} onChange={upd("email")}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "var(--text-dim)", marginBottom: "8px", fontFamily: "var(--font-body)" }}>
                    Subject *
                  </label>
                  <select
                    style={{ ...inputStyle("subject"), cursor: "pointer" }}
                    value={form.subject} onChange={upd("subject")}
                    onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                  >
                    <option value="">Select a topic…</option>
                    <option>💸 Question about fees</option>
                    <option>🔐 Wallet / MetaMask help</option>
                    <option>⛓️ Blockchain / transaction issue</option>
                    <option>📊 Family dashboard help</option>
                    <option>🤝 Partnership / collaboration</option>
                    <option>🐛 Bug report</option>
                    <option>💡 Feature request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "var(--text-dim)", marginBottom: "8px", fontFamily: "var(--font-body)" }}>
                    Message *
                  </label>
                  <textarea
                    style={{ ...inputStyle("message"), resize: "vertical", minHeight: "140px", lineHeight: "1.65" }}
                    placeholder="Tell us how we can help…"
                    value={form.message} onChange={upd("message")}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  />
                </div>
                <button onClick={handleSubmit} disabled={!ready} style={{
                  width: "100%", padding: "17px", borderRadius: "14px",
                  background: ready ? "linear-gradient(135deg, #00B67A, #008C5C)" : "#F3F4F6",
                  color: ready ? "#fff" : "#9CA3AF", border: "none",
                  fontSize: "16px", fontWeight: "700", fontFamily: "var(--font-display)",
                  cursor: ready ? "pointer" : "default",
                  boxShadow: ready ? "0 6px 20px rgba(0,182,122,0.35)" : "none",
                  transition: "all 0.2s", letterSpacing: "-0.2px",
                }}>
                  Send Message →
                </button>
              </div>
            )}
          </div>

          {/* CONTACT INFO */}
          <div className="fade-up fade-up-2" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: "⛓️", title: "Block Explorer", desc: "Verify any transaction on Morph Hoodi. Every transfer is publicly auditable.", link: "https://explorer-hoodi.morph.network", linkLabel: "Open Explorer ↗", color: "#00B67A", bg: "#E8FAF2", border: "rgba(0,182,122,0.3)" },
              { icon: "📜", title: "Smart Contracts", desc: "PadalaToken and PadalaRemittance are deployed at fixed addresses on Chain 2910.", link: "https://explorer-hoodi.morph.network", linkLabel: "View Contracts ↗", color: "#2563EB", bg: "#EEF2FF", border: "rgba(37,99,235,0.3)" },
              { icon: "🌐", title: "GitHub", desc: "The full source code is open-source. Contributions and feedback are welcome.", link: "https://github.com/jelobarasi23-a11y/PadalaChain", linkLabel: "View on GitHub ↗", color: "#D97706", bg: "#FFFBEB", border: "rgba(217,119,6,0.3)" },
            ].map((item, i) => (
              <div key={i} style={{ background: item.bg, border: `2px solid ${item.border}`, borderRadius: "20px", padding: "24px" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{item.icon}</div>
                <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", fontFamily: "var(--font-display)", marginBottom: "8px" }}>{item.title}</div>
                <p style={{ fontSize: "13px", color: "var(--text-dim)", lineHeight: "1.65", fontFamily: "var(--font-body)", marginBottom: "14px" }}>{item.desc}</p>
                <a href={item.link} target="_blank" rel="noreferrer" style={{ fontSize: "13px", fontWeight: "700", color: item.color, textDecoration: "none", fontFamily: "var(--font-body)" }}>
                  {item.linkLabel}
                </a>
              </div>
            ))}

            {/* Network Info */}
            <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: "20px", padding: "24px" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>
                MORPH HOODI NETWORK
              </div>
              {[
                ["Chain ID", "2910"],
                ["RPC URL", "rpc-hoodi.morph.network"],
                ["Currency", "ETH"],
                ["Token (mUSDC)", "0xb1B20A45…"],
                ["Remittance", "0x4dC94C0e…"],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)", fontSize: "13px" }}>
                  <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)", fontWeight: "500" }}>{label}</span>
                  <span style={{ color: "var(--text)", fontFamily: "var(--font-body)", fontWeight: "700", fontSize: "12px" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .name-email-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
