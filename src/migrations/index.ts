import * as migration_20240917_140708 from './20240917_140708';

export const migrations = [
  {
    up: migration_20240917_140708.up,
    down: migration_20240917_140708.down,
    name: '20240917_140708'
  },
];
