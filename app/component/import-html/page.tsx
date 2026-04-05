"use client";
import { Buttom, Wrapper, TextExport, TextImport } from "./styles";

type Props = {
    htmlText: string;
    setHtmlText: (v: string) => void;
};

function ImportHTML({ htmlText, setHtmlText }: Props) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result as string;
            setHtmlText(text);
        };
        reader.readAsText(file);
    };

    return (
        <Wrapper>
            <Buttom htmlFor="html-file-input">Import HTML</Buttom>
            <input
                id="html-file-input"
                type="file"
                accept=".html"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <TextImport>{htmlText}</TextImport>
            <TextExport id="export-source" dangerouslySetInnerHTML={{ __html: htmlText }} />
        </Wrapper>
    );
}

export default ImportHTML;