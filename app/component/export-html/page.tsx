"use client";

import { Wrapper, Button } from "./styles";
import React, { useState, useRef } from "react";

type Props = { htmlText: string };

function ExportHTML({ htmlText }: Props) {
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // no extra content node required; we'll pass HTML string directly to jsPDF

  async function callback() {
    setLoading(true);
    // Use html2pdf.bundle (includes jspdf + html2canvas) from CDN to avoid bundling issues
    function loadScript(src: string) {
      return new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.head.appendChild(s);
      });
    }
    if (typeof window === "undefined") return;
    if (!(window as any).html2pdf) {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js");
    }

    // Prefer the visible preview element with id `export-source` (set in ImportHTML)
    let sourceElement: HTMLElement | null = document.getElementById("export-source");
    if (!sourceElement && wrapperRef.current) {
      sourceElement = wrapperRef.current;
    }

    try {
      if (!sourceElement) throw new Error("No export source element found");

      // Measure the full rendered size of the element (include scrollable content)
      const rect = sourceElement.getBoundingClientRect();
      const width = Math.ceil(Math.max(rect.width, sourceElement.scrollWidth || rect.width));
      const height = Math.ceil(sourceElement.scrollHeight || rect.height);

      // Ensure the element has a solid background for printing
      const prevBackground = sourceElement.style.background;
      sourceElement.style.background = sourceElement.style.background || "#ffffff";

      const opt: any = {
        margin: 0,
        filename: "export.pdf",
        html2canvas: { scale: 2, useCORS: true, allowTaint: false },
        jsPDF: { unit: "px", format: [width, height], orientation: width > height ? "landscape" : "portrait" },
      };

      // Load a free Times-like webfont (Tinos) so the preview and canvas render similarly to Times New Roman.
      function loadFontStylesheet(href: string) {
        return new Promise<void>((resolve) => {
          if (document.querySelector(`link[href="${href}"]`)) return resolve();
          const l = document.createElement("link");
          l.rel = "stylesheet";
          l.href = href;
          l.onload = () => resolve();
          l.onerror = () => resolve();
          document.head.appendChild(l);
        });
      }

      await loadFontStylesheet("https://fonts.googleapis.com/css2?family=Tinos:wght@400;700&display=swap");

      // Clone the source element and render the clone off-screen to avoid html2pdf DOM mutations on the live node
      const wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.left = "-9999px";
      wrapper.style.top = "0";
      wrapper.style.width = width + "px";
      wrapper.style.overflow = "hidden";
      const clone = sourceElement.cloneNode(true) as HTMLElement;
      clone.style.width = width + "px";
      clone.style.boxSizing = "border-box";
      clone.style.background = "#ffffff";
      clone.style.fontFamily = '"Times New Roman", Tinos, serif';
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      try {
        await (window as any).html2pdf().from(clone).set(opt).save();
      } finally {
        // cleanup clone
        if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
        sourceElement.style.background = prevBackground;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  // Do not auto-run on mount; user should click the button to download.

    return (
        <Wrapper ref={wrapperRef}>
          <Button onClick={callback} disabled={loading}>{loading ? "Preparing..." : "Export PDF"}</Button>
          {/* Do not render an extra container for the HTML; jsPDF will consume the string directly */}
        </Wrapper>
    );
}
export default ExportHTML;