/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { ArrowDown, ArrowLeft, CheckMark, Close, Plus, Pin } from '@/assets/icons';
import useLocation from '@/hooks/useLocation';

import 'react-datepicker/dist/react-datepicker.css';
import RadioInput from '../RadioInput';
import SelectInput from '../SelectInput';

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

const UbicacionStep = ({
  onHideStepperLabels,
  onNextStepAvailable,
}: {
  onHideStepperLabels?: (params: boolean) => void;
  onNextStepAvailable: (params: boolean) => void;
}) => {
  const [isShowingLocations, setisShowingLocations] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { getMyLocation, addreesses, setFormattedAddress, formattedAddress, loading, selectedPlace, selectPlace } =
    useLocation();

  useEffect(() => {
    if (selectedPlace !== null) {
      onNextStepAvailable(true);
    }
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

const MAX_IMAGES_LIMIT = 3;

const plusIcons = [
  {
    id: 1,
    src: Plus,
  },
  {
    id: 2,
    src: Plus,
  },
  {
    id: 3,
    src: Plus,
  },
];

const FotosStep = ({
  onNextStepAvailable,
  setFilesToUpload,
}: {
  onNextStepAvailable: (params: boolean) => void;
  setFilesToUpload: (params: File[]) => void;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    setFilesToUpload(selectedFiles);
  }, [selectedFiles, setFilesToUpload]);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> | undefined = e => {
    const files = Array.from(e.target.files as Iterable<File> | ArrayLike<File>);

    if (Array.from(files).length > MAX_IMAGES_LIMIT) {
      e.preventDefault();
      return;
    }

    setSelectedFiles(Array.from(files));
  };

  const amountOfPlusIcons = MAX_IMAGES_LIMIT - selectedFiles.length;

  const handleAddFiles: React.ChangeEventHandler<HTMLInputElement> | undefined = e => {
    const files = Array.from(e.target.files as Iterable<File> | ArrayLike<File>);

    if (Array.from(files).length > amountOfPlusIcons) {
      e.preventDefault();
      return;
    }

    setSelectedFiles(prev => {
      const newFiles = files.filter(file => !prev.some(prevFile => prevFile.name === file.name));

      return [...prev, ...newFiles];
    });
  };

  const handleRemoveImage = (fileName: string) => {
    setSelectedFiles(prev => prev.filter(file => file.name !== fileName));
  };

  const handleRemoveAllImages = () => {
    setSelectedFiles([]);
    onNextStepAvailable(false);
  };

  const areImagesSelected = selectedFiles.length > 0;

  const isNextStepAvailable = selectedFiles.length > 0;

  useEffect(() => {
    if (isNextStepAvailable) {
      onNextStepAvailable(true);
    }
  }, [isNextStepAvailable, onNextStepAvailable]);

  return (
    <div className='bg-white text-mainBlack rounded-3xl p-8 flex flex-col'>
      <div>
        <span className='text-lg font-semibold'>Subí fotos</span>
      </div>
      <div className='text-mainBlack/60'>
        <div>
          Subí fotos con buena luz y donde se pueda apreciar bien a tu mascota. ¡Nos va a ayudar a encontrarla más
          rápido
        </div>
        <div className='mt-4'>Podés subir hasta {MAX_IMAGES_LIMIT} fotos.</div>
      </div>
      {!areImagesSelected && (
        <label className='bg-white  w-full' htmlFor='myfile'>
          <input type='file' accept='image/*' hidden multiple id='myfile' onChange={handleFileChange} />
          <div className='w-full mt-6 border border-mainBlue rounded-full text-mainBlue flex items-center justify-center h-10'>
            Subir fotos
          </div>
        </label>
      )}
      <div className='mt-6 flex gap-2 '>
        {selectedFiles.map(file => (
          <div key={file.name} className='relative'>
            <Image
              className='absolute top-[-10px] right-[-10px]'
              src={Close}
              width={24}
              height={24}
              alt=''
              onClick={() => handleRemoveImage(file.name)}
            />
            <Image
              style={{
                objectFit: 'cover',
                borderRadius: '12px',
              }}
              src={URL.createObjectURL(file)}
              alt=''
              className='object-cover w-20 h-20'
              width={80}
              height={80}
            />
          </div>
        ))}
        {areImagesSelected &&
          plusIcons.slice(MAX_IMAGES_LIMIT - amountOfPlusIcons).map(plusIcon => (
            <div key={plusIcon.id}>
              <label className='bg-white  w-full' htmlFor={`myfile-${plusIcon.id}`}>
                <input
                  type='file'
                  accept='image/*'
                  hidden
                  multiple
                  id={`myfile-${plusIcon.id}`}
                  onChange={handleAddFiles}
                />
                <div
                  className='border border-mainBlue flex items-center justify-center h-20'
                  style={{
                    minWidth: '80px',
                    borderRadius: '12px',
                  }}>
                  <Image src={plusIcon.src} alt='' width={36} height={36} />
                </div>
              </label>
            </div>
          ))}
      </div>
      {isNextStepAvailable && (
        <div className='w-full flex justify-end text-white mt-8'>
          <button className='bg-darkBlue py-2 px-5 rounded-full' type='button' onClick={handleRemoveAllImages}>
            Eliminar todas
          </button>
        </div>
      )}
    </div>
  );
};

const InformacionStep = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [petType, setPetType] = useState<'Perro' | 'Gato'>('Perro');
  const [petGender, setPetGender] = useState<'Macho' | 'Hembra' | 'Desconocido'>('Macho');
  const [petSize, setPetSize] = useState<'Pequeño' | 'Mediano' | 'Grande'>('Pequeño');

  return (
    <div className='bg-white text-mainBlack rounded-3xl px-7 py-8 flex flex-col'>
      <div className='text-lg font-semibold'>Información de tu mascota</div>
      <div className='text-mainBlack/60 text-sm mt-1'>¡Ayudanos con información adicional!</div>
      <div className='mt-6 flex flex-col gap-6'>
        <div>
          <div className='text-mainBlack text-sm font-semibold'>Fecha que se perdió</div>
          <DatePicker
            className='bg-white border border-mainBlack/10 text-sm text-mainBlack/60 w-full rounded-full py-3 px-4 mt-2'
            selected={startDate}
            onChange={date => setStartDate(date)}
            wrapperClassName='w-full'
          />
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold'>Nombre</div>
          <input
            type='text'
            placeholder='Nombre'
            className='bg-white border border-mainBlack/10 text-sm text-mainBlack/60 w-full rounded-full py-3 px-4 mt-2'
          />
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Tipo</div>
          <RadioInput
            options={['Perro', 'Gato']}
            value={petType}
            onChange={(newVal: string) => {
              setPetType(newVal as 'Perro' | 'Gato');
            }}
          />
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Género</div>
          <RadioInput
            options={['Macho', 'Hembra', 'Desconocido']}
            value={petGender}
            onChange={(newVal: string) => {
              setPetGender(newVal as 'Macho' | 'Hembra' | 'Desconocido');
            }}
          />
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Raza</div>
          <SelectInput>
            <option value='1'>Raza 1</option>
            <option value='2'>Raza 2</option>
            <option value='2'>Raza 3</option>
          </SelectInput>
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Tamaño</div>
          <RadioInput
            options={['Pequeño', 'Mediano', 'Grande']}
            value={petSize}
            onChange={(newVal: string) => {
              setPetSize(newVal as 'Pequeño' | 'Mediano' | 'Grande');
            }}
          />
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Color</div>
          <SelectInput>
            <option value='1'>Blanco</option>
            <option value='2'>Negro</option>
            <option value='3'>Marron</option>
            <option value='4'>Gris</option>
            <option value='5'>Rubio</option>
          </SelectInput>
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Edad</div>
          <SelectInput>
            <option value='1'>Cachorro</option>
            <option value='2'>Adulto</option>
            <option value='3'>Anciano</option>
          </SelectInput>
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Description</div>
          <textarea
            placeholder='Ej. Tiene una mancha en la nariz'
            maxLength={500}
            className='bg-white border border-mainBlack/10 text-sm text-mainBlack/60 w-full rounded-lg py-3 px-4'
          />
        </div>
      </div>
    </div>
  );
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

const Form = ({
  setShowSearchingForMatches,
  setShowObtainPetDesc,
}: {
  setShowObtainPetDesc: (val: boolean) => void;
  setShowSearchingForMatches: (val: boolean) => void;
}) => {
  const [currentStep, setCurrentStep] = useState<Step>(steps[1]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const [showStepperLabels, setShowStepperLabels] = useState<boolean>(true);

  const [isNextStepAvailable, setIsNextStepAvailable] = useState<boolean>(false);

  const handleNextStep = async () => {
    if (currentStep.name === StepsEnum.FOTOS) {
      setShowObtainPetDesc(true);
      let results = [];
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
          setFilesToUpload: setFilesToUpload,
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
