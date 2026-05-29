import "./globals.css";

export const metadata = {
  title: "PadalaChain — OFW Remittance on Morph L2",
  description: "Blockchain-powered cross-border remittance for OFWs. Transparent, categorized, on-chain. Cut fees from ₱1,500 to ₱240 per transfer.",
  keywords: "OFW, remittance, blockchain, Morph, ERC-20, Philippines, hackathon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
