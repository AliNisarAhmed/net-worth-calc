import express from "express";
import netWorthRouter from "./routes/networth";

export default () => {
  const app = express();
  app.use(express.json());
  app.use(netWorthRouter)

  return app;
};