import { render, screen } from "@testing-library/react";
import React from "react";

import App from "./App";

test("renders learn react link", () => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  const linkElement = screen.getByText(/Redux Toolkit/i);
  expect(linkElement).toBeInTheDocument();
});
