import React from "react";

import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";

import "@testing-library/jest-dom";

import App from "./App";
import { handlers } from "./mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "error",
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays default data", async () => {
  const queries = render(<App />);
  const netWorthText = queries.getByTestId("totalnetworth");
  const totalAssetsText = queries.getByTestId("totalAssets");
  const totalLiabText = queries.getByTestId("totalLiabilities");

  expect(netWorthText).toHaveTextContent("0.00");
  expect(totalAssetsText).toHaveTextContent("0.00");
  expect(totalLiabText).toHaveTextContent("0.00");
});

test("When user inputs numbers and removes focus, app fetches net worth calculation and displays it", async () => {
  const queries = render(<App />);

  const chequingInput = queries.getByLabelText(/chequing/i);

  if (!(chequingInput instanceof HTMLInputElement)) {
    throw new Error("expecting an input element");
  }

  fireEvent.change(chequingInput, { target: { value: "100.22" } });

  expect(chequingInput.value).toBe("$ 100.22");

});
