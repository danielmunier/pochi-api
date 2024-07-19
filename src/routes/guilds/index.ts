import { Router } from "express"
import { isAuthenticated } from "../../utils/middlewares"
import { getGuildChannelsController, getGuildConfigurationController, getGuildController, getGuildPermissionsController, getGuildRolesController, getGuildsController, updateGuildConfigurationController } from "../../controllers/guilds"
const router = Router()


router.get("/", getGuildsController)

router.get('/:id/permissions', getGuildPermissionsController)

router.get('/:id/', getGuildController)

router.get('/:id/channels', getGuildChannelsController)

router.get('/:id/config', getGuildConfigurationController)

router.post('/:id/config', updateGuildConfigurationController)

router.get('/:id/roles', getGuildRolesController)



export default router;


