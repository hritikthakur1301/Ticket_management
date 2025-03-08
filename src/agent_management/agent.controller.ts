import { Controller, Post, Get, Body } from '@nestjs/common';
import { AgentService } from './agent.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AgentDTO } from './agent.dto';

@ApiTags('Agents')
@Controller('api/agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new agent' })
  async create(@Body() agentData: AgentDTO) {
    return this.agentService.create(agentData);
  }

  @Get()
  @ApiOperation({ summary: 'List all agents' })
  async findAll() {
    return this.agentService.findAll();
  }
}
