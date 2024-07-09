import ticketConfig, { TicketConfig } from "../../database/schemas/ticketConfig";

export async function getTicketConfigService(guildId: string) {
    const config = await ticketConfig.findOne<TicketConfig>({ guildId })

    return config
}