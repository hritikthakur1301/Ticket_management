import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketDAO } from './ticket.dao';
import { SupabaseService } from '../config/supabase';

@Module({
  controllers: [TicketController],
  providers: [TicketService, TicketDAO, SupabaseService],
  exports: [TicketService, TicketDAO],
})
export class TicketModule {}
