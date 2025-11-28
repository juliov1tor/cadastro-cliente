import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DeleteClient } from '../../domain/application/usecases/DeleteClient';
import { dynamoClient } from '../../infrastructure/db/dynamoClient';
import { DynamoClientRepository } from '../../infrastructure/db/DynamoClientRepository';
import { badRequest, notFound, noContent, serverError } from './ApiResponse';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return badRequest('Client id is required');
    }

    const repository = new DynamoClientRepository(dynamoClient);
    const usecase = new DeleteClient(repository);

    try {
      await usecase.execute(id);
      return noContent();
    } catch (error: any) {
      if (error.message === 'Client not found') {
        return notFound(error.message);
      }
      throw error;
    }
  } catch (error: any) {
    console.error(error);
    return serverError(error.message ?? 'Unexpected error');
  }
};
