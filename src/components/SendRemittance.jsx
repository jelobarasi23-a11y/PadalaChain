"use client";
import { useState } from "react";
import { ethers }  from "ethers";
import { useWallet }          from "../hooks/useWallet";
import { getSignedContracts } from "../lib/contracts";
import { supabase }           from "../lib/supabase";

const CATS = [
  { id:1, emoji:"🎓", label:"Tuition",  desc:"School fees",   color:"#00C87A", bg:"rgba(0,200,122,0.1)",  border:"rgba(0,200,122,0.3)"  },
  { id:2, emoji:"🏠", label:"Bills",    desc:"Utilities",     color:"#3B82F6", bg:"rgba(59,130,246,0.1)", border:"rgba(59,130,246,0.3)" },
  { id:3, emoji:"🍚", label:"Food",     desc:"Groceries",     color:"#F59E0B", bg:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.3)" },
  { id:4, emoji:"💊", label:"Medical",  desc:"Health needs",  color:"#EC4899", bg:"rgba(236,72,153,0.1)", border:"rgba(236,72,153,0.3)" },
];

const inp = {
  width:"100%", padding:"13px 16px", borderRadius:"12px",
  border:"1.5px solid var(--border)",
  background:"#F8FAFC",
  color:"var(--text)", fontSize:"14px", marginBottom:"12px",
  outline:"none", fontFamily:"var(--font-body)",
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
  const [step,     setStep]     = useState(0);

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
    <div>
      <p style={{ fontSize:"13px", color:"var(--text-dim)", marginBottom:"16px", lineHeight:"1.6", fontFamily:"var(--font-body)" }}>
        Connect your MetaMask wallet to start sending money to your family.
      </p>
      <button onClick={connect} disabled={loading} style={{
        width:"100%", padding:"15px", borderRadius:"12px",
        background:"linear-gradient(135deg, #00C87A, #009A5E)",
        color:"#fff", border:"none", fontSize:"15px", fontWeight:"700",
        cursor:"pointer", fontFamily:"var(--font-display)",
        boxShadow:"0 4px 16px rgba(0,200,122,0.3)", transition:"all 0.2s",
      }}>
        {loading ? "Connecting..." : "🔗 Connect MetaMask"}
      </button>
    </div>
  );

  if (!isCorrectNetwork) return (
    <div style={{
      padding:"16px", borderRadius:"12px",
      background:"rgba(245,158,11,0.08)",
      border:"1.5px solid rgba(245,158,11,0.3)",
    }}>
      <div style={{ fontSize:"15px", marginBottom:"6px" }}>⚠️</div>
      <div style={{ fontSize:"14px", fontWeight:"700", color:"#B45309", marginBottom:"4px", fontFamily:"var(--font-display)" }}>
        Wrong Network
      </div>
      <div style={{ fontSize:"13px", color:"#92400E", fontFamily:"var(--font-body)" }}>
        Please switch to the Morph Hoodi network in MetaMask to continue.
      </div>
    </div>
  );

  const selectedCat = CATS.find(c => c.id === category);

  return (
    <div>
      {/* Wallet indicator */}
      <div style={{
        display:"inline-flex", alignItems:"center", gap:"8px",
        fontSize:"12px", color:"var(--green)",
        background:"var(--green-light)",
        border:"1.5px solid var(--green-border)",
        padding:"6px 14px", borderRadius:"20px", marginBottom:"16px",
        fontWeight:"700", fontFamily:"var(--font-body)",
      }}>
        <span style={{
          width:"7px", height:"7px", borderRadius:"50%",
          background:"var(--green)", display:"inline-block",
          boxShadow:"0 0 6px rgba(0,200,122,0.6)",
        }}/>
        Wallet connected: {address.slice(0,6)}...{address.slice(-4)}
      </div>

      <label style={{ display:"block", fontSize:"12px", fontWeight:"700", color:"var(--text-dim)", marginBottom:"6px", fontFamily:"var(--font-body)" }}>
        Recipient Wallet Address
      </label>
      <input style={inp} placeholder="0x... (family member's address)"
        value={receiver} onChange={e => setReceiver(e.target.value)} />

      <label style={{ display:"block", fontSize:"12px", fontWeight:"700", color:"var(--text-dim)", marginBottom:"6px", fontFamily:"var(--font-body)" }}>
        Amount to Send
      </label>
      <div style={{ display:"flex", gap:"8px", marginBottom:"16px" }}>
        <input style={{...inp, marginBottom:0, flex:1}} placeholder="e.g. 1000"
          type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} />
        <div style={{
          padding:"13px 14px", borderRadius:"12px", fontSize:"13px",
          background:"#F8FAFC", border:"1.5px solid var(--border)",
          color:"var(--text-dim)", whiteSpace:"nowrap",
          fontFamily:"var(--font-body)", fontWeight:"600",
        }}>
          ≈ ₱{amount ? Math.round(parseFloat(amount)*57).toLocaleString() : "0"}
        </div>
      </div>

      <label style={{ display:"block", fontSize:"12px", fontWeight:"700", color:"var(--text-dim)", marginBottom:"8px", fontFamily:"var(--font-body)" }}>
        What is this money for?
      </label>
      {/* Category */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px", marginBottom:"16px" }}>
        {CATS.map(c => (
          <button key={c.id} onClick={() => setCategory(c.id)} style={{
            padding:"12px 6px", borderRadius:"12px", fontSize:"12px",
            cursor:"pointer", fontFamily:"var(--font-body)", fontWeight:"700",
            border: category===c.id ? `2px solid ${c.border}` : "1.5px solid var(--border)",
            background: category===c.id ? c.bg : "#F8FAFC",
            color: category===c.id ? c.color : "var(--text-muted)",
            transition:"all 0.15s",
            boxShadow: category===c.id ? `0 2px 8px ${c.bg}` : "none",
          }}>
            <div style={{ fontSize:"22px", marginBottom:"5px" }}>{c.emoji}</div>
            <div>{c.label}</div>
            <div style={{ fontSize:"10px", fontWeight:"500", opacity:0.7, marginTop:"2px" }}>{c.desc}</div>
          </button>
        ))}
      </div>

      {/* Progress steps */}
      {step > 0 && (
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"4px",
          marginBottom:"14px",
        }}>
          {["Approving","Sending","Saving","Done!"].map((s, i) => (
            <div key={i} style={{
              padding:"8px 4px", borderRadius:"8px", textAlign:"center",
              fontSize:"10px", fontWeight:"700", fontFamily:"var(--font-body)",
              background: step > i ? "var(--green-light)" : "#F8FAFC",
              border: step > i ? "1.5px solid var(--green-border)" : "1.5px solid var(--border)",
              color: step > i ? "var(--green)" : "var(--text-muted)",
              transition:"all 0.3s",
            }}>
              {step > i ? "✓" : `${i+1}.`} {s}
            </div>
          ))}
        </div>
      )}

      <button onClick={handleSend} disabled={sending || !receiver || !amount} style={{
        width:"100%", padding:"15px", borderRadius:"12px",
        background: sending
          ? "#F0FDF4"
          : (!receiver || !amount) ? "#F3F4F6"
          : "linear-gradient(135deg, #00C87A, #009A5E)",
        color: sending ? "var(--green)" : (!receiver || !amount) ? "var(--text-muted)" : "#fff",
        border: sending ? "1.5px solid var(--green-border)" : "none",
        fontSize:"15px", fontWeight:"700",
        cursor: (sending || !receiver || !amount) ? "default" : "pointer",
        fontFamily:"var(--font-display)",
        transition:"all 0.2s",
        boxShadow: (!sending && receiver && amount) ? "0 4px 16px rgba(0,200,122,0.3)" : "none",
      }}>
        {sending ? `Processing… step ${step} of 3` : `Send ${selectedCat?.emoji} ${selectedCat?.label} Money →`}
      </button>

      {status === "done" && (
        <div style={{
          marginTop:"14px", padding:"14px 16px", borderRadius:"12px",
          background:"var(--green-light)", border:"1.5px solid var(--green-border)",
          fontFamily:"var(--font-body)",
        }}>
          <div style={{ fontSize:"15px", fontWeight:"800", color:"var(--green)", marginBottom:"4px", fontFamily:"var(--font-display)" }}>
            ✓ Money sent successfully!
          </div>
          <div style={{ fontSize:"12px", color:"rgba(0,120,80,0.8)" }}>
            Your family will receive it within seconds.
          </div>
        </div>
      )}

      {status.startsWith("error:") && (
        <div style={{
          marginTop:"14px", padding:"12px 14px", borderRadius:"12px",
          background:"rgba(239,68,68,0.06)", border:"1.5px solid rgba(239,68,68,0.25)",
          fontFamily:"var(--font-body)",
        }}>
          <div style={{ fontSize:"13px", fontWeight:"700", color:"#DC2626", marginBottom:"3px" }}>Something went wrong</div>
          <div style={{ fontSize:"12px", color:"#991B1B" }}>{status.replace("error:","")}</div>
        </div>
      )}

      {txHash && (
        <a href={`https://explorer-hoodi.morph.network/tx/${txHash}`}
          target="_blank" style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:"6px",
            marginTop:"12px", fontSize:"12px",
            color:"var(--blue)", textDecoration:"none",
            fontFamily:"var(--font-body)", fontWeight:"600",
          }}>
          🔗 View transaction on blockchain ↗
        </a>
      )}
    </div>
  );
}
