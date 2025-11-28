import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { CreateClient } from '../../domain/application/usecases/CreateClient';
import { dynamoClient } from '../../infrastructure/db/dynamoClient';
import { DynamoClientRepository } from '../../infrastructure/db/DynamoClientRepository';
import { badRequest, created, serverError } from './ApiResponse';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    if (!event.body) {
      return badRequest('Body is required');
    }

    const { name, age, role } = JSON.parse(event.body);

    if (!name || age === undefined || !role) {
      return badRequest('name, age and role are required');
    }

    const repository = new DynamoClientRepository(dynamoClient);
    const usecase = new CreateClient(repository);

    const client = await usecase.execute({
      name,
      age: Number(age),
      role
    });

    return created(client);
  } catch (error: any) {
    console.error(error);
    return serverError(error.message ?? 'Unexpected error');
  }
};
