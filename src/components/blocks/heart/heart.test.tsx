import React from "react";
import "../../../mock-data/matchMedia.mock";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Heart from ".";

describe("Heart component", () => {
  it("isFav = true", () => {
    render(<Heart isFav={true} />);
    expect(screen.getByLabelText("Remove from favorites")).toBeInTheDocument();
  });

  it("isFav = false", () => {
    render(<Heart isFav={false} />);
    expect(screen.getByLabelText("Add to favorites")).toBeInTheDocument();
  });
});
