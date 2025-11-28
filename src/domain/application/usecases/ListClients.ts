import { Client } from '../../../domain/entities/Client';
import { ClientRepository } from '../../../domain/repositories/ClientRepository';

export class ListClients {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(): Promise<Client[]> {
    return this.clientRepository.list();
  }
}
