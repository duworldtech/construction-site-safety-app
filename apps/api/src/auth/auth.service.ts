import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { findMockUser } from './auth.mock.js';
import { JwtPayload, User } from './auth.types.js';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET ?? 'dev-jwt-secret-change-me';

  async validateUser(username: string, password: string): Promise<User | null> {
    // Mock mode: use in-memory users
    return findMockUser(username, password);
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload: JwtPayload = { sub: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, this.jwtSecret, { algorithm: 'HS256', expiresIn: '1h' });
    return { access_token: token };
  }

  verify(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.jwtSecret) as JwtPayload;
    } catch {
      return null;
    }
  }
}