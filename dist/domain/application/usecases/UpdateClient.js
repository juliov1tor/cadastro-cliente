"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClient = void 0;
const Client_1 = require("../../../domain/entities/Client");
class UpdateClient {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(data) {
        const existing = await this.clientRepository.findById(data.id);
        if (!existing) {
            throw new Error('Client not found');
        }
        const updated = new Client_1.Client({
            id: existing.id,
            name: data.name ?? existing.name,
            age: data.age ?? existing.age,
            role: data.role ?? existing.role
        });
        return this.clientRepository.update(updated);
    }
}
exports.UpdateClient = UpdateClient;
