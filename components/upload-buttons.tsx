"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { mockLoanData } from "@/lib/mock-data"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { getFileContent } from "@/lib/file-processor"

interface UploadButtonsProps {
  onDataLoaded: (data: any) => void
}

type ConversionStage = "idle" | "extracting" | "parsing" | "converting" | "complete" | "error"

const stageLabels: Record<ConversionStage, string> = {
  idle: "Ready",
  extracting: "Extracting text from document...",
  parsing: "Parsing document structure...",
  converting: "Converting to LoanJSON format...",
  complete: "Complete",
  error: "Error",
}

const stageProgress: Record<ConversionStage, number> = {
  idle: 0,
  extracting: 25,
  parsing: 50,
  converting: 75,
  complete: 100,
  error: 0,
}

export function UploadButtons({ onDataLoaded }: UploadButtonsProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const [stage, setStage] = useState<ConversionStage>("idle")
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const simulateProgress = async (totalDuration: number) => {
    const stages: ConversionStage[] = ["extracting", "parsing", "converting"]
    const stageDuration = totalDuration / stages.length

    for (let i = 0; i < stages.length; i++) {
      setStage(stages[i])
      const startProgress = stageProgress[stages[i - 1] ?? "idle"]
      const endProgress = stageProgress[stages[i]]
      const steps = 20

      for (let step = 0; step < steps; step++) {
        await new Promise((resolve) => setTimeout(resolve, stageDuration / steps))
        const currentProgress = startProgress + ((endProgress - startProgress) / steps) * step
        setProgress(currentProgress)
      }
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setStatus({ type: null, message: "" })
    setStage("extracting")
    setProgress(0)

    try {
      // Start progress simulation
      const progressPromise = simulateProgress(3000)

      const content = await getFileContent(file)

      const response = await fetch("/api/convert-loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          fileName: file.name,
          fileType: file.type,
        }),
      })

      const result = await response.json()

      // Wait for progress animation to complete
      await progressPromise

      if (result.success) {
        setStage("complete")
        setProgress(100)
        onDataLoaded(result.data)
        setStatus({ type: "success", message: result.message })

        setTimeout(() => {
          toast.success("✓ AI Analysis complete - MNEE settlement ready", {
            description: `Converted ${file.name} to LoanJSON format`,
          })
        }, 300)
      } else {
        throw new Error(result.error || "Invalid or unsupported loan document")
      }
    } catch (error: any) {
      console.error("[v0] Upload error:", error)
      setStage("error")
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProgress(0)
      setStatus({ type: "error", message: "Using sample loan data" })
      toast.error("File could not be processed", {
        description: "Loading sample MNEE loan data instead",
      })
      onDataLoaded(mockLoanData)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""

      // Reset progress UI after 2 seconds
      setTimeout(() => {
        setStage("idle")
        setProgress(0)
      }, 2000)
    }
  }

  const loadSample = () => {
    onDataLoaded(mockLoanData)
    setStatus({ type: "success", message: "Sample loan loaded successfully" })
    toast.success("Sample loan loaded")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".json,.pdf,.txt,.docx"
        />
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-primary/5 border-primary/20 hover:bg-primary/10"
        >
          {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          Upload Loan File
        </Button>
        <Button variant="secondary" onClick={loadSample} disabled={isUploading}>
          <FileText className="mr-2 h-4 w-4" />
          Load Sample Loan
        </Button>
      </div>

      {isUploading && (
        <div className="space-y-3 p-4 rounded-lg bg-muted/50 border border-primary/20">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="terminal-text text-sm font-medium text-foreground">AI Analysis in Progress</span>
              </div>
              <span className="terminal-text text-xs text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-2">
            {Object.entries(stageLabels).map(([stageKey, label]) => {
              const isActive = stage === stageKey
              const isComplete = stageProgress[stage as ConversionStage] >= stageProgress[stageKey as ConversionStage]

              return (
                <div
                  key={stageKey}
                  className={`flex items-center gap-3 text-xs terminal-text transition-all ${
                    isActive
                      ? "text-primary font-medium"
                      : isComplete
                        ? "text-success"
                        : "text-muted-foreground opacity-50"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                    {isComplete && <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>
                  <span>{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {status.type && !isUploading && (
        <div
          className={`flex items-center gap-2 text-sm font-medium p-3 rounded-lg border ${
            status.type === "success"
              ? "bg-success/10 text-success border-success/20"
              : "bg-destructive/10 text-destructive border-destructive/20"
          }`}
        >
          {status.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {status.message}
        </div>
      )}
    </div>
  )
}
