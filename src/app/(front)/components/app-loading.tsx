import { Spinner } from "@/components/ui/spinner";

export default function AppLoading() {
  return (
    <div className="my-6 flex items-center justify-center">
      <div className="flex items-center gap-3 border-[3px] border-black bg-card px-6 py-4 font-mono text-sm uppercase tracking-[0.2em]">
        <Spinner className="size-5 text-foreground" /> Loading
      </div>
    </div>
  );
}