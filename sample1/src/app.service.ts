import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('service 1');
    return 'Hello World! service 1';
  }
}
