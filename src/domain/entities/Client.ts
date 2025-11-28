export interface ClientProps {
  id: string;
  name: string;
  age: number;
  role: string; // cargo
}

export class Client {
  public readonly id: string;
  public name: string;
  public age: number;
  public role: string;

  constructor(props: ClientProps) {
    if (!props.name) throw new Error('Name is required');
    if (!props.role) throw new Error('Role is required');
    if (props.age <= 0) throw new Error('Age must be greater than 0');

    this.id = props.id;
    this.name = props.name;
    this.age = props.age;
    this.role = props.role;
  }
}
