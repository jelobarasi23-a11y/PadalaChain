"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

const CAT = {
  1:{ label:"Tuition", emoji:"🎓", color:"#00E5A0", bg:"rgba(0,229,160,0.1)",   border:"rgba(0,229,160,0.2)"   },
  2:{ label:"Bills",   emoji:"🏠", color:"#3B9EFF", bg:"rgba(59,158,255,0.1)",  border:"rgba(59,158,255,0.2)"  },
  3:{ label:"Food",    emoji:"🍚", color:"#FFB547", bg:"rgba(255,181,71,0.1)",  border:"rgba(255,181,71,0.2)"  },
  4:{ label:"Medical", emoji:"💊", color:"#FF6EB4", bg:"rgba(255,110,180,0.1)", border:"rgba(255,110,180,0.2)" },
};

const FAMILY_ADDRESS = "0x3A7475E964B5babE75D9a62D81f0ae8974Cc91d4";

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

  // Category breakdown
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
          <div style={{
            display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"12px",
          }}>
            <div style={{
              background:"var(--green-dim)", border:"0.5px solid var(--green-border)",
              borderRadius:"10px", padding:"14px",
            }}>
              <div style={{
                fontSize:"10px", fontFamily:"var(--font-mono)",
                color:"rgba(0,229,160,0.6)", marginBottom:"4px", letterSpacing:"0.5px",
              }}>TOTAL RECEIVED</div>
              <div style={{ fontSize:"22px", fontWeight:"800", color:"#00E5A0", letterSpacing:"-1px" }}>
                {total.toFixed(0)} <span style={{ fontSize:"12px", fontWeight:"500" }}>mUSDC</span>
              </div>
            </div>
            <div style={{
              background:"rgba(59,158,255,0.08)", border:"0.5px solid rgba(59,158,255,0.2)",
              borderRadius:"10px", padding:"14px",
            }}>
              <div style={{
                fontSize:"10px", fontFamily:"var(--font-mono)",
                color:"rgba(59,158,255,0.6)", marginBottom:"4px", letterSpacing:"0.5px",
              }}>TRANSACTIONS</div>
              <div style={{ fontSize:"22px", fontWeight:"800", color:"#3B9EFF", letterSpacing:"-1px" }}>
                {logs.length}
              </div>
            </div>
          </div>

          {/* Breakdown bars */}
          {breakdown.length > 0 && (
            <div style={{
              background:"rgba(255,255,255,0.02)",
              border:"0.5px solid var(--border)",
              borderRadius:"10px", padding:"12px 14px", marginBottom:"12px",
            }}>
              <div style={{
                fontSize:"10px", fontFamily:"var(--font-mono)",
                color:"var(--text-muted)", marginBottom:"10px", letterSpacing:"0.5px",
              }}>BREAKDOWN</div>
              <div style={{ display:"grid", gap:"8px" }}>
                {breakdown.map(c => (
                  <div key={c.id}>
                    <div style={{
                      display:"flex", justifyContent:"space-between",
                      fontSize:"11px", marginBottom:"4px",
                    }}>
                      <span style={{ color:"var(--text-dim)" }}>{c.emoji} {c.label}</span>
                      <span style={{ color:c.color, fontFamily:"var(--font-mono)", fontWeight:"600" }}>
                        {c.sum.toFixed(0)} mUSDC
                      </span>
                    </div>
                    <div style={{
                      height:"3px", background:"rgba(255,255,255,0.06)",
                      borderRadius:"2px", overflow:"hidden",
                    }}>
                      <div style={{
                        height:"100%", borderRadius:"2px",
                        background:c.color,
                        width:`${total > 0 ? (c.sum/total*100).toFixed(0) : 0}%`,
                        boxShadow:`0 0 8px ${c.color}`,
                        transition:"width 0.6s ease",
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
        width:"100%", padding:"12px", borderRadius:"10px",
        background: loaded ? "rgba(59,158,255,0.08)" : "rgba(59,158,255,0.12)",
        color:"#3B9EFF",
        border:"0.5px solid rgba(59,158,255,0.2)",
        fontSize:"13px", fontWeight:"600", cursor:"pointer",
        marginBottom:"12px", fontFamily:"var(--font-display)",
        transition:"all 0.2s",
      }}>
        {loading ? "Loading..." : loaded ? "↻ Refresh" : "Load remittances"}
      </button>

      {error && (
        <div style={{
          padding:"10px 12px", borderRadius:"10px",
          background:"rgba(255,92,92,0.08)", border:"0.5px solid rgba(255,92,92,0.2)",
          color:"#FF5C5C", fontSize:"12px", fontFamily:"var(--font-mono)",
          marginBottom:"10px",
        }}>{error}</div>
      )}

      {loaded && logs.length === 0 && !error && (
        <div style={{
          padding:"28px", textAlign:"center",
          border:"0.5px dashed var(--border)", borderRadius:"12px",
        }}>
          <div style={{ fontSize:"28px", marginBottom:"10px" }}>📭</div>
          <div style={{ fontSize:"13px", color:"var(--text-dim)", fontWeight:"600" }}>
            No remittances yet
          </div>
          <div style={{
            fontSize:"11px", color:"var(--text-muted)",
            marginTop:"4px", fontFamily:"var(--font-mono)",
          }}>
            Send one from the left panel
          </div>
        </div>
      )}

      <div style={{ display:"grid", gap:"8px" }}>
        {logs.map((l, i) => {
          const c = CAT[l.category] || CAT[1];
          return (
            <div key={i} style={{
              background:"rgba(255,255,255,0.02)",
              border:`0.5px solid ${c.border}`,
              borderRadius:"12px", padding:"12px 14px",
              display:"flex", alignItems:"center", gap:"12px",
              transition:"all 0.15s",
            }}>
              <div style={{
                width:"38px", height:"38px", borderRadius:"10px",
                background:c.bg, border:`0.5px solid ${c.border}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"18px", flexShrink:0,
              }}>{c.emoji}</div>

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"3px" }}>
                  <span style={{
                    fontSize:"14px", fontWeight:"700",
                    color:"var(--text)", letterSpacing:"-0.3px",
                  }}>
                    {parseFloat(l.amount).toFixed(0)}
                    <span style={{ fontSize:"11px", fontWeight:"500", color:"var(--text-dim)", marginLeft:"3px" }}>mUSDC</span>
                  </span>
                  <span style={{
                    fontSize:"10px", color:c.color, background:c.bg,
                    padding:"2px 8px", borderRadius:"4px",
                    fontWeight:"600", fontFamily:"var(--font-mono)",
                  }}>{l.category_label?.toUpperCase()}</span>
                </div>
                <div style={{
                  fontSize:"10px", color:"var(--text-muted)",
                  fontFamily:"var(--font-mono)",
                }}>
                  FROM {l.sender?.slice(0,8)}...{l.sender?.slice(-6)} ·{" "}
                  {new Date(l.created_at).toLocaleDateString("en-PH", {
                    month:"short", day:"numeric",
                  })}
                </div>
                {l.tx_hash && (
                  <a href={`https://explorer-hoodi.morph.network/tx/${l.tx_hash}`}
                    target="_blank" style={{
                      fontSize:"10px", color:"var(--blue)",
                      textDecoration:"none", fontFamily:"var(--font-mono)",
                      display:"block", marginTop:"2px",
                    }}>
                    {l.tx_hash.slice(0,12)}... ↗
                  </a>
                )}
              </div>

              <div style={{
                fontSize:"14px", fontWeight:"800",
                color:c.color, flexShrink:0, letterSpacing:"-0.5px",
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
