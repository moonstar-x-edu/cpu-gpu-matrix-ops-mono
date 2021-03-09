export const executionTime = (iterations, fn, args) => {
  return new Promise((resolve, reject) => {
    try {
      const start = Date.now();
      for (let i = 0; i < iterations; i++) {
        fn(...args);
      }
      resolve(Date.now() - start);
    } catch (error) {
      reject(error);
    }
  });
};
