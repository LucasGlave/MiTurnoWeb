"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/state/store";
import RoutesProtection from "@/components/routesProtection/RoutesProtection";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          <RoutesProtection>{children}</RoutesProtection>
        </body>
      </Provider>
    </html>
  );
}
