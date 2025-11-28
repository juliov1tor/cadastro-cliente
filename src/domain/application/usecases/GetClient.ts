import { Client } from '../../../domain/entities/Client';
import { ClientRepository } from '../../../domain/repositories/ClientRepository';

export class GetClient {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: string): Promise<Client | null> {
    return this.clientRepository.findById(id);
  }
}
