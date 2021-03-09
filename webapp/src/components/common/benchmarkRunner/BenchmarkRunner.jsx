import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import BenchmarkModal from '../benchmarkModal';
import LoadingSpinner from '../loadingSpinner';

const BenchmarkRunner = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(0);

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCancel() {
    setShowModal(false);
    setCurrentModal(0);
  }

  function handleContinue() {
    if (currentModal < 1) {
      setCurrentModal(currentModal + 1);
    } else {
      setCurrentModal(0);
      setShowModal(false);
    }
  }

  return (
    <div className="benchmark-runner">
      <Button variant="dark" className="custom-button" onClick={handleShowModal}>
        Iniciar Benchmark
      </Button>
      {
        currentModal === 0 &&
          <BenchmarkModal title="¡Atención!" show={showModal} onCancel={handleCancel} onContinue={handleContinue}>
            El benchmark puede durar hasta 2 minutos. Es posible que tu navegador se 'cuelgue' mientras se está
            realizando el benchmark. Por favor, no cierres tu navegador durante el benchmark.
          </BenchmarkModal>
      }
      {
        currentModal === 1 &&
          <BenchmarkModal title="Corriendo Benchmark..." show={showModal} onCancel={handleCancel} onContinue={handleContinue}>
            <LoadingSpinner loading color="custom" absolute />
          </BenchmarkModal>
      }
    </div>
  );
};

export default BenchmarkRunner;
