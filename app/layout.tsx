import type { Metadata } from "next";
import { Poppins,} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const poppins = Poppins({
  weight: '300',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EpiMetrics | Epidemic Prediction using Machine Learning",
  description: "Unleashing the power of Machine Learning to detect trends in epidemiology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="w-full min-h-screen flex flex-col items-center justify-between bg-slate-50">
          <Header/>
          <div>
            {children}
          </div>
          <Footer/>
        </main>
      </body>
    </html>
  );
}
