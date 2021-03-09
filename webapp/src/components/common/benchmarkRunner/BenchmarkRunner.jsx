import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import BenchmarkModal from '../benchmarkModal';
import BenchmarkResultsList from '../benchmarkResultsList';
import LoadingSpinner from '../loadingSpinner';
import { generateMatrices, multiplyMatrixCPU, multiplyMatrixGPU } from '../../../utils/matrix';
import { executionTime } from '../../../utils/benchmark';

const ITERATIONS = 100;
const MATRIX_SIZES = [128, 256, 512];

const matrices = MATRIX_SIZES.map((size) => generateMatrices(size));

const BenchmarkRunner = ({ onTerminate }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(0);
  const [running, setRunning] = useState(false);
  const [cpuTimes, setCPUTimes] = useState([]);
  const [gpuTimes, setGPUTimes] = useState([]);

  function doBenchmark() {
    Promise.all(matrices.map(async(pair) => {
      const cpuTime = await executionTime(ITERATIONS, multiplyMatrixCPU, pair);
      const gpuTime = await executionTime(ITERATIONS, multiplyMatrixGPU(pair[0].length), pair);
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

  return (
    <div className="benchmark-runner">
      <Button variant="dark" className="custom-button" onClick={handleShowModal}>
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
                matrixSizes={MATRIX_SIZES}
                iterations={ITERATIONS}
              />
            </div>
          </BenchmarkModal>
      }
    </div>
  );
};

BenchmarkRunner.propTypes = {
  onTerminate: PropTypes.func.isRequired
};

export default BenchmarkRunner;
