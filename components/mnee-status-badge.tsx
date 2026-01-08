import { Badge } from "@/components/ui/badge"
import { Shield, Zap } from "lucide-react"

interface MNEEStatusBadgeProps {
  status: "programmable" | "mnee-verified"
  className?: string
}

export function MNEEStatusBadge({ status, className }: MNEEStatusBadgeProps) {
  if (status === "programmable") {
    return (
      <Badge
        className={`gap-1.5 bg-mnee-cyan/20 text-mnee-cyan border border-mnee-cyan/40 hover:bg-mnee-cyan/30 font-mono text-xs uppercase tracking-wider ${className}`}
        variant="outline"
      >
        <Zap className="h-3 w-3" />
        Programmable
      </Badge>
    )
  }

  return (
    <Badge
      className={`gap-1.5 bg-mnee-green/20 text-mnee-green border border-mnee-green/40 hover:bg-mnee-green/30 font-mono text-xs uppercase tracking-wider ${className}`}
      variant="outline"
    >
      <Shield className="h-3 w-3" />
      MNEE Verified
    </Badge>
  )
}
