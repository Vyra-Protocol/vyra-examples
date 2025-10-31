"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { Vyra } from "@vyra/sdk";
import { useState } from "react";

export default function Paywall() {
  const { publicKey, signTransaction } = useWallet();
  const [status, setStatus] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  async function run() {
    try {
      if (!publicKey || !signTransaction) { setStatus("Connect wallet"); return; }
      setStatus("Processing…");
      const res = await Vyra.payVerifyAccess({
        endpoint: "/api/article?id=42",
        cfg: { apiBase: "/api", receiver: process.env.NEXT_PUBLIC_VYRA_RECEIVER! },
        wallet: { publicKey, signTransaction } as any
      });
      if (res.ok) setUnlocked(true);
      setStatus("✅ Unlocked");
    } catch (e:any) {
      setStatus(`❌ ${e.message || "Failed"}`);
    }
  }

  if (unlocked) return <div className="text-amber-400 text-lg">✨ Access granted via Vyra</div>;

  return (
    <div className="text-center">
      <button
        onClick={run}
        className="px-6 py-3 rounded-xl font-semibold text-black"
        style={{ background: "linear-gradient(135deg,#9B6BFF,#C471F5)" }}
      >
        Pay & Access
      </button>
      <p className="text-sm text-neutral-400 mt-3">{status}</p>
    </div>
  );
}
