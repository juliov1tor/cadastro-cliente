"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClients = void 0;
class ListClients {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute() {
        return this.clientRepository.list();
    }
}
exports.ListClients = ListClients;
