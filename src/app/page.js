"use client";
import SendRemittance  from "../components/SendRemittance";
import FamilyDashboard from "../components/FamilyDashboard";

export default function Home() {
  return (
    <main style={{ position:"relative", zIndex:1, minHeight:"100vh", paddingBottom:"80px", background:"var(--bg)" }}>

      {/* NAV */}
      <nav className="fade-up fade-up-1" style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 48px", height:"68px",
        borderBottom:"1.5px solid var(--border)",
        background:"#fff",
        position:"sticky", top:0, zIndex:100,
        boxShadow:"0 1px 6px rgba(0,0,0,0.05)",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{
            width:"42px", height:"42px", borderRadius:"12px",
            background:"linear-gradient(135deg, #00B67A 0%, #008C5C 100%)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"22px", fontWeight:"800", color:"#fff",
            boxShadow:"0 4px 12px rgba(0,182,122,0.35)",
          }}>₱</div>
          <div>
            <div style={{ fontSize:"19px", fontWeight:"800", color:"var(--text)", fontFamily:"var(--font-display)", letterSpacing:"-0.4px", lineHeight:1 }}>
              PadalaChain
            </div>
            <div style={{ fontSize:"12px", color:"var(--text-muted)", marginTop:"2px", fontFamily:"var(--font-body)", fontWeight:"500" }}>
              OFW Money Transfer
            </div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{
            display:"flex", alignItems:"center", gap:"8px",
            fontSize:"13px", fontFamily:"var(--font-body)",
            color:"var(--green)", background:"var(--green-light)",
            border:"1.5px solid var(--green-border)",
            padding:"7px 16px", borderRadius:"24px", fontWeight:"700",
          }}>
            <span className="blink" style={{ width:"8px", height:"8px", borderRadius:"50%", background:"var(--green)", display:"inline-block" }}/>
            Live Network
          </div>
        </div>
      </nav>

      {/* HERO — Wise-style split layout */}
      <div style={{ background:"#163300", color:"#fff", padding:"64px 48px 72px" }}>
        <div style={{ maxWidth:"1040px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"64px", alignItems:"center" }}>
          <div className="fade-up fade-up-1">
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              fontSize:"13px", color:"#9EE8C3", background:"rgba(0,182,122,0.15)",
              border:"1.5px solid rgba(0,182,122,0.3)",
              padding:"6px 16px", borderRadius:"24px",
              marginBottom:"28px", fontWeight:"700", fontFamily:"var(--font-body)",
            }}>
              🇵🇭 Built for Filipino OFWs
            </div>
            <h1 style={{
              fontSize:"clamp(36px, 4.5vw, 56px)", fontWeight:"800",
              fontFamily:"var(--font-display)",
              lineHeight:"1.08", letterSpacing:"-1.5px",
              marginBottom:"20px", color:"#fff",
            }}>
              Send money home.<br />Keep every peso.
            </h1>
            <p style={{
              fontSize:"19px", color:"rgba(255,255,255,0.72)", lineHeight:"1.7",
              maxWidth:"460px", marginBottom:"36px", fontWeight:"400",
              fontFamily:"var(--font-body)",
            }}>
              Cheaper and faster than banks or remittance centers. Cut transfer fees from{" "}
              <span style={{ color:"#FF7070", fontWeight:"700" }}>₱1,500</span> down to just{" "}
              <span style={{ color:"#6EFFC1", fontWeight:"700" }}>₱240</span>.
            </p>

            {/* Mini stats row */}
            <div style={{ display:"flex", gap:"32px" }}>
              {[
                { val:"84%",    label:"Lower fees" },
                { val:"< 15s", label:"Transfer time" },
                { val:"₱1,260",label:"Avg savings" },
              ].map((s,i) => (
                <div key={i}>
                  <div style={{ fontSize:"28px", fontWeight:"800", fontFamily:"var(--font-display)", color:"#6EFFC1", letterSpacing:"-0.5px" }}>{s.val}</div>
                  <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.55)", fontFamily:"var(--font-body)", marginTop:"3px", fontWeight:"500" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee comparison card — Wise-style calculator look */}
          <div className="fade-up fade-up-2" style={{
            background:"#fff", borderRadius:"24px", padding:"32px",
            boxShadow:"0 20px 60px rgba(0,0,0,0.25)",
            color:"var(--text)",
          }}>
            <div style={{ fontSize:"13px", fontWeight:"700", color:"var(--text-muted)", marginBottom:"20px", fontFamily:"var(--font-body)", letterSpacing:"0.3px" }}>
              FEE COMPARISON — ₱48,500 SENT
            </div>
            {[
              { name:"Western Union / GCash", fee:"₱1,500", color:"#DC2626", bg:"#FEF2F2", border:"#FECACA" },
              { name:"PadalaChain",           fee:"₱240",   color:"#00B67A", bg:"#E8FAF2", border:"#A7D9C0", badge:"YOU SAVE ₱1,260" },
            ].map((r,i) => (
              <div key={i} style={{
                background:r.bg, border:`2px solid ${r.border}`,
                borderRadius:"16px", padding:"18px 22px",
                marginBottom: i === 0 ? "10px" : 0,
                display:"flex", justifyContent:"space-between", alignItems:"center",
              }}>
                <div>
                  <div style={{ fontSize:"14px", fontWeight:"700", color:"var(--text)", fontFamily:"var(--font-body)", marginBottom:"3px" }}>{r.name}</div>
                  {r.badge && (
                    <span style={{ fontSize:"11px", fontWeight:"800", color:"#00B67A", background:"rgba(0,182,122,0.12)", padding:"2px 10px", borderRadius:"12px", fontFamily:"var(--font-body)" }}>
                      {r.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize:"28px", fontWeight:"800", color:r.color, fontFamily:"var(--font-display)", letterSpacing:"-1px" }}>{r.fee}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN PANELS */}
      <div className="fade-up fade-up-3" style={{ maxWidth:"1040px", margin:"48px auto", padding:"0 48px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>

        {/* SEND CARD */}
        <div className="hover-lift" style={{
          background:"var(--surface)", border:"1.5px solid var(--border)",
          borderRadius:"24px", padding:"36px",
          boxShadow:"var(--shadow-md)",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"8px" }}>
            <div style={{ width:"50px", height:"50px", borderRadius:"14px", background:"var(--green-light)", border:"2px solid var(--green-border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px" }}>↗</div>
            <div>
              <div style={{ fontSize:"20px", fontWeight:"800", color:"var(--text)", fontFamily:"var(--font-display)", letterSpacing:"-0.3px" }}>Send Money</div>
              <div style={{ fontSize:"13px", color:"var(--text-muted)", marginTop:"3px", fontFamily:"var(--font-body)", fontWeight:"500" }}>Secure · On-chain · Instant</div>
            </div>
          </div>
          <div style={{ height:"1.5px", background:"var(--border)", margin:"22px 0" }}/>
          <SendRemittance />
        </div>

        {/* FAMILY CARD */}
        <div className="hover-lift" style={{
          background:"var(--surface)", border:"1.5px solid var(--border)",
          borderRadius:"24px", padding:"36px",
          boxShadow:"var(--shadow-md)",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"8px" }}>
            <div style={{ width:"50px", height:"50px", borderRadius:"14px", background:"#EEF2FF", border:"2px solid #C7D2FE", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px" }}>🏠</div>
            <div>
              <div style={{ fontSize:"20px", fontWeight:"800", color:"var(--text)", fontFamily:"var(--font-display)", letterSpacing:"-0.3px" }}>Family Dashboard</div>
              <div style={{ fontSize:"13px", color:"var(--text-muted)", marginTop:"3px", fontFamily:"var(--font-body)", fontWeight:"500" }}>View all received transfers</div>
            </div>
          </div>
          <div style={{ height:"1.5px", background:"var(--border)", margin:"22px 0" }}/>
          <FamilyDashboard familyAddress="0x3A7475E964B5babE75D9a62D81f0ae8974Cc91d4" />
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="fade-up fade-up-4" style={{ maxWidth:"1040px", margin:"0 auto 0", padding:"0 48px" }}>
        <div className="hover-lift" style={{ background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:"24px", padding:"36px", boxShadow:"var(--shadow-sm)" }}>
          <div style={{ fontSize:"22px", fontWeight:"800", color:"var(--text)", marginBottom:"28px", fontFamily:"var(--font-display)", letterSpacing:"-0.3px" }}>
            How it works
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0" }}>
            {[
              { n:"1", label:"Connect Wallet",  desc:"Link your MetaMask wallet to get started safely",   icon:"🔐", color:"#00B67A", bg:"#E8FAF2" },
              { n:"2", label:"Approve Amount",  desc:"Allow the app to use your mUSDC for this transfer", icon:"✅", color:"#2563EB", bg:"#EEF2FF" },
              { n:"3", label:"Send Money",      desc:"Choose a spending category and confirm the send",    icon:"↗", color:"#D97706", bg:"#FFFBEB" },
              { n:"4", label:"Family Sees It",  desc:"Your family's dashboard updates within seconds",     icon:"📊", color:"#DB2777", bg:"#FDF2F8" },
            ].map((s, i) => (
              <div key={i} style={{
                padding:"0 24px",
                borderRight: i < 3 ? "1.5px solid var(--border)" : "none",
                display:"flex", flexDirection:"column", gap:"12px",
              }}>
                <div style={{ width:"38px", height:"38px", borderRadius:"50%", background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"17px", fontWeight:"800", color:s.color, fontFamily:"var(--font-display)" }}>
                  {s.n}
                </div>
                <div style={{ fontSize:"22px" }}>{s.icon}</div>
                <div style={{ fontSize:"15px", fontWeight:"700", color:"var(--text)", fontFamily:"var(--font-display)" }}>{s.label}</div>
                <div style={{ fontSize:"13px", color:"var(--text-dim)", lineHeight:"1.65", fontFamily:"var(--font-body)" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth:"1040px", margin:"48px auto 0", padding:"0 48px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:"13px", color:"var(--text-muted)", fontFamily:"var(--font-body)", fontWeight:"500" }}>
          © 2025 PadalaChain · Powered by Morph L2 Blockchain
        </div>
        <div style={{ display:"flex", gap:"16px", fontSize:"13px", color:"var(--text-muted)", fontFamily:"var(--font-body)", fontWeight:"600" }}>
          <span>Secure</span><span>·</span><span>Fast</span><span>·</span><span>Affordable</span>
        </div>
      </div>

    </main>
  );
}
