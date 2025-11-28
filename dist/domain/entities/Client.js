"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    constructor(props) {
        if (!props.name)
            throw new Error('Name is required');
        if (!props.role)
            throw new Error('Role is required');
        if (props.age <= 0)
            throw new Error('Age must be greater than 0');
        this.id = props.id;
        this.name = props.name;
        this.age = props.age;
        this.role = props.role;
    }
}
exports.Client = Client;
