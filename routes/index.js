import express, { response } from "express";
import { getIQTestDetails } from "./user.controller.js";
const router = express.Router();

router.get("/certificate/:userId/:testId", getIQTestDetails);

router.get("/report/:userId/:testId", getIQTestDetails);

router.get("*", (req, response) => {
  // response.redirect("https://careerjupiter.com/");
  response.status(200).json({
    message: "Welcome to Career Jupiter API",
    status: true,
  });
});

export default router;
