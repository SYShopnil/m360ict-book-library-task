import { CRedirectButton, SLoading } from "@src/components/root";
import { RSinglePage } from "@src/components/root/r-single-product";
import { getIndividualBookById } from "@src/lib/book-handler";
import { ISingleBookPage } from "@src/types/app/dashboard/books";
import { IGetIndividualBookByIdReturn } from "@src/types/lib/book-handler";

import { BtnColorSchema } from "@src/types/root";
import { Suspense } from "react";

export default async function SingleBookPage({
  params: { id: book_id },
}: ISingleBookPage) {
  const bookResponse: IGetIndividualBookByIdReturn =
    await getIndividualBookById(book_id);
  const book = bookResponse.payload.book;

  return (
    <section className={`grid grid-cols-12 pb-[3.25rem]`}>
      <div className={`col-span-8 lg:col-span-10`}></div>
      <div className={`flex justify-end items-end  col-span-4 lg:col-span-2`}>
        <CRedirectButton
          btnText="Back To Book"
          colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
          redirectLink="/dashboard/books"
          isArrow={false}
          isOpenNewTab={false}
        />
      </div>
      {bookResponse.status == 202 ? (
        <div className={`col-span-12`}>
          <Suspense fallback={<SLoading text="Loading... Books" />}>
            <RSinglePage
              book={bookResponse.payload.book}
              imageName={`Book Id ${bookResponse.payload.book?.id} picture`}
              imageUrl={`/static/assert/demo-book.png`}
            >
              <div className={`space-y-3  text-center lg:text-left`}>
                <p className={`text-sm font-semibold`}>Book ID: {book?.id}</p>
                <p className={`text-xl font-extrabold font-[#7F4D4F]`}>
                  Title: {book?.title}
                </p>
                <p className={`text-[1rem] font-light  `}>
                  <span className={`font-semibold`}>Description:</span>{" "}
                  {book?.description}
                </p>
                <p className={`text-[0.8rem] font-light  `}>
                  <span className="font-semibold">Published Date:</span>{" "}
                  {
                    new Date(book?.published_date || "")
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
                <div
                  className={`flex justify-center  lg:justify-start items-center lg:items-start`}
                >
                  <CRedirectButton
                    btnText={`Show author details`}
                    colorSchema={BtnColorSchema.SolidBgVioletTextWhite}
                    isArrow={false}
                    redirectLink={`/dashboard/authors/${book?.author_id}`}
                    isOpenNewTab={false}
                  />
                </div>
              </div>
            </RSinglePage>
          </Suspense>
        </div>
      ) : (
        <p>{bookResponse.message}</p>
      )}
    </section>
  );
}
