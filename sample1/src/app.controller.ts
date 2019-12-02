import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import PdfHelper from './PdfHelper';
import PrintService from './PrintService';
import { Response } from 'express';
import { LogHelper } from 'aluha-ezcode-helper';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pdf')
  async getPdf(@Res() res: Response) {
    const html = `<span>tesfasdfaf adfasdf</span>`;
    const title = 'tuantest';
    const options = PdfHelper.getOptionRender(title);
    const result = await PdfHelper.createBufferPdf(html, options);
    const stream = await PrintService.getReadableStream(result);

    try {
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': result.length,
      });

      stream.pipe(res);
    } catch (error) {
      LogHelper.writeLog('',`Error: ${JSON.stringify(error)}`);
      return error;
    }
  }
}
