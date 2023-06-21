import "./globals.css";
import { Roboto } from "next/font/google";
import React from "react";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "ScaleMed To do App",
  description: "A special done To Do App created by the one and only ScaleMed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
          <body className={inter.className} suppressHydrationWarning={true} >
            {children}
          </body>
      </html>
    </>
  );
}
