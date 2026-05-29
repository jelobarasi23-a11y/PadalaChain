"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

const CAT = {
  1:{ label:"Tuition", emoji:"🎓", color:"#00C87A", bg:"rgba(0,200,122,0.1)",  border:"rgba(0,200,122,0.25)"   },
  2:{ label:"Bills",   emoji:"🏠", color:"#3B82F6", bg:"rgba(59,130,246,0.1)", border:"rgba(59,130,246,0.25)"  },
  3:{ label:"Food",    emoji:"🍚", color:"#F59E0B", bg:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.25)"  },
  4:{ label:"Medical", emoji:"💊", color:"#EC4899", bg:"rgba(236,72,153,0.1)", border:"rgba(236,72,153,0.25)" },
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
        .from("remittances")
        .select("*")
        .eq("receiver", familyAddress.toLowerCase())
        .order("created_at", { ascending: false });

      if (err) throw err;
      setLogs(data);
      setLoaded(true);
    } catch(e) {
      setError(e.message);
    } finally { setLoading(false); }
  }

  const total = logs.reduce((sum, l) => sum + parseFloat(l.amount || 0), 0);

  const breakdown = [1,2,3,4].map(id => ({
    ...CAT[id],
    id,
    count: logs.filter(l => l.category === id).length,
    sum:   logs.filter(l => l.category === id).reduce((s,l) => s + parseFloat(l.amount||0), 0),
  })).filter(c => c.count > 0);

  return (
    <div>
      {/* Summary */}
      {loaded && logs.length > 0 && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"14px" }}>
            <div style={{
              background:"var(--green-light)", border:"1.5px solid var(--green-border)",
              borderRadius:"14px", padding:"16px",
            }}>
              <div style={{ fontSize:"11px", fontWeight:"700", color:"rgba(0,150,80,0.7)", marginBottom:"6px", fontFamily:"var(--font-body)" }}>
                💰 TOTAL RECEIVED
              </div>
              <div style={{ fontSize:"24px", fontWeight:"800", color:"var(--green)", letterSpacing:"-0.5px", fontFamily:"var(--font-display)" }}>
                {total.toFixed(0)} <span style={{ fontSize:"13px", fontWeight:"600" }}>mUSDC</span>
              </div>
            </div>
            <div style={{
              background:"rgba(59,130,246,0.08)", border:"1.5px solid rgba(59,130,246,0.2)",
              borderRadius:"14px", padding:"16px",
            }}>
              <div style={{ fontSize:"11px", fontWeight:"700", color:"rgba(37,99,235,0.7)", marginBottom:"6px", fontFamily:"var(--font-body)" }}>
                📦 TRANSFERS
              </div>
              <div style={{ fontSize:"24px", fontWeight:"800", color:"var(--blue)", letterSpacing:"-0.5px", fontFamily:"var(--font-display)" }}>
                {logs.length}
              </div>
            </div>
          </div>

          {/* Breakdown bars */}
          {breakdown.length > 0 && (
            <div style={{
              background:"#F8FAFC", border:"1.5px solid var(--border)",
              borderRadius:"14px", padding:"14px 16px", marginBottom:"14px",
            }}>
              <div style={{ fontSize:"12px", fontWeight:"700", color:"var(--text-dim)", marginBottom:"12px", fontFamily:"var(--font-body)" }}>
                Spending Breakdown
              </div>
              <div style={{ display:"grid", gap:"10px" }}>
                {breakdown.map(c => (
                  <div key={c.id}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:"12px", marginBottom:"5px" }}>
                      <span style={{ color:"var(--text-dim)", fontWeight:"600", fontFamily:"var(--font-body)" }}>{c.emoji} {c.label}</span>
                      <span style={{ color:c.color, fontWeight:"700", fontFamily:"var(--font-display)" }}>
                        {c.sum.toFixed(0)} mUSDC
                      </span>
                    </div>
                    <div style={{ height:"6px", background:"var(--border)", borderRadius:"3px", overflow:"hidden" }}>
                      <div className="progress-bar" style={{
                        height:"100%", borderRadius:"3px",
                        background:`linear-gradient(90deg, ${c.color}aa, ${c.color})`,
                        width:`${total > 0 ? (c.sum/total*100).toFixed(0) : 0}%`,
                        boxShadow:`0 0 8px ${c.color}44`,
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
        width:"100%", padding:"13px", borderRadius:"12px",
        background: loaded ? "#F8FAFC" : "rgba(59,130,246,0.08)",
        color:"var(--blue)",
        border:"1.5px solid rgba(59,130,246,0.3)",
        fontSize:"14px", fontWeight:"700", cursor:"pointer",
        marginBottom:"14px", fontFamily:"var(--font-display)",
        transition:"all 0.2s",
      }}>
        {loading ? "⏳ Loading transfers..." : loaded ? "↻ Refresh" : "📥 Load Transfer History"}
      </button>

      {error && (
        <div style={{
          padding:"12px 14px", borderRadius:"12px",
          background:"rgba(239,68,68,0.06)", border:"1.5px solid rgba(239,68,68,0.2)",
          fontFamily:"var(--font-body)", marginBottom:"12px",
        }}>
          <div style={{ fontSize:"13px", fontWeight:"700", color:"#DC2626", marginBottom:"3px" }}>Unable to load transfers</div>
          <div style={{ fontSize:"12px", color:"#991B1B" }}>{error}</div>
        </div>
      )}

      {loaded && logs.length === 0 && !error && (
        <div style={{
          padding:"32px", textAlign:"center",
          border:"1.5px dashed var(--border)", borderRadius:"14px",
          background:"#FAFAFA",
        }}>
          <div style={{ fontSize:"32px", marginBottom:"10px" }}>📭</div>
          <div style={{ fontSize:"14px", fontWeight:"700", color:"var(--text)", marginBottom:"5px", fontFamily:"var(--font-display)" }}>
            No transfers yet
          </div>
          <div style={{ fontSize:"12px", color:"var(--text-muted)", fontFamily:"var(--font-body)" }}>
            Once someone sends money here, it will appear in this list.
          </div>
        </div>
      )}

      <div style={{ display:"grid", gap:"10px" }}>
        {logs.map((l, i) => {
          const c = CAT[l.category] || CAT[1];
          return (
            <div key={i} style={{
              background:"#FAFAFA",
              border:`1.5px solid ${c.border}`,
              borderRadius:"14px", padding:"14px 16px",
              display:"flex", alignItems:"center", gap:"14px",
              transition:"all 0.15s",
            }}>
              <div style={{
                width:"44px", height:"44px", borderRadius:"12px",
                background:c.bg, border:`1.5px solid ${c.border}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"20px", flexShrink:0,
              }}>{c.emoji}</div>

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
                  <span style={{
                    fontSize:"15px", fontWeight:"800",
                    color:"var(--text)", fontFamily:"var(--font-display)",
                  }}>
                    {parseFloat(l.amount).toFixed(0)}
                    <span style={{ fontSize:"11px", fontWeight:"600", color:"var(--text-muted)", marginLeft:"4px" }}>mUSDC</span>
                  </span>
                  <span style={{
                    fontSize:"11px", color:c.color, background:c.bg,
                    padding:"2px 10px", borderRadius:"20px",
                    fontWeight:"700", fontFamily:"var(--font-body)",
                  }}>{c.label}</span>
                </div>
                <div style={{
                  fontSize:"11px", color:"var(--text-muted)",
                  fontFamily:"var(--font-body)", fontWeight:"500",
                }}>
                  From {l.sender?.slice(0,6)}...{l.sender?.slice(-4)} · {timeAgo(l.created_at)}
                </div>
                {l.tx_hash && (
                  <a href={`https://explorer-hoodi.morph.network/tx/${l.tx_hash}`}
                    target="_blank" style={{
                      fontSize:"11px", color:"var(--blue)",
                      textDecoration:"none", fontFamily:"var(--font-body)",
                      display:"block", marginTop:"3px", fontWeight:"600",
                    }}>
                    🔗 View receipt ↗
                  </a>
                )}
              </div>

              <div style={{
                fontSize:"15px", fontWeight:"800",
                color:c.color, flexShrink:0, fontFamily:"var(--font-display)",
              }}>
                +{parseFloat(l.amount).toFixed(0)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
