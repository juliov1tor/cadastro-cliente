"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const UpdateClient_1 = require("../../domain/application/usecases/UpdateClient");
const dynamoClient_1 = require("../../infrastructure/db/dynamoClient");
const DynamoClientRepository_1 = require("../../infrastructure/db/DynamoClientRepository");
const ApiResponse_1 = require("./ApiResponse");
const handler = async (event) => {
    try {
        const id = event.pathParameters?.id;
        if (!id) {
            return (0, ApiResponse_1.badRequest)('Client id is required');
        }
        if (!event.body) {
            return (0, ApiResponse_1.badRequest)('Body is required');
        }
        const { name, age, role } = JSON.parse(event.body);
        const repository = new DynamoClientRepository_1.DynamoClientRepository(dynamoClient_1.dynamoClient);
        const usecase = new UpdateClient_1.UpdateClient(repository);
        try {
            const updated = await usecase.execute({
                id,
                name,
                age: age !== undefined ? Number(age) : undefined,
                role
            });
            return (0, ApiResponse_1.ok)(updated);
        }
        catch (error) {
            if (error.message === 'Client not found') {
                return (0, ApiResponse_1.notFound)(error.message);
            }
            throw error;
        }
    }
    catch (error) {
        console.error(error);
        return (0, ApiResponse_1.serverError)(error.message ?? 'Unexpected error');
    }
};
exports.handler = handler;
