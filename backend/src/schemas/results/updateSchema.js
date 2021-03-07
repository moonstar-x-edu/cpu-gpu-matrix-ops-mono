const Joi = require('joi');

const updateSchema = Joi.object({
  id: Joi.string()
    .forbidden(),
  ua: Joi.string()
    .trim(),
  name: Joi.string()
    .trim()
    .allow('')
    .allow(null),
  gpuInfo: Joi.object({
    vendor: Joi.string()
      .trim()
      .required(),
    renderer: Joi.string()
      .trim()
      .required()
  }),
  results: Joi.object({
    matrixSizes: Joi.array()
      .items(Joi.number().required())
      .required(),
    times: Joi.object({
      cpu: Joi.array()
        .items(Joi.number().required())
        .required(),
      gpu: Joi.array()
        .items(Joi.number().required())
        .required()
    })
      .assert('.cpu.length', Joi.ref('gpu.length'), 'GPU and CPU results must be of same size!')
      .required()
  })
    .assert('.matrixSizes.length', Joi.ref('times.cpu.length'), 'matrixSizes and result times must be of same size!')
});

module.exports = updateSchema;
