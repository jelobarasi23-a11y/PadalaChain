"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

const CAT = {
  1:{ label:"Tuition", emoji:"🎓", color:"#1D9E75", bg:"rgba(29,158,117,0.12)"  },
  2:{ label:"Bills",   emoji:"🏠", color:"#89b4fa", bg:"rgba(137,180,250,0.12)" },
  3:{ label:"Food",    emoji:"🍚", color:"#EF9F27", bg:"rgba(239,159,39,0.12)"  },
  4:{ label:"Medical", emoji:"💊", color:"#D4537E", bg:"rgba(212,83,126,0.12)"  },
};

export default function FamilyDashboard({ familyAddress }) {
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

      setLogs(data.map(r => ({
        sender:   r.sender,
        amount:   r.amount,
        category: r.category,
        label:    r.category_label,
        date:     new Date(r.created_at).toLocaleDateString("en-PH", {
          month:"short", day:"numeric", year:"numeric"
        }),
        txHash:   r.tx_hash,
      })));
      setLoaded(true);
    } catch(e) {
      setError("Could not load: " + e.message);
    } finally { setLoading(false); }
  }

  const total = logs.reduce((sum, l) => sum + parseFloat(l.amount), 0);

  return (
    <div>
      {loaded && logs.length > 0 && (
        <div style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:"8px", marginBottom:"16px",
        }}>
          <div style={{
            background:"rgba(29,158,117,0.08)", border:"0.5px solid rgba(29,158,117,0.2)",
            borderRadius:"12px", padding:"12px",
          }}>
            <div style={{ fontSize:"10px", color:"#4b5563", marginBottom:"3px" }}>TOTAL RECEIVED</div>
            <div style={{ fontSize:"18px", fontWeight:"700", color:"#1D9E75" }}>
              {total.toFixed(0)} mUSDC
            </div>
          </div>
          <div style={{
            background:"rgba(137,180,250,0.08)", border:"0.5px solid rgba(137,180,250,0.2)",
            borderRadius:"12px", padding:"12px",
          }}>
            <div style={{ fontSize:"10px", color:"#4b5563", marginBottom:"3px" }}>TRANSACTIONS</div>
            <div style={{ fontSize:"18px", fontWeight:"700", color:"#89b4fa" }}>{logs.length}</div>
          </div>
        </div>
      )}

      <button onClick={fetchLogs} disabled={loading} style={{
        width:"100%", padding:"11px", borderRadius:"12px",
        background:"rgba(137,180,250,0.08)", color:"#89b4fa",
        border:"0.5px solid rgba(137,180,250,0.2)",
        fontSize:"13px", fontWeight:"500", cursor:"pointer",
        marginBottom:"14px", fontFamily:"inherit", transition:"all 0.15s",
      }}>
        {loading ? "Loading..." : loaded ? "↻ Refresh" : "Load remittances"}
      </button>

      {error && (
        <div style={{
          padding:"10px 12px", borderRadius:"10px", fontSize:"12px",
          background:"rgba(239,68,68,0.1)", border:"0.5px solid rgba(239,68,68,0.3)",
          color:"#ef4444", marginBottom:"10px",
        }}>{error}</div>
      )}

      {loaded && logs.length === 0 && !error && (
        <div style={{
          padding:"24px", textAlign:"center",
          border:"0.5px dashed rgba(255,255,255,0.08)", borderRadius:"12px",
        }}>
          <div style={{ fontSize:"24px", marginBottom:"8px" }}>📭</div>
          <div style={{ fontSize:"13px", color:"#4b5563" }}>No remittances yet.</div>
          <div style={{ fontSize:"12px", color:"#374151", marginTop:"4px" }}>
            Send one from the left panel!
          </div>
        </div>
      )}

      <div style={{ display:"grid", gap:"8px" }}>
        {logs.map((l, i) => {
          const c = CAT[l.category] || CAT[1];
          return (
            <div key={i} style={{
              background:"rgba(255,255,255,0.02)",
              border:"0.5px solid rgba(255,255,255,0.07)",
              borderRadius:"14px", padding:"14px",
              display:"flex", alignItems:"center", gap:"12px",
            }}>
              <div style={{
                width:"40px", height:"40px", borderRadius:"12px",
                background: c.bg, display:"flex",
                alignItems:"center", justifyContent:"center",
                fontSize:"18px", flexShrink:0,
              }}>{c.emoji}</div>

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"3px" }}>
                  <span style={{ fontSize:"13px", fontWeight:"600", color:"#f0f0f8" }}>
                    {parseFloat(l.amount).toFixed(0)} mUSDC
                  </span>
                  <span style={{
                    fontSize:"10px", color: c.color, background: c.bg,
                    padding:"2px 7px", borderRadius:"20px", fontWeight:"500",
                  }}>{l.label}</span>
                </div>
                <div style={{ fontSize:"11px", color:"#4b5563" }}>
                  From {l.sender.slice(0,6)}...{l.sender.slice(-4)} · {l.date}
                </div>
                {l.txHash && (
                  <a href={`https://explorer-hoodi.morph.network/tx/${l.txHash}`}
                    target="_blank" style={{
                      fontSize:"10px", color:"#89b4fa",
                      textDecoration:"none", display:"block", marginTop:"3px",
                    }}>
                    {l.txHash.slice(0,10)}... ↗
                  </a>
                )}
              </div>

              <div style={{ fontSize:"13px", fontWeight:"700", color: c.color, flexShrink:0 }}>
                +{parseFloat(l.amount).toFixed(0)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}