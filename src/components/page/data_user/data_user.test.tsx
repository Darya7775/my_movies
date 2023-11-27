import React from "react";
import { screen } from "@testing-library/react";
import "firebase/auth";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithProvidersAndBrowserRouter } from "../../../utils/test_utils";
import DataUser from ".";
import "../../../mock-data/matchMedia.mock";
import { Route } from "react-router-dom";
import Register from "../../page/register";
import Protected from "../../containers/protected";

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn()
      .mockReturnValueOnce({
        currentUser: {
          email: "stolyarova.199535@gmail.com",
          uid: "lj3ccNxYSvZVCCK73IUYi5LDy5L2",
          emailVerified: true
        },
      }),
    updateProfile: jest.fn().mockImplementationOnce(() =>
      Promise.resolve()
    ),
    EmailAuthProvider: {
      credential: jest.fn()
        .mockReturnValueOnce({
          email: "stolyarova.199535@gmail.com",
          password: "1234Qwer"
        })
        .mockReturnValueOnce({
          email: "stolyarova.199535@gmail.com",
          password: "8790Kjui"
        })
    },
    reauthenticateWithCredential: jest.fn()
      .mockImplementationOnce((
        currentUser,
        testValues: { email: string, password: string }
      ) => {
        if (testValues.password === "1234Qwer") {
          return Promise.resolve();
        }
        return Promise.reject({ message: "Wrong password"});
      })
      .mockImplementationOnce((
        currentUser,
        testValues: { email: string, password: string }
      ) => {
        if (testValues.password === "1234Qwer") {
          return Promise.resolve();
        }
        return Promise.reject({ message: "Firebase: Error (auth/wrong-password)"});
      }),
    deleteUser: jest.fn()
      .mockImplementationOnce(() =>
        Promise.resolve()
      ),
    onAuthStateChanged: jest.fn()
  };
});

describe("Data_user component", () => {

  it("render", () => {

    renderWithProvidersAndBrowserRouter(
      <Route path={"/data_user"} element={<Protected redirect="/login"><DataUser/></Protected>} />,
      "/data_user"
    );

    const numberOfInput = 3;

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Foto/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Enter your password/i, hidden: true })).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toBe(numberOfInput);
    expect(screen.getByRole("button", {name: /Send/i}));
    expect(screen.getByRole("button", {name: /Delete account/i}));
    expect(screen.getByRole("heading", { name: /Confirm deletion/i, hidden: true })).toBeInTheDocument();
  });

  it("update data", async() => {

    renderWithProvidersAndBrowserRouter(
      <Route path={"/data_user"} element={<Protected redirect="/login"><DataUser/></Protected>} />,
      "/data_user"
    );

    const [ nameInput, fotoInput ] = screen.getAllByRole("textbox");

    await userEvent.type(nameInput, "JavaScript");
    await userEvent.type(fotoInput, "https://via.placeholder.com/150/b0f7cc");
    await userEvent.click(screen.getByRole("button", {name: /Send/i}));

    expect(screen.queryByText(/Data updated successfully/i)).toBeInTheDocument();
  });

  it("delete user successfully", async() => {

    renderWithProvidersAndBrowserRouter(
      <>
        <Route path={"/register"} element={<Register />} />
        <Route path={"/data_user"} element={<Protected redirect="/login"><DataUser/></Protected>} />
      </>,
      "/data_user"
    );

    await userEvent.click(screen.getByRole("button", {name: /Delete account/i}));
    expect(screen.getByRole("heading", { name: /Confirm deletion/i, hidden: false })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Enter your password/i, hidden: false })).toBeInTheDocument();
    expect(screen.getByRole("button", {name: /Confirm/i})).toBeDisabled();

    await userEvent.type(screen.getByRole("textbox", {name: /Enter your password/i}), "1234Qwer");
    expect(screen.getByRole("button", {name: /Confirm/i})).toBeEnabled();

    await userEvent.click(screen.getByRole("button", {name: /Confirm/i}));
    expect(screen.queryByText(/Account delete successfully/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Confirm deletion/i, hidden: true })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Enter your password/i, hidden: true })).toBeInTheDocument();

    const delay = 1500;

    await new Promise(res => setTimeout(() => {
      expect(screen.getByRole("heading", { name: /Registration/i })).toBeInTheDocument();
      screen.debug();
      console.log("done");
      res("void");
    }, delay));
  });

  it("delete user unsuccessfully", async() => {

    renderWithProvidersAndBrowserRouter(
      <Route path={"/data_user"} element={<Protected redirect="/login"><DataUser/></Protected>} />,
      "/data_user"
    );

    await userEvent.click(screen.getByRole("button", {name: /Delete account/i}));
    expect(screen.getByRole("heading", { name: /Confirm deletion/i, hidden: false })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Enter your password/i, hidden: false })).toBeInTheDocument();
    expect(screen.getByRole("button", {name: /Confirm/i})).toBeDisabled();

    await userEvent.type(screen.getByRole("textbox", {name: /Enter your password/i}), "8790Kjui");
    expect(screen.getByRole("button", {name: /Confirm/i})).toBeEnabled();

    await userEvent.click(screen.getByRole("button", {name: /Confirm/i}));
    expect(screen.queryByText(/wrong-password/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Confirm deletion/i, hidden: false })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Enter your password/i, hidden: false })).toBeInTheDocument();

  });
});

