import { Syncopate, Manrope } from "next/font/google";
import "./styles.css";

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
});

export default function Template2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${syncopate.variable} ${manrope.variable} overflow-x-hidden`}>
      {children}
    </div>
  );
}
