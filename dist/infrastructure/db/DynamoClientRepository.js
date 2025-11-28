"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoClientRepository = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const TABLE_NAME = process.env.CLIENT_TABLE;
class DynamoClientRepository {
    constructor(client) {
        this.client = client;
    }
    async create(clientEntity) {
        await this.client.send(new lib_dynamodb_1.PutCommand({
            TableName: TABLE_NAME,
            Item: clientEntity
        }));
        return clientEntity;
    }
    async findById(id) {
        const result = await this.client.send(new lib_dynamodb_1.GetCommand({
            TableName: TABLE_NAME,
            Key: { id }
        }));
        return result.Item ?? null;
    }
    async update(clientEntity) {
        await this.client.send(new lib_dynamodb_1.PutCommand({
            TableName: TABLE_NAME,
            Item: clientEntity
        }));
        return clientEntity;
    }
    async delete(id) {
        await this.client.send(new lib_dynamodb_1.DeleteCommand({
            TableName: TABLE_NAME,
            Key: { id }
        }));
    }
    async list() {
        const result = await this.client.send(new lib_dynamodb_1.ScanCommand({
            TableName: TABLE_NAME
        }));
        return result.Items ?? [];
    }
}
exports.DynamoClientRepository = DynamoClientRepository;
