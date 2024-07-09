import { Router } from "express";
import authRouter from "./auth"
import guildsRouter from "./guilds"
import ticketRouter from "./tickets"
import { getTicketConfigController } from "../controllers/ticket";

const router = Router()

router.use("/auth", authRouter)
router.use("/guilds", guildsRouter)
router.use("/tickets", ticketRouter)

export default router 