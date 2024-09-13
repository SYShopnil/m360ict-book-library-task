import { configProductDataLimit } from "@src/config";
import { getAllAuthors } from "@src/lib/author-handler";
import { SLoading } from "@src/components/root";
import { IProductPage } from "@src/types/app/dashboard/products";
import { IGetAllAuthorReturn } from "@src/types/lib/product-handler";
import { Suspense } from "react";
import { SAuthorSection } from "@src/components/compound/s-products-section";

export default async function BooksPage({ searchParams }: IProductPage) {
  const currentPage: string = searchParams?.page || "1";
  const searchBy: string = searchParams?.searchBy || "";
  const requestForGetAllAuthor: Promise<IGetAllAuthorReturn> = getAllAuthors({
    currentPage: currentPage,
    dataLimit: configProductDataLimit,
    searchBy,
  });
  return (
    <section>
      <Suspense fallback={<SLoading text="Loading..." />}>
        <SAuthorSection requestForGetAllAuthor={requestForGetAllAuthor} />
      </Suspense>
    </section>
  );
}
