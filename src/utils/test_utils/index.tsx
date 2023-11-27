import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import Layout from "../../components/base/layout";
import { AppStore, RootState, setupStore } from "../../store";
// import AppRoutes from "../../components/routes";

// @todo проблема со swiper

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<object>): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const renderWithProvidersAndBrowserRouter = (
  ui: React.ReactElement,
  initialRoute = "/",
  {preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<object>): JSX.Element => {
    return(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route element={<Layout />}>
              {children}
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>);
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

