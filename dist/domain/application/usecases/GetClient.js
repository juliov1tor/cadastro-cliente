"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClient = void 0;
class GetClient {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(id) {
        return this.clientRepository.findById(id);
    }
}
exports.GetClient = GetClient;
