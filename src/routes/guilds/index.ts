import { Router } from "express"
import { isAuthenticated } from "../../utils/middlewares"
import { getGuildChannelsController, getGuildController, getGuildPermissionsController, getGuildsController } from "../../controllers/guilds"
const router = Router()


    router.get("/", isAuthenticated , getGuildsController)
    
    router.get('/:id/permissions', isAuthenticated, getGuildPermissionsController)

    router.get('/:id/', isAuthenticated, getGuildController)

    router.get('/:id/channels', isAuthenticated, getGuildChannelsController)



export default router;


