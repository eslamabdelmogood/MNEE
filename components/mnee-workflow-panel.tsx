"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Link2, Zap, Coins } from "lucide-react"
import { useState } from "react"

export function MNEEWorkflowPanel() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="p-6 bg-mnee-bg/50 border-mnee-border hover:border-mnee-cyan/40 transition-all">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between p-0 h-auto hover:bg-transparent"
      >
        <div className="flex items-center gap-3">
          <Link2 className="h-5 w-5 text-mnee-cyan" />
          <h4 className="font-mono font-bold text-mnee-cyan text-sm uppercase">How MNEE Automation Works</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-mnee-text/60" />
        ) : (
          <ChevronDown className="h-5 w-5 text-mnee-text/60" />
        )}
      </Button>

      {isExpanded && (
        <div className="mt-6 space-y-6 border-t border-mnee-border/30 pt-6">
          {/* Layer 1: Instruction Layer */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-mnee-cyan/20 border border-mnee-cyan/40 flex-shrink-0">
                <span className="text-xs font-bold text-mnee-cyan">1</span>
              </div>
              <div className="flex-1">
                <h5 className="font-mono font-bold text-mnee-text text-sm uppercase mb-1">
                  Instruction Layer: LoanJSON
                </h5>
                <p className="text-xs text-mnee-text/70 leading-relaxed">
                  The loan covenant and payment schedule are encoded into LoanJSON—a machine-readable format that
                  defines
                  <span className="font-semibold"> when</span>, <span className="font-semibold">how much</span>, and{" "}
                  <span className="font-semibold">to whom</span> payments must be executed. No manual intervention
                  required.
                </p>
              </div>
            </div>
          </div>

          {/* Arrow connecting layers */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-mnee-green/60 font-mono text-xs uppercase">
              <div className="h-px w-8 bg-mnee-green/30" />
              <Zap className="h-3.5 w-3.5" />
              <div className="h-px w-8 bg-mnee-green/30" />
            </div>
          </div>

          {/* Layer 2: Execution Layer */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-mnee-green/20 border border-mnee-green/40 flex-shrink-0">
                <span className="text-xs font-bold text-mnee-green">2</span>
              </div>
              <div className="flex-1">
                <h5 className="font-mono font-bold text-mnee-text text-sm uppercase mb-1">
                  Execution Layer: MNEE Stablecoin
                </h5>
                <p className="text-xs text-mnee-text/70 leading-relaxed">
                  MNEE stablecoin (1:1 EUR peg) is deployed as the settlement currency. Smart contracts read the
                  LoanJSON instructions and automatically trigger disbursements and repayments at scheduled intervals.
                  Every transaction is recorded on-chain for complete audit trails.
                </p>
                <div className="mt-2 flex items-center gap-2 text-mnee-green text-xs font-mono">
                  <Coins className="h-3.5 w-3.5" />
                  <span>Contract: 0x4c9bAe6798a0E6809c48704ee8147857Fd6e565d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow connecting layers */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-mnee-green/60 font-mono text-xs uppercase">
              <div className="h-px w-8 bg-mnee-green/30" />
              <Zap className="h-3.5 w-3.5" />
              <div className="h-px w-8 bg-mnee-green/30" />
            </div>
          </div>

          {/* Layer 3: Outcome */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-mnee-cyan/20 border border-mnee-cyan/40 flex-shrink-0">
                <span className="text-xs font-bold text-mnee-cyan">3</span>
              </div>
              <div className="flex-1">
                <h5 className="font-mono font-bold text-mnee-text text-sm uppercase mb-1">
                  Outcome: 100% Automated Settlements
                </h5>
                <p className="text-xs text-mnee-text/70 leading-relaxed">
                  With LoanJSON + MNEE, all financial settlements execute autonomously without manual bank intervention.
                  Payments settle in real-time, covenants are monitored continuously, and breaches trigger immediate
                  alerts. This eliminates human delays, reduces operational risk, and enables 24/7 settlement cycles.
                </p>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="rounded-lg bg-mnee-green/5 border border-mnee-green/20 p-4 space-y-2">
            <p className="text-xs font-mono font-bold text-mnee-green uppercase">Key Benefits</p>
            <ul className="space-y-1 text-xs text-mnee-text/70 font-mono">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-mnee-green" />
                Zero manual processing—fully algorithmic
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-mnee-green" />
                Real-time settlement with immutable audit trail
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-mnee-green" />
                Programmable covenants with autonomous enforcement
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-mnee-green" />
                24/7 operation—no banking hours required
              </li>
            </ul>
          </div>
        </div>
      )}
    </Card>
  )
}
