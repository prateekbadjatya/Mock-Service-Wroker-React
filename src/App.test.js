import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import App from "./App";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { rest } from "msw";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("renders welcome message when user is fetched successfully", async () => {
  render(<App />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByText(/Prateek/i)).toBeInTheDocument()
  );
});

test("renders error message when user fetch fails", async () => {
  server.use(
    rest.get(
      "http://localhost:3000/api/user",
      (req, res, context) => {
        return res(context.status(400));
      }
    )
  );

  render(<App />);

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.getByText(/Error fetching user/i)).toBeInTheDocument()
  );
});