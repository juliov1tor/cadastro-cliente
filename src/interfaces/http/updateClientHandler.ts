import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { UpdateClient } from '../../domain/application/usecases/UpdateClient';
import { dynamoClient } from '../../infrastructure/db/dynamoClient';
import { DynamoClientRepository } from '../../infrastructure/db/DynamoClientRepository';
import { badRequest, notFound, ok, serverError } from './ApiResponse';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return badRequest('Client id is required');
    }

    if (!event.body) {
      return badRequest('Body is required');
    }

    const { name, age, role } = JSON.parse(event.body);

    const repository = new DynamoClientRepository(dynamoClient);
    const usecase = new UpdateClient(repository);

    try {
      const updated = await usecase.execute({
        id,
        name,
        age: age !== undefined ? Number(age) : undefined,
        role
      });

      return ok(updated);
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
