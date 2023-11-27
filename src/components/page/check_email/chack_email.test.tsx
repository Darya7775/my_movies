import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CheckMail from ".";

describe("Check main component", () => {
  it("render", () => {
    render(<CheckMail />);

    expect(screen.getByText(/Please check your email/i)).toBeInTheDocument();
  });
});
