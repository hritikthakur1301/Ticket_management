import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTicketDto, UpdateTicketDto } from './ticket.dto';
import { TicketService } from './ticket.service';

@ApiTags('Tickets')
@Controller('api/tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  async create(@Body() ticketData: CreateTicketDto) {
    return this.ticketService.create(ticketData);
  }

  @Get()
  @ApiOperation({ summary: 'List all tickets with optional filters' })
  async findAll(
    @Query('status') status?: string,
    @Query('priority') priority?: string
  ) {
    return this.ticketService.findAll(status, priority);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ticket details by ID' })
  async findOne(@Param('id') id: string) {
    return this.ticketService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update ticket details (status, priority, assignment)',
  })
  async update(@Param('id') id: string, @Body() updateData: UpdateTicketDto) {
    return this.ticketService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket' })
  async remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
