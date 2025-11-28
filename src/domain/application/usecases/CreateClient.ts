import { v4 as uuid } from 'uuid';
import { Client } from '../../../domain/entities/Client';
import { ClientRepository } from '../../../domain/repositories/ClientRepository';

interface CreateClientRequest {
  name: string;
  age: number;
  role: string;
}

export class CreateClient {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(data: CreateClientRequest): Promise<Client> {
    const client = new Client({
      id: uuid(),
      name: data.name,
      age: data.age,
      role: data.role
    });

    return this.clientRepository.create(client);
  }
}
