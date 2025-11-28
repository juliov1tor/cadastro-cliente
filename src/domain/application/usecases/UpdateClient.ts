import { Client } from '../../../domain/entities/Client';
import { ClientRepository } from '../../../domain/repositories/ClientRepository';

interface UpdateClientRequest {
  id: string;
  name?: string;
  age?: number;
  role?: string;
}

export class UpdateClient {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(data: UpdateClientRequest): Promise<Client> {
    const existing = await this.clientRepository.findById(data.id);

    if (!existing) {
      throw new Error('Client not found');
    }

    const updated = new Client({
      id: existing.id,
      name: data.name ?? existing.name,
      age: data.age ?? existing.age,
      role: data.role ?? existing.role
    });

    return this.clientRepository.update(updated);
  }
}
