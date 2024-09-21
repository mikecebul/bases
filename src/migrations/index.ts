import * as migration_20240919_141505 from './20240919_141505';
import * as migration_20240921_043359 from './20240921_043359';

export const migrations = [
  {
    up: migration_20240919_141505.up,
    down: migration_20240919_141505.down,
    name: '20240919_141505',
  },
  {
    up: migration_20240921_043359.up,
    down: migration_20240921_043359.down,
    name: '20240921_043359'
  },
];
