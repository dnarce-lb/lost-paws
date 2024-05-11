'use client';

import Lottie from 'react-lottie';
import searchingAnimation from '../../assets/lotties/searching.json';

export const ObtainingPetDesc = () => {
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
        Obteniendo características de tu mascota
      </h1>
      <p className='text-center font-normal text-[14px] leading-[19.6px] text-mainBlack/60'>
        Estamos analizando las fotos para cargar la información en nuestro formulario.
      </p>
    </div>
  );
};
