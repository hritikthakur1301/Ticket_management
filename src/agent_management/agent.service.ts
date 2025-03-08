import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AgentDAO } from './agent.dao';
import * as Ably from 'ably';

@Injectable()
export class AgentService {
  private ably;
  private channel;

  constructor(private readonly agentDAO: AgentDAO) {
    this.ably = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
    this.channel = this.ably.channels.get('agent_updates');
  }

  async create(agentData: Partial<any>): Promise<any> {
    try {
      const agent = await this.agentDAO.create(agentData);
      await this.channel.publish('agent_created', agent);
      return agent;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<any[]> {
    try {
      return await this.agentDAO.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
