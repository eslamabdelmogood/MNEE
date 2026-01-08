"use client"

import { Wallet, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function WalletWidget() {
  const [copied, setCopied] = useState(false)
  const walletAddress = "0x8cce4c8a6b37Ee4a0D2fB48b4C2FD6cF"
  const mneeBalance = "2,450,000.00"

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-muted/40 rounded-sm border border-border">
      <div className="flex items-center gap-2">
        <Wallet className="h-4 w-4 text-terminal-cyan" />
        <span className="terminal-heading text-[10px] text-muted-foreground">MNEE WALLET</span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex flex-col">
        <span className="text-[10px] terminal-text text-muted-foreground">Balance</span>
        <span className="terminal-number text-sm font-bold text-terminal-green">{mneeBalance} MNEE</span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] terminal-text text-muted-foreground">Address</span>
          <span className="terminal-number text-xs text-terminal-cyan font-mono">{walletAddress}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleCopy} title="Copy wallet address">
          {copied ? <Check className="h-3.5 w-3.5 text-terminal-green" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
    </div>
  )
}
