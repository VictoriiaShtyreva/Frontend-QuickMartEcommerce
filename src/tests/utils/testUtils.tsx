import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { EnhancedStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { createNewStore } from "../../redux/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  initialState?: any;
  store?: EnhancedStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    initialState = {},
    store = createNewStore(),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
