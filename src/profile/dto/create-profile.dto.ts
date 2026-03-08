import { IsString, IsOptional, IsEmail, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsUrl()
  githubLink?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  telegramUsername?: string;
}
