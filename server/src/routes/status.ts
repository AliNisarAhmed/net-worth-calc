import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  if (process.env.API_STATUS === "maintenance") {
    return res.json({ msg: process.env.API_STATUS_MSG });
  }
});

export default router;
