"use client";

import { Wrapper, Button } from "./styles";
import React, { useState } from "react";

declare global {
  interface Window {
    html2pdf?: () => {
      set: (options: Record<string, unknown>) => {
        from: (element: HTMLElement) => {
          save: (filename?: string) => Promise<void>;
        };
      };
    };
  }
}

function ExportHTML() {
  const [loading, setLoading] = useState(false);
  // no extra content node required; we'll pass HTML string directly to jsPDF

  async function callback() {
    setLoading(true);
    
    try {
      // Load html2pdf library
      await new Promise<void>((resolve, reject) => {
        if (window.html2pdf) return resolve();
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load html2pdf"));
        document.head.appendChild(script);
      });

      // Get the element to export
      const sourceElement = document.getElementById("export-source");
      if (!sourceElement) throw new Error("No export source element found");

      // Clone element to manipulate without affecting the UI
      const clone = sourceElement.cloneNode(true) as HTMLElement;
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.width = "210mm"; // A4 width
      clone.style.fontSize = "12px"; // Reduce font size to fit
      document.body.appendChild(clone);

      // Export using html2pdf with single page format
      const opt = {
        margin: 5,
        filename: "export.pdf",
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { avoid: ["tr", "td"], mode: "avoid-all" },
      };

      await window.html2pdf!().set(opt).from(clone).save();
      document.body.removeChild(clone);
    } catch (err) {
      console.error("Export error:", err);
      alert("Export failed: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  }
  // Do not auto-run on mount; user should click the button to download.

    return (
      <Wrapper>
        <Button onClick={callback} disabled={loading}>
          {loading ? "Preparing..." : "Export PDF"}
        </Button>
      </Wrapper>
    );
}
export default ExportHTML;