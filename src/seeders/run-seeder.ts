import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserSeederService } from './user-seeder.service';

async function runSeeder() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userSeeder = app.get(UserSeederService);

  try {
    const command = process.argv[2];

    switch (command) {
      case 'seed':
        await userSeeder.seed();
        break;
      case 'clear':
        await userSeeder.clear();
        break;
      case 'reset':
        await userSeeder.reset();
        break;
      default:
        console.log('Usage: npm run seed:users [seed|clear|reset]');
        console.log('  seed  - Add users to database');
        console.log('  clear - Remove all users from database');
        console.log('  reset - Clear and reseed users');
        process.exit(1);
    }
  } catch (error) {
    console.error('Seeder failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

runSeeder();
