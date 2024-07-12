import { Router } from "express"
import { updateTicketConfigController, getTicketConfigController } from "../../controllers/ticket"
import { isAuthenticated } from "../../utils/middlewares"

const router = Router()


router.get('/:id/',isAuthenticated, getTicketConfigController)
router.post('/:id/', isAuthenticated, updateTicketConfigController)


export default router;
