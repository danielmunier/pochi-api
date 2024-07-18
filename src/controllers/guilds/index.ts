import { request, Request, Response } from "express";
import { getBotGuildsService, getGuildChannelsService, getGuildConfig, getGuildRolesService, getGuildService, getMutualGuildsService, getUserGuildsService, updateGuildConfigService } from "../../services/guilds";
import { User } from "../../database/schemas/User";

export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User
    try {

        const guilds = await getMutualGuildsService(user.id)

        res.send(
            guilds
        )

    } catch (error) {
        console.log(error)
        res.sendStatus(400).send("Error")
    }
}
export async function getGuildPermissionsController(req: Request, res: Response) {
    const user = req.user as User
    try {
        const { id } = req.params
        const guilds = await getMutualGuildsService(user.id)
        const validGuild = guilds.some(guild => guild.id === id)


        return validGuild ? res.sendStatus(200) : res.sendStatus(403)

    } catch (error) {
        console.log(error)
    }
}

export async function getGuildController(req: Request, res: Response) {
    const { id } = req.params
    try {
        const { data: guild } = await getGuildService(id)

        res.send(guild)

    } catch (error) {
        console.log(error)
        res.sendStatus(400).send("Error")
    }
}

export async function getGuildChannelsController(req: Request, res: Response) {
    const { id } = req.params
    try {
        const { data: guild } = await getGuildChannelsService(id)

        res.send(guild)

    } catch (error) {
        console.log(error)
        res.sendStatus(400).send("Error")
    }
}


export async function getGuildConfigurationController(req: Request, res: Response) {

    const { id } = req.params;

    try {
        const guildConfig = await getGuildConfig(id);
        if (!guildConfig) {
            return res.status(404).json({ message: 'Configuração da guilda não encontrada' });
        }
        res.status(200).json(guildConfig);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar configuração da guilda', error });
    }
}

export async function updateGuildConfigurationController(req: Request, res: Response) {
    try {
        const { guildId, ticketCategoryId, entryFormChannelId } = req.body.data
        const guild = await getGuildService(guildId)
        if (guild) {
            const updatedGuild = await updateGuildConfigService(req.body.data)
            if (!updatedGuild) {
                return { "status": "Error ao mudar configuração da guilda" }
            }

        }
    } catch (error: any) {
        console.log(error)
        return { message: error.message }

    }
}

export async function getGuildRolesController(req: Request, res:Response) {
    try {
        const {id} = req.params
        const roles = await getGuildRolesService(id)

        res.json(roles).status(200)
        
    } catch (error) {
        console.log(error)
        res.json({}).status(403)
    }

}