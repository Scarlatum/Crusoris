import { describe, expect, test } from 'vitest';

import { utils } from '../source/utils';

describe('utils', () => {

  test('utils::nominal', () => {
    expect(utils.toNominal(10, utils.nominals.px)).toBe('10px');
  })

})