import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { GetClient } from '../../domain/application/usecases/GetClient';
import { dynamoClient } from '../../infrastructure/db/dynamoClient';
import { DynamoClientRepository } from '../../infrastructure/db/DynamoClientRepository';
import { notFound, ok, serverError, badRequest } from './ApiResponse';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return badRequest('Client id is required');
    }

    const repository = new DynamoClientRepository(dynamoClient);
    const usecase = new GetClient(repository);

    const client = await usecase.execute(id);

    if (!client) {
      return notFound('Client not found');
    }

    return ok(client);
  } catch (error: any) {
    console.error(error);
    return serverError(error.message ?? 'Unexpected error');
  }
};
