import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
// import { User } from '../user/entities/user.entity'; // User entity joylashuviga qarab

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  githubLink: string;

  @Column({ nullable: true })
  contactEmail: string; // Foydalanuvchi bog'lanish uchun qoldiradigan qo'shimcha email

  @Column({ nullable: true })
  telegramUsername: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
