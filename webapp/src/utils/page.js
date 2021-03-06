export const updatePageTitle = (title) => {
  if (!document) {
    throw new Error('No document global object available!');
  }

  document.title = `${title} | CPU/GPU Matrix Benchmark`;
};
