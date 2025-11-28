import { Client } from '../../domain/entities/Client';
import { ClientRepository } from '../../domain/repositories/ClientRepository';

export class InMemoryClientRepository implements ClientRepository {
  private items: Client[] = [];

  async create(client: Client): Promise<Client> {
    this.items.push(client);
    return client;
  }

  async findById(id: string): Promise<Client | null> {
    return this.items.find((c) => c.id === id) ?? null;
  }

  async update(client: Client): Promise<Client> {
    const index = this.items.findIndex((c) => c.id === client.id);
    if (index === -1) {
      throw new Error('Client not found');
    }
    this.items[index] = client;
    return client;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((c) => c.id !== id);
  }

  async list(): Promise<Client[]> {
    return [...this.items];
  }
}
