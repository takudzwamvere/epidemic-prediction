import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AdminLayout from "@/components/AdminLayout";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard Demo",
  description: "Frontend specific demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased min-h-svh w-full bg-gray-50`}
      >
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
