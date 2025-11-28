"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const GetClient_1 = require("../../domain/application/usecases/GetClient");
const dynamoClient_1 = require("../../infrastructure/db/dynamoClient");
const DynamoClientRepository_1 = require("../../infrastructure/db/DynamoClientRepository");
const ApiResponse_1 = require("./ApiResponse");
const handler = async (event) => {
    try {
        const id = event.pathParameters?.id;
        if (!id) {
            return (0, ApiResponse_1.badRequest)('Client id is required');
        }
        const repository = new DynamoClientRepository_1.DynamoClientRepository(dynamoClient_1.dynamoClient);
        const usecase = new GetClient_1.GetClient(repository);
        const client = await usecase.execute(id);
        if (!client) {
            return (0, ApiResponse_1.notFound)('Client not found');
        }
        return (0, ApiResponse_1.ok)(client);
    }
    catch (error) {
        console.error(error);
        return (0, ApiResponse_1.serverError)(error.message ?? 'Unexpected error');
    }
};
exports.handler = handler;
