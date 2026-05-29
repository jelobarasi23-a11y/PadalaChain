"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

const CAT = {
  1:{ label:"Tuition", emoji:"🎓", color:"#00B67A", bg:"#E8FAF2", border:"rgba(0,182,122,0.3)"   },
  2:{ label:"Bills",   emoji:"🏠", color:"#2563EB", bg:"#EEF2FF", border:"rgba(37,99,235,0.3)"  },
  3:{ label:"Food",    emoji:"🍚", color:"#D97706", bg:"#FFFBEB", border:"rgba(217,119,6,0.3)"  },
  4:{ label:"Medical", emoji:"💊", color:"#DB2777", bg:"#FDF2F8", border:"rgba(219,39,119,0.3)" },
};

const FAMILY_ADDRESS = "0x3A7475E964B5babE75D9a62D81f0ae8974Cc91d4";

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return new Date(dateStr).toLocaleDateString("en-PH", { month:"short", day:"numeric" });
}

export default function FamilyDashboard({ familyAddress = FAMILY_ADDRESS }) {
  const [logs,    setLogs]    = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded,  setLoaded]  = useState(false);
  const [error,   setError]   = useState("");

  async function fetchLogs() {
    setLoading(true); setError("");
    try {
      const { data, error: err } = await supabase
        .from("remittances").select("*")
        .eq("receiver", familyAddress.toLowerCase())
        .order("created_at", { ascending: false });
      if (err) throw err;
      setLogs(data); setLoaded(true);
    } catch(e) { setError(e.message); }
    finally { setLoading(false); }
  }

  const total = logs.reduce((sum, l) => sum + parseFloat(l.amount || 0), 0);

  const breakdown = [1,2,3,4].map(id => ({
    ...CAT[id], id,
    count: logs.filter(l => l.category === id).length,
    sum:   logs.filter(l => l.category === id).reduce((s,l) => s + parseFloat(l.amount||0), 0),
  })).filter(c => c.count > 0);

  return (
    <div>
      {/* Summary */}
      {loaded && logs.length > 0 && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"16px" }}>
            <div style={{ background:"var(--green-light)", border:"2px solid var(--green-border)", borderRadius:"16px", padding:"18px" }}>
              <div style={{ fontSize:"12px", fontWeight:"700", color:"rgba(0,140,80,0.7)", marginBottom:"8px", fontFamily:"var(--font-body)" }}>💰 TOTAL RECEIVED</div>
              <div style={{ fontSize:"28px", fontWeight:"800", color:"var(--green)", letterSpacing:"-0.8px", fontFamily:"var(--font-display)" }}>
                {total.toFixed(2)} <span style={{ fontSize:"14px", fontWeight:"600" }}>mUSDC</span>
              </div>
            </div>
            <div style={{ background:"#EEF2FF", border:"2px solid #C7D2FE", borderRadius:"16px", padding:"18px" }}>
              <div style={{ fontSize:"12px", fontWeight:"700", color:"rgba(37,99,235,0.7)", marginBottom:"8px", fontFamily:"var(--font-body)" }}>📦 TOTAL TRANSFERS</div>
              <div style={{ fontSize:"28px", fontWeight:"800", color:"var(--blue)", letterSpacing:"-0.8px", fontFamily:"var(--font-display)" }}>{logs.length}</div>
            </div>
          </div>

          {breakdown.length > 0 && (
            <div style={{ background:"#F7FBF9", border:"1.5px solid var(--border)", borderRadius:"16px", padding:"18px", marginBottom:"16px" }}>
              <div style={{ fontSize:"14px", fontWeight:"700", color:"var(--text-dim)", marginBottom:"14px", fontFamily:"var(--font-body)" }}>Spending Breakdown</div>
              <div style={{ display:"grid", gap:"12px" }}>
                {breakdown.map(c => (
                  <div key={c.id}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:"14px", marginBottom:"6px" }}>
                      <span style={{ color:"var(--text)", fontWeight:"600", fontFamily:"var(--font-body)" }}>{c.emoji} {c.label}</span>
                      <span style={{ color:c.color, fontWeight:"800", fontFamily:"var(--font-display)", letterSpacing:"-0.3px" }}>{c.sum.toFixed(2)} mUSDC</span>
                    </div>
                    <div style={{ height:"8px", background:"var(--border)", borderRadius:"4px", overflow:"hidden" }}>
                      <div style={{
                        height:"100%", borderRadius:"4px",
                        background:`linear-gradient(90deg, ${c.color}88, ${c.color})`,
                        width:`${total > 0 ? (c.sum/total*100).toFixed(0) : 0}%`,
                        transition:"width 0.8s ease",
                      }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <button onClick={fetchLogs} disabled={loading} style={{
        width:"100%", padding:"15px", borderRadius:"14px",
        background: loaded ? "#F7FBF9" : "#EEF2FF",
        color:"var(--blue)", border:"1.5px solid #C7D2FE",
        fontSize:"15px", fontWeight:"700", cursor:"pointer",
        marginBottom:"16px", fontFamily:"var(--font-display)",
        transition:"all 0.2s", letterSpacing:"-0.2px",
      }}>
        {loading ? "⏳ Loading transfers…" : loaded ? "↻ Refresh" : "📥 Load Transfer History"}
      </button>

      {error && (
        <div style={{ padding:"16px", borderRadius:"14px", background:"#FEF2F2", border:"2px solid #FECACA", fontFamily:"var(--font-body)", marginBottom:"14px" }}>
          <div style={{ fontSize:"15px", fontWeight:"700", color:"#DC2626", marginBottom:"4px" }}>Unable to load transfers</div>
          <div style={{ fontSize:"13px", color:"#991B1B" }}>{error}</div>
        </div>
      )}

      {loaded && logs.length === 0 && !error && (
        <div style={{ padding:"36px", textAlign:"center", border:"2px dashed var(--border)", borderRadius:"16px", background:"#F7FBF9" }}>
          <div style={{ fontSize:"36px", marginBottom:"12px" }}>📭</div>
          <div style={{ fontSize:"16px", fontWeight:"700", color:"var(--text)", marginBottom:"6px", fontFamily:"var(--font-display)" }}>No transfers yet</div>
          <div style={{ fontSize:"13px", color:"var(--text-muted)", fontFamily:"var(--font-body)" }}>Once someone sends money here, it will appear below.</div>
        </div>
      )}

      <div style={{ display:"grid", gap:"12px" }}>
        {logs.map((l, i) => {
          const c = CAT[l.category] || CAT[1];
          return (
            <div key={i} style={{
              background:"#FAFCFB", border:`2px solid ${c.border}`,
              borderRadius:"16px", padding:"16px 18px",
              display:"flex", alignItems:"center", gap:"16px",
              transition:"all 0.15s",
            }}>
              <div style={{ width:"50px", height:"50px", borderRadius:"14px", background:c.bg, border:`1.5px solid ${c.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", flexShrink:0 }}>
                {c.emoji}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"5px" }}>
                  <span style={{ fontSize:"18px", fontWeight:"800", color:"var(--text)", fontFamily:"var(--font-display)", letterSpacing:"-0.5px" }}>
                    {parseFloat(l.amount).toFixed(2)}
                    <span style={{ fontSize:"12px", fontWeight:"600", color:"var(--text-muted)", marginLeft:"4px" }}>mUSDC</span>
                  </span>
                  <span style={{ fontSize:"12px", color:c.color, background:c.bg, padding:"3px 12px", borderRadius:"16px", fontWeight:"700", fontFamily:"var(--font-body)" }}>
                    {c.label}
                  </span>
                </div>
                <div style={{ fontSize:"12px", color:"var(--text-muted)", fontFamily:"var(--font-body)", fontWeight:"500" }}>
                  From {l.sender?.slice(0,6)}…{l.sender?.slice(-4)} · {timeAgo(l.created_at)}
                </div>
                {l.tx_hash && (
                  <a href={`https://explorer-hoodi.morph.network/tx/${l.tx_hash}`} target="_blank" style={{ fontSize:"12px", color:"var(--blue)", textDecoration:"none", fontFamily:"var(--font-body)", display:"block", marginTop:"4px", fontWeight:"600" }}>
                    🔗 View receipt ↗
                  </a>
                )}
              </div>
              <div style={{ fontSize:"18px", fontWeight:"800", color:c.color, flexShrink:0, fontFamily:"var(--font-display)", letterSpacing:"-0.5px" }}>
                +{parseFloat(l.amount).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
