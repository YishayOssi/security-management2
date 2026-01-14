import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserRole } from '../../users/dto/create-user.dto';

@Injectable()
export class CommanderGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== UserRole.COMMANDER) {
      throw new ForbiddenException('Only commanders can perform this action');
    }

    return true;
  }
}
