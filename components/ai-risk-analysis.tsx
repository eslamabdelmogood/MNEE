"use client"

import { Card } from "@/components/ui/card"
import { AlertTriangle, TrendingUp, Brain, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIRiskAnalysisProps {
  data?: any
}

export function AIRiskAnalysis({ data }: AIRiskAnalysisProps) {
  const riskAnalysis = {
    overallRisk: "Medium",
    confidence: 94,
    keyRisks: [
      {
        category: "Credit Risk",
        level: "Medium",
        score: 62,
        factors: ["Sector volatility", "Customer concentration"],
      },
      {
        category: "Operational Risk",
        level: "Low",
        score: 35,
        factors: ["Strong management team", "Proven track record"],
      },
      {
        category: "Market Risk",
        level: "Medium",
        score: 58,
        factors: ["Interest rate sensitivity", "FX exposure"],
      },
      {
        category: "Liquidity Risk",
        level: "Low",
        score: 28,
        factors: ["Strong cash reserves", "Facility accessibility"],
      },
    ],
    predictions: {
      defaultProbability: 2.3,
      recoveryRate: 92,
      stressTestScore: 78,
    },
  }

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return { text: "text-terminal-green", bg: "bg-terminal-green/10", border: "border-terminal-green/30" }
      case "medium":
        return { text: "text-terminal-amber", bg: "bg-terminal-amber/10", border: "border-terminal-amber/30" }
      case "high":
        return { text: "text-terminal-red", bg: "bg-terminal-red/10", border: "border-terminal-red/30" }
      default:
        return { text: "text-muted-foreground", bg: "bg-muted/10", border: "border-muted/30" }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-balance">AI Risk Analysis</h2>
        <p className="text-muted-foreground mt-1">Machine learning-powered loan risk assessment</p>
      </div>

      {/* Overall Risk Summary */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-terminal-amber" />
              <span className="text-[10px] terminal-heading text-muted-foreground">Overall Risk</span>
            </div>
            <Brain className="h-5 w-5 text-terminal-cyan" />
          </div>
          <p className="terminal-number text-3xl font-bold text-terminal-amber mb-2">{riskAnalysis.overallRisk}</p>
          <p className="text-[10px] terminal-text text-muted-foreground">Based on multi-factor analysis</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] terminal-heading text-muted-foreground">Model Confidence</span>
            <Zap className="h-4 w-4 text-terminal-green" />
          </div>
          <div className="space-y-3">
            <p className="terminal-number text-3xl font-bold text-terminal-green">{riskAnalysis.confidence}%</p>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-terminal-green" style={{ width: `${riskAnalysis.confidence}%` }} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] terminal-heading text-muted-foreground">Probability of Default</span>
            <TrendingUp className="h-4 w-4 text-terminal-cyan" />
          </div>
          <p className="terminal-number text-3xl font-bold text-terminal-green">
            {riskAnalysis.predictions.defaultProbability.toFixed(1)}%
          </p>
          <p className="text-[10px] terminal-text text-muted-foreground mt-2">90-day horizon</p>
        </Card>
      </div>

      {/* Risk Factors */}
      <Card className="p-6">
        <h3 className="terminal-heading text-sm text-foreground mb-4">Risk Factor Assessment</h3>
        <div className="grid grid-cols-2 gap-4">
          {riskAnalysis.keyRisks.map((risk) => {
            const colors = getRiskColor(risk.level)
            return (
              <div key={risk.category} className={cn("p-4 rounded-sm border", colors.bg, colors.border)}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="terminal-heading text-sm text-foreground">{risk.category}</p>
                    <p className={cn("text-[10px] terminal-heading mt-1", colors.text)}>{risk.level}</p>
                  </div>
                  <span className={cn("terminal-number text-xl font-bold", colors.text)}>{risk.score}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden mb-3">
                  <div
                    className={cn("h-full", colors.text.replace("text", "bg"))}
                    style={{ width: `${risk.score}%` }}
                  />
                </div>
                <div className="space-y-1">
                  {risk.factors.map((factor, i) => (
                    <p key={i} className="text-[9px] terminal-text text-muted-foreground">
                      • {factor}
                    </p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Stress Testing */}
      <Card className="p-6">
        <h3 className="terminal-heading text-sm text-foreground mb-4">Stress Test Results</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Adverse Scenario Score</span>
              <span className="terminal-number text-2xl font-bold text-terminal-green">
                {riskAnalysis.predictions.stressTestScore}/100
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-terminal-green"
                style={{ width: `${riskAnalysis.predictions.stressTestScore}%` }}
              />
            </div>
            <p className="text-[10px] terminal-text text-muted-foreground mt-2">
              Loan maintains acceptable risk levels under market stress conditions
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] terminal-heading text-muted-foreground mb-1">Recovery Rate (Default)</p>
                <p className="terminal-number text-2xl font-bold text-terminal-cyan">
                  {riskAnalysis.predictions.recoveryRate}%
                </p>
              </div>
              <div>
                <p className="text-[10px] terminal-heading text-muted-foreground mb-1">LGD Estimate</p>
                <p className="terminal-number text-2xl font-bold text-terminal-green">
                  {100 - riskAnalysis.predictions.recoveryRate}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
