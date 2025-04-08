import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokédex by Christian Alessandri",
  description:
    "A custom Pokédex application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}
