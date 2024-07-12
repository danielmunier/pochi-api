// src/controllers/ticketConfigController.ts

import { Request, Response } from 'express';
import { getTicketConfigService, updateTicketConfigService } from '../../services/tickets';


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

export async function updateTicketConfigController(req: Request, res: Response) {
   const { id } = req.params;
   const { categoryId } = req.body;

   

   try {
      const updatedConfig = await updateTicketConfigService(id, categoryId);
      res.status(200).json(updatedConfig);
      
   } catch (error) {
       console.error('Erro ao atualizar a configuração de ticket', error);
       res.status(500).json({ message: error });
   }
}

