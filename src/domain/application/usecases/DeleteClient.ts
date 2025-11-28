import { ClientRepository } from '../../../domain/repositories/ClientRepository';

export class DeleteClient {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.clientRepository.findById(id);

    if (!existing) {
      throw new Error('Client not found');
    }

    await this.clientRepository.delete(id);
  }
}
