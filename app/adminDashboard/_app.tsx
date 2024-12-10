import "../globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/ui/theme-provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
