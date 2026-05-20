import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import profileRouter from "./profile.js";
import shopRouter from "./shop.js";
import leaderboardRouter from "./leaderboard.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(profileRouter);
router.use(shopRouter);
router.use(leaderboardRouter);

export default router;
