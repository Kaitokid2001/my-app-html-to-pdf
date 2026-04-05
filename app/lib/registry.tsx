"use client";

import { useServerInsertedHTML } from "next/navigation";
import React, { useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // lưu lại sheet để server & client dùng chung
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag(); // clear để tránh duplication
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  // SSR: bọc vào StyleSheetManager
  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}