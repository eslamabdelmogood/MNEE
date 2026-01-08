"use client"
import { FileJson, Clock, Sparkles, Home, Zap, TrendingUp, AlertTriangle, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const sections = [
    { id: "loanjson", label: "LoanJSON Viewer", icon: FileJson },
    { id: "timeline", label: "Event Timeline", icon: Clock },
    { id: "insights", label: "AI Insights", icon: Sparkles },
    { id: "settlements", label: "Automated Settlements", icon: Zap },
    { id: "execution", label: "Execution Timeline", icon: TrendingUp },
    { id: "risk-analysis", label: "AI Risk Analysis", icon: AlertTriangle },
    { id: "esg", label: "ESG Impact", icon: Leaf },
  ]

  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 border-r border-border bg-card overflow-y-auto">
      <nav className="flex flex-col gap-0 p-2">
        <button
          onClick={() => onSectionChange("overview")}
          className={cn(
            "w-full flex flex-col items-center justify-center gap-3 px-4 py-6 mb-6 rounded-lg font-bold text-lg transition-all duration-300 border-2",
            activeSection === "overview"
              ? "bg-gradient-to-r from-terminal-cyan via-terminal-green to-terminal-cyan text-black shadow-2xl shadow-terminal-cyan/60 animate-pulse border-terminal-green"
              : "bg-terminal-green/20 text-terminal-green hover:bg-terminal-green/40 border-terminal-green hover:shadow-xl hover:shadow-terminal-green/50 hover:scale-105",
          )}
        >
          <Home className="h-8 w-8" />
          <span className="uppercase tracking-widest text-center leading-tight">← Back to Home</span>
        </button>

        {/* Visual divider */}
        <div className="h-1.5 bg-gradient-to-r from-terminal-cyan/40 via-terminal-green/40 to-transparent mb-4 rounded-full" />

        {sections.map((section) => {
          const Icon = section.icon

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-[11px] terminal-heading transition-colors border-l-2 mb-1 rounded",
                activeSection === section.id
                  ? "bg-primary/20 text-terminal-amber border-terminal-amber"
                  : "text-muted-foreground border-transparent hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {section.label}
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background p-4">
        <div className="terminal-text text-[10px]">
          <p className="terminal-heading text-terminal-green mb-1">System Status</p>
          <p className="text-muted-foreground">Connected: LMA-001</p>
          <p className="text-terminal-cyan uppercase mt-1">● MNEE Gateway Live</p>
        </div>
      </div>
    </aside>
  )
}
