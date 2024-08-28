import { Router } from "express";
import passport from "passport";
import { createToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import {userDto} from "../dto/user.dto.js"

const router = Router();

router.post("/register", passportCall("register"), async (req, res) => {
  try {
    res.status(201).json({ status: "ok", msg: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

router.post("/login", passportCall("login"), async (req, res) => {
  try {
    const token = createToken(req.user);

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ status: "ok", payload: userDto(req.user) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

router.get("/current", passportCall("jwt"), async (req, res) => {
try {
  res.status(200).json({ status: "ok", user: userDto(req.user) });
} catch (error) {
  console.log(error);
  res.status(500).json({ status: "error", msg: "Internal server error" });
}
});

export default router;
