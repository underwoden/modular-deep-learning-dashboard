// ./frontend/src/pages/Monitoring.tsx
import React from "react";
import PageWrapper from "../components/PageWrapper";
import SystemStats from "../components/SystemStats";

export default function Monitoring() {
  return (
    <PageWrapper title="Monitoring">
      <SystemStats />
    </PageWrapper>
  );
}
