import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";

import { initDayjs } from "@chiastack/utils/day";

import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  initDayjs();
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
