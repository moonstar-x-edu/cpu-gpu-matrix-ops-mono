import { GPU } from 'gpu.js';

const gpu = new GPU();

export const generateMatrices = (size = 512) => {
  const matrices = [[], []];
  for (let y = 0; y < size; y++) {
    matrices[0].push([]);
    matrices[1].push([]);
    for (let x = 0; x < size; x++) {
      matrices[0][y].push(Math.random());
      matrices[1][y].push(Math.random());
    }
  }
  return matrices;
};

export const multiplyMatrixCPU = (a, b) => {
  const result = [];

  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }

  return result;
};

export const multiplyMatrixGPU = gpu.createKernel(function(a, b) {
  let sum = 0;
  for (let i = 0; i < 100; i++) {
    sum += a[this.thread.y][i] * b[i][this.thread.x];
  }
  return sum;
}).setOutput([100, 100]);
