"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface Settlement {
  id: string
  date: string
  amount: string
  status: "smart-contract-ready" | "auto-triggered" | "pending" | "completed"
  description: string
  smartContractAddress?: string
}

interface AutomatedSettlementsProps {
  data?: any
}

export function AutomatedSettlements({ data }: AutomatedSettlementsProps) {
  // Mock settlement schedule data
  const settlements: Settlement[] = [
    {
      id: "SET-001",
      date: "2026-02-15",
      amount: "500,000 MNEE",
      status: "smart-contract-ready",
      description: "Q1 2026 Interest Payment",
      smartContractAddress: "0x9f...8e2",
    },
    {
      id: "SET-002",
      date: "2026-03-15",
      amount: "500,000 MNEE",
      status: "auto-triggered",
      description: "Q1 2026 Principal Amortization",
      smartContractAddress: "0xa2...4b1",
    },
    {
      id: "SET-003",
      date: "2026-04-15",
      amount: "250,000 MNEE",
      status: "pending",
      description: "Covenant Compliance Fee",
    },
    {
      id: "SET-004",
      date: "2026-05-20",
      amount: "1,000,000 MNEE",
      status: "pending",
      description: "H1 2026 Scheduled Repayment",
    },
  ]

  const getStatusConfig = (status: Settlement["status"]) => {
    switch (status) {
      case "smart-contract-ready":
        return {
          icon: CheckCircle2,
          color: "text-terminal-cyan",
          bgColor: "bg-terminal-cyan/10",
          borderColor: "border-terminal-cyan/30",
          label: "Smart Contract Ready",
        }
      case "auto-triggered":
        return {
          icon: Zap,
          color: "text-terminal-green",
          bgColor: "bg-terminal-green/10",
          borderColor: "border-terminal-green/30",
          label: "Auto-Triggered",
        }
      case "pending":
        return {
          icon: Clock,
          color: "text-terminal-amber",
          bgColor: "bg-terminal-amber/10",
          borderColor: "border-terminal-amber/30",
          label: "Pending",
        }
      case "completed":
        return {
          icon: CheckCircle2,
          color: "text-terminal-green",
          bgColor: "bg-terminal-green/10",
          borderColor: "border-terminal-green/30",
          label: "Completed",
        }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-balance">Automated Settlements</h2>
        <p className="text-muted-foreground mt-1">MNEE stablecoin payment schedule with smart contract automation</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-[10px] terminal-heading text-muted-foreground mb-2">TOTAL SCHEDULED</p>
          <p className="terminal-number text-xl font-bold text-terminal-cyan">2.25M MNEE</p>
        </Card>
        <Card className="p-4">
          <p className="text-[10px] terminal-heading text-muted-foreground mb-2">READY TO EXECUTE</p>
          <p className="terminal-number text-xl font-bold text-terminal-green">1.0M MNEE</p>
        </Card>
        <Card className="p-4">
          <p className="text-[10px] terminal-heading text-muted-foreground mb-2">NEXT SETTLEMENT</p>
          <p className="terminal-number text-lg font-bold text-terminal-amber">Feb 15, 2026</p>
        </Card>
        <Card className="p-4">
          <p className="text-[10px] terminal-heading text-muted-foreground mb-2">AUTOMATION RATE</p>
          <p className="terminal-number text-xl font-bold text-terminal-green">100%</p>
        </Card>
      </div>

      {/* Settlement Schedule */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-4">
          <h3 className="terminal-heading text-sm text-foreground">Payment Schedule</h3>
        </div>
        <div className="divide-y divide-border">
          {settlements.map((settlement) => {
            const statusConfig = getStatusConfig(settlement.status)
            const StatusIcon = statusConfig.icon

            return (
              <div
                key={settlement.id}
                className="p-4 hover:bg-muted/40 transition-colors border-l-4 border-transparent hover:border-terminal-cyan"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className={cn("p-2 rounded-sm", statusConfig.bgColor)}>
                        <StatusIcon className={cn("h-4 w-4", statusConfig.color)} />
                      </div>
                    </div>
                    <div>
                      <p className="terminal-heading text-sm text-foreground">{settlement.description}</p>
                      <p className="text-[10px] terminal-text text-muted-foreground mt-1">ID: {settlement.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="terminal-number text-lg font-bold text-terminal-green">{settlement.amount}</p>
                    <p className="text-[10px] terminal-text text-muted-foreground">
                      {new Date(settlement.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pl-12">
                  <div className={cn("px-2 py-1 rounded-sm flex items-center gap-1.5", statusConfig.bgColor)}>
                    <span className={cn("text-[11px] terminal-heading", statusConfig.color)}>{statusConfig.label}</span>
                  </div>
                  {settlement.smartContractAddress && (
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] terminal-text text-muted-foreground">Contract:</span>
                      <code className="text-[9px] terminal-text text-terminal-cyan font-mono">
                        {settlement.smartContractAddress}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
