# PadalaChain

PadalaChain is a blockchain-powered cross-border remittance platform built on Morph Hoodi Testnet using ERC-20 smart contracts. The project helps Overseas Filipino Workers (OFWs) and Southeast Asian families send funds faster, cheaper, and with transparent budgeting tools.

## Problem

Millions of OFWs rely on traditional remittance services that:
- charge high transfer fees
- take hours or days to process
- provide little transparency
- lack financial budgeting support

PadalaChain solves this using blockchain-based remittances powered by Morph.

---

# Features

- ERC-20 mock stablecoin (mUSDC)
- Wallet-to-wallet remittance
- Budget categorization
- Family budgeting allocation
- On-chain remittance logs
- Faucet system for demo testing
- MetaMask wallet integration
- Morph Hoodi Testnet deployment

---

# Tech Stack

## Frontend
- Next.js
- Tailwind CSS
- ethers.js

## Blockchain
- Solidity
- OpenZeppelin ERC20
- Morph Hoodi Testnet

## Wallet
- MetaMask

## Development Tools
- Remix IDE

---

# Smart Contracts

## PadalaToken.sol
Mock ERC-20 stablecoin used for remittance transfers.

### Functions
- `faucet()`
- `mint()`
- `approve()`
- `transfer()`

---

## PadalaRemittance.sol
Main remittance smart contract.

### Features
- Send remittances
- Categorize payments
- Store remittance logs
- Budget allocation system

### Categories
| ID | Category |
|----|----------|
| 1 | Tuition |
| 2 | Bills |
| 3 | Food |
| 4 | Medical |

---

# Architecture

```text
OFW Sender
   ↓
MetaMask Wallet
   ↓
Next.js Frontend
   ↓
PadalaRemittance Contract
   ↓
PadalaToken ERC20
   ↓
Morph Hoodi Testnet
   ↓
Receiver Wallet
```

---

# Smart Contract Flow

1. User connects MetaMask
2. User claims demo mUSDC from faucet
3. User approves remittance contract
4. User sends remittance
5. ERC20 tokens transfer to receiver
6. Transaction logs stored on-chain
7. Receiver views remittance history

---

# Morph Network Configuration

## RPC URL
```bash
https://rpc-hoodi.morph.network
```

## Chain ID
```bash
2910
```

## Currency Symbol
```bash
ETH
```

## Block Explorer
```bash
https://explorer-hoodi.morph.network
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/padalachain.git
cd padalachain
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# Deploy Smart Contracts

## Using Remix IDE

1. Open Remix IDE
2. Compile `PadalaToken.sol`
3. Deploy token contract
4. Copy token contract address
5. Compile `PadalaRemittance.sol`
6. Deploy remittance contract using token address

---

# Demo Workflow

## Sender
- Connect wallet
- Claim faucet tokens
- Approve remittance contract
- Send categorized remittance

## Receiver
- Receive mUSDC
- View remittance logs
- Track budgeting categories

---

# Why It Matters

PadalaChain demonstrates how blockchain can improve financial accessibility in the Philippines and Southeast Asia by reducing remittance friction and increasing transparency for OFW families.

---

# Future Improvements

- QR remittance claiming
- Real stablecoin integration
- GCash cash-out support
- AI budgeting insights
- Scheduled remittance automation
- Multi-language support

---

# Team

Built for the Morph Hackathon.

---

# License

MIT License
