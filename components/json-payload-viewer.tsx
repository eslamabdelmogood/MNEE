"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle2, X } from "lucide-react"
import { useState } from "react"

interface JSONPayloadViewerProps {
  title: string
  payload: any
  onClose?: () => void
}

export function JSONPayloadViewer({ title, payload, onClose }: JSONPayloadViewerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full bg-mnee-bg border border-mnee-border">
      <div className="flex items-center justify-between p-4 border-b border-mnee-border/40">
        <div>
          <h4 className="font-mono font-bold text-mnee-cyan uppercase text-sm">{title}</h4>
          <p className="text-xs text-mnee-text/60 font-mono mt-1">Machine-readable JSON data</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 font-mono text-xs bg-transparent">
            {copied ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-mnee-green" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="p-4 overflow-auto max-h-96 bg-background/40">
        <pre className="font-mono text-xs text-mnee-text/80 leading-relaxed whitespace-pre-wrap break-words">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>
    </Card>
  )
}
