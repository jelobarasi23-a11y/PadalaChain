"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [address,  setAddress]  = useState(null);
  const [chainId,  setChainId]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const MORPH_CHAIN_ID = 2910;

  async function connect() {
    try {
      setLoading(true); setError(null);
      if (!window.ethereum) throw new Error("Install MetaMask first");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const network  = await provider.getNetwork();

      setAddress(accounts[0]);
      setChainId(Number(network.chainId));

      if (Number(network.chainId) !== MORPH_CHAIN_ID) {
        setError("Switch MetaMask to Morph Hoodi (Chain 2910)");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Auto-reconnect if already connected
  useEffect(() => {
    if (window.ethereum?.selectedAddress) connect();
    window.ethereum?.on("accountsChanged", connect);
    window.ethereum?.on("chainChanged",    connect);
    return () => {
      window.ethereum?.removeListener("accountsChanged", connect);
      window.ethereum?.removeListener("chainChanged",    connect);
    };
  }, []);

  const isCorrectNetwork = chainId === MORPH_CHAIN_ID;
  return { address, chainId, isCorrectNetwork, loading, error, connect };
}