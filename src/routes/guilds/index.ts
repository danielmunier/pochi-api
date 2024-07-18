import { Router } from "express"
import { isAuthenticated } from "../../utils/middlewares"
import { getGuildChannelsController, getGuildConfigurationController, getGuildController, getGuildPermissionsController, getGuildRolesController, getGuildsController, updateGuildConfigurationController } from "../../controllers/guilds"
const router = Router()


    router.get("/", isAuthenticated , getGuildsController)
    
    router.get('/:id/permissions', isAuthenticated, getGuildPermissionsController)

    router.get('/:id/', isAuthenticated, getGuildController)

    router.get('/:id/channels', getGuildChannelsController)

    router.get('/:id/config', getGuildConfigurationController)

    router.post('/:id/config', updateGuildConfigurationController)

    router.get('/:id/roles', getGuildRolesController)



export default router;


