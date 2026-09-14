import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Running Economy Beyond the Treadmill",
  description:
    "A two-condition lactate study in orienteers. Anthony Riley, University of Gothenburg, and João Magalhães, Örebro University.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
