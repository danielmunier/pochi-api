import mongoose, { Schema, Document } from 'mongoose';

export interface TicketConfig extends Document {
    ticketCategoryId: string | null;
}

const ticketConfigSchema: Schema = new Schema({
    guildId: {
        type: String,
        required: true,
        description: "ID da guilda onde os canais de tickets serão criados"
    },
    ticketCategoryId: {
        type: String,
        required: false,
        description: "ID da categoria onde os canais de tickets serão criados"
    }
});

export default mongoose.model<TicketConfig>('TicketConfig', ticketConfigSchema);
