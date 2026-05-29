"use client";
import SendRemittance  from "../components/SendRemittance";
import FamilyDashboard from "../components/FamilyDashboard";

export default function Home() {
  return (
    <main style={{ position:"relative", zIndex:1, minHeight:"100vh", paddingBottom:"80px" }}>

      {/* NAV */}
      <nav className="fade-up fade-up-1" style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"16px 40px",
        borderBottom:"1px solid var(--border)",
        background:"rgba(255,255,255,0.92)",
        backdropFilter:"blur(16px)",
        position:"sticky", top:0, zIndex:100,
        boxShadow:"0 1px 8px rgba(0,0,0,0.06)",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{
            width:"40px", height:"40px", borderRadius:"12px",
            background:"linear-gradient(135deg, #00C87A 0%, #009A5E 100%)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"20px", fontWeight:"800", color:"#fff",
            boxShadow:"0 4px 12px rgba(0,200,122,0.3)",
          }}>₱</div>
          <div>
            <div style={{ fontSize:"17px", fontWeight:"800", color:"var(--text)", fontFamily:"var(--font-display)", letterSpacing:"-0.3px", lineHeight:1 }}>
              PadalaChain
            </div>
            <div style={{ fontSize:"11px", color:"var(--text-muted)", marginTop:"2px", fontFamily:"var(--font-body)" }}>
              OFW Money Transfer
            </div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{
            display:"flex", alignItems:"center", gap:"7px",
            fontSize:"12px", fontFamily:"var(--font-body)",
            color:"var(--green)", background:"var(--green-light)",
            border:"1.5px solid var(--green-border)",
            padding:"6px 14px", borderRadius:"20px", fontWeight:"700",
          }}>
            <span className="blink" style={{
              width:"7px", height:"7px", borderRadius:"50%",
              background:"var(--green)", display:"inline-block",
            }}/>
            Network Connected
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="fade-up fade-up-2" style={{
        padding:"60px 40px 44px",
        maxWidth:"960px", margin:"0 auto",
      }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:"8px",
          fontSize:"12px", fontFamily:"var(--font-body)",
          color:"var(--blue)", background:"rgba(59,130,246,0.08)",
          border:"1.5px solid rgba(59,130,246,0.2)",
          padding:"5px 14px", borderRadius:"20px",
          marginBottom:"22px", fontWeight:"700",
        }}>
          🇵🇭 For Filipino Workers Abroad
        </div>
        <h1 className="shimmer-text" style={{
          fontSize:"clamp(32px, 5vw, 52px)", fontWeight:"800",
          fontFamily:"var(--font-display)",
          lineHeight:"1.1", letterSpacing:"-1.5px",
          marginBottom:"18px", maxWidth:"680px",
        }}>
          Send money home.<br />Keep every peso.
        </h1>
        <p style={{
          fontSize:"17px", color:"var(--text-dim)", lineHeight:"1.75",
          maxWidth:"520px", marginBottom:"0", fontWeight:"500",
          fontFamily:"var(--font-body)",
        }}>
          Send money directly to your family in the Philippines — faster and cheaper than
          traditional services. Cut fees from{" "}
          <span style={{ color:"var(--red)", fontWeight:"700" }}>₱1,500</span> down to just{" "}
          <span style={{ color:"var(--green)", fontWeight:"700" }}>₱240</span> per transfer.
        </p>
      </div>

      {/* STATS */}
      <div className="fade-up fade-up-2" style={{
        maxWidth:"960px", margin:"0 auto 36px",
        padding:"0 40px",
        display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"12px",
      }}>
        {[
          { val:"₱1,260", label:"Saved per transfer",  sub:"vs. Western Union / GCash",     color:"var(--green)", bg:"var(--green-light)", icon:"💰" },
          { val:"< 15s",  label:"Transfer speed",      sub:"Arrives in under 15 seconds",   color:"var(--blue)",  bg:"rgba(59,130,246,0.08)", icon:"⚡" },
          { val:"84%",    label:"Fee reduction",       sub:"Compared to traditional banks",  color:"var(--amber)", bg:"rgba(245,158,11,0.08)", icon:"📉" },
          { val:"4",      label:"Spending categories", sub:"Tuition · Bills · Food · Meds", color:"var(--pink)",  bg:"rgba(236,72,153,0.08)", icon:"📂" },
        ].map((s, i) => (
          <div key={i} className="hover-card" style={{
            background:"var(--surface)", border:"1.5px solid var(--border)",
            borderRadius:"16px", padding:"20px",
            boxShadow:"var(--shadow-sm)",
          }}>
            <div style={{ fontSize:"24px", marginBottom:"10px" }}>{s.icon}</div>
            <div className="stat-value" style={{
              fontSize:"26px", fontWeight:"800", fontFamily:"var(--font-display)",
              color:s.color, letterSpacing:"-0.5px", lineHeight:1, marginBottom:"6px",
            }}>{s.val}</div>
            <div style={{ fontSize:"13px", fontWeight:"700", color:"var(--text)", marginBottom:"3px", fontFamily:"var(--font-body)" }}>{s.label}</div>
            <div style={{ fontSize:"11px", color:"var(--text-muted)", fontFamily:"var(--font-body)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="fade-up fade-up-3" style={{
        maxWidth:"960px", margin:"0 auto", padding:"0 40px",
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px",
      }}>
        {/* SEND CARD */}
        <div className="hover-card" style={{
          background:"var(--surface)", border:"1.5px solid var(--border)",
          borderRadius:"20px", padding:"28px",
          boxShadow:"var(--shadow-sm)",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"6px" }}>
            <div style={{ width:"44px", height:"44px", borderRadius:"12px",
              background:"var(--green-light)", border:"1.5px solid var(--green-border)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px" }}>↗</div>
            <div>
              <div style={{ fontSize:"16px", fontWeight:"800", color:"var(--text)", fontFamily:"var(--font-display)" }}>Send Money</div>
              <div style={{ fontSize:"12px", color:"var(--text-muted)", fontFamily:"var(--font-body)", marginTop:"2px" }}>Secure on-chain transfer</div>
            </div>
          </div>
          <div style={{ width:"100%", height:"1px", background:"var(--border)", margin:"18px 0" }}/>
          <SendRemittance />
        </div>

        {/* FAMILY CARD */}
        <div className="hover-card" style={{
          background:"var(--surface)", border:"1.5px solid var(--border)",
          borderRadius:"20px", padding:"28px",
          boxShadow:"var(--shadow-sm)",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"6px" }}>
            <div style={{ width:"44px", height:"44px", borderRadius:"12px",
              background:  "rgba(59,130,246,0.1)", border:"1.5px solid rgba(59,130,246,0.2)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px" }}>🏠</div>
            <div>
              <div style={{ fontSize:"16px", fontWeight:"800", color:"var(--text)", fontFamily:"var(--font-display)" }}>Family Dashboard</div>
              <div style={{ fontSize:"12px", color:"var(--text-muted)", fontFamily:"var(--font-body)", marginTop:"2px" }}>View all received transfers</div>
            </div>
          </div>
          <div style={{ width:"100%", height:"1px", background:"var(--border)", margin:"18px 0" }}/>
          <FamilyDashboard familyAddress="0x3A7475E964B5babE75D9a62D81f0ae8974Cc91d4" />
        </div>
      </div>

      {/* FEE COMPARISON */}
      <div className="fade-up fade-up-4" style={{ maxWidth:"960px", margin:"16px auto 0", padding:"0 40px" }}>
        <div className="hover-card" style={{
          background:"var(--surface)", border:"1.5px solid var(--border)",
          borderRadius:"20px", padding:"28px",
          boxShadow:"var(--shadow-sm)",
          display:"grid", gridTemplateColumns:"1fr auto 1fr auto",
          alignItems:"center", gap:"24px",
        }}>
          <div>
            <div style={{ fontSize:"12px", color:"var(--text-muted)", marginBottom:"6px", fontWeight:"600", fontFamily:"var(--font-body)" }}>Western Union / GCash — ₱48,500 sent</div>
            <div style={{ fontSize:"30px", fontWeight:"800", color:"var(--red)", letterSpacing:"-1px", fontFamily:"var(--font-display)" }}>₱1,500</div>
            <div style={{ fontSize:"13px", color:"var(--text-dim)", marginTop:"4px", fontFamily:"var(--font-body)" }}>in transfer fees</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
            <div style={{ fontSize:"22px" }}>→</div>
            <div style={{ fontSize:"11px", color:"var(--text-muted)", fontWeight:"600", fontFamily:"var(--font-body)" }}>VS</div>
          </div>
          <div>
            <div style={{ fontSize:"12px", color:"var(--text-muted)", marginBottom:"6px", fontWeight:"600", fontFamily:"var(--font-body)" }}>PadalaChain — same ₱48,500</div>
            <div style={{ fontSize:"30px", fontWeight:"800", color:"var(--green)", letterSpacing:"-1px", fontFamily:"var(--font-display)" }}>₱240</div>
            <div style={{ fontSize:"13px", color:"var(--text-dim)", marginTop:"4px", fontFamily:"var(--font-body)" }}>in transfer fees</div>
          </div>
          <div style={{
            background:"var(--green-light)", border:"2px solid var(--green-border)",
            borderRadius:"16px", padding:"18px 24px", textAlign:"center",
            boxShadow:"0 4px 16px rgba(0,200,122,0.15)",
          }}>
            <div style={{ fontSize:"12px", fontWeight:"700", color:"var(--green)", marginBottom:"4px", fontFamily:"var(--font-body)" }}>💸 YOU SAVE</div>
            <div style={{ fontSize:"32px", fontWeight:"800", color:"var(--green)", letterSpacing:"-1.5px", fontFamily:"var(--font-display)" }}>₱1,260</div>
            <div style={{ fontSize:"12px", color:"rgba(0,150,90,0.7)", marginTop:"3px", fontFamily:"var(--font-body)", fontWeight:"500" }}>per transfer</div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="fade-up fade-up-5" style={{ maxWidth:"960px", margin:"16px auto 0", padding:"0 40px" }}>
        <div className="hover-card" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"20px", padding:"28px", boxShadow:"var(--shadow-sm)" }}>
          <div style={{ fontSize:"18px", fontWeight:"800", color:"var(--text)", marginBottom:"20px", fontFamily:"var(--font-display)" }}>How it works</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0" }}>
            {[
              { n:"1", label:"Connect Wallet",  desc:"Link your MetaMask to get started",   icon:"🔐", color:"var(--green)" },
              { n:"2", label:"Approve Amount",  desc:"Allow the app to use your mUSDC",     icon:"✅", color:"var(--blue)"  },
              { n:"3", label:"Send Money",       desc:"Choose a category and send",          icon:"↗", color:"var(--amber)" },
              { n:"4", label:"Family Tracks",   desc:"Your family sees it arrive instantly", icon:"📊", color:"var(--pink)"  },
            ].map((s, i) => (
              <div key={i} style={{
                padding:"0 20px",
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
                display:"flex", flexDirection:"column", gap:"10px",
              }}>
                <div style={{
                  width:"32px", height:"32px", borderRadius:"50%",
                  background: s.color === "var(--green)" ? "var(--green-light)"
                    : s.color === "var(--blue)" ? "rgba(59,130,246,0.1)"
                    : s.color === "var(--amber)" ? "rgba(245,158,11,0.1)"
                    : "rgba(236,72,153,0.1)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"14px", fontWeight:"800", color: s.color, fontFamily:"var(--font-display)",
                }}>{s.n}</div>
                <div style={{ fontSize:"20px" }}>{s.icon}</div>
                <div style={{ fontSize:"14px", fontWeight:"700", color:"var(--text)", fontFamily:"var(--font-display)" }}>{s.label}</div>
                <div style={{ fontSize:"12px", color:"var(--text-dim)", lineHeight:"1.6", fontFamily:"var(--font-body)" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="fade-up fade-up-5" style={{
        maxWidth:"960px", margin:"40px auto 0", padding:"0 40px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <div style={{ fontSize:"12px", color:"var(--text-muted)", fontFamily:"var(--font-body)", fontWeight:"500" }}>
          © 2025 PadalaChain · Powered by Morph L2 Blockchain
        </div>
        <div style={{ display:"flex", gap:"12px", fontSize:"12px", color:"var(--text-muted)", fontFamily:"var(--font-body)", fontWeight:"500" }}>
          <span>Secure</span><span>·</span><span>Fast</span><span>·</span><span>Affordable</span>
        </div>
      </div>

    </main>
  );
}
