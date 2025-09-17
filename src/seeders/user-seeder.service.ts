import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seed(): Promise<void> {
    console.log('🌱 Starting user seeding...');

    // Check if users already exist
    const existingUsers = await this.userRepository.count();
    if (existingUsers > 0) {
      console.log(
        `⚠️  Users already exist (${existingUsers} users found). Skipping seeding.`,
      );
      return;
    }

    const users = [
      {
        username: 'admin',
        email: 'admin@clearscan.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        isActive: true,
      },
      {
        username: 'john.doe',
        email: 'john.doe@clearscan.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      },
      {
        username: 'jane.smith',
        email: 'jane.smith@clearscan.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        isActive: true,
      },
      {
        username: 'test.user',
        email: 'test@clearscan.com',
        password: 'test123',
        firstName: 'Test',
        lastName: 'User',
        isActive: true,
      },
      {
        username: 'demo.user',
        email: 'demo@clearscan.com',
        password: 'demo123',
        firstName: 'Demo',
        lastName: 'User',
        isActive: false, // Inactive user for testing
      },
    ];

    try {
      for (const userData of users) {
        // Hash password manually since we're not using entity hooks in seeding
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = this.userRepository.create({
          ...userData,
          password: hashedPassword,
        });

        await this.userRepository.save(user);
        console.log(`✅ Created user: ${user.username} (${user.email})`);
      }

      console.log(`🎉 Successfully seeded ${users.length} users!`);
    } catch (error) {
      console.error('❌ Error seeding users:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    console.log('🧹 Clearing all users...');
    await this.userRepository.delete({});
    console.log('✅ All users cleared!');
  }

  async reset(): Promise<void> {
    console.log('🔄 Resetting users (clear + seed)...');
    await this.clear();
    await this.seed();
  }
}
