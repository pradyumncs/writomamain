
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/homepage/header";
import Footer from "@/components/homepage/footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <section className={inter.className}>
      <div className="bg-white">
      
      </div>
      <main className="lg:px-48 md:px-32 px-10 py-12 bg-white">{children}</main>
      <Footer />
      <Toaster />
    </section>
  );
}
