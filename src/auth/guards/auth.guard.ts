import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers.authorization;
    
    if (!authHeader) {
      throw new UnauthorizedException('Token de autorización no proporcionado');
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token || token !== '12345') {
      throw new UnauthorizedException('Token de autorización inválido');
    }
    
    return true;
  }
}