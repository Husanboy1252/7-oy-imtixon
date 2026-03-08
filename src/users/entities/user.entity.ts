import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  EMPLOYER = 'EMPLOYER',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // nullable: true olib tashlandi, endi majburiy
fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  
  @Column({ default: 0 })
  experienceYears: number;

  @Column({ nullable: true })
  resumeUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({type: `varchar`, nullable: true })
otpCode: string | null;

@Column({ type: 'timestamp', nullable: true })
otpExpires: Date | null;

@Column({ default: false })
isVerified: boolean;

  @UpdateDateColumn()
  updatedAt: Date;
    profile: any;
}
