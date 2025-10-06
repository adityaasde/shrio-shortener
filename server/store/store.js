export const memoryMap = new Map();

export const setValue = (key, email, type, ttl = 60000 * 5) => {
  memoryMap.set(key, {email, type});
  

  setTimeout(() => {
    memoryMap.delete(key);
  }, ttl);
};

export const getValue = (key) => {
  return memoryMap.get(key);
};

