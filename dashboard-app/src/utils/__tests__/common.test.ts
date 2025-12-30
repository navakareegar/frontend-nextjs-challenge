import { fakeArray } from '../common';

describe('fakeArray', () => {
  describe('basic functionality', () => {
    it('should create an array of the specified length', () => {
      const result = fakeArray(5);
      expect(result).toHaveLength(5);
    });

    it('should return an empty array when length is 0', () => {
      const result = fakeArray(0);
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('should create an array with 1-indexed values', () => {
      const result = fakeArray(5);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('edge cases', () => {
    it('should handle length of 1', () => {
      const result = fakeArray(1);
      expect(result).toEqual([1]);
    });

    it('should handle large numbers', () => {
      const result = fakeArray(100);
      expect(result).toHaveLength(100);
      expect(result[0]).toBe(1);
      expect(result[99]).toBe(100);
    });

    it('should return an empty array for negative length', () => {
      const result = fakeArray(-5);
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  describe('type checking', () => {
    it('should return an array of numbers', () => {
      const result = fakeArray(3);
      result.forEach((item) => {
        expect(typeof item).toBe('number');
      });
    });

    it('should return consecutive integers starting from 1', () => {
      const result = fakeArray(10);
      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toBe(i + 1);
      }
    });
  });

  describe('immutability', () => {
    it('should return a new array each time', () => {
      const result1 = fakeArray(5);
      const result2 = fakeArray(5);
      expect(result1).not.toBe(result2);
      expect(result1).toEqual(result2);
    });
  });
});
