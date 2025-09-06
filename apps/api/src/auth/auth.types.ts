export type Role = 'inspector' | 'site-manager' | 'admin';

export interface User {
  id: string;
  username: string;
  role: Role;
  passwordHash?: string; // for live mode future use
}

export interface JwtPayload {
  sub: string; // user id
  username: string;
  role: Role;
}