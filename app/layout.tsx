import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import GlobalStyle from "./resetStyle";
import StyledComponentsRegistry from "./lib/registry";

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "HTML To PDF",
  description: "Image File HTML To PDF ",
  icons: {
    icon: "/Esport-Team-Logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={poppins.className}>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          {children}
        </StyledComponentsRegistry></body>
    </html>
  );
}
