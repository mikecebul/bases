import * as migration_20240919_141505 from './20240919_141505';

export const migrations = [
  {
    up: migration_20240919_141505.up,
    down: migration_20240919_141505.down,
    name: '20240919_141505'
  },
];
