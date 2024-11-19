import React from "react";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"] });

function Serif({ children }: { children: React.ReactNode }) {
  return (
    <span className={`${fraunces.className} font-fraunces`}>{children}</span>
  );
}

export default Serif;
