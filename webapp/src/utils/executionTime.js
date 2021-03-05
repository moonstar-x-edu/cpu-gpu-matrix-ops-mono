export const executionTime = (fn, [matrixA, matrixB], iterations) => {
  return new Promise((resolve, reject) => {
    try {
      const start = Date.now();
      for (let i = 0; i < iterations; i++) {
        fn(matrixA, matrixB);
      }
      resolve(Date.now() - start);
    } catch (error) {
      reject(error);
    }
  });
};
