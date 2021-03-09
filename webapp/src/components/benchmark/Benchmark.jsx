import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SectionHeader from '../common/sectionHeader';
import SharedInfoDisclosure from '../common/sharedInfoDisclosure';
import BenchmarkForm from '../common/benchmarkForm';
import AppContext from '../../context/AppContext';
import { NAVBAR_ITEMS } from '../../constants';
import { updatePageTitle } from '../../utils/page';
import { getGPUInfo } from '../../utils/gpu';
import { getUA } from '../../utils/ua';

const Benchmark = () => {
  const [gpuInfo, setGPUInfo] = useState(null);
  const [UA, setUA] = useState(null);
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

  return (
    <Container className="benchmark-content">
      <SectionHeader first text="Benchmark" />
      <SharedInfoDisclosure gpu={gpuInfo} ua={UA} />
      <BenchmarkForm />
    </Container>
  );
};

export default Benchmark;
