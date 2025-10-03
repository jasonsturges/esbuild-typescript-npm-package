// Main library exports - these are packaged in your distributable

/**
 * Check if a number is odd
 * @param n
 */
export const isOdd = (n: number): boolean => {
  return !!(n & 1);
};
