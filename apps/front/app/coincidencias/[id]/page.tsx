import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import searchForMatchingReports from '@/app/services/ai-recognition/pet-search';

type Props = {
  params: {
    id: string;
  };
};

const Coincidencias: React.FC<Props> = async ({ params: { id } }) => {
  const matches = await searchForMatchingReports(Number(id));

  const getMoreImagesAmount = (match: any) => {
    if (match.pictureUrl2) return 1;
    if (match.pictureUrl3) return 2;
    return 0;
  };

  return (
    <Layout>
      <Header />
      <div className='bg-white text-mainBlack rounded-3xl p-8'>
        <div className='text-lg font-semibold'>Mejores coincidencias</div>
        <div className='text-mainBlack/60 mt-1'>Estas mascotas coinciden en un 80% con tu búsqueda.</div>
        <div className='mt-4'>
          {matches.map(match => {
            const { pictureUrl1, id: expId } = match;

            const moreImagesAmount = getMoreImagesAmount(match);

            return (
              <div key={match.id} className='bg-mainGray p-4 rounded-3xl'>
                <div className='relative '>
                  <Image src={pictureUrl1 || ''} alt='' width={500} height={500} className='rounded-3xl' />
                  <div
                    className='absolute text-white text-4xl bottom-[10px] right-[10px] z-10'
                    style={{
                      textShadow: '1px 1px 2px black',
                    }}>
                    +{moreImagesAmount}
                  </div>
                </div>
                <div className='mt-6'>
                  <div className='flex justify-between'>
                    <div className='font-semibold'>Descripción</div>
                    <Link href={`/expediente/${expId}`}>
                      <button type='button' className='text-mainBlue'>
                        Ver mas
                      </button>
                    </Link>
                  </div>
                  <div className='text-mainBlack/60'>{match.description}</div>
                </div>
                <div className='w-full mt-4'>
                  <button type='button' className='w-full bg-mainBlue py-3 rounded-full text-white'>
                    Contactar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Coincidencias;
