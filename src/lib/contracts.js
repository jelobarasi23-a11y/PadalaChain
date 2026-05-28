import { ethers } from "ethers";
import PadalaTokenABI from "./abi/PadalaToken.json";
import RemittanceABI  from "./abi/PadalaRemittance.json";

const TOKEN_ADDR      = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;
const REMITTANCE_ADDR = process.env.NEXT_PUBLIC_REMITTANCE_ADDRESS;

const MORPH_NETWORK = {
  chainId: 2910,
  name: "morph-hoodi",
  ensAddress: null,
};

export function getReadContracts() {
  const provider = new ethers.BrowserProvider(window.ethereum, MORPH_NETWORK);
  return {
    token:      new ethers.Contract(TOKEN_ADDR,      PadalaTokenABI, provider),
    remittance: new ethers.Contract(REMITTANCE_ADDR, RemittanceABI,  provider),
  };
}

export async function getSignedContracts() {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.BrowserProvider(window.ethereum, MORPH_NETWORK);
  const signer   = await provider.getSigner();
  return {
    token:      new ethers.Contract(TOKEN_ADDR,      PadalaTokenABI, signer),
    remittance: new ethers.Contract(REMITTANCE_ADDR, RemittanceABI,  signer),
    signer,
  };
}