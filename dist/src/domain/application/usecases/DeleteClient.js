"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClient = void 0;
class DeleteClient {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(id) {
        const existing = await this.clientRepository.findById(id);
        if (!existing) {
            throw new Error('Client not found');
        }
        await this.clientRepository.delete(id);
    }
}
exports.DeleteClient = DeleteClient;
