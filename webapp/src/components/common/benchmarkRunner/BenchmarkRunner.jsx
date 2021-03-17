import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import BenchmarkModal from '../benchmarkModal';
import BenchmarkResultsList from '../benchmarkResultsList';
import LoadingSpinner from '../loadingSpinner';
import { generateMatrices, multiplyMatrixCPU, multiplyMatrixGPU } from '../../../utils/matrix';
import { executionTime } from '../../../utils/benchmark';

const BenchmarkRunner = ({ onStart, onTerminate, iterations, matrixSizes }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(0);
  const [running, setRunning] = useState(false);
  const [cpuTimes, setCPUTimes] = useState([]);
  const [gpuTimes, setGPUTimes] = useState([]);
  const [benchmarkError, setBenchmarkError] = useState([]);

  function doBenchmark() {
    const matrices = matrixSizes.map((size) => generateMatrices(size));
    
    Promise.all(matrices.map(async(pair) => {
      const cpuTime = await executionTime(iterations, multiplyMatrixCPU, pair);
      const gpuTime = await executionTime(iterations, multiplyMatrixGPU(pair[0].length), pair);
      return [cpuTime, gpuTime];
    }))
      .then((times) => {
        const cpu = new Array(times.length);
        const gpu = new Array(times.length);

        for (let i = 0; i < times.length; i++) {
          cpu[i] = times[i][0];
          gpu[i] = times[i][1];
        }

        handleTerminate(cpu, gpu);
      })
      .catch((error) => {
        handleBenchmarkError(error);
      });
  }

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCancel() {
    setShowModal(false);
    setCurrentModal(0);
  }

  function handleContinue() {
    if (currentModal < 2) {
      setCurrentModal(currentModal + 1);
    } else {
      setCurrentModal(0);
      setShowModal(false);
    }
  }

  function handleStart() {
    onStart();
    setRunning(true);
    handleContinue();
    setTimeout(doBenchmark, 1000);
  }

  function handleTerminate(cpu, gpu) {
    setRunning(false);
    setCPUTimes(cpu);
    setGPUTimes(gpu);
    setCurrentModal(2);
    onTerminate(cpu, gpu);
  }

  function handleBenchmarkError(error) {
    setRunning(false);
    setBenchmarkError(error);
    setCurrentModal(3);
  }

  return (
    <div className="benchmark-runner">
      <Button variant="primary" className="custom-button" onClick={handleShowModal}>
        Iniciar Benchmark
      </Button>
      {
        currentModal === 0 &&
          <BenchmarkModal disableButtons={running} title="¡Atención!" show={showModal} onCancel={handleCancel} onContinue={handleStart}>
            El benchmark puede durar hasta 2 minutos. Es posible que tu navegador se 'cuelgue' mientras se está
            realizando el benchmark. Por favor, no cierres tu navegador durante el benchmark.
          </BenchmarkModal>
      }
      {
        currentModal === 1 &&
          <BenchmarkModal disableButtons={running} title="Corriendo Benchmark..." show={showModal} onCancel={handleCancel} onContinue={handleContinue}>
            <LoadingSpinner loading color="custom" absolute />
          </BenchmarkModal>
      }
      {
        currentModal === 2 &&
          <BenchmarkModal disableButtons={running} title="¡Terminado!" show={showModal} withCancel={false} onCancel={handleCancel} onContinue={handleContinue}>
            <span>¡El Benchmark ha terminado, gracias por tu aporte!</span>
            <div className="mt-2">
              <span className="font-weight-bold">Tus Resultados:</span>
              <BenchmarkResultsList
                cpuTimes={cpuTimes}
                gpuTimes={gpuTimes}
                matrixSizes={matrixSizes}
                iterations={iterations}
              />
            </div>
          </BenchmarkModal>
      }
      {
        currentModal === 3 &&
          <BenchmarkModal disableButtons={running} title="Oops..." show={showModal} withCancel={false} onCancel={handleCancel} onContinue={handleContinue}>
            <span>Hubo un error al realizar el benchmark:</span>
            <div className="mt-2">
              {benchmarkError.message}
            </div>
          </BenchmarkModal>
      }
    </div>
  );
};

BenchmarkRunner.propTypes = {
  onStart: PropTypes.func.isRequired,
  onTerminate: PropTypes.func.isRequired,
  iterations: PropTypes.number.isRequired,
  matrixSizes: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default BenchmarkRunner;
