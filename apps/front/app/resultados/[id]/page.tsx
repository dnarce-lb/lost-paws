import React from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import searchForMatchingReports from '@/app/services/ai-recognition/pet-search';

type Props = {
  params: {
    id: string;
  };
};

const Resultado: React.FC<Props> = async ({ params: { id } }) => {
  const matches = await searchForMatchingReports(Number(id));

  return (
    <Layout>
      <Header />
      <div className='bg-white text-mainBlack rounded-3xl p-8'>
        <div className='text-lg font-semibold'>Mejores coincidencias</div>
        <div className='text-mainBlack/60 mt-1'>Estas mascotas coinciden en un 80% con tu búsqueda.</div>
        <div className=''>
          {matches.map(match => (
            <div key={match.id}>
              <div>{match.name}</div>
              <div>{match.description}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Resultado;
