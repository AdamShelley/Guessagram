import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./globals.css";
import { Roboto } from "@next/font/google";
import QueryWrapper from "./components/QueryWrapper";


config.autoAddCss = false;

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`text-gray-100 ${roboto.className}`}>
        <QueryWrapper>
          {children}
       
        </QueryWrapper>
      </body>
    </html>
  );
}
