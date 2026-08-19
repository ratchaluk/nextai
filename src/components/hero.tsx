import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-5xl">
        <div className="border-[3px] border-black p-8 sm:p-12">
          <Badge
            asChild
            className="px-3 py-1.5"
            variant="default"
          >
            <Link href="#" data-slot="badge" className="no-underline">
              Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Badge>

          <h1 className="mt-8 font-heading text-5xl leading-[1.0] uppercase tracking-tight sm:text-6xl md:text-7xl">
            Ship better UI without the hassle
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-[1.6] text-muted-foreground sm:text-2xl">
            Instead of starting from scratch every time, use thoughtfully
            designed blocks that give you a solid foundation for any UI.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button asChild size="lg">
              <Link href="/product">Get Started <ArrowUpRight /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/course"><CirclePlay /> Watch Demo</Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-x-[3px] border-b-[3px] border-black bg-black px-8 py-4 font-mono text-sm uppercase tracking-[0.15em] text-white">
          <span>RawBlock</span>
          <span>Brutalism as a language</span>
          <span>No Rounded Corners</span>
        </div>
      </div>
    </div>
  );
}