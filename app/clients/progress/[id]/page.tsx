import DataVisualization from '@/app/client-pages/DataVisualization';
import NavBar from '@/components/NavBar';
import Wave from '@/components/Wave';
import React from 'react';

interface ProgressPageProps {}

const ProgressPage: React.FC<ProgressPageProps> = () => {
  return (
    <div className="relative">
      {/* Ensure NavBar stays on top with a higher z-index */}
      <div className="relative z-20">
        <NavBar />
      </div>

      {/* Wave placed behind the graph */}
      <div className=" inset-0 z-0">
        <div className='bg-mint p-10 '></div>
        <Wave className="absolute" />
      </div>

      {/* Line graph content with a higher z-index than Wave but lower than NavBar */}
      <div className="z-10">
        <DataVisualization />
      </div>
    </div>
  );
};

export default ProgressPage;
