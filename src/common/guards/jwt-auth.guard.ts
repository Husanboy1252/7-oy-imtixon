import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Token topilmadi');
    }

    try {
      // Tokenni qo'lda tekshirish
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'supersecretkey', // .env dagi JWT_SECRET bilan bir xil bo'lsin
      });
      
      // Foydalanuvchi ma'lumotlarini request'ga biriktirish
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token yaroqsiz yoki muddati o\'tgan');
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
