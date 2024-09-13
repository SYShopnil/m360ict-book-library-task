import { render, screen } from "@testing-library/react";
import { CPaginationTrack } from "..";
import { EDataTestId } from "@src/types/common";

describe("When Pagination Tracker rendered ", () => {
  it("Expect it should render successfully", async () => {
    const { getByTestId } = render(
      <CPaginationTrack currentPage={2} totalPage={5} />
    );
    // const myElement = getByTestId(EDataTestId.CPaginationTrack);
    const myElement = screen.getByTestId(EDataTestId.CPaginationTrack);
    expect(myElement).toMatchSnapshot();
  });
});
