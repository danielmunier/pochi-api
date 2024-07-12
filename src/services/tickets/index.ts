import ticketConfig, { TicketConfig } from "../../database/schemas/ticketConfig";

export async function getTicketConfigService(guildId: string) {
    const config = await ticketConfig.findOne<TicketConfig>({ guildId })

    return config
}


export async function updateTicketConfigService(guildId: string, ticketCategoryId: string) {
    try {

        const updatedConfig = await ticketConfig.findOneAndUpdate({ guildId }, { ticketCategoryId }, { new: true, upsert: true })

        return updatedConfig
    } catch (error) {
        throw new Error(`Erro ao atualizar a configuração de ticket: ${error}`)
    }
}