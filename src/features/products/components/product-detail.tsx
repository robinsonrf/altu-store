"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import type { Product } from "@/domain/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart";
import { buildProductEditorialContent } from "@/features/products/model/product-content";
import { formatCLP } from "@/lib/format";
import { cn } from "@/lib/utils";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const editorial = buildProductEditorialContent(product);
  const primaryIndex = Math.max(
    0,
    product.images.findIndex((image) => image.isPrimary)
  );
  const [imageIndex, setImageIndex] = useState(primaryIndex);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");

  const currentImage = useMemo(
    () => product.images[imageIndex] ?? product.images[0],
    [imageIndex, product.images]
  );

  return (
    <div className="mt-14 grid gap-14 sm:mt-16 sm:gap-16 lg:grid-cols-2 lg:gap-20 lg:gap-x-24">
      <section className="space-y-4 sm:space-y-5">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
          <Image
            src={currentImage?.url ?? "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80"}
            alt={currentImage?.alt ?? product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYnIGhlaWdodD0nMjAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzE2JyBoZWlnaHQ9JzIwJyBmaWxsPScjMTIxMjEyJy8+PC9zdmc+"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {product.images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setImageIndex(index)}
              className={cn(
                "relative aspect-[4/5] overflow-hidden border transition-colors",
                index === imageIndex ? "border-foreground/50" : "border-border/40"
              )}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col lg:max-w-md lg:pt-3">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.28em] text-muted-foreground">
          {editorial.eyebrow}
        </p>
        <h1 className="mt-6 font-heading text-[clamp(1.9rem,4vw,2.8rem)] font-normal leading-[1.06] tracking-[-0.03em]">
          {editorial.headline}
        </h1>
        <p className="mt-7 text-sm leading-relaxed text-muted-foreground sm:mt-8">
          {editorial.story}
        </p>
        <p className="mt-10 font-mono text-sm tracking-tight text-foreground sm:mt-11">
          {formatCLP(product.price.amount)}
        </p>

        <div className="mt-10 space-y-8 sm:mt-12 sm:space-y-9">
          <div>
            <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted-foreground">
              Talla
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "min-w-12 rounded-none border px-3 py-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] transition-colors",
                    selectedSize === size
                      ? "border-foreground/50 bg-foreground/5 text-foreground"
                      : "border-border/45 text-muted-foreground hover:border-foreground/35"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted-foreground">
              Color
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "flex items-center gap-2 rounded-none border px-3 py-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] transition-colors",
                    selectedColor === color.name
                      ? "border-foreground/50 bg-foreground/5 text-foreground"
                      : "border-border/45 text-muted-foreground hover:border-foreground/35"
                  )}
                >
                  <span
                    className="inline-block size-2.5 border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-14 h-12 rounded-none border-foreground/25 font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 hover:border-foreground/45 hover:bg-foreground/5 sm:mt-16"
          disabled={product.stock <= 0}
          onClick={() =>
            addItem({
              id: product.id,
              slug: product.slug,
              name: product.name,
              imageUrl: currentImage?.url ?? "",
              imageAlt: currentImage?.alt ?? product.name,
              size: selectedSize || "Única",
              color: selectedColor || "Default",
              price: product.price,
            })
          }
        >
          {product.stock > 0 ? "Agregar a bolsa" : "Sin stock"}
        </Button>
      </section>
    </div>
  );
}
