import { render, screen } from "@testing-library/react";
import { SProductSection } from "..";
import { EDataTestId } from "@src/types/common";

describe("When Product Section has rendered", () => {
  it("Expect render successfully", async () => {
    // const { getByTestId } = render(
    //   await SProductSection({
    //     requestForGetAllProduct: new Promise((resolve) =>
    //       resolve({
    //         message: "",
    //         payload: {
    //           currentPage: 1,
    //           products: [
    //             {
    //               productId: "1",
    //               image: "/assert/demo-product.jpg",
    //               name: "Computer",
    //               price: "50000",
    //               desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    //               category: "Technology",
    //             },
    //             {
    //               productId: "2",
    //               image: "/assert/demo-product.jpg",
    //               name: "Computer",
    //               price: "50000",
    //               desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    //               category: "Technology",
    //             },
    //             {
    //               productId: "3",
    //               image: "/assert/demo-product.jpg",
    //               name: "Computer",
    //               price: "50000",
    //               desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    //               category: "Technology",
    //             },
    //           ],
    //           totalPage: "4",
    //         },
    //         status: 202,
    //       })
    //     ),
    //   })
    // );
    // const myElement = getByTestId(EDataTestId.SProductSection);
    const myElement = screen.getByTestId(EDataTestId.SProductSection);
    expect(myElement).toMatchSnapshot();
  });
});
