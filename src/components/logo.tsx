import Link from "next/link";

export const Logo = () => (
  <Link href="/" data-slot="logo" className="inline-flex items-center gap-2">
    <span className="flex h-9 items-center border-[3px] border-black bg-black px-2.5 font-heading text-base uppercase tracking-[0.15em] text-white">
      C
    </span>
    <span className="font-heading text-lg uppercase tracking-[0.1em] text-foreground">
      COSCI
    </span>
  </Link>
);