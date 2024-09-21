import * as migration_20240919_141505 from './20240919_141505';
import * as migration_20240921_043359 from './20240921_043359';
import * as migration_20240921_054543 from './20240921_054543';
import * as migration_20240921_100829 from './20240921_100829';

export const migrations = [
  {
    up: migration_20240919_141505.up,
    down: migration_20240919_141505.down,
    name: '20240919_141505',
  },
  {
    up: migration_20240921_043359.up,
    down: migration_20240921_043359.down,
    name: '20240921_043359',
  },
  {
    up: migration_20240921_054543.up,
    down: migration_20240921_054543.down,
    name: '20240921_054543',
  },
  {
    up: migration_20240921_100829.up,
    down: migration_20240921_100829.down,
    name: '20240921_100829'
  },
];
