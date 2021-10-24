import express from "express";
import netWorthRouter from "./routes/networth";
import cors from "cors";
import { httpErrorHandler, genericErrorHandler } from "./routes/errorHandler";

export default () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api", netWorthRouter);

  app.use(httpErrorHandler);
  app.use(genericErrorHandler);

  return app;
};
