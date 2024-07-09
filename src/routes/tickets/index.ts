import { Router } from "express"
import { getTicketConfigController } from "../../controllers/ticket"
import { isAuthenticated } from "../../utils/middlewares"

const router = Router()


router.get('/:id/', isAuthenticated, getTicketConfigController)


export default router;
