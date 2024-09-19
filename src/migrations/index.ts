import * as migration_20240917_140708 from './20240917_140708';
import * as migration_20240917_173246 from './20240917_173246';
import * as migration_20240918_132628 from './20240918_132628';
import * as migration_20240919_125333 from './20240919_125333';

export const migrations = [
  {
    up: migration_20240917_140708.up,
    down: migration_20240917_140708.down,
    name: '20240917_140708',
  },
  {
    up: migration_20240917_173246.up,
    down: migration_20240917_173246.down,
    name: '20240917_173246',
  },
  {
    up: migration_20240918_132628.up,
    down: migration_20240918_132628.down,
    name: '20240918_132628',
  },
  {
    up: migration_20240919_125333.up,
    down: migration_20240919_125333.down,
    name: '20240919_125333'
  },
];
