import express from "express";
import netWorthRouter from "./routes/networth";
import cors from 'cors';

export default () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api", netWorthRouter)

  return app;
};
