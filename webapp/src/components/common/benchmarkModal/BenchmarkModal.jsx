import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const BenchmarkModal = ({ show, title, children, onCancel, onContinue, withCancel, disableButtons }) => {
  return (
    <Modal className="benchmark-modal" show={show} onHide={onCancel} backdrop="static" keyboard={false}>
      <Modal.Header closeButton={!disableButtons}>
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
        {
          withCancel &&
            <Button variant="secondary" onClick={onCancel} disabled={disableButtons}>
              Cancelar
            </Button>
        }
        <Button variant="primary" onClick={onContinue} disabled={disableButtons}>
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
  onContinue: PropTypes.func,
  withCancel: PropTypes.bool,
  disableButtons: PropTypes.bool
};

BenchmarkModal.defaultProps = {
  title: null,
  children: null,
  onCancel: () => false,
  onContinue: () => false,
  withCancel: true,
  disableButtons: false
};

export default BenchmarkModal;
