import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

 // mail.service.ts
async sendOtpEmail(email: string, otp: string) {
  await this.mailerService.sendMail({
    to: email,
    subject: 'Tasdiqlash kodi - HH.uz',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Tasdiqlash kodi</h2>
        <p>Sizning login uchun 6 xonali kod :</p>
        <h1 style="color: #4CAF50; letter-spacing: 5px;">${otp}</h1>
        <p>Ushbu kod 5 daqiqa davomida amal qiladi.</p>
      </div>
    `,
  });
}

}
