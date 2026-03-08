import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            // .env ichidagi nomlar bilan bir xil ekanligini tekshiring
            user: config.get<string>('MY_EMAIL'), 
            pass: config.get<string>('APP_KEY'),
          },
        },
        defaults: {
          from: `"HH.uz loyihasi" <${config.get<string>('MY_EMAIL')}>`,
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
