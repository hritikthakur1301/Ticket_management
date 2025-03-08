import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from '../config/supabase';

@Injectable()
export class TicketDAO {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(ticket: Partial<any>): Promise<any> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('ticket')
        .insert(ticket)
        .select('*')
        .single();
      if (error)
        throw new HttpException(
          'Ticket creation failed',
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

  async findAll(status?: string, priority?: string): Promise<any[]> {
    try {
      let query = this.supabaseService.getClient().from('ticket').select('*');
      if (status) query = query.eq('status', status);
      if (priority) query = query.eq('priority', priority);
      const { data, error } = await query;
      if (error)
        throw new HttpException(
          'Failed to fetch tickets',
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

  async findById(id: string): Promise<any> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('ticket')
        .select('*')
        .eq('id', id)
        .single();
      if (error)
        throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
      return data;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: string, updateData: Partial<any>): Promise<any> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('ticket')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();
      if (error)
        throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);
      return data;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

    async remove(id: string): Promise<{ message: string }> {
    try {
      const { error } = await this.supabaseService
        .getClient()
        .from('ticket')
        .delete()
        .eq('id', id);
      if (error) throw new HttpException('Deletion failed', HttpStatus.BAD_REQUEST);
      return { message: 'Ticket deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
