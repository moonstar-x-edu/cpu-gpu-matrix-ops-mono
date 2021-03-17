import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../common/sectionHeader';
import SharedInfoDisclosure from '../common/sharedInfoDisclosure';
import BenchmarkForm from '../common/benchmarkForm';
import BenchmarkRunner from '../common/benchmarkRunner';
import UploadToast from '../common/uploadToast';
import AppContext from '../../context/AppContext';
import ResultsContext from '../../context/ResultsContext';
import { NAVBAR_ITEMS } from '../../constants';
import { postResultForEveryone } from '../../networking';
import { updatePageTitle } from '../../utils/page';
import { getGPUInfo } from '../../utils/gpu';
import { getUA } from '../../utils/ua';
import { BENCHMARK } from '../../utils/benchmark';

const Benchmark = () => {
  const [gpuInfo, setGPUInfo] = useState(null);
  const [UA, setUA] = useState(null);
  const [form, setForm] = useState({ name: '', iterations: BENCHMARK.DEFAULT_ITERATIONS, matrixSizes: BENCHMARK.DEFAULT_MATRIX_SIZES });
  const [showToast, setShowToast] = useState(false);
  const [postError, setPostError] = useState(null);
  const [formDisabled, setFormDisabled] = useState(false);
  const { setActive } = useContext(AppContext);
  const { setShouldFetch } = useContext(ResultsContext);

  useEffect(() => {
    setActive(NAVBAR_ITEMS.benchmark);
    updatePageTitle('Benchmark');

    if (!gpuInfo) {
      setGPUInfo(getGPUInfo());
    }
    if (!UA) {
      setUA(getUA());
    }
  }, [setActive, gpuInfo, UA]);

  function handleFormChange(prop, value) {
    setForm({ ...form, [prop]: value });
  }

  function handleBenchmarkTermination(cpuTimes, gpuTimes) {
    const data = {
      name: form.name,
      ua: UA,
      gpuInfo,
      results: {
        matrixSizes: form.matrixSizes,
        iterations: form.iterations,
        times: {
          cpu: cpuTimes,
          gpu: gpuTimes
        }
      }
    };

    postResultForEveryone(data)
      .then(() => {
        setShowToast(true);
        setShouldFetch(true);
        setFormDisabled(false);
      })
      .catch((error) => {
        setPostError(error);
        setShowToast(true);
        setShouldFetch(true);
        setFormDisabled(false);
      });
  }

  function handleCloseToast() {
    setShowToast(false);
  }

  function handleStart() {
    setFormDisabled(true);
  }

  return (
    <Container className="benchmark-content">
      <SectionHeader first text="Benchmark" />
      <SharedInfoDisclosure gpu={gpuInfo} ua={UA} />
      <BenchmarkForm disabled={formDisabled} form={form} onChange={handleFormChange} />
      <BenchmarkRunner onStart={handleStart} onTerminate={handleBenchmarkTermination} />
      <UploadToast error={postError} show={showToast} onClose={handleCloseToast} />
    </Container>
  );
};

export default Benchmark;
