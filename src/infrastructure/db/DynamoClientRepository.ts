import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { Client } from '../../domain/entities/Client';
import { ClientRepository } from '../../domain/repositories/ClientRepository';

const TABLE_NAME = process.env.CLIENT_TABLE as string;

export class DynamoClientRepository implements ClientRepository {
  constructor(private readonly client: DynamoDBDocumentClient) {}

  async create(clientEntity: Client): Promise<Client> {
    await this.client.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: clientEntity
      })
    );

    return clientEntity;
  }

  async findById(id: string): Promise<Client | null> {
    const result = await this.client.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id }
      })
    );

    return (result.Item as Client) ?? null;
  }

  async update(clientEntity: Client): Promise<Client> {
    await this.client.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: clientEntity
      })
    );

    return clientEntity;
  }

  async delete(id: string): Promise<void> {
    await this.client.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id }
      })
    );
  }

  async list(): Promise<Client[]> {
    const result = await this.client.send(
      new ScanCommand({
        TableName: TABLE_NAME
      })
    );

    return (result.Items as Client[]) ?? [];
  }
}
