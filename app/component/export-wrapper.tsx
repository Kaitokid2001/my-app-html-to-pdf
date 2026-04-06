"use client";

import React, { useState } from "react";
import ImportHTML from "./import-html/page";
import ExportHTML from "./export-html/page";

export default function ExportWrapper() {
  const [htmlText, setHtmlText] = useState("");
  return (
    <div>
      <ImportHTML htmlText={htmlText} setHtmlText={setHtmlText} />
      <ExportHTML />
    </div>
  );
}
