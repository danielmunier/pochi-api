import { request, Request, Response } from "express";
import { getBotGuildsService, getGuildChannelsService, getGuildService, getMutualGuildsService, getUserGuildsService } from "../../services/guilds";
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
