import * as migration_20241218_025953_migration from './20241218_025953_migration';

export const migrations = [
  {
    up: migration_20241218_025953_migration.up,
    down: migration_20241218_025953_migration.down,
    name: '20241218_025953_migration'
  },
];
