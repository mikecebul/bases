import * as migration_20240919_141505 from './20240919_141505';
import * as migration_20240921_043359 from './20240921_043359';
import * as migration_20240921_054543 from './20240921_054543';
import * as migration_20240921_100829 from './20240921_100829';
import * as migration_20240922_194115 from './20240922_194115';
import * as migration_20240922_204544 from './20240922_204544';
import * as migration_20240922_211311 from './20240922_211311';

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
    name: '20240921_100829',
  },
  {
    up: migration_20240922_194115.up,
    down: migration_20240922_194115.down,
    name: '20240922_194115',
  },
  {
    up: migration_20240922_204544.up,
    down: migration_20240922_204544.down,
    name: '20240922_204544',
  },
  {
    up: migration_20240922_211311.up,
    down: migration_20240922_211311.down,
    name: '20240922_211311'
  },
];
