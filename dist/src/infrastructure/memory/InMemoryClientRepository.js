"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryClientRepository = void 0;
class InMemoryClientRepository {
    constructor() {
        this.items = [];
    }
    async create(client) {
        this.items.push(client);
        return client;
    }
    async findById(id) {
        return this.items.find((c) => c.id === id) ?? null;
    }
    async update(client) {
        const index = this.items.findIndex((c) => c.id === client.id);
        if (index === -1) {
            throw new Error('Client not found');
        }
        this.items[index] = client;
        return client;
    }
    async delete(id) {
        this.items = this.items.filter((c) => c.id !== id);
    }
    async list() {
        return [...this.items];
    }
}
exports.InMemoryClientRepository = InMemoryClientRepository;
