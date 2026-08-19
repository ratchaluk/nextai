/* eslint-disable @typescript-eslint/no-explicit-any */
import CartButton from "@/app/(front)/components/CartButton";
import Image from "next/image";

type Props = {
  products: any[]
}

const FeaturesProduct = ({ products }: Props) => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col px-6 py-16">
      <h2 className="text-center font-heading text-4xl leading-[1.1] uppercase sm:text-5xl">
        สินค้าทั้งหมด
      </h2>
      <p className="mt-3 text-center font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
        {products.length} items / raw &amp; unpolished
      </p>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div className="flex flex-col border-[3px] border-black bg-card p-6" key={product.id}>
            <div className="relative aspect-4/5 w-full overflow-hidden border-[3px] border-black bg-muted">
              <Image
                alt={product.name}
                className="size-full object-cover"
                width={0}
                height={0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={`/product-image/${product.picture}`}
                loading="eager"
              />
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="inline-flex h-9 items-center bg-black px-2.5 font-heading text-sm uppercase tracking-[0.1em] text-white">
                ID {product.id}
              </span>
            </div>
            <h3 className="mt-5 font-heading text-xl leading-tight uppercase">
              {product.name}
            </h3>
            <p className="mt-3 font-mono text-base text-muted-foreground">
              ฿{product.price.toString()}
            </p>
            <div className="mt-auto pt-6">
              <CartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesProduct;