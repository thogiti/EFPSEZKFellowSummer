
const assert = require('assert');
const { modularCalculator } = require('../Module 1 - Intro to ZK/src/modularCalculator.js');


describe('modularCalculator tests', () => {
  describe('modularCalculator', () => {
    it('modularCalculator(\'+\', 10, 15, 12)', () => {
      assert.strictEqual(modularCalculator('+', 10, 15, 12), 1);
    });

    it('modularCalculator(\'-\', 10, 15, 12)', () => {
      assert.strictEqual(modularCalculator('-', 10, 15, 12), 7);
    });

    it('modularCalculator(\'*\', 10, 15, 12)', () => {
      assert.strictEqual(modularCalculator('*', 10, 15, 12), 6);
    });
  });
});