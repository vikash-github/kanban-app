
/**
 * searchObjInArray
 * This utility function searches for objects in an array that match 
 * a specific key-value pair.
 * It returns an array of matching objects and the index of the first match.
 * 
 * @param {Array} array - The array to search through.
 * @param {string} key - The key to match in the objects.
 * @param {*} value - The value to match for the specified key.
 * @returns {[Array, number]} - A tuple containing:
 *   - An array of matching objects.
 *   - The index of the first matching object (or -1 if no match is found).
 * 
 * @throws {Error} If the key is not a non-empty string.
 * @throws {Error} If the value is undefined or null.
 */

export const searchObjInArray = function (array, key, value) {
  if (typeof key !== 'string' || key === '') {
    throw new Error('Key must be a non-empty string');
  }
  if (value === undefined || value === null) {
    throw new Error('Value must not be undefined or null');
  }

  const matches = [];
  let firstIndex = -1;

  array.forEach((elm, index) => {
    if (elm && typeof elm === 'object' && elm[key] === value) {
      matches.push(elm);
      if (firstIndex === -1) firstIndex = index;
    }
  });
  return [matches, firstIndex];
};