import { Injectable } from '@nestjs/common';
import { TicketDAO } from './ticket.dao';
import * as Ably from 'ably';

@Injectable()
export class TicketService {
  private ably;
  private channel;

  constructor(private readonly ticketDAO: TicketDAO) {
    this.ably = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
    this.channel = this.ably.channels.get('ticket_updates');
  }

  async create(ticketData: Partial<any>): Promise<any> {
    const ticket = await this.ticketDAO.create(ticketData);
    this.channel.publish('ticket_created', ticket);
    return ticket;
  }

  async findAll(status?: string, priority?: string): Promise<any[]> {
    return this.ticketDAO.findAll(status, priority);
  }

  async findById(id: string): Promise<any> {
    return this.ticketDAO.findById(id);
  }

  async update(id: string, updateData: Partial<any>): Promise<any> {
    try {
      const updatedTicket = await this.ticketDAO.update(id, updateData);
      this.channel.publish('ticket_updated', updatedTicket);
      return updatedTicket;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.ticketDAO.remove(id);
    return { message: 'Ticket deleted successfully' };
  }
}
