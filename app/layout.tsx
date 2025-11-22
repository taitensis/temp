import "@/app/globals.css";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col"
        )}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
