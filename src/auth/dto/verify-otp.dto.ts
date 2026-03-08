import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ 
    example: 'user@gmail.com', 
    description: 'Roʻyxatdan oʻtgan email manzilingiz' 
  })
  email: string;

  @ApiProperty({ 
    example: '123456', 
    description: 'Emailingizga kelgan 6 xonali kod' 
  })
  code: string;
}
