import express from "express";
import netWorthRouter from "./routes/networth";
import cors from "cors";
import { httpErrorHandler, genericErrorHandler } from "./routes/errorHandler";
import client from "./redis/redis-client";
import path from "path";

export default async () => {
  const app = express();

  await client.connect();

  app.use(express.static(path.resolve(__dirname, "../client/build")));

  app.use(cors());
  app.use(express.json());

  app.use("/api", netWorthRouter);

  app.get("*", (req, res) => {
    return res.sendFile(
      path.resolve(__dirname, "../client/build", "index.html")
    );
  });

  app.use(httpErrorHandler);
  app.use(genericErrorHandler);

  return app;
};
