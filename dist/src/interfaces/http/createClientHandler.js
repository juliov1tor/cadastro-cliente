"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dynamoClient_1 = require("../../infrastructure/db/dynamoClient");
const DynamoClientRepository_1 = require("../../infrastructure/db/DynamoClientRepository");
const CreateClient_1 = require("../../domain/application/usecases/CreateClient");
const ApiResponse_1 = require("./ApiResponse");
const handler = async (event) => {
    try {
        if (!event.body) {
            return (0, ApiResponse_1.badRequest)('Body is required');
        }
        const { name, age, role } = JSON.parse(event.body);
        if (!name || !age || !role) {
            return (0, ApiResponse_1.badRequest)('name, age and role are required');
        }
        const repository = new DynamoClientRepository_1.DynamoClientRepository(dynamoClient_1.dynamoClient);
        const usecase = new CreateClient_1.CreateClient(repository);
        const client = await usecase.execute({ name, age: Number(age), role });
        return (0, ApiResponse_1.created)(client);
    }
    catch (error) {
        console.error(error);
        return (0, ApiResponse_1.serverError)(error.message ?? 'Unexpected error');
    }
};
exports.handler = handler;
