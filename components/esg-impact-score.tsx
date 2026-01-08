"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Leaf, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface ESGImpactScoreProps {
  data?: any
}

export function ESGImpactScore({ data }: ESGImpactScoreProps) {
  const esgData = {
    overallScore: 72,
    environmental: {
      score: 68,
      label: "Environmental",
      status: "Good",
      initiatives: ["Carbon footprint reduction", "Renewable energy adoption"],
    },
    social: {
      score: 75,
      label: "Social",
      status: "Excellent",
      initiatives: ["Employee wellness programs", "Community engagement"],
    },
    governance: {
      score: 73,
      label: "Governance",
      status: "Good",
      initiatives: ["Board independence", "Executive compensation transparency"],
    },
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-terminal-green"
    if (score >= 70) return "text-terminal-cyan"
    if (score >= 60) return "text-terminal-amber"
    return "text-terminal-red"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-terminal-green/10"
    if (score >= 70) return "bg-terminal-cyan/10"
    if (score >= 60) return "bg-terminal-amber/10"
    return "bg-terminal-red/10"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-balance">ESG Impact Score</h2>
        <p className="text-muted-foreground mt-1">Environmental, Social, and Governance assessment</p>
      </div>

      {/* Overall Score */}
      <Card className="p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">OVERALL ESG SCORE</p>
            <div className="flex items-baseline gap-3">
              <span className={cn("terminal-number text-6xl font-bold", getScoreColor(esgData.overallScore))}>
                {esgData.overallScore}
              </span>
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <Badge className="bg-terminal-cyan/20 text-terminal-cyan border-terminal-cyan/30">Tier-1 Rating</Badge>
              <div className="flex items-center gap-1.5 text-terminal-green">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-semibold">+2.5% YoY</span>
              </div>
            </div>
          </div>

          {/* Score Visualization */}
          <div className="relative h-40 w-40">
            <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-border)" strokeWidth="2" />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-terminal-cyan)"
                strokeWidth="3"
                strokeDasharray={`${(esgData.overallScore / 100) * 2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
          </div>
        </div>
      </Card>

      {/* ESG Pillars */}
      <div className="grid grid-cols-3 gap-6">
        {[esgData.environmental, esgData.social, esgData.governance].map((pillar, idx) => {
          const icons = [Leaf, Users, Zap]
          const Icon = icons[idx]

          return (
            <Card key={pillar.label} className={cn("p-6", getScoreBgColor(pillar.score))}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-sm bg-background/50">
                    <Icon className={cn("h-5 w-5", getScoreColor(pillar.score))} />
                  </div>
                  <div>
                    <h3 className="terminal-heading text-sm text-foreground">{pillar.label}</h3>
                    <p className="text-[10px] terminal-text text-muted-foreground">{pillar.status}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[10px] terminal-heading text-muted-foreground">Score</span>
                  <span className={cn("terminal-number text-2xl font-bold", getScoreColor(pillar.score))}>
                    {pillar.score}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn("h-full transition-all", getScoreColor(pillar.score).replace("text", "bg"))}
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-[10px] terminal-heading text-muted-foreground mb-2">Key Initiatives</p>
                <ul className="space-y-1">
                  {pillar.initiatives.map((initiative, i) => (
                    <li key={i} className="text-[10px] terminal-text text-muted-foreground flex items-start gap-2">
                      <span
                        className={cn(
                          "mt-0.5 h-1.5 w-1.5 rounded-full flex-shrink-0",
                          getScoreColor(pillar.score).replace("text", "bg"),
                        )}
                      ></span>
                      {initiative}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
