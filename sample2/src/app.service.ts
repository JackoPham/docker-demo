import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('service 2');
    return 'Hello World! Service 2';
  }
}
