import { Client } from '../entities/Client';

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  findById(id: string): Promise<Client | null>;
  update(client: Client): Promise<Client>;
  delete(id: string): Promise<void>;
  list(): Promise<Client[]>;
}
