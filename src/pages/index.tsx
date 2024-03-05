// pages/PixelArtPage.tsx
import React, { useState } from 'react';
import Layout from '~/components/layout/layout';
import Home from '../components/Home';

export interface PixelArea {
  coords: string;
  onClick: () => void;
}

const PixelArtPage: React.FC = () => {

  return (
    <Layout>
      <Home/>
    </Layout>
  );
};

export default PixelArtPage;
