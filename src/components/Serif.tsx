import React from "react";
import { Balsamiq_Sans } from "next/font/google";

const font = Balsamiq_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function Serif({ children }: { children: React.ReactNode }) {
  return <span className={`${font.className} font-fraunces`}>{children}</span>;
}

export default Serif;
