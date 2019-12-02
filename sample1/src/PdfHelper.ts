import { LogHelper } from 'aluha-ezcode-helper';

const pdf = require('html-pdf');

export default class PdfHelper {
  static createPdf(template, option, link): Promise<any> {
    return new Promise((resolve, reject) => {
      pdf.create(template, option).toFile(link, (err, res) => {
        if (err) {
          // tslint:disable-next-line: no-console
          console.log(`Error: ${JSON.stringify(err)}`);
          // tslint:disable-next-line: align
          return reject(err);
        }
        resolve(res);
      });
    });
  }

  static createBufferPdf(template, option): Promise<any> {
    return new Promise((resolve, reject) => {
      pdf.create(template, option).toBuffer((err, buffer) => {
        if (err) {
          LogHelper.writeLog('', `createBufferPdf: ${JSON.stringify(err)}`);
          return reject(err);
        }
        resolve(buffer);
      });
    });
  }

  static getDate() {
    const d = new Date();
    return d
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');
  }

  static convertToCurrency(value: number, option): string {
    if (typeof value !== 'number') {
      return '';
    }

    if (!option) {
      option = {};
    }
    if (!option.format) {
      option.format = 'en-US';
    }
    if (!option.currency) {
      option.currency = 'USD';
    }

    return value.toLocaleString(option.format, {
      style: 'currency',
      currency: option.currency,
    });
  }

  static getOptionRender(title) {
    title = 'TheNextMove.IT';
    return {
      format: 'A4',
      border: '0cm',
      footer: {
        height: '2cm',
        contents: {
          default:
            '' +
            '<div style="font-size: 6px;color:#BFBFBF;position: relative;bottom:0px">' +
            '<div style="position: relative;bottom: -5px">' +
            title +
            '</div>' +
            // '<div style="text-align: right;">PAGE {{page}}/{{pages}} </div>' +
            '</div>',
        },
      },
      header: {
        height: '1cm',
      },
      renderDelay: 1000,
      timeout: 100000,
    };
  }
}
