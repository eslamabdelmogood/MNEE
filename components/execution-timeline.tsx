"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineStage {
  id: string
  label: string
  date: string
  status: "completed" | "current" | "upcoming"
  description: string
}

interface ExecutionTimelineProps {
  data?: any
}

export function ExecutionTimeline({ data }: ExecutionTimelineProps) {
  const stages: TimelineStage[] = [
    {
      id: "issuance",
      label: "Issuance",
      date: "Jan 15, 2025",
      status: "completed",
      description: "Loan agreement finalized and executed",
    },
    {
      id: "funding",
      label: "Initial Funding",
      date: "Jan 20, 2025",
      status: "completed",
      description: "Principal disbursement to borrower account",
    },
    {
      id: "smart-contract",
      label: "Smart Contract Deployment",
      date: "Jan 25, 2025",
      status: "completed",
      description: "MNEE settlement automation activated",
    },
    {
      id: "repayment",
      label: "Repayment Phase",
      date: "Feb 15, 2025",
      status: "current",
      description: "Automated MNEE repayment schedule begins",
    },
    {
      id: "covenant",
      label: "Covenant Monitoring",
      date: "Ongoing",
      status: "current",
      description: "Real-time compliance and covenant monitoring",
    },
    {
      id: "settlement",
      label: "MNEE Automated Repayment",
      date: "May 15, 2026",
      status: "upcoming",
      description: "Final settlement via stablecoin automation",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-balance">Execution Timeline</h2>
        <p className="text-muted-foreground mt-1">Loan lifecycle from issuance to automated repayment</p>
      </div>

      <Card className="p-8">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-12 bottom-0 w-px bg-gradient-to-b from-terminal-cyan via-terminal-green to-terminal-amber" />

          {/* Timeline stages */}
          <div className="space-y-8">
            {stages.map((stage, index) => {
              const isCompleted = stage.status === "completed"
              const isCurrent = stage.status === "current"

              return (
                <div key={stage.id} className="relative pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2">
                    <div
                      className={cn(
                        "h-6 w-6 rounded-full flex items-center justify-center border-2",
                        isCompleted && "bg-terminal-green border-terminal-green",
                        isCurrent && "bg-terminal-cyan border-terminal-cyan ring-4 ring-terminal-cyan/20",
                        stage.status === "upcoming" && "bg-background border-border",
                      )}
                    >
                      {isCompleted && <CheckCircle2 className="h-4 w-4 text-background" />}
                      {isCurrent && <Circle className="h-2 w-2 bg-background" />}
                    </div>
                  </div>

                  {/* Stage content */}
                  <div
                    className={cn(
                      "p-4 rounded-sm border transition-all",
                      isCompleted && "bg-terminal-green/5 border-terminal-green/30",
                      isCurrent && "bg-terminal-cyan/5 border-terminal-cyan/50 shadow-sm shadow-terminal-cyan/10",
                      stage.status === "upcoming" && "bg-muted/40 border-border",
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="terminal-heading text-sm text-foreground">{stage.label}</h4>
                        <p className="text-[10px] terminal-text text-muted-foreground mt-1">{stage.description}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={cn(
                            "terminal-number text-xs font-bold",
                            isCompleted && "text-terminal-green",
                            isCurrent && "text-terminal-cyan",
                            stage.status === "upcoming" && "text-muted-foreground",
                          )}
                        >
                          {stage.date}
                        </p>
                        {isCurrent && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-terminal-cyan/20 border border-terminal-cyan/30 rounded-sm">
                            <p className="text-[9px] terminal-heading text-terminal-cyan">ACTIVE</p>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}
