import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'react-bootstrap';

const UploadToast = ({ error, show, delay, onClose, autoHide }) => {
  if (error) {
    return (
      <Toast onClose={onClose} show={show} delay={delay} autohide={autoHide}>
        <Toast.Header>
          <strong className="mr-auto">
            ¡Algo ha sucedido!
          </strong>
        </Toast.Header>
        <Toast.Body>
          Sucedió un error al subir tu resultado a la base de datos.
          {error.message}
        </Toast.Body>
      </Toast>
    );
  }

  return (
    <Toast className="upload-toast" onClose={onClose} show={show} delay={delay} autohide={autoHide}>
      <Toast.Header>
        <strong className="mr-auto">
          ¡Gracias por tu aporte!
        </strong>
      </Toast.Header>
      <Toast.Body>
        Tu resultado ha sido subido a nuestra base de datos.
      </Toast.Body>
    </Toast>
  );
};

UploadToast.propTypes = {
  show: PropTypes.bool.isRequired,
  delay: PropTypes.number,
  onClose: PropTypes.func,
  autoHide: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string
  })
};

UploadToast.defaultProps = {
  delay: 10000,
  onClose: () => false,
  autoHide: true,
  error: null
};

export default UploadToast;
