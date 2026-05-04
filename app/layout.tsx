import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToasterProvider from "@/components/providers/ToasterProvider";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppButton from "@/components/WhatsAppButton";


export const metadata: Metadata = {
  metadataBase: new URL("https://peptide-supply-lime.vercel.app"),

  title: "PeptideMint — Premium Peptides for Sale",
  description:
    "Shop high-quality peptides for sale at PeptideMint. Trusted formulations, secure ordering, and fast delivery for performance, recovery, and wellness.",

  keywords:
    "peptides for sale, buy peptides, premium peptides, peptide shop, peptide supplements",

  openGraph: {
    title: "PeptideMint — Premium Peptides for Sale",
    description:
      "High-quality peptides for sale. Secure checkout, trusted formulations, and fast delivery.",
    url: "/",
    siteName: "PeptideMint",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "PeptideMint — Premium Peptides for Sale",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PeptideMint — Premium Peptides for Sale",
    description:
      "Buy premium peptides online. Trusted quality, fast delivery.",
    images: ["/thumbnail.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        {/* Smartsupp Live Chat */}
        <script dangerouslySetInnerHTML={{ __html: `
          var _smartsupp = _smartsupp || {};
          _smartsupp.key = 'f7cb5478070240cb5991f6c41138ddac92f6a9e9';
          window.smartsupp||(function(d) {
            var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
            c.type='text/javascript';c.charset='utf-8';c.async=true;
            c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
          })(document);
        ` }} />
      </head>
      <body suppressHydrationWarning={true} className="flex flex-col min-h-screen">
        <ToasterProvider />
        <CookieConsent />
        <WhatsAppButton />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}