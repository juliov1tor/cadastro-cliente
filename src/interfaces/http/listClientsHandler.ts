import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { ListClients } from '../../domain/application/usecases/ListClients';
import { dynamoClient } from '../../infrastructure/db/dynamoClient';
import { DynamoClientRepository } from '../../infrastructure/db/DynamoClientRepository';
import { ok, serverError } from './ApiResponse';

export const handler: APIGatewayProxyHandlerV2 = async () => {
  try {
    const repository = new DynamoClientRepository(dynamoClient);
    const usecase = new ListClients(repository);

    const clients = await usecase.execute();
    return ok(clients);
  } catch (error: any) {
    console.error(error);
    return serverError(error.message ?? 'Unexpected error');
  }
};
