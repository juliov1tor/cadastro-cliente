"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dynamoClient_1 = require("../../infrastructure/db/dynamoClient");
const DynamoClientRepository_1 = require("../../infrastructure/db/DynamoClientRepository");
const DeleteClient_1 = require("../../domain/application/usecases/DeleteClient");
const ApiResponse_1 = require("./ApiResponse");
const handler = async (event) => {
    try {
        const id = event.pathParameters?.id;
        if (!id) {
            return (0, ApiResponse_1.badRequest)('Client id is required');
        }
        const repository = new DynamoClientRepository_1.DynamoClientRepository(dynamoClient_1.dynamoClient);
        const usecase = new DeleteClient_1.DeleteClient(repository);
        try {
            await usecase.execute(id);
            return (0, ApiResponse_1.noContent)();
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
