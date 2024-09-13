import { render, screen } from "@testing-library/react";
import { SProfile } from "..";
import { EDataTestId } from "@src/types/common";

describe("When Profile has rendered", () => {
  it("Expect render successfully", async () => {
    // const { getByTestId } = render(await SProfile());
    // const myElement = getByTestId(EDataTestId.SProfile);
    const myElement = screen.getByTestId(EDataTestId.SProfile);
    expect(myElement).toMatchSnapshot();
  });
});
