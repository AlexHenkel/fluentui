import { isConformant } from 'test/specs/commonTests';

import { Reaction } from 'src/components/Reaction/Reaction';

describe('Reaction', () => {
  isConformant(Reaction, { constructorName: 'Reaction' });
});
