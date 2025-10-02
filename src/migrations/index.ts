import * as migration_20241218_025953_migration from './20241218_025953_migration';
import * as migration_20251001_185226_migration from './20251001_185226_migration';

export const migrations = [
  {
    up: migration_20241218_025953_migration.up,
    down: migration_20241218_025953_migration.down,
    name: '20241218_025953_migration',
  },
  {
    up: migration_20251001_185226_migration.up,
    down: migration_20251001_185226_migration.down,
    name: '20251001_185226_migration'
  },
];
