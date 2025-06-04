// ./frontend/src/pages/System.tsx
import React from 'react';
import SystemMetrics from '../components/SystemMeters';
import PageWrapper from '../components/PageWrapper';

const SystemPage = () => (
  <PageWrapper title="System Monitor">
    <SystemMetrics />
  </PageWrapper>
);

export default SystemPage;
