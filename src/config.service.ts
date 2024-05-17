import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config'; 

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get jwtSecret(): string {
    return this.nestConfigService.get('JWT_SECRET');
  }

  get jwtExpiration(): string {
    return this.nestConfigService.get('JWT_EXPIRATION');
  }

}
