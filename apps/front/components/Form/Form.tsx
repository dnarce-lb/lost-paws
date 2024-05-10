'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { ArrowDown, ArrowLeft } from '@/assets/icons';

enum StepsEnum {
  UBICACION = 'Ubicación',
  FOTOS = 'Fotos',
  INFORMACION = 'Información',
}

const steps: Step[] = [
  {
    number: 1,
    name: StepsEnum.UBICACION,
  },
  {
    number: 2,
    name: StepsEnum.FOTOS,
  },
  {
    number: 3,
    name: StepsEnum.INFORMACION,
  },
];

const StepperLabels = ({ currentStep }: { currentStep: Step }) => {
  return (
    <div className='bg-white text-mainBlack flex items-center justify-between rounded-3xl p-8'>
      {steps.map(step => {
        const { number, name } = step;

        const isCurrentStep = number === currentStep.number;

        const stepNumberClassName = 'rounded-full w-6 h-6 flex items-center justify-center'.concat(
          isCurrentStep ? ' border-2 border-mainBlue' : ' border border-mainBlack/10'
        );

        const stepNameClassName = 'mt-3'.concat(isCurrentStep ? ' text-mainBlack' : ' text-mainBlack/60');

        return (
          <div key={number} className='flex flex-col items-center'>
            <div className={stepNumberClassName}>{number}</div>
            <div className={stepNameClassName}>{name}</div>
          </div>
        );
      })}
    </div>
  );
};

type Step = {
  number: number;
  name: StepsEnum;
};

const UbicacionStep = ({ onHideStepperLabels }: { onHideStepperLabels: (params: boolean) => void }) => {
  const [isShowingLocations, setisShowingLocations] = useState<boolean>(false);

  return !isShowingLocations ? (
    <div className='bg-white text-mainBlack rounded-3xl p-8'>
      <div className='text-lg font-semibold flex gap-1'>
        <div>Perdí a mi mascota</div>
        <Image src={ArrowDown} alt='' />
      </div>
      <div>
        <div>
          <span className='text-mainBlack/60'>Contanos dónde fué la última vez que lo viste.</span>
        </div>
        <div className='mt-6 flex flex-col gap-2'>
          <div>
            <span className='font-semibold'>Dónde lo perdiste?</span>
          </div>
          <div>
            <button
              className='bg-white border rounded-full py-3 px-4 text-mainBlack/60 w-full'
              type='button'
              onClick={() => {
                onHideStepperLabels(false);
                setisShowingLocations(true);
              }}>
              <div className=' flex flex-start '>Cerca de</div>
            </button>
          </div>
        </div>

        <div className='mt-6'>
          <button type='button' className='bg-white text-mainBlue rounded-full h-12 w-full mt-4 border border-mainBlue'>
            Usar mi ubicación actual
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
                onHideStepperLabels(true);
                setisShowingLocations(false);
              }}
            />
          </div>
          <input
            type='text'
            onChange={() => {}}
            placeholder='Cerca de '
            className='bg-white border rounded-full py-3 px-4 text-mainBlack/60 w-full'
          />
        </div>
      </div>
    </div>
  );
};

const getStepConfifg = (onHideStepperLabels: (params: boolean) => void) => {
  return {
    [StepsEnum.UBICACION]: <UbicacionStep onHideStepperLabels={onHideStepperLabels} />,
    [StepsEnum.FOTOS]: <div>Fotos</div>,
    [StepsEnum.INFORMACION]: <div>Información</div>,
  };
};

const Form: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);

  const [showStepperLabels, setShowStepperLabels] = useState<boolean>(true);

  return (
    <div className='flex flex-col gap-5'>
      {showStepperLabels && <StepperLabels currentStep={currentStep} />}
      {getStepConfifg(setShowStepperLabels)[currentStep.name]}
    </div>
  );
};

export default Form;
