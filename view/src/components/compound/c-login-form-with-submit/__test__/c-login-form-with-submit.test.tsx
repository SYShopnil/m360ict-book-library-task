import { render, screen } from "@testing-library/react";
import { CLoginFormWithSubmit } from "..";
import { EDataTestId } from "@src/types/common";

describe("When Clone Form with submit rendered ", () => {
  it("Expect it should render successfully", async () => {
    const { getByTestId } = render(<CLoginFormWithSubmit />); // ARRANGE
    // const myElement = getByTestId(EDataTestId.cLoginFormWithSubmit);
    const myElement = screen.getByTestId(EDataTestId.cLoginFormWithSubmit);

    expect(myElement).toMatchSnapshot();
  });
});
