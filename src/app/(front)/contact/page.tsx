import Link from "next/link";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full grow sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg)">
        <h2 className="text-center font-heading text-4xl leading-[1.1] uppercase sm:text-5xl">
          ติดต่อเรา
        </h2>
        <p className="mt-3 text-center font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
          สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงาน
        </p>

        <div className="mx-auto mt-14 grid max-w-2xl gap-8 sm:grid-cols-2">
          <div className="border-[3px] border-black bg-card p-6">
            <h3 className="font-heading text-xl uppercase">ที่อยู่</h3>
            <p className="mt-3 text-muted-foreground">
              123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500
            </p>
          </div>
          <div className="border-[3px] border-black bg-card p-6">
            <h3 className="font-heading text-xl uppercase">อีเมล</h3>
            <p className="mt-3 font-mono text-muted-foreground">
              contact@cosci.com
            </p>
          </div>
          <div className="border-[3px] border-black bg-card p-6">
            <h3 className="font-heading text-xl uppercase">โทรศัพท์</h3>
            <p className="mt-3 font-mono text-muted-foreground">
              02-123-4567
            </p>
          </div>
          <div className="border-[3px] border-black bg-card p-6">
            <h3 className="font-heading text-xl uppercase">เวลาทำการ</h3>
            <p className="mt-3 text-muted-foreground">
              จันทร์ - ศุกร์ 09:00 - 18:00 น.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">กลับหน้าหลัก</Link>
        </div>
      </div>
    </div>
  );
}