import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { AgentDAO } from './agent.dao';
import { SupabaseService } from '../config/supabase';

@Module({
  controllers: [AgentController],
  providers: [AgentService, AgentDAO, SupabaseService],
  exports: [AgentService],
})
export class AgentModule {}
