"use client";
import { useState } from "react";
import { ethers }  from "ethers";
import { useWallet }          from "../hooks/useWallet";
import { getSignedContracts } from "../lib/contracts";
import { supabase }           from "../lib/supabase";

const CATS = [
  { id:1, emoji:"🎓", label:"Tuition", color:"#00E5A0", bg:"rgba(0,229,160,0.1)",  border:"rgba(0,229,160,0.25)"  },
  { id:2, emoji:"🏠", label:"Bills",   color:"#3B9EFF", bg:"rgba(59,158,255,0.1)", border:"rgba(59,158,255,0.25)" },
  { id:3, emoji:"🍚", label:"Food",    color:"#FFB547", bg:"rgba(255,181,71,0.1)", border:"rgba(255,181,71,0.25)" },
  { id:4, emoji:"💊", label:"Medical", color:"#FF6EB4", bg:"rgba(255,110,180,0.1)",border:"rgba(255,110,180,0.25)"},
];

const inp = {
  width:"100%", padding:"11px 14px", borderRadius:"10px",
  border:"0.5px solid rgba(255,255,255,0.09)",
  background:"rgba(255,255,255,0.03)",
  color:"#F2F2FF", fontSize:"13px", marginBottom:"10px",
  outline:"none", fontFamily:"var(--font-display)",
  transition:"all 0.2s",
};

export default function SendRemittance() {
  const { address, isCorrectNetwork, connect, loading } = useWallet();
  const [receiver, setReceiver] = useState("");
  const [amount,   setAmount]   = useState("");
  const [category, setCategory] = useState(1);
  const [status,   setStatus]   = useState("");
  const [txHash,   setTxHash]   = useState("");
  const [sending,  setSending]  = useState(false);
  const [step,     setStep]     = useState(0); // 0=idle 1=approve 2=send 3=save 4=done

  async function handleSend() {
    try {
      setSending(true); setStatus(""); setTxHash(""); setStep(1);
      const { token, remittance } = await getSignedContracts();
      const amt = ethers.parseUnits(amount, 18);

      setStep(1);
      await (await token.approve(
        process.env.NEXT_PUBLIC_REMITTANCE_ADDRESS, amt
      )).wait();

      setStep(2);
      const tx = await remittance.sendRemittance(receiver, amt, category);
      const receipt = await tx.wait();

      setStep(3);
      const catLabel = CATS.find(c => c.id === category)?.label || "Other";
      await supabase.from("remittances").insert({
        tx_hash:         receipt.hash,
        sender:          address.toLowerCase(),
        receiver:        receiver.toLowerCase(),
        amount:          parseFloat(amount),
        category,
        category_label:  catLabel,
        timestamp_chain: Math.floor(Date.now() / 1000),
      });

      setStep(4);
      setTxHash(receipt.hash);
      setStatus("done");
      setReceiver(""); setAmount("");
      setTimeout(() => setStep(0), 4000);
    } catch (e) {
      setStatus("error:" + (e.reason || e.message));
      setStep(0);
    } finally { setSending(false); }
  }

  if (!address) return (
    <button onClick={connect} disabled={loading} style={{
      width:"100%", padding:"14px", borderRadius:"10px",
      background:"linear-gradient(135deg, #00E5A0, #00A373)",
      color:"#050508", border:"none", fontSize:"14px", fontWeight:"700",
      cursor:"pointer", letterSpacing:"-0.3px", fontFamily:"var(--font-display)",
      boxShadow:"0 0 24px rgba(0,229,160,0.2)", transition:"all 0.2s",
    }}>
      {loading ? "Connecting..." : "Connect MetaMask →"}
    </button>
  );

  if (!isCorrectNetwork) return (
    <div style={{
      padding:"12px 14px", borderRadius:"10px",
      background:"rgba(255,181,71,0.08)",
      border:"0.5px solid rgba(255,181,71,0.25)",
      fontSize:"13px", color:"#FFB547",
      fontFamily:"var(--font-mono)",
    }}>
      ⚠ SWITCH TO MORPH HOODI · CHAIN 2910
    </div>
  );

  const selectedCat = CATS.find(c => c.id === category);

  return (
    <div>
      {/* Wallet */}
      <div style={{
        display:"inline-flex", alignItems:"center", gap:"7px",
        fontSize:"11px", color:"#00E5A0",
        background:"rgba(0,229,160,0.07)",
        border:"0.5px solid rgba(0,229,160,0.2)",
        padding:"5px 12px", borderRadius:"6px", marginBottom:"14px",
        fontFamily:"var(--font-mono)",
      }}>
        <span style={{
          width:"6px", height:"6px", borderRadius:"50%",
          background:"#00E5A0", display:"inline-block",
          boxShadow:"0 0 6px #00E5A0",
        }}/>
        {address.slice(0,8)}...{address.slice(-6)}
      </div>

      <input style={inp} placeholder="Receiver address 0x..."
        value={receiver} onChange={e => setReceiver(e.target.value)} />

      <div style={{ display:"flex", gap:"8px", marginBottom:"12px" }}>
        <input style={{...inp, marginBottom:0, flex:1}} placeholder="Amount (mUSDC)"
          type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} />
        <div style={{
          padding:"11px 12px", borderRadius:"10px", fontSize:"12px",
          background:"rgba(255,255,255,0.03)",
          border:"0.5px solid rgba(255,255,255,0.09)",
          color:"var(--text-muted)", whiteSpace:"nowrap",
          fontFamily:"var(--font-mono)",
        }}>
          ≈ ₱{amount ? Math.round(parseFloat(amount)*57).toLocaleString() : "0"}
        </div>
      </div>

      {/* Category */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"6px", marginBottom:"14px" }}>
        {CATS.map(c => (
          <button key={c.id} onClick={() => setCategory(c.id)} style={{
            padding:"10px 4px", borderRadius:"10px", fontSize:"11px",
            cursor:"pointer", fontFamily:"var(--font-display)", fontWeight:"600",
            border: category===c.id ? `1px solid ${c.border}` : "0.5px solid rgba(255,255,255,0.07)",
            background: category===c.id ? c.bg : "rgba(255,255,255,0.02)",
            color: category===c.id ? c.color : "var(--text-muted)",
            transition:"all 0.15s",
            boxShadow: category===c.id ? `0 0 12px ${c.bg}` : "none",
          }}>
            <div style={{ fontSize:"18px", marginBottom:"4px" }}>{c.emoji}</div>
            {c.label}
          </button>
        ))}
      </div>

      {/* Progress steps */}
      {step > 0 && (
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"4px",
          marginBottom:"12px",
        }}>
          {["Approve","Send","Save","Done"].map((s, i) => (
            <div key={i} style={{
              padding:"6px", borderRadius:"6px", textAlign:"center",
              fontSize:"10px", fontFamily:"var(--font-mono)", fontWeight:"500",
              background: step > i ? "var(--green-dim)" : "rgba(255,255,255,0.03)",
              border: step > i ? "0.5px solid var(--green-border)" : "0.5px solid rgba(255,255,255,0.07)",
              color: step > i ? "#00E5A0" : "var(--text-muted)",
              transition:"all 0.3s",
            }}>
              {step > i ? "✓" : `0${i+1}`} {s}
            </div>
          ))}
        </div>
      )}

      <button onClick={handleSend} disabled={sending || !receiver || !amount} style={{
        width:"100%", padding:"14px", borderRadius:"10px",
        background: sending
          ? "rgba(0,229,160,0.15)"
          : "linear-gradient(135deg, #00E5A0, #00A373)",
        color: sending ? "#00E5A0" : "#050508",
        border: sending ? "0.5px solid var(--green-border)" : "none",
        fontSize:"14px", fontWeight:"700",
        cursor: (sending || !receiver || !amount) ? "default" : "pointer",
        letterSpacing:"-0.3px", fontFamily:"var(--font-display)",
        opacity: (!receiver || !amount) ? 0.35 : 1,
        transition:"all 0.2s",
        boxShadow: (!sending && receiver && amount) ? "0 0 20px rgba(0,229,160,0.2)" : "none",
      }}>
        {sending ? `Processing step ${step}/3...` : `Send on-chain → ${selectedCat?.emoji}`}
      </button>

      {status === "done" && (
        <div style={{
          marginTop:"12px", padding:"12px 14px", borderRadius:"10px",
          background:"var(--green-dim)", border:"0.5px solid var(--green-border)",
          fontSize:"13px", color:"#00E5A0", fontWeight:"600",
          display:"flex", alignItems:"center", gap:"8px",
        }}>
          <span style={{ fontSize:"16px" }}>✓</span>
          Remittance sent & saved on-chain!
        </div>
      )}

      {status.startsWith("error:") && (
        <div style={{
          marginTop:"12px", padding:"10px 14px", borderRadius:"10px",
          background:"rgba(255,92,92,0.08)", border:"0.5px solid rgba(255,92,92,0.25)",
          fontSize:"12px", color:"#FF5C5C",
          fontFamily:"var(--font-mono)",
        }}>
          {status.replace("error:","")}
        </div>
      )}

      {txHash && (
        <a href={`https://explorer-hoodi.morph.network/tx/${txHash}`}
          target="_blank" style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:"6px",
            marginTop:"10px", fontSize:"11px",
            color:"var(--blue)", textDecoration:"none",
            fontFamily:"var(--font-mono)",
          }}>
          {txHash.slice(0,14)}...{txHash.slice(-8)} ↗
        </a>
      )}
    </div>
  );
}
