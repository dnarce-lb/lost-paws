/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Close, Plus } from '@/assets/icons';

type Props = {
  onNextStepAvailable: (params: boolean) => void;
  setFilesToUpload: (params: File[]) => void;
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

const FotosStep: React.FC<Props> = ({ onNextStepAvailable, setFilesToUpload }) => {
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

export default FotosStep;
