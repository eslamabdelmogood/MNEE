"use client"
import { FileJson, Clock, Sparkles, Home, Zap, TrendingUp, AlertTriangle, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const sections = [
    { id: "overview", label: "Main Dashboard", icon: Home },
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
        {sections.map((section, index) => {
          const Icon = section.icon
          const isHome = section.id === "overview"

          return (
            <div key={section.id}>
              {/* Add separator after home button */}
              {isHome && index === 0 && (
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 text-[12px] terminal-heading transition-colors border-l-4 mb-2 font-bold",
                    activeSection === section.id
                      ? "bg-terminal-cyan/20 text-terminal-cyan border-terminal-cyan shadow-sm shadow-terminal-cyan/50"
                      : "text-mnee-text border-mnee-green bg-mnee-green/10 hover:bg-mnee-green/20 hover:text-mnee-green",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              )}

              {/* Rest of navigation items */}
              {!isHome && (
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-[11px] terminal-heading transition-colors border-l-2 mb-1",
                    activeSection === section.id
                      ? "bg-primary/20 text-terminal-amber border-terminal-amber"
                      : "text-muted-foreground border-transparent hover:bg-accent/50 hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {section.label}
                </button>
              )}
            </div>
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
