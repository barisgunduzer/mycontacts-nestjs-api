import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'This method show website homepage' })
  @ApiResponse({ status: 200, description: 'show website homepage'})
  getHello(): string {
    return this.appService.getHello();
  }
}
