import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseService } from '../config/supabase';

@Injectable()
export class AgentDAO {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(agent: Partial<any>): Promise<any> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('agent')
        .insert(agent)
        .select('*')
        .single();
      if (error)
      throw new HttpException(
        'Agent creation failed',
        HttpStatus.BAD_REQUEST
      );
     return data;
    } catch (error) {
      console.log("asdasd", error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('agent')
        .select('*');
      if (error)
        throw new HttpException(
          'Failed to fetch agents',
          HttpStatus.BAD_REQUEST
        );
      return data;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
