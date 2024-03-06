import { render, screen } from "@testing-library/react";

import App from "./App";

//Mock timers before running the tests
jest.useFakeTimers();

test("renders learn react link", async () => {
  render(<App />);
  // Use findByText to asynchronously find the text
  const linkElement = await screen.findByText(/Redux Toolkit/i);
  expect(linkElement).toBeInTheDocument();
});

//Clear timers after the tests
afterAll(() => {
  jest.useRealTimers(); // Restore real timers
});
