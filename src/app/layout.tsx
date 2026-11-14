import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-src",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NewTech — Chợ giao diện frontend cho đội dev Việt",
  description:
    "Template React, Next.js, Vue, Tailwind đã được người kiểm duyệt. Thanh toán VietQR, MoMo, ZaloPay, có hoá đơn VAT. Đặt UI theo thương hiệu trong 24–48 giờ.",
};

// Sets data-theme before paint so the theme toggle and the dark: variant agree (no flash).
const themeScript = `(function(){try{var t=localStorage.getItem('nt-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${sans.variable} ${code.variable}`}
    >
      <body>
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
