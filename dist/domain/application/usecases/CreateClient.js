"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClient = void 0;
const uuid_1 = require("uuid");
const Client_1 = require("../../../domain/entities/Client");
class CreateClient {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(data) {
        const client = new Client_1.Client({
            id: (0, uuid_1.v4)(),
            name: data.name,
            age: data.age,
            role: data.role
        });
        return this.clientRepository.create(client);
    }
}
exports.CreateClient = CreateClient;
