import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://xau-roi-calculator.vercel.app"),
  title: "គណនាផលចំណេញមាស | Gold ROI Calculator Cambodia",
  description: "កម្មវិធីគណនាផលចំណេញមាស និង ROI យ៉ាងរហ័សសម្រាប់ទីផ្សារកម្ពុជា។ Calculate your Gold ROI instantly. Specialized for Cambodia with Xi, Domlang, and Ounce units.",
  keywords: "តម្លៃមាស, គណនាផលចំណេញមាស, មាស, gold calculator, roi, cambodia gold, xi, domlang, gold price cambodia, gold profit calculator, ជី, ដំឡឹង",
  openGraph: {
    title: "គណនាផលចំណេញមាស | Gold ROI Calculator Cambodia",
    description: "កម្មវិធីគណនាផលចំណេញមាស និង ROI យ៉ាងរហ័សសម្រាប់ទីផ្សារកម្ពុជា។ Calculate your Gold ROI instantly.",
    type: "website",
    url: "https://xau-roi-calculator.vercel.app",
    images: ["/og-image.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
