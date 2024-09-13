import { render, screen } from "@testing-library/react";
import { RTableBody } from "..";
import { EDataTestId } from "@src/types/common";

describe("When Table Body has rendered", () => {
  it("Expect render successfully", async () => {
    // const { getByTestId } = render(
    //   await RTableBody({
    //     users: [
    //       {
    //         email: "sadmanishopnil@gmail.com",
    //         password: "123456789",
    //         userName: "John Doe",
    //         profilePicLink: "/assert/default-profile.png",
    //         userType: "user",
    //         gender: "male",
    //       },
    //       {
    //         email: "sadmanishopnil1@gmail.com",
    //         password: "123456789",
    //         userName: "Jane Smith",
    //         profilePicLink: "/assert/default-profile.png",
    //         userType: "admin",
    //         gender: "male",
    //       },
    //       {
    //         email: "xyz@gmail.com",
    //         password: "123456789",
    //         userName: "Harry Rose",
    //         profilePicLink: "/assert/default-profile.png",
    //         userType: "user",
    //         gender: "female",
    //       },
    //     ],
    //   })
    // );
    // const myElement = getByTestId(EDataTestId.RTableBody);
    const myElement = screen.getByTestId(EDataTestId.RTableBody);
    expect(myElement).toMatchSnapshot();
  });
});
