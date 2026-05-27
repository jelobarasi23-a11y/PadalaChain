import SendRemittance  from "../components/SendRemittance";
import FamilyDashboard from "../components/FamilyDashboard";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#080810",
      backgroundImage: `
        radial-gradient(ellipse 80% 50% at 20% -10%, rgba(29,158,117,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 80% 110%, rgba(55,138,221,0.08) 0%, transparent 60%)
      `,
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      color: "#f0f0f8",
      padding: "0 0 80px",
    }}>

      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 40px", borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50,
        background: "rgba(8,8,16,0.8)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "10px",
            background: "linear-gradient(135deg, #1D9E75, #0d6e52)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px",
          }}>₱</div>
          <span style={{ fontSize: "16px", fontWeight: "600", letterSpacing: "-0.3px" }}>
            PadalaChain
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontSize: "11px", background: "rgba(29,158,117,0.15)",
            color: "#1D9E75", padding: "4px 12px", borderRadius: "20px",
            border: "0.5px solid rgba(29,158,117,0.3)", fontWeight: "500",
            letterSpacing: "0.3px",
          }}>● MORPH HOODI</span>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        textAlign: "center", padding: "64px 20px 48px",
        maxWidth: "600px", margin: "0 auto",
      }}>
        <div style={{
          display: "inline-block", fontSize: "11px", fontWeight: "500",
          color: "#89b4fa", background: "rgba(137,180,250,0.1)",
          border: "0.5px solid rgba(137,180,250,0.2)",
          padding: "5px 14px", borderRadius: "20px", marginBottom: "20px",
          letterSpacing: "0.5px",
        }}>
          BLOCKCHAIN-POWERED REMITTANCE
        </div>
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 56px)", fontWeight: "700",
          lineHeight: "1.1", letterSpacing: "-1.5px", marginBottom: "16px",
          background: "linear-gradient(135deg, #ffffff 0%, #a0a0c0 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Send money home.<br />Keep every peso.
        </h1>
        <p style={{
          fontSize: "16px", color: "#6b7280", lineHeight: "1.7", marginBottom: "0",
        }}>
          OFW remittances with full transparency, category tracking,
          and on-chain proof — powered by Morph L2.
        </p>
      </div>

      {/* STATS BAR */}
      <div style={{
        display: "flex", justifyContent: "center", gap: "0",
        maxWidth: "600px", margin: "0 auto 48px",
        background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)",
        borderRadius: "16px", overflow: "hidden",
      }}>
        {[
          { label: "Avg fee saved", value: "₱1,260", sub: "vs Western Union" },
          { label: "Settlement", value: "< 15s", sub: "on Morph L2" },
          { label: "Categories", value: "4", sub: "Tuition · Bills · Food · Medical" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: "20px 16px", textAlign: "center",
            borderRight: i < 2 ? "0.5px solid rgba(255,255,255,0.07)" : "none",
          }}>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#f0f0f8", letterSpacing: "-0.5px" }}>
              {s.value}
            </div>
            <div style={{ fontSize: "11px", color: "#4b5563", marginTop: "2px" }}>{s.label}</div>
            <div style={{ fontSize: "10px", color: "#374151", marginTop: "1px" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "16px", maxWidth: "900px", margin: "0 auto",
        padding: "0 20px",
      }}>

        {/* SEND CARD */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: "20px", padding: "28px", position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(29,158,117,0.5), transparent)",
          }} />
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "8px",
              background: "rgba(29,158,117,0.15)", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: "14px",
            }}>↗</div>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#f0f0f8" }}>Send Remittance</span>
          </div>
          <p style={{ fontSize: "12px", color: "#4b5563", marginBottom: "24px" }}>
            Transfer mUSDC with category tagging
          </p>
          <SendRemittance />
        </div>

        {/* FAMILY DASHBOARD CARD */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: "20px", padding: "28px", position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(55,138,221,0.4), transparent)",
          }} />
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "8px",
              background: "rgba(55,138,221,0.15)", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: "14px",
            }}>🏠</div>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#f0f0f8" }}>Family Dashboard</span>
          </div>
          <p style={{ fontSize: "12px", color: "#4b5563", marginBottom: "24px" }}>
            View incoming remittances on-chain
          </p>
          <FamilyDashboard familyAddress="0xPasteReceiverWalletAddressHere" />
        </div>
      </div>

      {/* FEE COMPARISON BANNER */}
      <div style={{
        maxWidth: "900px", margin: "16px auto 0", padding: "0 20px",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "0.5px solid rgba(255,255,255,0.07)",
          borderRadius: "16px", padding: "20px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "16px",
        }}>
          <div>
            <div style={{ fontSize: "12px", color: "#4b5563", marginBottom: "4px" }}>
              Traditional remittance (₱48,500)
            </div>
            <div style={{ fontSize: "20px", fontWeight: "700", color: "#ef4444" }}>
              ₱1,500 in fees
            </div>
          </div>
          <div style={{
            fontSize: "24px", color: "#374151", fontWeight: "300",
          }}>→</div>
          <div>
            <div style={{ fontSize: "12px", color: "#4b5563", marginBottom: "4px" }}>
              PadalaChain on Morph
            </div>
            <div style={{ fontSize: "20px", fontWeight: "700", color: "#1D9E75" }}>
              ₱240 in fees
            </div>
          </div>
          <div style={{
            background: "rgba(29,158,117,0.1)", border: "0.5px solid rgba(29,158,117,0.2)",
            borderRadius: "12px", padding: "12px 20px", textAlign: "center",
          }}>
            <div style={{ fontSize: "11px", color: "#1D9E75", marginBottom: "2px" }}>YOU SAVE</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#1D9E75" }}>₱1,260</div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        textAlign: "center", marginTop: "64px",
        fontSize: "12px", color: "#374151",
      }}>
        Built on <span style={{ color: "#1D9E75" }}>Morph Hoodi</span> · Powered by ERC-20 · Open source
      </div>

    </main>
  );
}