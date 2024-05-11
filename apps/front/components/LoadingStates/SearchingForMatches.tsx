'use client';

import Lottie from 'react-lottie';
import searchingAnimation from '../../assets/lotties/searching.json';

export const SearchingForMatches = () => {
  return (
    <div className='bg-white h-full flex flex-col items-center place-content-center rounded-3xl p-[30px]'>
      <div className='mb-5'>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: searchingAnimation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          width='100%'
          height='100%'
        />
      </div>
      <h1 className='font-semibold text-[18px] leading-[25.2px] text-mainBlack text-center mb-5'>
        Buscando coincidencias con tu mascota
      </h1>
      <p className='text-center font-normal text-[14px] leading-[19.6px] text-mainBlack/60'>
        Estamos analizando la información de tu mascota para encontrar las mejores coincidencias.
      </p>
    </div>
  );
};
