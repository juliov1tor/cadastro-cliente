"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const ListClients_1 = require("../../domain/application/usecases/ListClients");
const dynamoClient_1 = require("../../infrastructure/db/dynamoClient");
const DynamoClientRepository_1 = require("../../infrastructure/db/DynamoClientRepository");
const ApiResponse_1 = require("./ApiResponse");
const handler = async () => {
    try {
        const repository = new DynamoClientRepository_1.DynamoClientRepository(dynamoClient_1.dynamoClient);
        const usecase = new ListClients_1.ListClients(repository);
        const clients = await usecase.execute();
        return (0, ApiResponse_1.ok)(clients);
    }
    catch (error) {
        console.error(error);
        return (0, ApiResponse_1.serverError)(error.message ?? 'Unexpected error');
    }
};
exports.handler = handler;
