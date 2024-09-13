import { CRedirectButton } from "@src/components/root";
import { CPaginationTrack } from "@src/components/root/c-pagnination-track";
import { BtnColorSchema } from "@src/types/root";
import { EDataTestId } from "@src/types/common";

import { CProductSearchBarContainer } from "../c-search-bar-container";
import { ISAuthorSection } from "@src/types/compound/s-products-section";
import { SCard } from "@src/components/root/s-product-card";

export async function SAuthorSection({
  requestForGetAllAuthor,
}: ISAuthorSection) {
  const {
    payload: { authors, currentPage, totalPage },
  } = await requestForGetAllAuthor;
  return (
    <div data-testid={EDataTestId.SProductSection}>
      <div className={`flex justify-evenly items-start space-x-2 pl-[2rem]`}>
        <div className="flex-[1_1_50%]">
          <CProductSearchBarContainer params="searchBy" />
        </div>
      </div>

      {/* dynamically show all author */}
      <div
        className={`grid grid-cols-12 gap-2  mt-[5rem] pl-[2rem] place-content-center`}
      >
        {authors.map((author) => {
          return (
            <div
              className="col-span-12  md:col-span-6  lg:col-span-4"
              key={author.id}
            >
              <SCard
                image={"/static/assert/default-profile.png"}
                name={author.name}
              >
                <p className="text-[#777777] font-bold text-lg">
                  {author.name}
                </p>
                <p
                  className={`text-[#79494B] font-bold text-sm line-clamp-2 mb-4`}
                >
                  {author.bio}
                </p>
                <div className="flex justify-center items-center">
                  <CRedirectButton
                    btnText="Show Author Details"
                    colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
                    isArrow={false}
                    isOpenNewTab={false}
                    redirectLink={`/dashboard/authors/${author.id.toString()}`}
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
          url="/dashboard/authors"
        />
      </div>
    </div>
  );
}
