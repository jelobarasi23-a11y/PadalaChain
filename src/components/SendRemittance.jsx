"use client";
import { useState } from "react";
import { ethers }  from "ethers";
import { useWallet }         from "../hooks/useWallet";
import { getSignedContracts } from "../lib/contracts";

const CATEGORIES = [
  { id: 1, label: "Tuition"  },
  { id: 2, label: "Bills"    },
  { id: 3, label: "Food"     },
  { id: 4, label: "Medical"  },
];

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
      setSending(true); setStatus("Connecting wallet..."); setTxHash("");
      const { token, remittance } = await getSignedContracts();
      const amt = ethers.parseUnits(amount, 18);

      // Step 1: approve
      setStatus("Step 1/2 — Approving tokens (confirm in MetaMask)...");
      const approveTx = await token.approve(
        process.env.NEXT_PUBLIC_REMITTANCE_ADDRESS, amt
      );
      await approveTx.wait();

      // Step 2: send
      setStatus("Step 2/2 — Sending remittance (confirm in MetaMask)...");
      const sendTx = await remittance.sendRemittance(
        receiver, amt, category
      );
      await sendTx.wait();

      setTxHash(sendTx.hash);
      setStatus("Remittance sent on-chain!");
    } catch (e) {
      setStatus("Error: " + (e.reason || e.message));
    } finally {
      setSending(false);
    }
  }

  if (!address) return (
    <button onClick={connect} disabled={loading}>
      {loading ? "Connecting..." : "Connect MetaMask"}
    </button>
  );

  if (!isCorrectNetwork) return (
    <p>Switch MetaMask to Morph Hoodi Testnet (Chain 2810)</p>
  );

  return (
    <div>
      <p>Connected: {address.slice(0,6)}...{address.slice(-4)}</p>
      <input placeholder="Receiver address"
             value={receiver} onChange={e => setReceiver(e.target.value)} />
      <input placeholder="Amount (mUSDC)" type="number"
             value={amount}   onChange={e => setAmount(e.target.value)} />
      <select value={category} onChange={e => setCategory(Number(e.target.value))}>
        {CATEGORIES.map(c => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>
      <button onClick={handleSend} disabled={sending}>
        {sending ? "Sending..." : "Send on-chain"}
      </button>
      {status  && <p>{status}</p>}
      {txHash  && <a href={`https://explorer-hoodi.morph.network/tx/${txHash}`}
                      target="_blank">View on explorer</a>}
    </div>
  );
}