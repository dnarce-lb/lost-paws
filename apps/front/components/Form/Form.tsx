/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { CheckMark } from '@/assets/icons';
import UbicacionStep from './Steps/Ubicacion';

import 'react-datepicker/dist/react-datepicker.css';
import FotosStep from './Steps/Fotos';
import InformacionStep from './Steps/Informacion';

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

        const showSuccessIcon = number < currentStep.number;

        const stepNumberClassName = 'rounded-full w-6 h-6 flex items-center justify-center'.concat(
          isCurrentStep ? ' border-2 border-mainBlue' : ' border border-mainBlack/10'
        );

        const stepNameClassName = 'mt-3'.concat(
          isCurrentStep || showSuccessIcon ? ' text-mainBlack' : ' text-mainBlack/60'
        );

        return (
          <div key={number} className='flex flex-col items-center'>
            {showSuccessIcon ? <Image src={CheckMark} alt='' /> : <div className={stepNumberClassName}>{number}</div>}
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

const getStepConfifg = ({
  onHideStepperLabels,
  onNextStepAvailable,
  setFilesToUpload,
}: {
  onHideStepperLabels?: (params: boolean) => void;
  onNextStepAvailable: (params: boolean) => void;
  setFilesToUpload: (params: File[]) => void;
}) => {
  return {
    [StepsEnum.UBICACION]: (
      <UbicacionStep onHideStepperLabels={onHideStepperLabels} onNextStepAvailable={onNextStepAvailable} />
    ),
    [StepsEnum.FOTOS]: <FotosStep onNextStepAvailable={onNextStepAvailable} setFilesToUpload={setFilesToUpload} />,
    [StepsEnum.INFORMACION]: <InformacionStep />,
  };
};

type Props = {
  setShowSearchingForMatches: (val: boolean) => void;
  setShowObtainPetDesc: (val: boolean) => void;
};

const Form: React.FC<Props> = ({ setShowSearchingForMatches, setShowObtainPetDesc }) => {
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const [showStepperLabels, setShowStepperLabels] = useState<boolean>(true);

  const [isNextStepAvailable, setIsNextStepAvailable] = useState<boolean>(false);

  const handleNextStep = async () => {
    if (currentStep.name === StepsEnum.FOTOS) {
      setShowObtainPetDesc(true);
      const results = [];
      for (let i = 0; i < filesToUpload.length; i++) {
        const formData = new FormData();
        formData.append('file', filesToUpload[i]);
        const result = await fetch('/api/images', { method: 'POST', body: formData });
        const resultJson = await result.json();
        results.push(resultJson);
      }
      setUploadedImages(results.map(result => result.publicURL));
      setShowObtainPetDesc(false);
    }

    const nextStep = steps.find(step => step.number === currentStep.number + 1);

    if (nextStep) {
      setCurrentStep(nextStep);
      setIsNextStepAvailable(false);
    }
  };

  return (
    <div className='flex flex-col gap-5'>
      {showStepperLabels && <StepperLabels currentStep={currentStep} />}
      {
        getStepConfifg({
          onHideStepperLabels: setShowStepperLabels,
          onNextStepAvailable: setIsNextStepAvailable,
          setFilesToUpload,
        })[currentStep.name]
      }
      {isNextStepAvailable && (
        <button
          type='button'
          className='bg-mainBlue text-white rounded-full h-12 w-full disabled:opacity-50 '
          onClick={handleNextStep}>
          Continuar
        </button>
      )}
    </div>
  );
};

export default Form;
