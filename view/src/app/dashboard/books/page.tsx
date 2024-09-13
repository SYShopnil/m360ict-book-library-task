import { configProductDataLimit } from "@src/config";
import { SLoading } from "@src/components/root";
import { IProductPage } from "@src/types/app/dashboard/products";
import { Suspense } from "react";
import { SBookSection } from "@src/components/compound/s-book-section";
import { getAllBooks } from "@src/lib/book-handler";
import { IGetAllBookReturn } from "@src/types/lib/book-handler";

export default async function BooksPage({ searchParams }: IProductPage) {
  const currentPage: string = searchParams?.page || "1";
  const searchBy: string = searchParams?.searchBy || "";
  const author_id: string = searchParams?.author || "";
  const requestForGetAllBook: IGetAllBookReturn = await getAllBooks({
    currentPage: currentPage,
    dataLimit: configProductDataLimit,
    searchBy,
    author_id,
  });
  return (
    <section>
      <Suspense fallback={<SLoading text="Loading..." />}>
        <SBookSection requestForGetAllBook={requestForGetAllBook} />
      </Suspense>
    </section>
  );
}
