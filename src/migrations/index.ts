import * as migration_20240917_140708 from './20240917_140708';
import * as migration_20240917_173246 from './20240917_173246';

export const migrations = [
  {
    up: migration_20240917_140708.up,
    down: migration_20240917_140708.down,
    name: '20240917_140708',
  },
  {
    up: migration_20240917_173246.up,
    down: migration_20240917_173246.down,
    name: '20240917_173246'
  },
];
