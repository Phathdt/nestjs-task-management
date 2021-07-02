import * as fs from 'fs';
import { configService } from './config/config.service';

try {
  fs.unlinkSync('ormconfig.json');
} catch {}

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 4),
);
