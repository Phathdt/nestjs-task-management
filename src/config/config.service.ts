import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((key) => this.getValue(key, true));
    return this;
  }
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      keepConnectionAlive: true,
      autoLoadEntities: true,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: false,
      entities: ['dist/**/*.entity.js'],
      cli: {
        migrationsDir: 'src/migrations',
      },
      migrations: ['dist/migrations/*.js'],
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_NAME',
  'DB_USERNAME',
  'DB_PASSWORD',
]);

export { configService };
