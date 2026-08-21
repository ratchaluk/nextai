import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function AddCustomerPage() {
  async function createCustomer(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;

    await prisma.customer.create({
      data: { name, address, phone },
    });

    revalidatePath("/customers");
    redirect("/customers");
  }

  return (
    <main className="p-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>เพิ่มลูกค้าใหม่</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createCustomer} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อลูกค้า</Label>
              <Input id="name" name="name" placeholder="ชื่อ-นามสกุล" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">ที่อยู่</Label>
              <Input id="address" name="address" placeholder="ที่อยู่สำหรับจัดส่ง" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
              <Input id="phone" name="phone" placeholder="08x-xxx-xxxx" required />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" asChild>
                <Link href="/customers">ยกเลิก</Link>
              </Button>
              <Button type="submit">บันทึก</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
