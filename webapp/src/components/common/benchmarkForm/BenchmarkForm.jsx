/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const BenchmarkForm = ({ form, onChange }) => {
  const nameControl = 'name';

  function handleChange({ target: { id, value } }) {
    onChange(id, value);
  }

  return (
    <Form className="benchmark-form">
      <Form.Group controlId={nameControl}>
        <Form.Label>
          Nombre
        </Form.Label>
        <Form.Control type="text" placeholder="Inserta tu nombre... (Opcional)" value={form[nameControl]} onChange={handleChange} />
      </Form.Group>
    </Form>
  );
};

BenchmarkForm.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

BenchmarkForm.defaultProps = {
  onChange: () => false
};

export default BenchmarkForm;
