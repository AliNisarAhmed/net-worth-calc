// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  // Handles a POST /login request
  rest.post("http://localhost:5000/api/networth/calculate", (req, res, ctx) => {
    return res(
      ctx.json({
        totalNetWorth: "100.22",
        totalAssets: "100.22",
        totalLiabilities: "0",
      })
    );
  }),
];
