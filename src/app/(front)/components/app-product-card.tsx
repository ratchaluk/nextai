'use client'

type Props = {
  name: string;
  price: number;
  stock?: number;
  onAddToCart: (name: string) => void;
}

export default function AppProductCard({ name, price, stock = 0, onAddToCart }: Props) {
  return (
    <div className="w-60 border-[3px] border-black bg-card p-6">
      <h2 className="font-heading text-lg uppercase">{name}</h2>
      <p className="mt-2 font-mono text-sm text-muted-foreground">ราคา: {price} บาท</p>
      {
        stock > 0 && (
          <div className="mt-4">
            <p className="font-mono text-sm">คงเหลือ: {stock}</p>
            <button
              onClick={ () => onAddToCart(name) }
              className="mt-3 inline-flex h-9 items-center justify-center rounded-none border-[3px] border-black bg-black px-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
            >
              เพิ่มลงตะกร้า
            </button>
          </div>
        )
      }
      
    </div>
  );
}