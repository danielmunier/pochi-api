// src/controllers/ticketConfigController.ts

import { Request, Response } from 'express';
import { TicketConfig } from '../../database/schemas/ticketConfig';
import { getTicketConfigService } from '../../services/tickets';


export async function getTicketConfigController(req: Request, res: Response){
   try {
    console.log(req.params)
    const { id } = req.params;
    const config = await getTicketConfigService(id);
    res.json(config);

   } catch (error) {
    console.log(error)
   }
}


