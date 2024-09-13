import Image from "next/image";
import { EDataTestId } from "@src/types/common";
import { ISCard } from "@src/types/root/s-product-card";

export function SCard({ image, name, children }: ISCard) {
  return (
    <div
      data-testid={EDataTestId.SProductCard}
      className={`max-h-[33rem] w-[18.75rem] text-center `}
    >
      <div className={`rounded-sm flex justify-center items-center`}>
        <Image
          alt={name}
          src={image}
          placeholder="blur"
          blurDataURL="/assert/blur-demo-product.jpg"
          priority
          height={350}
          width={300}
        />
      </div>
      <div className={`h-[11.125rem] space-y-2 `}>{children}</div>
    </div>
  );
}
