const chai = require('chai');
const modularCalculator = require('./modularCalculator.js');

const expect = chai.expect;

describe("modularCalculator tests", () => {
    it('adding 10 + 15 modulo 12 should return 1', () => {
        var result = modularCalculator('+', 10, 15, 12)
        expect(result).toBe(1);
    });

    it('subtracting 10 - 15 modulo 12 should return 7', () => {
        var result = modularCalculator('-', 10, 15, 12)
        expect(result).toBe(7);
    });

    it('multiplying 10 * 15 modulo 12 should return 6', () => {
        var result = modularCalculator('*', 10, 15, 12)
        expect(result).toBe(6);
    });

    it('invalid operation should throw error', () => {
        expect(() => {
            modularCalculator('/', 5, 3, 7)
        }).toThrow('Invalid operation');
    });
});
