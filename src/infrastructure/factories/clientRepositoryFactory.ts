import { ClientRepository } from '../../domain/repositories/ClientRepository';
import { DynamoClientRepository } from '../db/DynamoClientRepository';
import { InMemoryClientRepository } from '../memory/InMemoryClientRepository';
import { dynamoClient } from '../db/dynamoClient';

let inMemoryRepo: InMemoryClientRepository | null = null;

export function makeClientRepository(): ClientRepository {
  // serverless-offline seta IS_OFFLINE='true'
  if (process.env.IS_OFFLINE === 'true') {
    if (!inMemoryRepo) {
      inMemoryRepo = new InMemoryClientRepository();
    }
    return inMemoryRepo;
  }

  // Ambiente real (AWS)
  return new DynamoClientRepository(dynamoClient);
}
