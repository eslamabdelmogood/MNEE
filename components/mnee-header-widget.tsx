"use client"

import { Wallet, Network, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function MNEEHeaderWidget() {
  const [copied, setCopied] = useState(false)
  const walletAddress = "0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF"

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-6 px-6 py-3 bg-mnee-bg border border-mnee-border rounded-lg">
      {/* Network Status */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-mnee-green animate-pulse" />
          <span className="text-xs font-mono font-bold text-mnee-green uppercase tracking-wider">MNEE Network</span>
        </div>
        <span className="text-xs text-mnee-text font-mono">Connected</span>
      </div>

      <div className="h-6 w-px bg-mnee-border" />

      {/* Wallet Address */}
      <div className="flex items-center gap-3">
        <Wallet className="h-4 w-4 text-mnee-cyan" />
        <div className="flex flex-col gap-0.5">
          <p className="text-xs text-mnee-text/60 font-mono uppercase tracking-wider">Wallet Address</p>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono text-mnee-cyan font-semibold">{walletAddress}</code>
            <Button variant="ghost" size="sm" onClick={handleCopy} className="h-5 w-5 p-0 hover:bg-mnee-cyan/10">
              {copied ? (
                <Check className="h-3.5 w-3.5 text-mnee-green" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-mnee-text/60" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="h-6 w-px bg-mnee-border" />

      {/* MNEE Info */}
      <div className="flex items-center gap-3">
        <Network className="h-4 w-4 text-mnee-green" />
        <div className="flex flex-col gap-0.5">
          <p className="text-xs text-mnee-text/60 font-mono uppercase tracking-wider">MNEE Balance</p>
          <p className="text-sm font-mono font-bold text-mnee-green">2,450,000 MNEE</p>
        </div>
      </div>
    </div>
  )
}
