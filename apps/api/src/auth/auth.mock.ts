import { User } from './auth.types.js';

export const mockUsers: User[] = [
  { id: 'u1', username: 'inspector', role: 'inspector' },
  { id: 'u2', username: 'manager', role: 'site-manager' },
  { id: 'u3', username: 'admin', role: 'admin' }
];

export function findMockUser(username: string, _password: string): User | null {
  // In mock mode, accept any password
  return mockUsers.find(u => u.username === username) ?? null;
}