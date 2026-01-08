"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle2, Zap } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { MNEEWorkflowPanel } from "@/components/mnee-workflow-panel"

interface SmartSettlementProps {
  data: any
}

export function SmartSettlement({ data }: SmartSettlementProps) {
  const [copied, setCopied] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Mock MNEE payment schedule
  const mneePayments = [
    {
      id: "SETTLE-001",
      date: "2025-09-21",
      amount: 1312500,
      status: "scheduled",
      smartContractReady: true,
    },
    {
      id: "SETTLE-002",
      date: "2025-12-21",
      amount: 1312500,
      status: "pending",
      smartContractReady: true,
    },
    {
      id: "SETTLE-003",
      date: "2026-03-21",
      amount: 1312500,
      status: "pending",
      smartContractReady: false,
    },
    {
      id: "SETTLE-004",
      date: "2026-06-21",
      amount: 1312500,
      status: "pending",
      smartContractReady: false,
    },
  ]

  const mneePayload = {
    settlement: {
      loan_id: data.loan_id,
      currency: "MNEE",
      network: "Ethereum",
      contract_address: "0x4c9bAe6798a0E6809c48704ee8147857Fd6e565d",
      scheduled_payments: mneePayments.map((p) => ({
        id: p.id,
        amount_mnee: Math.round((p.amount / 1.04) * 100) / 100, // Mock MNEE conversion
        settlement_date: p.date,
        auto_trigger: p.smartContractReady,
      })),
    },
  }

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(mneePayload, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "text-mnee-green"
      case "pending":
        return "text-mnee-text/60"
      default:
        return "text-mnee-text"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-mnee-green/20 text-mnee-green border border-mnee-green/40"
      case "pending":
        return "bg-mnee-cyan/20 text-mnee-cyan border border-mnee-cyan/40"
      default:
        return "bg-mnee-text/10 text-mnee-text border border-mnee-text/20"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-mnee-text mb-2">Smart Settlement (MNEE)</h3>
        <p className="text-sm text-mnee-text/60 font-mono">
          Automated MNEE stablecoin payments programmed on blockchain
        </p>
      </div>

      {/* Payment Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mneePayments.map((payment) => (
          <Card
            key={payment.id}
            className={cn(
              "p-4 bg-mnee-bg/50 border-mnee-border/60 hover:border-mnee-cyan/40 transition-all",
              "hover:shadow-lg hover:shadow-mnee-cyan/10",
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-xs font-mono text-mnee-text/60 uppercase mb-1">Payment ID</p>
                <p className="font-mono font-bold text-mnee-cyan text-sm">{payment.id}</p>
              </div>
              <Badge
                className={cn("font-mono text-xs uppercase tracking-wider", getStatusBadgeVariant(payment.status))}
              >
                {payment.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs font-mono text-mnee-text/60 uppercase mb-1">Settlement Date</p>
                <p className="font-mono text-sm text-mnee-text">{payment.date}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-mnee-text/60 uppercase mb-1">Amount (EUR)</p>
                <p className="font-mono text-sm font-bold text-mnee-green">{formatCurrency(payment.amount)}</p>
              </div>
            </div>

            {payment.smartContractReady && (
              <div className="flex items-center gap-2 pt-3 border-t border-mnee-border/40">
                <Zap className="h-3.5 w-3.5 text-mnee-green" />
                <span className="text-xs font-mono text-mnee-green font-semibold uppercase">Smart Contract Ready</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* MNEE Workflow Panel */}
      <MNEEWorkflowPanel />

      {/* JSON Payload Viewer */}
      <Card className="p-6 bg-mnee-bg/50 border-mnee-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-mono font-bold text-mnee-cyan text-sm uppercase">MNEE Payload (Blockchain)</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyPayload}
            className="gap-2 font-mono text-xs bg-transparent"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-mnee-green" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy Payload
              </>
            )}
          </Button>
        </div>

        <div className="rounded-lg bg-background/40 p-4 border border-mnee-border/30 overflow-auto max-h-72">
          <pre className="font-mono text-xs text-mnee-text/80 leading-relaxed whitespace-pre-wrap break-words">
            {JSON.stringify(mneePayload, null, 2)}
          </pre>
        </div>
      </Card>

      {/* Settlement Summary */}
      <Card className="p-4 bg-gradient-to-r from-mnee-cyan/10 to-mnee-green/10 border border-mnee-cyan/30">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-mono text-mnee-text/60 uppercase mb-1">Total Payments</p>
            <p className="text-lg font-bold text-mnee-cyan">{mneePayments.length}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-mnee-text/60 uppercase mb-1">Auto-Triggered</p>
            <p className="text-lg font-bold text-mnee-green">
              {mneePayments.filter((p) => p.smartContractReady).length}
            </p>
          </div>
          <div>
            <p className="text-xs font-mono text-mnee-text/60 uppercase mb-1">Total Amount (EUR)</p>
            <p className="text-lg font-bold text-mnee-text">
              {formatCurrency(mneePayments.reduce((sum, p) => sum + p.amount, 0))}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
