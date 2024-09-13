import { render, screen } from "@testing-library/react";
import { RSingleProduct } from "..";
import { EDataTestId } from "@src/types/common";

describe("When Single Product has rendered", () => {
  it("Expect render successfully", async () => {
    // const { getByTestId } = render(
    //   await RSingleProduct({
    //     requestFetchForSingleProduct: new Promise((resolve) =>
    //       resolve({
    //         message: "Product Found!!!",
    //         payload: {
    //           product: {
    //             productId: "1",
    //             image: "/assert/demo-product.jpg",
    //             name: "Computer",
    //             price: "50000",
    //             desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    //             category: "Technology",
    //           },
    //         },
    //         status: 202,
    //       })
    //     ),
    //   })
    // );
    // const myElement = getByTestId(EDataTestId.RSingleProduct);
    const myElement = screen.getByTestId(EDataTestId.RSingleProduct);
    expect(myElement).toMatchSnapshot();
  });
});
