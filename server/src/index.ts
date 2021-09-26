import express, { Request, Response, NextFunction } from "express";
import { locations } from "./data";
const app = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.get("/api/timezones", (req: Request, res: Response) => {
  return res.json(locations); 
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
