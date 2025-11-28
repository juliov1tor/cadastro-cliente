"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeClientRepository = makeClientRepository;
const DynamoClientRepository_1 = require("../db/DynamoClientRepository");
const InMemoryClientRepository_1 = require("../memory/InMemoryClientRepository");
const dynamoClient_1 = require("../db/dynamoClient");
let inMemoryRepo = null;
function makeClientRepository() {
    // serverless-offline seta IS_OFFLINE='true'
    if (process.env.IS_OFFLINE === 'true') {
        if (!inMemoryRepo) {
            inMemoryRepo = new InMemoryClientRepository_1.InMemoryClientRepository();
        }
        return inMemoryRepo;
    }
    // Ambiente real (AWS)
    return new DynamoClientRepository_1.DynamoClientRepository(dynamoClient_1.dynamoClient);
}
