"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { getReadContracts } from "../lib/contracts";

const CAT = {
  1:{ label:"Tuition", emoji:"🎓", color:"#1D9E75" },
  2:{ label:"Bills",   emoji:"🏠", color:"#378ADD" },
  3:{ label:"Food",    emoji:"🍚", color:"#EF9F27" },
  4:{ label:"Medical", emoji:"💊", color:"#D4537E" },
};

export default function FamilyDashboard({ familyAddress }) {
  const [logs,    setLogs]    = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchLogs() {
    setLoading(true);
    try {
      const { remittance } = getReadContracts();
      const raw = await remittance.getMyLogs(familyAddress);
      setLogs(raw.map(l => ({
        sender:   l.sender,
        amount:   ethers.formatUnits(l.amount, 18),
        category: Number(l.category),
        date:     new Date(Number(l.timestamp)*1000).toLocaleDateString(),
      })));
    } catch(e) {
      console.error(e);
    } finally { setLoading(false); }
  }

  return (
    <div>
      <button onClick={fetchLogs} disabled={loading} style={{
        padding:"9px 18px", background:"#1a2a3a", color:"#89b4fa",
        border:"0.5px solid #2a3a4a", borderRadius:"10px",
        fontSize:"13px", cursor:"pointer", marginBottom:"14px"
      }}>
        {loading ? "Loading..." : "Load remittances"}
      </button>

      {logs.length === 0 && !loading && (
        <p style={{ fontSize:"13px", color:"#555" }}>
          No remittances yet. Send one first!
        </p>
      )}

      <div style={{ display:"grid", gap:"8px" }}>
        {logs.map((l, i) => {
          const c = CAT[l.category] || CAT[1];
          return (
            <div key={i} style={{
              background:"#0f0f13", border:"0.5px solid #2a2a3a",
              borderRadius:"10px", padding:"12px 14px",
              display:"flex", alignItems:"center", gap:"12px"
            }}>
              <div style={{
                width:"36px", height:"36px", borderRadius:"50%",
                background:"#1a1a24", display:"flex",
                alignItems:"center", justifyContent:"center", fontSize:"16px"
              }}>{c.emoji}</div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:"13px", fontWeight:"500", color:"#f5f5f5" }}>
                  {l.amount} mUSDC
                </p>
                <p style={{ fontSize:"11px", color:"#666", marginTop:"2px" }}>
                  {c.label} · From {l.sender.slice(0,6)}... · {l.date}
                </p>
              </div>
              <span style={{ fontSize:"12px", color: c.color, fontWeight:"500" }}>
                +{l.amount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}