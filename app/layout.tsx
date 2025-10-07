import { Poppins } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import "./globals.css";

const poppins = Poppins({
  weight: '400',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "epiMetrics | Predict epidemic Trends with Tensorflow",
  description: "Using Tensorflow to predict epidermic outbreaks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={poppins.className}>
          <main className="w-full min-h-screen flex flex-col bg-slate-50">
            <Header />
            {children}
            <Footer />
          </main>
        </body>
      </html>
  );
}