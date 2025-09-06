import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Role } from './auth.types.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly allowedRoles?: Role[]) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers?.authorization as string | undefined;
    if (!auth || !auth.startsWith('Bearer ')) return false;
    const token = auth.slice('Bearer '.length);
    const payload = this.authService.verify(token);
    if (!payload) return false;
    req.user = payload;
    if (this.allowedRoles && this.allowedRoles.length > 0) {
      return this.allowedRoles.includes(payload.role);
    }
    return true;
  }
}