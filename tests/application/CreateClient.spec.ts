import { InMemoryClientRepository } from '../../src/infrastructure/memory/InMemoryClientRepository';
import { CreateClient } from '../../src/domain/application/usecases/CreateClient';

describe('CreateClient use case', () => {
  it('should create a client with valid data', async () => {
    const repo = new InMemoryClientRepository();
    const usecase = new CreateClient(repo);

    const client = await usecase.execute({
      name: 'John Doe',
      age: 30,
      role: 'Developer'
    });

    expect(client.id).toBeDefined();
    expect(client.name).toBe('John Doe');
    expect(client.age).toBe(30);
    expect(client.role).toBe('Developer');

    const stored = await repo.findById(client.id);
    expect(stored).not.toBeNull();
  });

  it('should throw if age is invalid', async () => {
    const repo = new InMemoryClientRepository();
    const usecase = new CreateClient(repo);

    await expect(
      usecase.execute({
        name: 'Invalid',
        age: 0,
        role: 'Dev'
      })
    ).rejects.toThrow('Age must be greater than 0');
  });
});
