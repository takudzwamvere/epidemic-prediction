import type { Metadata } from "next";
import { Poppins,} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

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
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.className}>
        <main className="w-full min-h-screen flex flex-col items-center justify-between bg-slate-50">
          <header>
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <Header/>
          <div>
            {children}
          </div>
          <Footer/>
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
