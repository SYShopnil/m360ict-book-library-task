"use server";
import { configProductDataLimit } from "@src/config";
import { EAuth } from "@src/types/common";
import { redirect } from "next/navigation";
import {
  IAuthor,
  IGetAllAuthorReturn,
  IGetIndividualAuthorByIdReturn,
} from "@src/types/lib/product-handler";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface IGetAllAuthors {
  currentPage: string;
  dataLimit: number;
  searchBy?: string;
}

export async function getAllAuthors({
  currentPage,
  dataLimit: limit,
  searchBy,
}: IGetAllAuthors): Promise<IGetAllAuthorReturn> {
  try {
    console.log({ searchBy });
    const cookieStore = cookies();
    const token = cookieStore.get(EAuth.AuthTokenCookieName);
    const url = `${process.env.SERVER_ORIGIN}/authors?page=${
      currentPage || 1
    }&limit=${configProductDataLimit}&name=${searchBy || ""}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    // console.log(response.status);
    if (response.status == 200) {
      const authors: IAuthor[] = response.data.authors;
      const currentPage: number = response.data.currentPage;
      const totalPage = `${response.data.totalPages}`;
      if (authors.length) {
        return {
          message: `${authors.length} authors found!!!`,
          status: 202,
          payload: {
            authors,
            totalPage,
            currentPage,
          },
        };
      } else {
        return {
          message: `No author found!!!`,
          status: 404,
          payload: {
            authors,
            totalPage,
            currentPage,
          },
        };
      }
    } else {
      return {
        message: `Some Things went wrong`,
        status: 500,
        payload: {
          authors: [],
          totalPage: "0",
          currentPage: 0,
        },
      };
    }

    // const getAllProduct: IProduct[] = await queryAllProductFromJson();
    // const { dataLimit, skipData, totalPage } = paginationHandler(
    //   limit,
    //   getAllProduct,
    //   currentPage
    // );

    // const getProductsAfterApplyingSkipAndLimitLogic: IProduct[] =
    //   getPaginationProductByApplyingSkipLimitData(
    //     getAllProduct,
    //     dataLimit,
    //     skipData
    //   );
    // if (getProductsAfterApplyingSkipAndLimitLogic.length) {
    //   return {
    //     message: `${getAllProduct.length} products has found!!`,
    //     status: 202,
    //     payload: {
    //       products: getProductsAfterApplyingSkipAndLimitLogic,
    //       totalPage: totalPage.toFixed(),
    //       currentPage: +currentPage,
    //     },
    //   };
    // } else {
    //   return {
    //     message: `No Product found!!!`,
    //     status: 404,
    //     payload: {
    //       products: getProductsAfterApplyingSkipAndLimitLogic,
    //       totalPage: totalPage.toFixed(),
    //       currentPage: 0,
    //     },
    //   };
    // }
  } catch (err) {
    // console.log(err);
    return {
      message: `Some things went wrong into product fetch`,
      status: 404,
      payload: {
        authors: [],
        totalPage: "0",
        currentPage: 0,
      },
    };
  }
}

export async function searchBarHandler(redirectUrl: string) {
  try {
  } catch (err) {
    console.log(err);
  } finally {
    revalidatePath(redirectUrl);
    redirect(redirectUrl);
  }
}

export async function getIndividualAuthorById(
  authorId: string
): Promise<IGetIndividualAuthorByIdReturn> {
  try {
    const url = `${process.env.SERVER_ORIGIN}/authors/${authorId}`;
    const cookieStore = cookies();
    const token = cookieStore.get(EAuth.AuthTokenCookieName);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    if (response.status == 202) {
      const author = response.data.author;
      return {
        message: `${author.name} has found!!!`,
        status: 202,
        payload: {
          author,
        },
      };
    } else {
      return {
        message: `No Author found`,
        status: 404,
        payload: {
          author: null,
        },
      };
    }
  } catch (err) {
    return {
      message: `Somethings went wrong`,
      status: 501,
      payload: {
        author: null,
      },
    };
  }
}
