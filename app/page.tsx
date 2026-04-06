"use client";

import ExportWrapper from "./component/export-wrapper";
import { Wrapper, HeaderTitle } from "./styles";

export default function Home() {
  return (
    <Wrapper>
      <HeaderTitle>Tool HTML to PDF</HeaderTitle>
      <ExportWrapper />
    </Wrapper>
  );
}
