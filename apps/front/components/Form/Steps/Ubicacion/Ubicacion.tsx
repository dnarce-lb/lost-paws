/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useLocation from '@/hooks/useLocation';
import { ArrowDown, ArrowLeft, Pin } from '@/assets/icons';

type Props = {
  onHideStepperLabels?: (params: boolean) => void;
  onNextStepAvailable: (params: boolean) => void;
  context: any;
};

const UbicacionStep: React.FC<Props> = ({ onHideStepperLabels, onNextStepAvailable, context }) => {
  const { handleMultipleChange, formData } = context;
  const [isShowingLocations, setisShowingLocations] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { getMyLocation, addreesses, setFormattedAddress, formattedAddress, loading, selectedPlace, selectPlace } =
    useLocation();

  useEffect(() => {
    if (selectedPlace !== null) {
      console.log('🚀 ~ useEffect ~ selectedPlace:', selectedPlace);
      handleMultipleChange({
        formattedAddress: selectedPlace.formattedAddress,
        lat: selectedPlace.lat,
        lng: selectedPlace.lng,
      });
      onNextStepAvailable(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onNextStepAvailable, selectedPlace]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFormattedAddress(searchTerm);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setFormattedAddress]);

  useEffect(() => {
    setSearchTerm(formattedAddress);
  }, [formattedAddress]);

  const getCurrentLocation = async () => {
    await getMyLocation();
    onHideStepperLabels?.(false);
    setisShowingLocations(true);
  };

  const getFormattedAddress = (address: string) => {
    const addressParts = address.split(',');
    const firstPart = addressParts.splice(0, 2);
    return [firstPart.join(', '), addressParts.join(', ')];
  };

  return !isShowingLocations ? (
    <div className='bg-white text-mainBlack rounded-3xl p-8'>
      <div className='text-lg font-semibold flex gap-1'>
        <div>{formData.type === 'lost' ? 'Perdí a mi mascota' : 'Encontré una mascota'}</div>
        <Image src={ArrowDown} alt='' />
      </div>
      <div>
        <div>
          <span className='text-mainBlack/60'>Contanos dónde fué la última vez que lo viste.</span>
        </div>
        <div className='mt-6 flex flex-col gap-2'>
          <div>
            <span className='font-semibold'>
              {formData.type === 'lost' ? 'Dónde lo perdiste?' : 'Dónde la encontraste?'}
            </span>
          </div>
          <div>
            <button
              className='bg-white border rounded-full py-3 px-4 text-mainBlack/60 w-full'
              type='button'
              onClick={() => {
                onHideStepperLabels?.(false);
                setisShowingLocations(true);
              }}>
              <div className=' flex flex-start '>Cerca de</div>
            </button>
          </div>
        </div>

        <div className='mt-6'>
          <button
            type='button'
            className={`bg-white text-mainBlue rounded-full h-12 w-full mt-4 border border-mainBlue ${
              loading ? 'cursor-not-allowed ' : ''
            }`}
            onClick={() => getCurrentLocation()}>
            {loading ? (
              <svg
                className='animate-spin mx-auto h-5 w-5 text-mainBlue'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
            ) : (
              'Usar mi ubicación actual'
            )}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className='bg-white text-mainBlack rounded-3xl p-8'>
      <div className='flex flex-col gap-2'>
        <div>
          <span className='font-semibold'>Dónde lo perdiste?</span>
        </div>
        <div className='flex items-center gap-1'>
          <div className='flex items-center justify-center border border-mainBlack/10 rounded-full p-[14px]'>
            <Image
              src={ArrowLeft}
              width={24}
              height={24}
              alt=''
              onClick={() => {
                onHideStepperLabels?.(true);
                setisShowingLocations(false);
              }}
            />
          </div>
          <input
            type='text'
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
            placeholder='Cerca de '
            value={searchTerm}
            className='bg-white border rounded-full py-3 px-4 text-mainBlack/60 w-full'
          />
        </div>
        <div className='flex flex-col w-full pt-6'>
          {addreesses.length > 0 &&
            addreesses.map(address => (
              <div
                key={address.raw.place_id}
                onClick={() => {
                  selectPlace({
                    formattedAddress: address.label,
                    lat: address.y,
                    lng: address.x,
                  });
                }}
                className='bg-white w-full z-10 gap-3 h-[57px] mt-6 border-b-[1px] border-mainGray flex flex-row justify-center items-start cursor-pointer'>
                <Image src={Pin} width={24} height={24} alt='' />
                <div className='flex flex-col justify-start items-start w-full overflow-hidden'>
                  <span className='text-[15px] text-mainBlack'>{getFormattedAddress(address.label)[0]}</span>
                  <span className='text-[13px] text-mainBlack/60 overflow-hidden text-ellipsis text-nowrap'>
                    {getFormattedAddress(address.label)[1]}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UbicacionStep;
