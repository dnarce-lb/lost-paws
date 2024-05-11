/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckMark } from '@/assets/icons';
import UbicacionStep from './Steps/Ubicacion';

import 'react-datepicker/dist/react-datepicker.css';
import FotosStep from './Steps/Fotos';
import InformacionStep from './Steps/Informacion';
import { useFormDataContext } from '@/hooks/useFormData';
import ConfirmarStep from './Steps/Confirmar';

enum StepsEnum {
  UBICACION = 'Ubicación',
  FOTOS = 'Fotos',
  INFORMACION = 'Información',
  CONFIRM = 'Confirmar',
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
  {
    number: 4,
    name: StepsEnum.CONFIRM,
  },
];

const StepperLabels = ({ currentStep }: { currentStep: Step }) => {
  return (
    <div className='bg-white text-mainBlack flex items-center justify-between rounded-3xl p-8'>
      {steps
        .filter(step => step.number < 4)
        .map(step => {
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
  context,
}: {
  onHideStepperLabels?: (params: boolean) => void;
  onNextStepAvailable: (params: boolean) => void;
  context: any;
}) => {
  return {
    [StepsEnum.UBICACION]: (
      <UbicacionStep
        onHideStepperLabels={onHideStepperLabels}
        onNextStepAvailable={onNextStepAvailable}
        context={context}
      />
    ),
    [StepsEnum.FOTOS]: <FotosStep onNextStepAvailable={onNextStepAvailable} context={context} />,
    [StepsEnum.INFORMACION]: <InformacionStep context={context} />,
    [StepsEnum.CONFIRM]: <ConfirmarStep context={context} />,
  };
};

type Props = {
  setShowSearchingForMatches: (val: boolean) => void;
  setShowObtainPetDesc: (val: boolean) => void;
  type: string;
};

const Form: React.FC<Props> = ({ setShowSearchingForMatches, setShowObtainPetDesc, type }) => {
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const context = useFormDataContext();

  const router = useRouter();

  useEffect(() => {
    context.handleChange('type', type);
  }, [type]);

  const [showStepperLabels, setShowStepperLabels] = useState<boolean>(true);

  const [isNextStepAvailable, setIsNextStepAvailable] = useState<boolean>(false);

  const handleNextStep = async () => {
    if (currentStep.name === StepsEnum.FOTOS) {
      console.log('entro aqui fotos');
      setShowObtainPetDesc(true);
      await context.uploadImages();
      setShowObtainPetDesc(false);
    }

    if (currentStep.name === StepsEnum.CONFIRM) {
      setShowObtainPetDesc(true);
      const result = await context.submit();

      setShowObtainPetDesc(false);

      setShowSearchingForMatches(true);

      // @ts-ignore
      const { id } = result[0];

      router.push(`/coincidencias/${id}`);
    }

    const nextStep = steps.find(step => step.number === currentStep.number + 1);

    if (nextStep) {
      setCurrentStep(nextStep);
      if (nextStep.number < 3) {
        setIsNextStepAvailable(false);
      }
      if (nextStep.number < 4) {
        setShowStepperLabels(true);
      }
    }
    console.log('🚀 ~ handleNextStep ~ formData', context.formData);
  };

  return (
    <div className='flex flex-col gap-5'>
      {showStepperLabels && <StepperLabels currentStep={currentStep} />}
      {
        getStepConfifg({
          onHideStepperLabels: setShowStepperLabels,
          onNextStepAvailable: setIsNextStepAvailable,
          context,
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
