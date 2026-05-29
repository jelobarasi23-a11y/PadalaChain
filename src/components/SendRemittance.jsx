"use client";
import { useState } from "react";
import { ethers }  from "ethers";
import { useWallet }          from "../hooks/useWallet";
import { getSignedContracts } from "../lib/contracts";
import { supabase }           from "../lib/supabase";

const CATS = [
  { id:1, emoji:"🎓", label:"Tuition",  desc:"School / university", color:"#00B67A", bg:"#E8FAF2", border:"rgba(0,182,122,0.35)"  },
  { id:2, emoji:"🏠", label:"Bills",    desc:"Rent & utilities",    color:"#2563EB", bg:"#EEF2FF", border:"rgba(37,99,235,0.35)" },
  { id:3, emoji:"🍚", label:"Food",     desc:"Groceries & meals",   color:"#D97706", bg:"#FFFBEB", border:"rgba(217,119,6,0.35)" },
  { id:4, emoji:"💊", label:"Medical",  desc:"Health & medicine",   color:"#DB2777", bg:"#FDF2F8", border:"rgba(219,39,119,0.35)" },
];

const inp = (extra={}) => ({
  width:"100%", padding:"15px 18px", borderRadius:"14px",
  border:"1.5px solid var(--border)",
  background:"#F7FBF9",
  color:"var(--text)", fontSize:"15px",
  outline:"none", fontFamily:"var(--font-body)",
  transition:"all 0.2s", fontWeight:"500",
  ...extra,
});

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
      await (await token.approve(process.env.NEXT_PUBLIC_REMITTANCE_ADDRESS, amt)).wait();
      setStep(2);
      const tx = await remittance.sendRemittance(receiver, amt, category);
      const receipt = await tx.wait();
      setStep(3);
      const catLabel = CATS.find(c => c.id === category)?.label || "Other";
      await supabase.from("remittances").insert({
        tx_hash: receipt.hash, sender: address.toLowerCase(),
        receiver: receiver.toLowerCase(), amount: parseFloat(amount),
        category, category_label: catLabel,
        timestamp_chain: Math.floor(Date.now() / 1000),
      });
      setStep(4); setTxHash(receipt.hash); setStatus("done");
      setReceiver(""); setAmount("");
      setTimeout(() => setStep(0), 5000);
    } catch (e) {
      setStatus("error:" + (e.reason || e.message)); setStep(0);
    } finally { setSending(false); }
  }

  if (!address) return (
    <div>
      <p style={{ fontSize:"15px", color:"var(--text-dim)", marginBottom:"20px", lineHeight:"1.65", fontFamily:"var(--font-body)" }}>
        Connect your MetaMask wallet to start sending money to your family in the Philippines.
      </p>
      <button onClick={connect} disabled={loading} style={{
        width:"100%", padding:"17px", borderRadius:"14px",
        background:"linear-gradient(135deg, #00B67A, #008C5C)",
        color:"#fff", border:"none", fontSize:"16px", fontWeight:"700",
        cursor:"pointer", fontFamily:"var(--font-display)",
        boxShadow:"0 6px 20px rgba(0,182,122,0.35)", transition:"all 0.2s",
        letterSpacing:"-0.2px",
      }}>
        {loading ? "Connecting…" : "🔗 Connect MetaMask"}
      </button>
    </div>
  );

  if (!isCorrectNetwork) return (
    <div style={{ padding:"20px", borderRadius:"16px", background:"#FFFBEB", border:"2px solid #FDE68A" }}>
      <div style={{ fontSize:"18px", marginBottom:"8px" }}>⚠️</div>
      <div style={{ fontSize:"16px", fontWeight:"700", color:"#92400E", marginBottom:"6px", fontFamily:"var(--font-display)" }}>Wrong Network</div>
      <div style={{ fontSize:"14px", color:"#78350F", fontFamily:"var(--font-body)", lineHeight:"1.6" }}>
        Please switch to the <strong>Morph Hoodi</strong> network in MetaMask to continue.
      </div>
    </div>
  );

  const selectedCat = CATS.find(c => c.id === category);

  return (
    <div>
      {/* Wallet pill */}
      <div style={{
        display:"inline-flex", alignItems:"center", gap:"8px",
        fontSize:"13px", color:"var(--green)", background:"var(--green-light)",
        border:"1.5px solid var(--green-border)",
        padding:"7px 16px", borderRadius:"24px", marginBottom:"22px",
        fontWeight:"700", fontFamily:"var(--font-body)",
      }}>
        <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"var(--green)", display:"inline-block", boxShadow:"0 0 6px rgba(0,182,122,0.7)" }}/>
        Wallet: {address.slice(0,6)}…{address.slice(-4)}
      </div>

      {/* Receiver */}
      <div style={{ marginBottom:"16px" }}>
        <label style={{ display:"block", fontSize:"13px", fontWeight:"700", color:"var(--text-dim)", marginBottom:"8px", fontFamily:"var(--font-body)" }}>
          Recipient's Wallet Address
        </label>
        <input style={inp()} placeholder="0x… paste your family member's address"
          value={receiver} onChange={e => setReceiver(e.target.value)} />
      </div>

      {/* Amount */}
      <div style={{ marginBottom:"20px" }}>
        <label style={{ display:"block", fontSize:"13px", fontWeight:"700", color:"var(--text-dim)", marginBottom:"8px", fontFamily:"var(--font-body)" }}>
          Amount to Send
        </label>
        <div style={{ display:"flex", gap:"10px" }}>
          <input style={inp({ flex:1 })} placeholder="e.g. 1000"
            type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} />
          <div style={{
            padding:"15px 18px", borderRadius:"14px", fontSize:"16px",
            background:"#F0FBF6", border:"1.5px solid var(--border)",
            color:"var(--green)", whiteSpace:"nowrap",
            fontFamily:"var(--font-display)", fontWeight:"800", letterSpacing:"-0.3px",
          }}>
            ≈ ₱{amount ? Math.round(parseFloat(amount)*57).toLocaleString() : "0"}
          </div>
        </div>
      </div>

      {/* Category */}
      <div style={{ marginBottom:"22px" }}>
        <label style={{ display:"block", fontSize:"13px", fontWeight:"700", color:"var(--text-dim)", marginBottom:"10px", fontFamily:"var(--font-body)" }}>
          What is this money for?
        </label>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px" }}>
          {CATS.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)} style={{
              padding:"14px 6px", borderRadius:"14px",
              cursor:"pointer", fontFamily:"var(--font-body)", fontWeight:"700",
              border: category===c.id ? `2px solid ${c.border}` : "1.5px solid var(--border)",
              background: category===c.id ? c.bg : "#F7FBF9",
              color: category===c.id ? c.color : "var(--text-muted)",
              transition:"all 0.15s",
              boxShadow: category===c.id ? `0 2px 10px ${c.bg}` : "none",
            }}>
              <div style={{ fontSize:"26px", marginBottom:"6px" }}>{c.emoji}</div>
              <div style={{ fontSize:"13px" }}>{c.label}</div>
              <div style={{ fontSize:"10px", fontWeight:"500", opacity:0.65, marginTop:"3px" }}>{c.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress steps */}
      {step > 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"6px", marginBottom:"16px" }}>
          {["Approving","Sending","Saving","Done!"].map((s, i) => (
            <div key={i} style={{
              padding:"9px 4px", borderRadius:"10px", textAlign:"center",
              fontSize:"11px", fontWeight:"700", fontFamily:"var(--font-body)",
              background: step > i ? "var(--green-light)" : "#F7FBF9",
              border: step > i ? "1.5px solid var(--green-border)" : "1.5px solid var(--border)",
              color: step > i ? "var(--green)" : "var(--text-muted)",
              transition:"all 0.3s",
            }}>
              {step > i ? "✓ " : `${i+1}. `}{s}
            </div>
          ))}
        </div>
      )}

      <button onClick={handleSend} disabled={sending || !receiver || !amount} style={{
        width:"100%", padding:"17px", borderRadius:"14px",
        background: sending ? "#E8FAF2"
          : (!receiver || !amount) ? "#F3F4F6"
          : "linear-gradient(135deg, #00B67A, #008C5C)",
        color: sending ? "var(--green)" : (!receiver || !amount) ? "#9CA3AF" : "#fff",
        border: sending ? "1.5px solid var(--green-border)" : "none",
        fontSize:"16px", fontWeight:"700",
        cursor:(sending || !receiver || !amount) ? "default" : "pointer",
        fontFamily:"var(--font-display)",
        transition:"all 0.2s", letterSpacing:"-0.2px",
        boxShadow:(!sending && receiver && amount) ? "0 6px 20px rgba(0,182,122,0.35)" : "none",
      }}>
        {sending ? `Processing… step ${step} of 3` : `Send ${selectedCat?.emoji} ${selectedCat?.label} Money →`}
      </button>

      {status === "done" && (
        <div style={{ marginTop:"16px", padding:"18px", borderRadius:"14px", background:"var(--green-light)", border:"2px solid var(--green-border)", fontFamily:"var(--font-body)" }}>
          <div style={{ fontSize:"16px", fontWeight:"800", color:"var(--green)", marginBottom:"5px", fontFamily:"var(--font-display)" }}>✓ Money sent successfully!</div>
          <div style={{ fontSize:"14px", color:"#166534" }}>Your family will receive it within seconds.</div>
        </div>
      )}

      {status.startsWith("error:") && (
        <div style={{ marginTop:"16px", padding:"16px", borderRadius:"14px", background:"#FEF2F2", border:"2px solid #FECACA", fontFamily:"var(--font-body)" }}>
          <div style={{ fontSize:"15px", fontWeight:"700", color:"#DC2626", marginBottom:"4px" }}>Something went wrong</div>
          <div style={{ fontSize:"13px", color:"#991B1B" }}>{status.replace("error:","")}</div>
        </div>
      )}

      {txHash && (
        <a href={`https://explorer-hoodi.morph.network/tx/${txHash}`} target="_blank" style={{
          display:"flex", alignItems:"center", justifyContent:"center", gap:"7px",
          marginTop:"14px", fontSize:"13px", color:"var(--blue)",
          textDecoration:"none", fontFamily:"var(--font-body)", fontWeight:"600",
        }}>
          🔗 View transaction on blockchain ↗
        </a>
      )}
    </div>
  );
}
