import {
  Button,
  CRedirectButton,
  RSingleProduct,
  SLoading,
} from "@src/components/root";
import { RSinglePage } from "@src/components/root/r-single-product";
import { getIndividualAuthorById } from "@src/lib/author-handler";
import { ISingleProductPage } from "@src/types/app/dashboard/products/[id]";
import {
  IGetIndividualAuthorByIdReturn,
  IGetIndividualProductByIdReturn,
} from "@src/types/lib/product-handler";
import { BtnColorSchema } from "@src/types/root";
import { Suspense } from "react";

export default async function SingleAuthorPage({
  params: { id: author_id },
}: ISingleProductPage) {
  const authorResponse: IGetIndividualAuthorByIdReturn =
    await getIndividualAuthorById(author_id);
  const author = authorResponse.payload.author;
  return (
    <section className={`grid grid-cols-12 pb-[3.25rem]`}>
      <div className={`col-span-8 lg:col-span-10`}></div>
      <div className={`flex justify-end items-end  col-span-4 lg:col-span-2`}>
        <CRedirectButton
          btnText="Back To Author"
          colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
          redirectLink="/dashboard/authors"
          isArrow={false}
          isOpenNewTab={false}
        />
      </div>
      {authorResponse.status == 202 ? (
        <div className={`col-span-12`}>
          <Suspense fallback={<SLoading text="Loading... Product" />}>
            <RSinglePage
              author={authorResponse.payload.author}
              imageName={`Author Id ${authorResponse.payload.author?.id} picture`}
              imageUrl={`/static/assert/default-profile.png`}
            >
              <div className={`space-y-3  text-center lg:text-left`}>
                <p className={`text-sm font-semibold`}>
                  Author ID: {author?.id}
                </p>
                <p className={`text-xl font-extrabold font-[#7F4D4F]`}>
                  Name: {author?.name}
                </p>
                <p className={`text-[1rem] font-light  `}>Bio: {author?.bio}</p>
                <p className={`text-[0.8rem] font-light  `}>
                  Email: {author?.email}
                </p>
                <p className={`text-[0.8rem] font-light  `}>
                  Birth Date:{" "}
                  {
                    new Date(author?.birthdate || "")
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
                <div
                  className={`flex justify-center  lg:justify-start items-center lg:items-start`}
                >
                  <Button
                    btnText={`Show ${author?.name}'s books`}
                    colorSchema={BtnColorSchema.SolidBgGrayTextViolet}
                    isArrow={false}
                  />
                </div>
              </div>
            </RSinglePage>
          </Suspense>
        </div>
      ) : (
        <p>{authorResponse.message}</p>
      )}
    </section>
  );
}
