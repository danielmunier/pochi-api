import axios from 'axios'
import { DISCORD_API_URL } from '../../utils/constants'
import { PartialGuild } from '../../utils/types'
import User from '../../database/schemas/User'
import Guild from '../../database/schemas/guild'
import ticketConfig from '../../database/schemas/ticketConfig'
import formEntry from '../../database/schemas/formEntry'


export function getBotGuildsService() {
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
    })
}


export async function getUserGuildsService(id: string) {
    const user = await User.findById(id)
    if (!user) throw new Error("User not found")

    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    })
}

export async function getMutualGuildsService(id: string) {
    const { data: botGuilds } = await getBotGuildsService()
    const { data: userGuilds } = await getUserGuildsService(id)
    // Only Admin permissions

    const adminUserGuilds = userGuilds.filter(
        guild => (guild.permissions & 0x8) === 0x8
    )

    const mutualGuilds = adminUserGuilds.filter(
        guild => botGuilds.some(botGuild => botGuild.id === guild.id)
    )

    return mutualGuilds





}

export async function getGuildService(id: string) {
    return axios.get<PartialGuild>(`${DISCORD_API_URL}/guilds/${id}`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
    })
}

export function getGuildChannelsService(id: string) {
    return axios.get(`${DISCORD_API_URL}/guilds/${id}/channels`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
    })
}


export async function getGuildConfig(id: string) {
    try {
        const roles = await getGuildRolesService(id)
        const ticketData = await ticketConfig.findOne({ guildId: id })
        const formEntryData = await formEntry.findOne<any>({ guildId: id })
        if (!ticketData || !formEntryData) {
            return
        }
        const guildConfigData = {
            "guildId": formEntryData.guildId,
            "ticketCategoryId": ticketData.ticketCategoryId,
            "formEntry": {
                "formChannelId": formEntryData.formChannelId,
                "rolesMemberApproved": formEntryData.rolesMemberApproved,
                "rolesVerification": formEntryData.rolesVerification
            }
        }

       


        return guildConfigData
    } catch (error) {
        console.log(error)
        return {}
    }
};

export async function getGuildRolesService(id: string) {
    try {
        const { data: roles } = await axios.get<PartialGuild[]>(`${DISCORD_API_URL}/guilds/${id}/roles`, {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
            }
        })
        return roles

    } catch (error) {
        console.log(error)
        return []
    }

}

export async function updateGuildConfigService(formData: any) {
    try {
        const { guildId, ticketCategory, entryFormChannel, rolesVerification, rolesMemberApproved } = formData;
        
        // Extrair os IDs dos objetos
        const ticketCategoryId = ticketCategory ? ticketCategory.value : null;
        const entryFormChannelId = entryFormChannel ? entryFormChannel.value : null;
        const rolesVerificationIds = rolesVerification.map((role: { value: string }) => role.value);
        const rolesMemberApprovedIds = rolesMemberApproved.map((role: { value: string }) => role.value);

        console.log({
            guildId,
            ticketCategoryId,
            entryFormChannelId,
            rolesVerificationIds,
            rolesMemberApprovedIds
        });

        const ticketData = await ticketConfig.findOneAndUpdate(
            { guildId },
            { ticketCategoryId },
            { new: true, upsert: true }
        );

        const entryFormData = await formEntry.findOneAndUpdate(
            { guildId },
            { formChannelId: entryFormChannelId, rolesVerification: rolesVerificationIds, rolesMemberApproved: rolesMemberApprovedIds },
            { new: true, upsert: true }
        );

        if (ticketData && entryFormData) {
            return { ticketData, entryFormData };
        }

        // Para fins de teste, retorne um objeto de exemplo
        return {
            ticketCategoryId,
            entryFormChannelId,
            rolesVerificationIds,
            rolesMemberApprovedIds
        };

    } catch (error: any) {
        console.error(error);
        return false;
    }
}
