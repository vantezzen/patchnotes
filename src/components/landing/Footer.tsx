import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex flex-col justify-center items-center text-center mb-6">
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-3 text-xs mt-6">
        <Link href="/legal/terms" className="text-zinc-800 font-medium">
          Terms of Service
        </Link>
        <Link href="/legal/privacy" className="text-zinc-800 font-medium">
          Privacy Policy
        </Link>
        <Link href="/legal/impressum" className="text-zinc-800 font-medium">
          Impressum
        </Link>
      </div>

      <p className="text-zinc-800 text-sm font-medium">
        Illustrations by{" "}
        <a
          className="text-zinc-800 font-medium underline"
          href="https://x.com/BasiilLeaf"
          target="_blank"
          rel="noopener noreferrer"
        >
          BasiilLeaf
        </a>
      </p>
    </div>
  );
}

export default Footer;
