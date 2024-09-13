import { CRedirectButton } from "@src/components/root";
import { CPaginationTrack } from "@src/components/root/c-pagnination-track";
import { BtnColorSchema } from "@src/types/root";
import { EDataTestId } from "@src/types/common";

import { CProductSearchBarContainer } from "../c-search-bar-container";
import { SCard } from "@src/components/root/s-product-card";
import { ISBookSection } from "@src/types/compound/s-books-section";

export async function SBookSection({ requestForGetAllBook }: ISBookSection) {
  const {
    payload: { books, currentPage, totalPage },
  } = await requestForGetAllBook;
  return (
    <div data-testid={EDataTestId.SBooksSection}>
      <div className={`flex justify-evenly items-start space-x-2 pl-[2rem]`}>
        <div className="flex-[1_1_50%]">
          <CProductSearchBarContainer params="searchBy" />
        </div>
      </div>

      {/* dynamically show all author */}
      <div
        className={`grid grid-cols-12 gap-2  mt-[5rem] pl-[2rem] place-content-center`}
      >
        {books.map((book) => {
          return (
            <div
              className="col-span-12  md:col-span-6  lg:col-span-4"
              key={book.id}
            >
              <SCard image={"/static/assert/demo-book.png"} name={book.title}>
                <p className="text-[#777777] font-bold text-lg line-clamp-2">
                  {book.title}
                </p>

                <p className={`text-[#777777]  text-sm line-clamp-2 mb-4`}>
                  <span className="font-bold">Author: </span>
                  {book.author_name}
                </p>
                <p className={`text-[#79494B]  text-sm line-clamp-2 mb-4`}>
                  <span className="font-bold">published Date: </span>

                  {new Date(book.published_date).toISOString().split("T")[0]}
                </p>

                <p className="text-[#777777] text-xs line-clamp-2">
                  <span className="font-bold">Description: </span>
                  {book.description}
                </p>
                <div className="flex justify-center items-center">
                  <CRedirectButton
                    btnText="View Book Details"
                    colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
                    isArrow={false}
                    isOpenNewTab={false}
                    redirectLink={`/dashboard/books/${book.id.toString()}`}
                  />
                </div>
              </SCard>
            </div>
          );
        })}
      </div>
      <div className="p-[2rem]">
        <CPaginationTrack
          currentPage={+currentPage}
          totalPage={+totalPage}
          url="/dashboard/books"
        />
      </div>
    </div>
  );
}
