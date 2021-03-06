/* eslint-disable no-extra-parens */
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { BENCHMARK } from '../../../utils/benchmark';

const ITERATIONS_MIN = 10;
const ITERATIONS_MAX = 150;

const nameControl = 'name';
const iterationsControl = 'iterations';
const matrixSizesControl = 'matrixSizes';

const BenchmarkForm = ({ form, onChange, disabled }) => {
  function handleChange({ target: { id, value } }) {
    onChange(id, value);
  }

  function handleNumberChange({ target: { id, value } }) {
    handleChange({ target: { id, value: parseInt(value, 10) } });
  }

  function handleCheckboxChange({ target: { id, checked } }) {
    const value = parseInt(id.slice(matrixSizesControl.length + 1), 10);
    
    const newSizes = checked ?
      [...form[matrixSizesControl], value] :
      form[matrixSizesControl].filter((size) => size !== value);
    
    handleChange({ target: { id: matrixSizesControl, value: newSizes.sort((a, b) => a - b) } });
  }

  return (
    <Form className="benchmark-form">
      <Form.Group controlId={nameControl}>
        <Form.Label>
          Nombre
        </Form.Label>
        <Form.Control
          disabled={disabled}
          type="text"
          placeholder="Inserta tu nombre... (Opcional)"
          value={form[nameControl]}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId={iterationsControl}>
        <Form.Label>
          Número de iteraciones ({form[iterationsControl]})
        </Form.Label>
        <RangeSlider
          inputProps={{ id: iterationsControl }}
          value={form[iterationsControl]}
          onChange={handleNumberChange}
          min={ITERATIONS_MIN}
          max={ITERATIONS_MAX}
          step={10}
          tooltip="auto"
          disabled={disabled}
        />
      </Form.Group>
      <Form.Group controlId={matrixSizesControl}>
        <Form.Label>
          Tamaños de las matrices cuadradas
        </Form.Label>
        <div>
          {
            BENCHMARK.DEFAULT_MATRIX_SIZES.map((size, idx) => (
              <Form.Check
                disabled={disabled}
                key={idx}
                inline
                id={`${matrixSizesControl}-${size}`}
                label={size}
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={form[matrixSizesControl].includes(size)}
              />
            ))
          }
          <Form.Check
            disabled={disabled}
            inline
            id={`${matrixSizesControl}-1024`}
            label={1024}
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={form[matrixSizesControl].includes(1024)}
          />
        </div>
        <div className="text-muted">
          ¡Cuidado! Seleccionar 1024 puede hacer que el benchmark duré bastante,
          especialmente con un número alto de iteraciones.
        </div>
        <div className="text-muted">
          Solo utilizando un tamaño de 1024 y 10 iteraciones, el benchmark puede durar hasta 3 minutos aproximadamente.
        </div>
        <hr />
        <div>
          Te recomendamos utilizar las opciones predeterminadas.
        </div>
      </Form.Group>
    </Form>
  );
};

BenchmarkForm.propTypes = {
  form: PropTypes.shape({
    [nameControl]: PropTypes.string,
    [iterationsControl]: PropTypes.number,
    [matrixSizesControl]: PropTypes.arrayOf(PropTypes.number)
  }).isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

BenchmarkForm.defaultProps = {
  onChange: () => false,
  disabled: false
};

export default BenchmarkForm;
