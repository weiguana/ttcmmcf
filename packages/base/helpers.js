/**
 * Scorpius Helpers
 */
ttcmmcf.helpers = {};

/**
 * Searchs a object with a givin string
 * you can specify if you want the searcher to
 * take the first values of array if they are
 */
ttcmmcf.helpers.searchObjectWithDots = function(object, key, selectFirstIfIsArray) {
  key = key.split('.');

  try {
    for (let i = 0; i < key.length; i++) {
      if (selectFirstIfIsArray && object.length && object.length > 0) {
        object = object[0];
      }
      if (key[i] in object) {
        object = object[key[i]];
      } else {
        return undefined;
      }
    }
  } catch(error) {
    return undefined;
  }

  return object;
};

/**
 * Deep extend
 */
ttcmmcf.helpers.deepExtend = function(target, source) {
  for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
          if (prop in target && typeof(target[prop]) === 'object' && typeof(source[prop]) === 'object') {
              ttcmmcf.helpers.deepExtend(target[prop], source[prop]);
          } else {
              target[prop] = source[prop];
          }
      }
  }
  return target;
};

/**
 * Returns a function that returns the translation
 * Useful for autoform
 */
ttcmmcf.helpers.getTranslation = function(key) {
  return function() {
    return i18n(key);
  };
};
