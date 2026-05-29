"use client";
import SendRemittance  from "../components/SendRemittance";
import FamilyDashboard from "../components/FamilyDashboard";

export default function Home() {
  return (
    <main style={{ position:"relative", zIndex:1, minHeight:"100vh", paddingBottom:"80px" }}>

      {/* NAV */}
      <nav className="fade-up fade-up-1" style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"18px 40px",
        borderBottom:"0.5px solid var(--border)",
        backdropFilter:"blur(20px)",
        background:"rgba(5,5,8,0.7)",
        position:"sticky", top:0, zIndex:100,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{
            width:"34px", height:"34px", borderRadius:"10px",
            background:"linear-gradient(135deg, #00E5A0 0%, #00A373 100%)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"18px", fontWeight:"800", color:"#050508",
            boxShadow:"0 0 20px rgba(0,229,160,0.3)",
          }}>₱</div>
          <div>
            <div style={{ fontSize:"15px", fontWeight:"700", letterSpacing:"-0.5px", lineHeight:1 }}>
              PadalaChain
            </div>
            <div style={{ fontSize:"10px", color:"var(--text-dim)", letterSpacing:"0.5px", fontFamily:"var(--font-mono)" }}>
              OFW REMITTANCE PROTOCOL
            </div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{
            display:"flex", alignItems:"center", gap:"6px",
            fontSize:"11px", fontFamily:"var(--font-mono)",
            color:"var(--green)", background:"var(--green-dim)",
            border:"0.5px solid var(--green-border)",
            padding:"5px 12px", borderRadius:"6px", fontWeight:"500",
          }}>
            <span className="blink" style={{
              width:"6px", height:"6px", borderRadius:"50%",
              background:"var(--green)", display:"inline-block",
            }}/>
            MORPH HOODI · 2910
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="fade-up fade-up-2" style={{
        padding:"72px 40px 56px",
        maxWidth:"920px", margin:"0 auto",
      }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:"8px",
          fontSize:"11px", fontFamily:"var(--font-mono)",
          color:"var(--blue)", background:"rgba(59,158,255,0.08)",
          border:"0.5px solid rgba(59,158,255,0.2)",
          padding:"5px 14px", borderRadius:"6px",
          marginBottom:"24px", letterSpacing:"1px",
        }}>
          ⬡ HACKATHON BUILD · MORPH L2
        </div>
        <h1 className="shimmer-text" style={{
          fontSize:"clamp(36px, 5vw, 56px)", fontWeight:"800",
          lineHeight:"1.0", letterSpacing:"-3px",
          marginBottom:"20px", maxWidth:"700px",
        }}>
          Send money home.<br />Keep every peso.
        </h1>
        <p style={{
          fontSize:"16px", color:"var(--text-dim)", lineHeight:"1.7",
          maxWidth:"540px", marginBottom:"0", fontWeight:"400",
        }}>
          Blockchain remittances for OFWs — transparent, categorized,
          and on-chain. Cut fees from{" "}
          <span style={{ color:"var(--red)", fontWeight:"600" }}>₱1,500</span> to{" "}
          <span style={{ color:"var(--green)", fontWeight:"600" }}>₱240</span> per transfer.
        </p>
      </div>

      {/* STATS */}
      <div className="fade-up fade-up-2" style={{
        maxWidth:"920px", margin:"0 auto 40px",
        padding:"0 40px",
        display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"10px",
      }}>
        {[
          { val:"₱1,260", label:"Avg fee saved",     sub:"per ₱48,500 sent",               color:"var(--green)" },
          { val:"< 15s",  label:"Settlement time",   sub:"on Morph L2",                    color:"var(--blue)"  },
          { val:"84%",    label:"Fee reduction",     sub:"vs Western Union",               color:"var(--amber)" },
          { val:"4",      label:"Budget categories", sub:"Tuition · Bills · Food · Medical",color:"var(--pink)"  },
        ].map((s, i) => (
          <div key={i} style={{
            background:"var(--surface)", border:"0.5px solid var(--border)",
            borderRadius:"12px", padding:"18px 20px",
            position:"relative", overflow:"hidden",
          }}>
            <div style={{
              position:"absolute", top:0, left:0, right:0, height:"2px",
              background:`linear-gradient(90deg, transparent, ${s.color}, transparent)`,
              opacity:0.6,
            }}/>
            <div className="stat-value" style={{
              fontSize:"26px", fontWeight:"800",
              color:s.color, letterSpacing:"-1px", lineHeight:1, marginBottom:"6px",
            }}>{s.val}</div>
            <div style={{ fontSize:"12px", fontWeight:"600", color:"var(--text)", marginBottom:"2px" }}>{s.label}</div>
            <div style={{ fontSize:"10px", color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="fade-up fade-up-3" style={{
        maxWidth:"920px", margin:"0 auto", padding:"0 40px",
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px",
      }}>
        {/* SEND CARD */}
        <div className="scan-card" style={{
          background:"var(--surface)", border:"0.5px solid var(--border)",
          borderRadius:"16px", padding:"28px", position:"relative", overflow:"hidden",
        }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px",
            background:"linear-gradient(90deg, transparent, var(--green), transparent)" }}/>
          <div style={{ position:"absolute", bottom:-40, right:-40, width:"150px", height:"150px",
            borderRadius:"50%", background:"radial-gradient(circle, rgba(0,229,160,0.06), transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"4px" }}>
            <div style={{ width:"32px", height:"32px", borderRadius:"8px",
              background:"var(--green-dim)", border:"0.5px solid var(--green-border)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px" }}>↗</div>
            <div>
              <div style={{ fontSize:"14px", fontWeight:"700", color:"var(--text)" }}>Send Remittance</div>
              <div style={{ fontSize:"11px", color:"var(--text-dim)", fontFamily:"var(--font-mono)" }}>ERC-20 · ON-CHAIN LOGGING</div>
            </div>
          </div>
          <div style={{ width:"100%", height:"0.5px", background:"var(--border)", margin:"18px 0" }}/>
          <SendRemittance />
        </div>

        {/* FAMILY CARD */}
        <div className="scan-card" style={{
          background:"var(--surface)", border:"0.5px solid var(--border)",
          borderRadius:"16px", padding:"28px", position:"relative", overflow:"hidden",
        }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px",
            background:"linear-gradient(90deg, transparent, var(--blue), transparent)" }}/>
          <div style={{ position:"absolute", bottom:-40, right:-40, width:"150px", height:"150px",
            borderRadius:"50%", background:"radial-gradient(circle, rgba(59,158,255,0.06), transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"4px" }}>
            <div style={{ width:"32px", height:"32px", borderRadius:"8px",
              background:"rgba(59,158,255,0.1)", border:"0.5px solid rgba(59,158,255,0.2)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px" }}>🏠</div>
            <div>
              <div style={{ fontSize:"14px", fontWeight:"700", color:"var(--text)" }}>Family Dashboard</div>
              <div style={{ fontSize:"11px", color:"var(--text-dim)", fontFamily:"var(--font-mono)" }}>SUPABASE · REAL-TIME DATA</div>
            </div>
          </div>
          <div style={{ width:"100%", height:"0.5px", background:"var(--border)", margin:"18px 0" }}/>
          <FamilyDashboard familyAddress="0x3A7475E964B5babE75D9a62D81f0ae8974Cc91d4" />
        </div>
      </div>

      {/* FEE COMPARISON */}
      <div className="fade-up fade-up-4" style={{ maxWidth:"920px", margin:"14px auto 0", padding:"0 40px" }}>
        <div style={{
          background:"var(--surface)", border:"0.5px solid var(--border)",
          borderRadius:"16px", padding:"24px 28px",
          display:"grid", gridTemplateColumns:"1fr auto 1fr auto",
          alignItems:"center", gap:"20px",
        }}>
          <div>
            <div style={{ fontSize:"10px", fontFamily:"var(--font-mono)", color:"var(--text-muted)", marginBottom:"6px" }}>WESTERN UNION / GCASH · ₱48,500</div>
            <div style={{ fontSize:"28px", fontWeight:"800", color:"var(--red)", letterSpacing:"-1px" }}>₱1,500</div>
            <div style={{ fontSize:"12px", color:"var(--text-dim)", marginTop:"3px" }}>in fees</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
            <div style={{ fontSize:"20px", color:"var(--text-muted)" }}>→</div>
            <div style={{ fontSize:"9px", fontFamily:"var(--font-mono)", color:"var(--text-muted)" }}>SWITCH TO</div>
          </div>
          <div>
            <div style={{ fontSize:"10px", fontFamily:"var(--font-mono)", color:"var(--text-muted)", marginBottom:"6px" }}>PADALACHAIN · MORPH L2</div>
            <div style={{ fontSize:"28px", fontWeight:"800", color:"var(--green)", letterSpacing:"-1px" }}>₱240</div>
            <div style={{ fontSize:"12px", color:"var(--text-dim)", marginTop:"3px" }}>in fees</div>
          </div>
          <div style={{
            background:"var(--green-dim)", border:"0.5px solid var(--green-border)",
            borderRadius:"12px", padding:"16px 24px", textAlign:"center",
            boxShadow:"0 0 24px rgba(0,229,160,0.08)",
          }}>
            <div style={{ fontSize:"10px", fontFamily:"var(--font-mono)", color:"var(--green)", marginBottom:"4px", letterSpacing:"1px" }}>YOU SAVE</div>
            <div style={{ fontSize:"30px", fontWeight:"800", color:"var(--green)", letterSpacing:"-1.5px" }}>₱1,260</div>
            <div style={{ fontSize:"10px", color:"rgba(0,229,160,0.6)", marginTop:"2px" }}>per transfer</div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="fade-up fade-up-5" style={{ maxWidth:"920px", margin:"14px auto 0", padding:"0 40px" }}>
        <div style={{ background:"var(--surface)", border:"0.5px solid var(--border)", borderRadius:"16px", padding:"24px 28px" }}>
          <div style={{ fontSize:"10px", fontFamily:"var(--font-mono)", color:"var(--text-muted)", marginBottom:"16px", letterSpacing:"1px" }}>HOW IT WORKS</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0" }}>
            {[
              { n:"01", label:"Connect", desc:"MetaMask on Morph Hoodi",    icon:"🔐", color:"var(--green)" },
              { n:"02", label:"Approve", desc:"Authorize mUSDC spend",      icon:"✅", color:"var(--blue)"  },
              { n:"03", label:"Send",    desc:"Tag category + on-chain tx", icon:"↗", color:"var(--amber)" },
              { n:"04", label:"Track",   desc:"Family sees real-time logs", icon:"📊", color:"var(--pink)"  },
            ].map((s, i) => (
              <div key={i} style={{
                padding:"0 20px",
                borderRight: i < 3 ? "0.5px solid var(--border)" : "none",
                display:"flex", flexDirection:"column", gap:"8px",
              }}>
                <div style={{ fontSize:"10px", fontFamily:"var(--font-mono)", color:s.color, letterSpacing:"0.5px" }}>{s.n}</div>
                <div style={{ fontSize:"20px" }}>{s.icon}</div>
                <div style={{ fontSize:"13px", fontWeight:"700", color:"var(--text)" }}>{s.label}</div>
                <div style={{ fontSize:"11px", color:"var(--text-dim)", lineHeight:"1.5" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="fade-up fade-up-5" style={{
        maxWidth:"920px", margin:"40px auto 0", padding:"0 40px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <div style={{ fontSize:"11px", fontFamily:"var(--font-mono)", color:"var(--text-muted)" }}>
          PADALACHAIN · MORPH HOODI TESTNET · 2025
        </div>
        <div style={{ display:"flex", gap:"16px", fontSize:"11px", fontFamily:"var(--font-mono)", color:"var(--text-muted)" }}>
          <span>ERC-20</span><span>·</span><span>SOLIDITY 0.8.20</span><span>·</span><span>NEXT.JS 16</span><span>·</span><span>SUPABASE</span>
        </div>
      </div>

    </main>
  );
}
