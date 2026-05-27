# PadalaChain 🇵🇭

> Cross-border OFW remittance with on-chain transparency and family budget tracking — powered by Morph L2.

---

## What is PadalaChain?

PadalaChain is a blockchain-based remittance application built for Overseas Filipino Workers (OFWs). It lets senders transfer a mock stablecoin (mUSDC) to family wallets with category tagging (Tuition, Bills, Food, Medical), while the family can view all incoming transfers with full on-chain proof.

Built for hackathon demo on **Morph Hoodi Testnet**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Blockchain | Morph Hoodi Testnet (Chain 2910) |
| Smart Contracts | Solidity 0.8.20 + OpenZeppelin |
| Token Standard | ERC-20 (mock stablecoin — mUSDC) |
| Contract IDE | Remix IDE |
| Frontend | Next.js 16 + Tailwind CSS |
| Wallet | MetaMask + ethers.js v6 |

---

## Smart Contracts

### PadalaToken.sol
Mock ERC-20 stablecoin representing mUSDC.

| Function | Description |
|---|---|
| `faucet()` | Mint 500 mUSDC to caller — for demo use |
| `approve(spender, amount)` | Authorize remittance contract to spend tokens |
| `mint(address, amount)` | Owner-only mint |

### PadalaRemittance.sol
Core remittance logic.

| Function | Description |
|---|---|
| `sendRemittance(receiver, amount, category)` | Transfer tokens with category log |
| `getMyLogs(address)` | Read all remittances for a receiver |
| `setBudget(tuition, bills, food, medical)` | Set family budget split (must sum to 100) |
| `totalLogs()` | Total remittances ever sent |

**Category IDs:** `1` = Tuition · `2` = Bills · `3` = Food · `4` = Medical

---

## Project Structure

```
padalachain-frontend/
├── src/
│   ├── app/
│   │   ├── page.js          # Main page layout
│   │   ├── layout.js        # Root layout
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── SendRemittance.jsx    # OFW send form
│   │   └── FamilyDashboard.jsx  # Family receiver view
│   ├── hooks/
│   │   └── useWallet.js     # MetaMask connection hook
│   └── lib/
│       ├── contracts.js     # Contract instances
│       └── abi/
│           ├── PadalaToken.json
│           └── PadalaRemittance.json
├── .env.local               # Contract addresses (never commit)
└── package.json
```

---

## Getting Started

### 1. Prerequisites

- Node.js 18+
- MetaMask browser extension
- Morph Hoodi Testnet added to MetaMask

### 2. Add Morph Hoodi to MetaMask

| Field | Value |
|---|---|
| Network name | Morph Hoodi |
| RPC URL | https://rpc-hoodi.morph.network |
| Chain ID | 2910 |
| Currency symbol | ETH |
| Block explorer | https://explorer-hoodi.morph.network |

### 3. Clone and install

```bash
git clone https://github.com/yourusername/padalachain-frontend
cd padalachain-frontend
npm install
```

### 4. Configure environment

Create `.env.local` in the project root — **no spaces after `=`**:

```env
NEXT_PUBLIC_TOKEN_ADDRESS=0xYourPadalaTokenAddress
NEXT_PUBLIC_REMITTANCE_ADDRESS=0xYourPadalaRemittanceAddress
NEXT_PUBLIC_CHAIN_ID=2910
NEXT_PUBLIC_RPC_URL=https://rpc-hoodi.morph.network
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Demo Flow

```
1. Open localhost:3000
2. Click "Connect MetaMask" → approve connection
3. Make sure MetaMask is on Morph Hoodi (Chain 2910)
4. In Remix IDE → call faucet() on PadalaToken → get 500 mUSDC
5. Fill in receiver address, amount (e.g. 200), select category
6. Click "Send on-chain"
   → MetaMask popup 1: Approve tokens
   → MetaMask popup 2: Send remittance
7. Click "Load remittances" in Family Dashboard
   → Your on-chain log appears!
```

---

## Deployed Contracts (Morph Hoodi)

| Contract | Address |
|---|---|
| PadalaToken (mUSDC) | `0xb1B20A4521919C38Cd84579D913C59a32B3A0510` |
| PadalaRemittance | `0x4dC94C0e9Dc6a6C98862898282418e451Fa636Ad` |

View on [Morph Hoodi Explorer](https://explorer-hoodi.morph.network)

---

## Key Hackathon Points

- **Real-world problem** — OFWs lose ~₱1,500 per ₱48,500 remittance to fees. PadalaChain reduces this to ~₱240.
- **On-chain transparency** — Every transfer is logged as a `RemittanceLog` struct with sender, receiver, amount, category, and timestamp.
- **Category tracking** — Families can see exactly what each remittance is for — Tuition, Bills, Food, or Medical.
- **Morph L2** — Fast settlement (< 15s), low gas, EVM-compatible.

---

## Pitch Narrative

> "Millions of OFWs lose money to expensive remittance fees and have no visibility into how funds are used by their families. PadalaChain uses ERC-20 stablecoins on Morph to enable faster, cheaper, and transparent remittances — with built-in family budget tracking that shows every peso's purpose."

---

## License

MIT — built for hackathon purposes. Not for production use.
