export const getGPUInfo = () => {
  if (!document) {
    return new Error('No document object available.');
  }

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');

  if (!gl) {
    return new Error('No WEBGL layer available.');
  }

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

  if (!debugInfo) {
    return new Error('No WEBGL renderer.');
  }

  const info = {
    vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
    renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
  };

  canvas.remove();
  return info;
};
