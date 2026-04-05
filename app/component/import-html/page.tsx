"use client";
import { useState } from "react";
import { Buttom, Wrapper, TextExport, TextImport } from "./styles";

function ImportHTML (){
    const [htmlText, setHtmlText] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      setHtmlText(text); // giữ nguyên chuỗi text, không render
    };
    reader.readAsText(file);
  };
    return(
        <Wrapper>
            <Buttom htmlFor="html-file-input">
                Import HTML
            </Buttom>
            <input
                id="html-file-input"
                type="file"
                accept=".html"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <TextImport>{htmlText}</TextImport>
            <TextExport
                dangerouslySetInnerHTML={{ __html: htmlText }}
            />
        </Wrapper>
    );
}
export default ImportHTML;