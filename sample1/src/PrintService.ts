import { Readable } from 'stream';
import * as fs from 'fs';
// import PrintDto
export default class PrintService {
  static async printPdf(path: string): Promise<Buffer> {
    const buffer = fs.readFileSync(path);
    return buffer;
  }

  static getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }
}
