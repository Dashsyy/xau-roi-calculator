import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K33KTKXS');`,
          }}
        />
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K33KTKXS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
