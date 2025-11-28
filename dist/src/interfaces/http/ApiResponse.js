"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.notFound = exports.badRequest = exports.noContent = exports.created = exports.ok = void 0;
const ok = (body) => ({
    statusCode: 200,
    body: JSON.stringify(body)
});
exports.ok = ok;
const created = (body) => ({
    statusCode: 201,
    body: JSON.stringify(body)
});
exports.created = created;
const noContent = () => ({
    statusCode: 204,
    body: ''
});
exports.noContent = noContent;
const badRequest = (message) => ({
    statusCode: 400,
    body: JSON.stringify({ error: message })
});
exports.badRequest = badRequest;
const notFound = (message) => ({
    statusCode: 404,
    body: JSON.stringify({ error: message })
});
exports.notFound = notFound;
const serverError = (message) => ({
    statusCode: 500,
    body: JSON.stringify({ error: message })
});
exports.serverError = serverError;
