import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello Word' })
  @ApiResponse({ status: 200, description: 'Mensaje exitoso', type: String })
  getHello(): string {
    return this.appService.getHello();
  }
}
