"use client";
import { useState } from "react";
import { ethers }  from "ethers";
import { useWallet }          from "../hooks/useWallet";
import { getSignedContracts } from "../lib/contracts";

const CATS = [
  { id:1, emoji:"🎓", label:"Tuition",  color:"#1D9E75", bg:"rgba(29,158,117,0.12)" },
  { id:2, emoji:"🏠", label:"Bills",    color:"#89b4fa", bg:"rgba(137,180,250,0.12)" },
  { id:3, emoji:"🍚", label:"Food",     color:"#EF9F27", bg:"rgba(239,159,39,0.12)"  },
  { id:4, emoji:"💊", label:"Medical",  color:"#D4537E", bg:"rgba(212,83,126,0.12)"  },
];

const inp = {
  width:"100%", padding:"11px 14px", borderRadius:"12px",
  border:"0.5px solid rgba(255,255,255,0.1)",
  background:"rgba(255,255,255,0.04)",
  color:"#f0f0f8", fontSize:"13px", marginBottom:"10px",
  outline:"none", transition:"border 0.15s",
  fontFamily:"inherit",
};

export default function SendRemittance() {
  const { address, isCorrectNetwork, connect, loading } = useWallet();
  const [receiver, setReceiver] = useState("");
  const [amount,   setAmount]   = useState("");
  const [category, setCategory] = useState(1);
  const [status,   setStatus]   = useState("");
  const [txHash,   setTxHash]   = useState("");
  const [sending,  setSending]  = useState(false);

  async function handleSend() {
    try {
      setSending(true); setStatus("Connecting..."); setTxHash("");
      const { token, remittance } = await getSignedContracts();
      const amt = ethers.parseUnits(amount, 18);
      setStatus("Step 1/2 — Approve tokens (confirm MetaMask)...");
      await (await token.approve(
        process.env.NEXT_PUBLIC_REMITTANCE_ADDRESS, amt
      )).wait();
      setStatus("Step 2/2 — Sending (confirm MetaMask)...");
      const tx = await remittance.sendRemittance(receiver, amt, category);
      await tx.wait();
      setTxHash(tx.hash);
      setStatus("✓ Sent on-chain!");
      setReceiver(""); setAmount("");
    } catch (e) {
      setStatus("Error: " + (e.reason || e.message));
    } finally { setSending(false); }
  }

  if (!address) return (
    <button onClick={connect} disabled={loading} style={{
      width:"100%", padding:"12px", borderRadius:"12px",
      background:"linear-gradient(135deg, #1D9E75, #0d6e52)",
      color:"#fff", border:"none", fontSize:"14px", fontWeight:"600",
      cursor:"pointer", letterSpacing:"-0.2px", fontFamily:"inherit",
    }}>
      {loading ? "Connecting..." : "Connect MetaMask"}
    </button>
  );

  if (!isCorrectNetwork) return (
    <div style={{
      padding:"12px 14px", borderRadius:"12px",
      background:"rgba(239,159,39,0.1)", border:"0.5px solid rgba(239,159,39,0.3)",
      fontSize:"13px", color:"#EF9F27",
    }}>
      ⚠ Switch MetaMask to Morph Hoodi (Chain 2910)
    </div>
  );

  return (
    <div>
      {/* Wallet badge */}
      <div style={{
        display:"inline-flex", alignItems:"center", gap:"6px",
        fontSize:"11px", color:"#1D9E75",
        background:"rgba(29,158,117,0.08)",
        border:"0.5px solid rgba(29,158,117,0.2)",
        padding:"4px 10px", borderRadius:"20px", marginBottom:"16px",
      }}>
        <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#1D9E75", display:"inline-block" }}/>
        {address.slice(0,6)}...{address.slice(-4)} · Morph Hoodi
      </div>

      <input style={inp} placeholder="Receiver wallet address 0x..."
        value={receiver} onChange={e => setReceiver(e.target.value)} />

      <div style={{ display:"flex", gap:"8px", marginBottom:"10px" }}>
        <input style={{...inp, marginBottom:0, flex:1}} placeholder="Amount (mUSDC)"
          type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <div style={{
          padding:"11px 14px", borderRadius:"12px", fontSize:"12px",
          background:"rgba(255,255,255,0.04)", border:"0.5px solid rgba(255,255,255,0.1)",
          color:"#4b5563", whiteSpace:"nowrap",
        }}>
          ≈ ₱{amount ? (parseFloat(amount)*57).toLocaleString() : "0"}
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"6px", marginBottom:"14px" }}>
        {CATS.map(c => (
          <button key={c.id} onClick={() => setCategory(c.id)} style={{
            padding:"8px 4px", borderRadius:"10px", fontSize:"11px",
            cursor:"pointer", border: category===c.id
              ? `1px solid ${c.color}`
              : "0.5px solid rgba(255,255,255,0.08)",
            background: category===c.id ? c.bg : "rgba(255,255,255,0.02)",
            color: category===c.id ? c.color : "#4b5563",
            fontWeight: category===c.id ? "600" : "400",
            transition:"all 0.15s", fontFamily:"inherit",
          }}>
            <div style={{ fontSize:"16px", marginBottom:"2px" }}>{c.emoji}</div>
            {c.label}
          </button>
        ))}
      </div>

      <button onClick={handleSend} disabled={sending || !receiver || !amount} style={{
        width:"100%", padding:"13px", borderRadius:"12px",
        background: sending ? "rgba(29,158,117,0.3)" : "linear-gradient(135deg, #1D9E75, #0d6e52)",
        color:"#fff", border:"none", fontSize:"14px", fontWeight:"600",
        cursor: sending ? "default" : "pointer",
        letterSpacing:"-0.2px", fontFamily:"inherit",
        opacity: (!receiver || !amount) ? 0.4 : 1,
        transition:"all 0.15s",
      }}>
        {sending ? "Sending..." : "Send on-chain →"}
      </button>

      {status && (
        <div style={{
          marginTop:"12px", padding:"10px 14px", borderRadius:"10px", fontSize:"12px",
          background: status.startsWith("✓")
            ? "rgba(29,158,117,0.1)" : status.startsWith("Error")
            ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.04)",
          border: status.startsWith("✓")
            ? "0.5px solid rgba(29,158,117,0.3)" : status.startsWith("Error")
            ? "0.5px solid rgba(239,68,68,0.3)" : "0.5px solid rgba(255,255,255,0.08)",
          color: status.startsWith("✓") ? "#1D9E75" : status.startsWith("Error") ? "#ef4444" : "#6b7280",
        }}>
          {status}
        </div>
      )}

      {txHash && (
        <a href={`https://explorer-hoodi.morph.network/tx/${txHash}`}
          target="_blank" style={{
            display:"block", marginTop:"8px", fontSize:"12px",
            color:"#89b4fa", textDecoration:"none",
            textAlign:"center",
          }}>
          View on Morph Explorer ↗
        </a>
      )}
    </div>
  );
}