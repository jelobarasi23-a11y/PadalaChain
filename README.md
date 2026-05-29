# PadalaChain 🇵🇭

> Cross-border OFW remittance with on-chain transparency, category budgeting, and real-time family dashboard — powered by Morph L2.

🔗 **Live Demo:** [padala-chain.vercel.app](https://padala-chain.vercel.app)
📜 **Explorer:** [explorer-hoodi.morph.network](https://explorer-hoodi.morph.network)

---

## Pitch

Over 10 million Overseas Filipino Workers send $36 billion home annually — losing up to ₱1,500 per transfer in fees to traditional services like Western Union and GCash. Families receive money with no visibility into what it is for or how to manage it.

PadalaChain solves this using ERC-20 smart contracts on Morph L2. OFWs connect their MetaMask wallet, tag each transfer with a purpose — Tuition, Bills, Food, or Medical — and send funds on-chain in under 15 seconds at a fraction of the cost. Every transaction is logged immutably on the blockchain and saved to a Supabase database, so families can open their dashboard and see exactly what arrived, when, and why.

This is not just a cheaper wire transfer. It is financial transparency for families who have never had it — powered by blockchain, built for the people who need it most.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  USER LAYER                                                  │
│  ┌──────────────────┐              ┌──────────────────────┐  │
│  │   OFW Sender     │              │   Family Receiver    │  │
│  │  MetaMask · 2910 │              │  Dashboard · read    │  │
│  └────────┬─────────┘              └──────────┬───────────┘  │
└───────────┼──────────────────────────────────┼──────────────┘
            │                                  │
┌───────────┼──────────────────────────────────┼──────────────┐
│  FRONTEND LAYER                              │              │
│  ┌────────▼──────────────┐   saves   ┌──────▼────────────┐  │
│  │  Next.js 16 + ethers  │ ────────► │  Supabase client  │  │
│  │  Tailwind · Vercel    │           │  reads remittances │  │
│  └────────┬──────────────┘           └──────┬────────────┘  │
└───────────┼────────────────────────────────┼───────────────┘
            │ approve + send                 │ reads
┌───────────┼────────────────────────────────┼───────────────┐
│  BLOCKCHAIN LAYER                          │               │
│  ┌────────▼──────────┐  ┌──────────────────▼────────────┐  │
│  │  PadalaToken.sol  │  │    PadalaRemittance.sol        │  │
│  │  ERC-20 · mUSDC   │  │  sendRemittance · getMyLogs   │  │
│  │  faucet()         │  │  category log · on-chain       │  │
│  └────────┬──────────┘  └──────────────┬─────────────────┘  │
└───────────┼────────────────────────────┼───────────────────┘
            │                            │
┌───────────▼────────────────────────────▼───────────────────┐
│  INFRA LAYER                                                │
│  ┌──────────────────────────┐  ┌──────────────────────────┐ │
│  │    Morph Hoodi L2        │  │       Supabase DB        │ │
│  │  Chain 2910 · < 15s      │  │  remittances table       │ │
│  └──────────────────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Live Deployment

| Resource | Link |
|---|---|
| Frontend | [padala-chain.vercel.app](https://padala-chain.vercel.app) |
| PadalaToken (mUSDC) | `0xb1B20A4521919C38Cd84579D913C59a32B3A0510` |
| PadalaRemittance | `0x4dC94C0e9Dc6a6C98862898282418e451Fa636Ad` |
| Network | Morph Hoodi Testnet · Chain ID 2910 |
| Explorer | [explorer-hoodi.morph.network](https://explorer-hoodi.morph.network) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Blockchain | Morph Hoodi Testnet (Chain 2910) |
| Smart Contracts | Solidity 0.8.20 + OpenZeppelin v5 |
| Token Standard | ERC-20 (mock stablecoin — mUSDC) |
| Contract IDE | Remix IDE |
| Frontend | Next.js 16 + Tailwind CSS |
| Wallet | MetaMask + ethers.js v6 |
| Database | Supabase (off-chain metadata) |
| Deployment | Vercel |

---

## Smart Contracts

### PadalaToken.sol — Mock Stablecoin (mUSDC)

| Function | Description |
|---|---|
| `faucet()` | Mint 500 mUSDC to caller — for demo |
| `approve(spender, amount)` | Authorize remittance contract |
| `mint(address, amount)` | Owner-only mint |

### PadalaRemittance.sol — Core Logic

| Function | Description |
|---|---|
| `sendRemittance(receiver, amount, category)` | Transfer + log on-chain |
| `getMyLogs(address)` | Read all remittances for a receiver |
| `setBudget(tuition, bills, food, medical)` | Set family budget split |
| `totalLogs()` | Total remittances ever sent |

**Category IDs:** `1` Tuition 🎓 · `2` Bills 🏠 · `3` Food 🍚 · `4` Medical 💊

---

## Getting Started

### Add Morph Hoodi to MetaMask

| Field | Value |
|---|---|
| Network name | Morph Hoodi |
| RPC URL | `https://rpc-hoodi.morph.network` |
| Chain ID | `2910` |
| Currency symbol | ETH |
| Block explorer | `https://explorer-hoodi.morph.network` |

### Install & Run

```bash
git clone https://github.com/jelobarasi23-a11y/PadalaChain.git
cd PadalaChain
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_TOKEN_ADDRESS=0xb1B20A4521919C38Cd84579D913C59a32B3A0510
NEXT_PUBLIC_REMITTANCE_ADDRESS=0x4dC94C0e9Dc6a6C98862898282418e451Fa636Ad
NEXT_PUBLIC_CHAIN_ID=2910
NEXT_PUBLIC_RPC_URL=https://rpc-hoodi.morph.network
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

```bash
npm run dev
```

### Supabase Setup

1. Create project at [supabase.com](https://supabase.com) — Singapore region
2. SQL Editor → paste `schema.sql` → Run
3. Copy URL and anon key → add to `.env.local`

---

## Demo Flow

```
1. Open padala-chain.vercel.app
2. Connect MetaMask on Morph Hoodi (Chain 2910)
3. Call faucet() in Remix → get 500 mUSDC
4. Fill receiver + amount + category → Send on-chain
   → MetaMask popup 1: Approve mUSDC
   → MetaMask popup 2: Send remittance
5. Confirmed on Morph Hoodi in < 15s
6. Auto-saved to Supabase
7. Family loads dashboard → sees real-time log
```

---

## Fee Comparison

| Service | Fee on ₱48,500 | Speed |
|---|---|---|
| Western Union | ₱1,500 | 1–3 days |
| GCash Padala | ₱1,200 | Hours |
| **PadalaChain** | **₱240** | **< 15 seconds** |
| **Savings** | **₱1,260 (84%)** | — |

---

## Roadmap

| Feature | Status |
|---|---|
| ERC-20 mock stablecoin (mUSDC) | ✅ Live |
| On-chain remittance logging | ✅ Live |
| Category tagging (4 types) | ✅ Live |
| MetaMask + ethers.js v6 | ✅ Live |
| Supabase off-chain metadata | ✅ Live |
| Vercel deployment | ✅ Live |
| Family dashboard + breakdown | ✅ Live |
| Scheduled remittance | 🔜 Planned |
| Real stablecoin (USDC) | 🔜 Planned |
| QR code for receiver | 🔜 Planned |
| AI budgeting insights | 🔜 Planned |
| Mobile app | 🔜 Planned |

---

## License

MIT — built for the Morph Hackathon.

---

*Built with ❤️ for OFW families 🇵🇭*
