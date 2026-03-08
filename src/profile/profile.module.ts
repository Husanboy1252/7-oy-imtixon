import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from './entities/profile.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([Profile]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  // Agar ProfileService boshqa modullarda (masalan, Auth yoki User) kerak bo'lsa:
  exports: [ProfileService],
})
export class ProfileModule {}
