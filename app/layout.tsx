import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Running Economy Beyond the Treadmill",
    template: "%s — Running Economy Beyond the Treadmill",
  },
  description:
    "A two-condition lactate study in orienteers. Anthony Riley, University of Gothenburg, and João Magalhães, Örebro University.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <header className="masthead">
          <div className="page masthead-inner">
            <Link href="/" className="masthead-title">
              <span className="mark" aria-hidden="true" />
              Running Economy Beyond the Treadmill
            </Link>
            <p className="masthead-sub">
              A two-condition lactate study in orienteers
            </p>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="page site-footer-inner">
            <p>
              Anthony Riley, University of Gothenburg
            </p>
            <p>João Magalhães, Örebro University</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
