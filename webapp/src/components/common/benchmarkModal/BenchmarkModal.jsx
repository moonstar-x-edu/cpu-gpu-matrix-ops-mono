import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const BenchmarkModal = ({ show, title, children, onCancel, onContinue }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        {
          title &&
            <Modal.Title>
              {title}
            </Modal.Title>
        }
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onContinue}>
          Continuar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

BenchmarkModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onCancel: PropTypes.func,
  onContinue: PropTypes.func
};

BenchmarkModal.defaultProps = {
  title: null,
  children: null,
  onCancel: () => false,
  onContinue: () => false
};

export default BenchmarkModal;
