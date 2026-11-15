import { Be_Vietnam_Pro, Bricolage_Grotesque } from "next/font/google";
import { DemoBar } from "@/components/demo/demo-bar";

/**
 * Shared shell for every template demo (/demo/*).
 * Fonts follow CLAUDE.md §1 (Bricolage Grotesque display + Be Vietnam Pro body, Vietnamese subset).
 * Each demo page sets its own palette by redefining the colour tokens on its wrapper (see demo.css).
 */
const display = Bricolage_Grotesque({
  variable: "--font-demo-display",
  subsets: ["latin", "vietnamese"],
  weight: ["200", "400", "600", "800"],
  display: "swap",
});

const body = Be_Vietnam_Pro({
  variable: "--font-demo-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function DemoLayout({ children }: LayoutProps<"/demo">) {
  return (
    <div className={`${display.variable} ${body.variable} demo-root`}>
      <DemoBar />
      {children}
    </div>
  );
}
