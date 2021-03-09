import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../common/sectionHeader';
import SharedInfoDisclosure from '../common/sharedInfoDisclosure';
import BenchmarkForm from '../common/benchmarkForm';
import BenchmarkRunner from '../common/benchmarkRunner';
import AppContext from '../../context/AppContext';
import { NAVBAR_ITEMS } from '../../constants';
import { updatePageTitle } from '../../utils/page';
import { getGPUInfo } from '../../utils/gpu';
import { getUA } from '../../utils/ua';

const Benchmark = () => {
  const [gpuInfo, setGPUInfo] = useState(null);
  const [UA, setUA] = useState(null);
  const [form, setForm] = useState({ name: '' });
  const { setActive } = useContext(AppContext);

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
    console.log(cpuTimes, gpuTimes);
  }

  return (
    <Container className="benchmark-content">
      <SectionHeader first text="Benchmark" />
      <SharedInfoDisclosure gpu={gpuInfo} ua={UA} />
      <BenchmarkForm form={form} onChange={handleFormChange} />
      <BenchmarkRunner onTerminate={handleBenchmarkTermination} />
    </Container>
  );
};

export default Benchmark;
