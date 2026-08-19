"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCartStore } from "@/lib/cart-store";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartList() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return (
      <div className="mx-auto mt-20 max-w-2xl border-[3px] border-black bg-card px-8 py-16 text-center">
        <p className="font-heading text-2xl uppercase">ตะกร้าสินค้าว่างเปล่า</p>
        <div className="mt-8">
          <Button asChild variant="outline">
            <a href="/product" data-slot="button" className="no-underline">ไปเลือกสินค้า</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-12 max-w-4xl px-4">
      <h1 className="font-heading text-4xl uppercase">ตะกร้าสินค้า</h1>

      <div className="mt-6 border-[3px] border-black">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัสสินค้า</TableHead>
              <TableHead>ชื่อสินค้า</TableHead>
              <TableHead>ราคา</TableHead>
              <TableHead>จำนวน</TableHead>
              <TableHead>รวม</TableHead>
              <TableHead>เครื่องมือ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              items.map((i) => (
                <TableRow key={i.productId}>
                  <TableCell className="font-mono">{i.productId}</TableCell>
                  <TableCell>{i.name}</TableCell>
                  <TableCell className="font-mono">{i.price}</TableCell>
                  <TableCell>{i.qty}</TableCell>
                  <TableCell className="font-mono">{(i.price * i.qty).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="icon" onClick={() => { removeItem(i.productId); } } aria-label="ลบสินค้า">
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex flex-col items-end gap-4">
        <div className="font-heading text-3xl uppercase">
          รวมทั้งหมด: <span className="font-mono">฿{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-4">
          <Button variant="outline" onClick={() => { clearCart(); } }>ลบสินค้าทั้งหมด</Button>
          <Button onClick={() => {
            clearCart();
            router.replace('/product');
          } }>ยืนยันการสั่งซื้อ</Button>
        </div>
      </div>
    </div>
  );
}