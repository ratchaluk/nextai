# Feature: Contact Us

## Goal

สร้างหน้า `/contact` เพื่อให้ผู้เยี่ยมชมเว็บไซต์สามารถส่งข้อความติดต่อร้านได้จากหน้าเว็บ

หน้า Contact ต้องเป็น **public page** (อยู่ใน route group `(front)`) และใช้งานได้ทั้ง Desktop และ Mobile

---

## Requirements

### 1. Contact Page

สร้าง/ปรับปรุงหน้า `src/app/(front)/contact/page.tsx` ให้อยู่ที่ URL:

```
/contact
```

**Layout:**

- Desktop: 2 คอลัมน์
- Mobile: 1 คอลัมน์
- ซ้าย: ข้อมูลติดต่อ
- ขวา: Contact Form

**ข้อมูลติดต่อ (คอลัมน์ซ้าย) ประกอบด้วย:**

- ที่อยู่
- เบอร์โทร
- อีเมล
- เวลาทำการ
- Social links
- FAQ 3–4 ข้อ

**Navigation:**

ลิงก์ `/contact` ใน navigation มีอยู่แล้วที่ `src/components/nav-menu.tsx` (ทั้ง Desktop `NavMenu` และ Mobile `NavigationSheet` ใช้ component นี้ร่วมกัน) — ให้ตรวจสอบให้แน่ใจว่าลิงก์ `ติดต่อเรา` ยังอยู่ครบ ไม่ต้องเพิ่มซ้ำ

**หมายเหตุ:** หน้า `page.tsx` ปัจจุบันมี `export const instant = false` อยู่ (Cache Components opt-out) — เก็บไว้ตราบเท่าที่หน้า/Server Action ยัง dynamic อยู่

---

### 2. Contact Form

ฟอร์มประกอบด้วย field:

- Name
- Email
- Subject
- Message
- Honeypot field สำหรับลด spam (ซ่อนจากผู้ใช้)

**Validation rules:**

| field   | rule                  |
| ------- | --------------------- |
| name    | 2–100 ตัวอักษร        |
| email   | email ที่ถูกต้อง      |
| subject | 3–150 ตัวอักษร        |
| message | 10–2000 ตัวอักษร      |

Validation **ต้องทำฝั่ง Server เสมอ** (ข้อมูลจาก client ห้ามเชื่อถือ) และทำฝั่ง Client ด้วยเพื่อ UX

**Stack ที่มีใน project แล้ว (reuse อย่าลงของซ้ำ):**

- Client form: `react-hook-form` + `@hookform/resolvers` + `zod` (v4)
- UI: shadcn/ui components ที่มีอยู่ — `ui/field.tsx`, `ui/input.tsx`, `ui/label.tsx`, `ui/button.tsx`, `ui/card.tsx`, `ui/spinner.tsx`
- Utility: `cn` จาก `src/lib/utils.ts`

---

### 3. Send Email

เมื่อข้อมูลถูกต้อง ให้ส่งอีเมลแจ้ง Admin ผ่าน **Resend**

**ต้องเพิ่ม dependency:** `resend` (ยังไม่มีใน `package.json`)

ใช้ environment variables ใน `.env`:

```env
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
```

**ข้อกำหนด:**

- `from` ต้องใช้ `CONTACT_FROM_EMAIL`
- `to` ต้องใช้ `CONTACT_TO_EMAIL`
- `replyTo` ใช้อีเมลของผู้กรอก
- ห้ามเปิดเผย API key หรือ error ภายในระบบให้ client
- ไม่ต้องส่ง Auto Reply กลับผู้ใช้

**Implementation suggestion:** ใช้ **Server Action** (ไอดีโอแมติกกับ App Router) หรือ API Route `src/app/api/contact/route.ts` — เลือกแบบที่สอดคล้องกับ project เดิม ไม่ต้องสร้าง abstraction เกินจำเป็น

---

### 4. Form States

ฟอร์มต้องรองรับ:

- `idle`
- `pending`
- `success`
- `validation error`
- `send error`

**เมื่อ validation หรือส่งอีเมลไม่สำเร็จ:**

- แสดงข้อความ error ที่เหมาะสม
- ค่าที่ผู้ใช้กรอกไว้ต้อง**ไม่หาย** (preserve ผ่าน form state ของ react-hook-form)

**เมื่อส่งสำเร็จ:**

- แสดงข้อความสำเร็จ (เช่น `role="status"` / `aria-live="polite"`)
- reset form

---

## Security

- Validate ข้อมูลฝั่ง Server เสมอ (ห้ามเชื่อข้อมูล client โดยตรง)
- ห้ามรับอีเมลปลายทางจาก client — `to`/`from` มาจาก Server env เท่านั้น
- Secrets อยู่ฝั่ง Server เท่านั้น (`RESEND_API_KEY` ไม่ควรหลุดออกจาก server)
- Honeypot มีค่า (ไม่ใช่ค่าว่าง) → **ไม่ส่งอีเมล** แต่ตอบกลับเหมือนส่งสำเร็จ (เพื่อไม่ให้ bot รู้ว่าโดนจับ)
- `RETURN_ON_ERROR` ต้องไม่ expose stack trace / internal error ให้ client

---

## Accessibility

- ทุก field มี `<label>` ถูกต้อง (`ui/label.tsx`)
- Validation error เชื่อมกับ field ที่เกี่ยวข้องผ่าน `aria-describedby`
- field ที่ error ต้องมี `aria-invalid="true"`
- ใช้งานด้วย keyboard ได้ครบ (form control + submit)
- แสดง status/error ให้ screen reader รับรู้ — ใช้ `role="alert"` สำหรับ error และ `role="status"`/`aria-live="polite"` สำหรับ success
- ใช้ semantic HTML: `<form>`, `<section>`, headings ที่มีลำดับถูกต้อง

---

## Out of Scope

ไม่ต้องทำ:

- CAPTCHA
- Google Maps
- File Upload
- Admin Page
- Database
- Auto Reply
- Rate Limiting

---

## Acceptance Criteria

Feature ถือว่าเสร็จเมื่อ:

- [ ] `/contact` เปิดได้โดยไม่ต้อง login (public)
- [ ] Desktop แสดง 2 คอลัมน์ (ซ้าย: ข้อมูลติดต่อ, ขวา: form)
- [ ] Mobile แสดง 1 คอลัมน์
- [ ] Contact Form แสดง validation ถูกต้อง (client + server)
- [ ] ข้อมูลไม่หายเมื่อ validation error
- [ ] ส่งอีเมลผ่าน Resend ได้จริง
- [ ] `replyTo` เป็นอีเมลของผู้กรอก
- [ ] Honeypot มีค่า → ไม่ส่งอีเมลจริง แต่ตอบเหมือนสำเร็จ
- [ ] ไม่มี secret หรือ internal error หลุดไป client
- [ ] Pending / Success / Error state ทำงานครบ
- [ ] navigation มีลิงก์ `/contact` ทั้ง Desktop และ Mobile
- [ ] Project ผ่าน lint, type check, test และ build

---

## Implementation Guidance

ให้ Coding Agent:

1. ตรวจสอบโครงสร้างและ convention ของ project ก่อน — อ่าน `AGENTS.md` และไฟล์ที่เกี่ยวข้อง (auth, layout, component) ก่อนเขียน
2. Reuse component/utility ที่มีอยู่แล้ว: shadcn `ui/*`, `react-hook-form`, `zod` v4, `@hookform/resolvers`, `cn` — **อย่าลงของซ้ำ**
3. เพิ่ม dependency `resend` และเพิ่ม env 3 ตัวใน `.env`
4. เลือกโครงสร้างไฟล์ให้สอดคล้องกับ project (Server Action หรือ API Route ใน `src/app/api/`)
5. หลีกเลี่ยงการสร้าง abstraction ที่ไม่จำเป็น
6. หลัง implement ให้รัน test (`npm run test`), lint (`npm run lint`), type check (`npx tsc --noEmit`) และ build (`npm run build`)
7. รายงานไฟล์ที่สร้างหรือแก้ไข พร้อมสรุปผลการทดสอบ

---

## Notes for Coding Agent (verified 20 Aug 2026)

- หน้า Contact ยังเป็น static (มีแต่ข้อมูลติดต่อ, ยังไม่มี form / ไม่มี Resend)
- ลิงก์ navigation `/contact` มีอยู่แล้วใน `src/components/nav-menu.tsx`
- `package.json` ยังไม่มี `resend`
- Zod เป็น v4 — ใช้ schema API ของ v4 อย่าเขียนตาม v3
