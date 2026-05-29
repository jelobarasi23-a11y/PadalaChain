"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "What is PadalaChain?",
    a: "PadalaChain is a blockchain-powered remittance platform built specifically for Filipino Overseas Filipino Workers (OFWs). It lets you send money home on the Morph L2 blockchain — faster and cheaper than any traditional service.",
    cat: "General",
  },
  {
    q: "How much does it cost to send money?",
    a: "PadalaChain charges approximately ₱240 per transfer — compared to ₱1,200–₱1,500 charged by Western Union, GCash, or bank wire transfers. That's an average saving of ₱1,260 per transaction.",
    cat: "Fees",
  },
  {
    q: "How fast are transfers?",
    a: "Transfers are confirmed on the Morph L2 blockchain in under 15 seconds. This is orders of magnitude faster than traditional bank wires which can take 1–3 business days.",
    cat: "Speed",
  },
  {
    q: "What is mUSDC?",
    a: "mUSDC (mock USDC) is the test stablecoin used on PadalaChain's demo. It simulates a USD-pegged stablecoin for development purposes. In production, this would be replaced by a real stablecoin like USDC.",
    cat: "Tokens",
  },
  {
    q: "Is this real money?",
    a: "Currently, PadalaChain runs on the Morph Hoodi testnet, so no real money is involved. This is a demonstration and hackathon project. Future plans include integrating real stablecoins on mainnet.",
    cat: "General",
  },
  {
    q: "What wallet do I need?",
    a: "You need MetaMask — the most popular Ethereum wallet, available as a browser extension. You also need to add the Morph Hoodi network (Chain ID 2910) to your MetaMask. Our 'How It Works' guide walks you through this.",
    cat: "Wallet",
  },
  {
    q: "What are the spending categories?",
    a: "PadalaChain has four categories: 🎓 Tuition (school fees), 🏠 Bills (rent & utilities), 🍚 Food (groceries & meals), and 💊 Medical (health & medicine). Tagging your transfers lets your family see exactly what the money is for.",
    cat: "Features",
  },
  {
    q: "Can my family see the transfers?",
    a: "Yes! The Family Dashboard lets your family load all received transfers filtered by their wallet address. They can see the amount, category, timestamp, and a link to the blockchain explorer to verify the transaction themselves.",
    cat: "Features",
  },
  {
    q: "What is Morph L2?",
    a: "Morph is a Layer 2 blockchain built on top of Ethereum. It offers much lower gas fees and faster transaction speeds than Ethereum mainnet, making it ideal for everyday transfers. PadalaChain uses Morph Hoodi testnet (Chain 2910).",
    cat: "Blockchain",
  },
  {
    q: "Is PadalaChain secure?",
    a: "Smart contracts are deployed on Morph L2 and all transactions are immutably recorded on-chain. MetaMask handles wallet security. The contracts use OpenZeppelin's audited ERC-20 standard. That said, this is a testnet project — use it responsibly.",
    cat: "Security",
  },
  {
    q: "How do I get test mUSDC?",
    a: "You can mint 500 mUSDC for free by calling the faucet() function on the PadalaToken contract using Remix IDE. Connect MetaMask to Remix, select the Morph Hoodi network, load the contract ABI, and call faucet().",
    cat: "Tokens",
  },
  {
    q: "Where can I view my transactions?",
    a: "Every transaction is logged on Morph Hoodi blockchain explorer at explorer-hoodi.morph.network. The Family Dashboard also shows all transfers for a given wallet address pulled from Supabase.",
    cat: "General",
  },
];

const CATS = ["All", "General", "Fees", "Speed", "Tokens", "Wallet", "Features", "Blockchain", "Security"];

export default function FAQPage() {
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = FAQS.filter(f =>
    (filter === "All" || f.cat === filter) &&
    (search === "" || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "80px" }}>

      {/* HEADER */}
      <div style={{ background: "#163300", color: "#fff", padding: "56px 28px 64px" }}>
        <div className="page-container fade-up fade-up-1">
          <div className="section-tag" style={{ background: "rgba(0,182,122,0.15)", border: "1.5px solid rgba(0,182,122,0.3)", color: "#9EE8C3" }}>
            ❓ Got questions?
          </div>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "800", fontFamily: "var(--font-display)", letterSpacing: "-1px", color: "#fff", marginBottom: "16px", lineHeight: 1.1 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7", maxWidth: "560px", fontFamily: "var(--font-body)", margin: 0 }}>
            Everything you need to know about PadalaChain, fees, blockchain, and how transfers work.
          </p>
        </div>
      </div>

      <div className="page-container" style={{ marginTop: "48px" }}>

        {/* Search */}
        <div className="fade-up fade-up-1" style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="🔍  Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "16px 20px", borderRadius: "16px",
              border: "2px solid var(--border)", background: "#fff",
              fontSize: "15px", fontFamily: "var(--font-body)", color: "var(--text)",
              outline: "none", transition: "border-color 0.2s",
            }}
          />
        </div>

        {/* Category filter */}
        <div className="fade-up fade-up-2" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
          {CATS.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: "8px 18px", borderRadius: "24px", cursor: "pointer",
              fontSize: "13px", fontWeight: "700", fontFamily: "var(--font-body)",
              border: filter === cat ? "2px solid var(--green-border)" : "2px solid var(--border)",
              background: filter === cat ? "var(--green-light)" : "#fff",
              color: filter === cat ? "var(--green)" : "var(--text-dim)",
              transition: "all 0.18s",
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="fade-up fade-up-3" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center", border: "2px dashed var(--border)", borderRadius: "20px", background: "#fff" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔍</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-display)", marginBottom: "6px" }}>No results found</div>
              <div style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Try a different search term or category.</div>
            </div>
          ) : (
            filtered.map((faq, i) => (
              <div key={i} style={{
                background: "#fff", border: open === i ? "2px solid var(--green-border)" : "2px solid var(--border)",
                borderRadius: "16px", overflow: "hidden", transition: "border-color 0.2s",
              }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: "100%", padding: "20px 24px", background: "none", border: "none",
                  cursor: "pointer", textAlign: "left",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{
                      fontSize: "11px", fontWeight: "800", padding: "4px 10px", borderRadius: "12px",
                      background: "var(--green-light)", color: "var(--green)", fontFamily: "var(--font-body)",
                      whiteSpace: "nowrap", flexShrink: 0,
                    }}>
                      {faq.cat}
                    </span>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-display)" }}>
                      {faq.q}
                    </span>
                  </div>
                  <span style={{
                    fontSize: "18px", color: "var(--green)", flexShrink: 0,
                    transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s",
                    display: "inline-block",
                  }}>+</span>
                </button>
                {open === i && (
                  <div style={{ padding: "0 24px 22px", borderTop: "1.5px solid var(--border)" }}>
                    <p style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: "1.75", fontFamily: "var(--font-body)", margin: "16px 0 0" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still have questions */}
        <div className="fade-up fade-up-5" style={{ marginTop: "40px", padding: "36px", background: "#fff", borderRadius: "20px", border: "1.5px solid var(--border)", textAlign: "center" }}>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--text)", fontFamily: "var(--font-display)", letterSpacing: "-0.3px", marginBottom: "10px" }}>
            Still have questions?
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: "var(--font-body)", marginBottom: "20px" }}>
            We&apos;re happy to help. Reach out through our contact page.
          </p>
          <a href="/contact" style={{
            display: "inline-block", padding: "13px 28px", borderRadius: "12px",
            background: "linear-gradient(135deg, #00B67A, #008C5C)",
            color: "#fff", textDecoration: "none",
            fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-display)",
            boxShadow: "0 4px 14px rgba(0,182,122,0.3)",
          }}>
            Contact Us →
          </a>
        </div>
      </div>
    </main>
  );
}
