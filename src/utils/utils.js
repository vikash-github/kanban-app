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
      console.log(elm);
      matches.push(elm);
      if (firstIndex === -1) firstIndex = index;
    }
  });
  return [matches, firstIndex];
};