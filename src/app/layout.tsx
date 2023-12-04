import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/index.scss";

export const metadata: Metadata = {
  title: "openday AI",
  description: "You can enjoy recorder/output the voice of game-role",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
