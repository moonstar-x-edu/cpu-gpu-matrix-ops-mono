/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';

const SharedInfoDisclosure = ({ gpu, ua }) => {
  if (!gpu && !ua) {
    return null;
  }

  return (
    <Alert variant="primary">
      <Alert.Heading>
        🤔 ¿Qué datos tomamos de tu computador?
      </Alert.Heading>
      <p>
        Para identificar los resultados de este benchmark tu User-Agent y el nombre de tu renderizador webGL.
        Si lo prefieres, más abajo puedes agregar tu nombre para que puedas identificar tu resultado en la página de <Link className="link" to={ROUTES.results}>Resultados</Link>.
      </p>
      {
        ua &&
          <Fragment>
            <hr />
            <p>
              Tu User-Agent es: <span className="font-weight-bold">{ua}</span>
            </p>
          </Fragment>
      }
      {
        gpu &&
          <Fragment>
            <hr />
            <p>
              Tu webGL-Renderer es: <span className="font-weight-bold">{gpu.renderer}</span>
            </p>
          </Fragment>
      }
    </Alert>
  );
};

SharedInfoDisclosure.propTypes = {
  gpu: PropTypes.shape({
    vendor: PropTypes.string.isRequired,
    renderer: PropTypes.string.isRequired
  }),
  ua: PropTypes.string
};

SharedInfoDisclosure.defaultProps = {
  gpu: null,
  ua: null
};

export default SharedInfoDisclosure;
