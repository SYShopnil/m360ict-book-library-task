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
import { IBook, IGetAllBookReturn } from "@src/types/lib/book-handler";

interface IGetAllBooks {
  currentPage: string;
  dataLimit: number;
  searchBy?: string;
}

export async function getAllBooks({
  currentPage,
  dataLimit: limit,
  searchBy,
}: IGetAllBooks): Promise<IGetAllBookReturn> {
  console.log({ searchBy });
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(EAuth.AuthTokenCookieName);
    const url = `${process.env.SERVER_ORIGIN}/books?page=${
      currentPage || 1
    }&limit=${configProductDataLimit}&searchBy=${searchBy || ""}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    if (response.status == 202) {
      const books: IBook[] = response.data.books;
      const currentPage: number = response.data.pagination.page;
      const totalPage = `${response.data.pagination.pageSize}`;
      if (books.length) {
        return {
          message: `${books.length} books found!!!`,
          status: 202,
          payload: {
            books,
            totalPage,
            currentPage,
          },
        };
      } else {
        return {
          message: `No author found!!!`,
          status: 404,
          payload: {
            books,
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
          books: [],
          totalPage: "0",
          currentPage: 0,
        },
      };
    }
  } catch (err) {
    // console.log(err);
    return {
      message: `Some things went wrong into book data fetch`,
      status: 404,
      payload: {
        books: [],
        totalPage: "0",
        currentPage: 0,
      },
    };
  }
}
