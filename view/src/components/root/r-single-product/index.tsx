import Image from "next/image";
import { EDataTestId } from "@src/types/common";
import { IRSinglePage } from "@src/types/root/r-single-product";

export async function RSinglePage({
  children,
  imageName,
  imageUrl,
  author,
  book,
}: IRSinglePage) {
  return (
    <>
      {author || book ? (
        <div
          data-testid={EDataTestId.RSingleProduct}
          className={`grid grid-cols-12 gap-2 px-[1.5rem]`}
        >
          <div
            className={`col-span-12 lg:col-span-5 flex justify-center items-center`}
          >
            <Image
              alt={imageName}
              src={imageUrl}
              placeholder="blur"
              blurDataURL="/assert/blur-demo-product.jpg"
              width={350}
              height={500}
            />
          </div>
          <div
            className={`col-span-12 lg:col-span-7 flex  justify-center items-center`}
          >
            {children}
          </div>
        </div>
      ) : (
        <div>No Data found</div>
      )}
    </>
  );
}
