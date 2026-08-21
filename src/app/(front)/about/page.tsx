import Link from "next/link";
import AppLoading from "../components/app-loading";
import { Suspense } from "react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

async function ApiVersion() {
  const response = await fetch('https://api.codingthailand.com/api/version');
  const apiInfo = await response.json();

  return <p className="font-mono">API Version: {apiInfo.data.version}</p>;
}

// http://localhost:3000/about
export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="font-heading text-4xl leading-[1.1] uppercase sm:text-5xl">
        เกี่ยวกับเราไหม? เราเกี่ยวแน่นมากนะ ถ้ายังไม่แน่ใจ ลองไปดู API Version ของเราก่อนก็ได้
      </h2>

      <div className="mt-8 border-[3px] border-black bg-card p-8">
        <Suspense fallback={<AppLoading />}>
          <ApiVersion />
        </Suspense>
      </div>

      <div className="mt-8 border-t-[3px] border-black pt-6">
        <Link href="/">Home Page</Link>
      </div>
    </main>
  );
}