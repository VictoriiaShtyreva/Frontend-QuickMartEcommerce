import { render, screen } from "@testing-library/react";
import React from "react";

import App from "./App";

//Mock timers before running the tests
jest.useFakeTimers();

test("renders learn react link", () => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  const linkElement = screen.getByText(/Redux Toolkit/i);
  expect(linkElement).toBeInTheDocument();
});

//Clear timers after the tests
afterAll(() => {
  jest.useRealTimers(); // Restore real timers
});
