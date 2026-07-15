import type { Metadata } from "next";
import "./globals.css"; // ou seus estilos globais

export const metadata: Metadata = {
  title: "Sortear Cidade",
  description: "App para sortear cidades",
  icons: {
    icon: "/favicon.ico", // O favicon deve estar dentro da pasta /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}