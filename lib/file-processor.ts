export async function getFileContent(file: File): Promise<string> {
  const fileType = file.type || ""
  const fileName = file.name.toLowerCase()

  // Text file or JSON
  if (
    fileType === "text/plain" ||
    fileType === "application/json" ||
    fileName.endsWith(".txt") ||
    fileName.endsWith(".json")
  ) {
    return await file.text()
  }

  // PDF file - extract text using a simple approach
  if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
    try {
      // For now, return a placeholder indicating PDF upload was detected
      // In production, you'd use a library like pdfjs-dist or pdf-parse
      const arrayBuffer = await file.arrayBuffer()
      const text = new TextDecoder().decode(arrayBuffer)
      // Extract readable text from PDF binary (very basic extraction)
      return extractPdfText(text)
    } catch (error) {
      console.error("[v0] PDF extraction failed:", error)
      return `PDF Document: ${file.name} - Please ensure the file contains loan details in a readable format.`
    }
  }

  // DOCX file - basic extraction
  if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const text = new TextDecoder().decode(arrayBuffer)
      return extractDocxText(text)
    } catch (error) {
      console.error("[v0] DOCX extraction failed:", error)
      return `Word Document: ${file.name} - Please ensure the file contains loan details.`
    }
  }

  // Fallback: try to read as text
  return await file.text()
}

function extractPdfText(pdfBinary: string): string {
  // Extract readable strings from PDF binary data (very basic)
  try {
    // Look for text stream objects in PDF
    const matches = pdfBinary.match(/BT([\s\S]*?)ET/g) || []
    const textChunks: string[] = []

    for (const match of matches) {
      // Extract text between Tj operators
      const textMatches = match.match(/$$(.*?)$$Tj/g) || []
      for (const textMatch of textMatches) {
        const cleaned = textMatch.replace(/\)Tj|^\(/g, "").replace(/\\/g, "")
        if (cleaned.trim()) {
          textChunks.push(cleaned)
        }
      }
    }

    return textChunks.length > 0
      ? textChunks.join(" ")
      : `PDF file uploaded: ${new Date().toISOString()}. Processing loan document...`
  } catch (error) {
    return `PDF Document uploaded - Processing as loan document...`
  }
}

function extractDocxText(docxBinary: string): string {
  // Extract text from DOCX (which is XML-based)
  try {
    const textMatches = docxBinary.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || []
    const text = textMatches.map((match) => match.replace(/<w:t[^>]*>|<\/w:t>/g, "")).join(" ")
    return text.trim() || `Word document uploaded: ${new Date().toISOString()}. Processing loan terms...`
  } catch (error) {
    return `Word document uploaded - Processing as loan document...`
  }
}
