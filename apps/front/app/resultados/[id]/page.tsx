'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { getReportById } from '@/app/services/reports';

type Props = {
  params: {
    id: string;
  };
};

const Resultado: React.FC<Props> = ({ params: { id } }) => {
  return (
    <Layout>
      <Header />
      <div className='bg-white text-mainBlack rounded-3xl p-8'>
        <div className='text-lg font-semibold'>Mejores coincidencias</div>
        <div className='text-mainBlack/60 mt-1'>Estas mascotas coinciden en un 80% con tu búsqueda.</div>
      </div>
    </Layout>
  );
};

export default Resultado;
