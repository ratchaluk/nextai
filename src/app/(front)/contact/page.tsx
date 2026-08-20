import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ContactForm from "./contact-form";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const contactInfo = [
  {
    title: "ที่อยู่",
    value: "123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500",
  },
  {
    title: "อีเมล",
    value: "contact@cosci.com",
    mono: true,
  },
  {
    title: "โทรศัพท์",
    value: "02-123-4567",
    mono: true,
  },
  {
    title: "เวลาทำการ",
    value: "จันทร์ - ศุกร์ 09:00 - 18:00 น.",
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X (Twitter)", href: "https://x.com" },
];

const faqs = [
  {
    q: "สั่งซื้อสินค้าออนไลน์ได้อย่างไร?",
    a: "เลือกสินค้าใส่ตะกร้า แล้วเข้าสู่ระบบเพื่อทำการชำระเงินผ่านขั้นตอน Checkout",
  },
  {
    q: "ใช้เวลาส่งสินค้านานเท่าไหร่?",
    a: "สินค้าจะจัดส่งภายใน 2-3 วันทำการหลังชำระเงิน โดยขนส่งหลัก 2-5 วันทำการ",
  },
  {
    q: "มีบริการขายส่งหรือเหมา?",
    a: "ติดต่อทีมงานผ่านฟอร์มด้านขวาเพื่อขอใบเสนอราคาสำหรับการสั่งซื้อจำนวนมาก",
  },
  {
    q: "สามารถขอใบกำกับภาษีได้หรือไม่?",
    a: "ได้ โดยกรอกข้อมูลบริษัทในขั้นตอนการชำระเงิน และเราจะจัดส่งใบกำกับภาษีให้ทางอีเมล",
  },
];

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <main className="mx-auto max-w-(--breakpoint-xl) px-6 py-16">
      <h1 className="font-heading text-4xl leading-[1.1] uppercase sm:text-5xl">
        ติดต่อเรา
      </h1>
      <p className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
        สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงาน
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Contact info */}
        <section aria-labelledby="contact-info-heading">
          <h2
            id="contact-info-heading"
            className="font-heading text-2xl uppercase"
          >
            ข้อมูลติดต่อ
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="border-[3px] border-black bg-card p-5"
              >
                <h3 className="font-heading text-base uppercase">
                  {item.title}
                </h3>
                <p
                  className={
                    item.mono
                      ? "mt-2 font-mono text-muted-foreground"
                      : "mt-2 text-muted-foreground"
                  }
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-heading text-base uppercase">ช่องทางโซเชียล</h3>
            <ul className="mt-3 flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 hover:text-info"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="font-heading text-2xl uppercase">คำถามที่พบบ่อย</h2>
            <dl className="mt-4 divide-y-[3px] divide-black">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-4">
                  <dt className="font-heading text-base uppercase">{faq.q}</dt>
                  <dd className="mt-1.5 text-muted-foreground">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Contact form */}
        <section aria-labelledby="contact-form-heading">
          <Card>
            <CardHeader>
              <CardTitle id="contact-form-heading">ส่งข้อความถึงเรา</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </div>

      <Separator className="my-12" />

      <div>
        <Link href="/" className="underline underline-offset-4">
          กลับหน้าหลัก
        </Link>
      </div>
    </main>
  );
}