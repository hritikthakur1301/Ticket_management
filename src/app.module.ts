import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket_management/ticket.module';
import { AgentModule } from './agent_management/agent.module';
import { SupabaseService } from './config/supabase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TicketModule,
    AgentModule
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
})
  
export class AppModule {}
