'use client';

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import RadioInput from '@/components/RadioInput';
import SelectInput from '@/components/SelectInput';
import { getBreeds } from '@/app/services/breeds';
import { getSizes } from '@/app/services/sizes';

type Props = {
  context: any;
};

const InformacionStep: React.FC<Props> = ({ context }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const { handleChange, formData } = context;
  const [petType, setPetType] = useState<'Perro' | 'Gato'>('Perro');
  const [petGender, setPetGender] = useState<string>('Macho');
  const [petSize, setPetSize] = useState<string>('Pequeño');

  const [breedOptions, setBreedOptions] = useState<{ id: number; name: string }[]>([]);
  const [sizeOptions, setSizeOptions] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    getBreeds().then(data => {
      console.log('🚀 ~ getBreeds ~ data:', data);
      setBreedOptions(data);
    });
    getSizes().then(data => {
      console.log('🚀 ~ getBreeds ~ data:', data);
      setSizeOptions(data);
    });
  }, []);

  return (
    <div className='bg-white text-mainBlack rounded-3xl px-7 py-8 flex flex-col'>
      <div className='text-lg font-semibold'>Información de la mascota</div>
      <div className='text-mainBlack/60 text-sm mt-1'>¡Ayudanos con información adicional!</div>
      <div className='mt-6 flex flex-col gap-6'>
        <div>
          <div className='text-mainBlack text-sm font-semibold'>
            {formData.type === 'lost' ? 'Fecha que se perdió' : 'Fecha en que se encontró'}
          </div>
          <DatePicker
            className='bg-white border border-mainBlack/10 text-sm text-mainBlack/60 w-full rounded-full py-3 px-4 mt-2'
            selected={startDate}
            onChange={date => {
              setStartDate(date);
              handleChange('date', date);
            }}
            wrapperClassName='w-full'
          />
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold'>Nombre</div>
          <input
            type='text'
            placeholder='Nombre'
            onChange={e => handleChange('name', e.target.value)}
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
              handleChange('animal', { id: newVal === 'Perro' ? 1 : 2, name: newVal });
            }}
          />
        </div>
        <div className='overflow-auto'>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Género</div>
          <RadioInput
            options={['Macho', 'Hembra', 'Desconocido']}
            value={petGender}
            onChange={(newVal: string) => {
              setPetGender(newVal as 'Macho' | 'Hembra' | 'Desconocido');
              if (newVal !== 'Desconocido') {
                handleChange('gender', { id: newVal === 'Perro' ? 1 : 2, name: newVal });
              }
            }}
          />
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Raza</div>
          <SelectInput
            onChange={e => {
              return handleChange(
                'breed',
                breedOptions.find(breed => breed.id === Number(e.target.value))
              );
            }}>
            {breedOptions.map(breed => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
          </SelectInput>
        </div>
        <div className='overflow-auto'>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Tamaño</div>
          <RadioInput
            options={sizeOptions.map(size => size.name)}
            value={petSize}
            onChange={(newVal: string) => {
              setPetSize(newVal);
              handleChange(
                'size',
                sizeOptions.find(size => size.name === newVal)
              );
            }}
          />
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Color</div>
          <SelectInput
            onChange={e => {
              handleChange('color', e.target.value);
            }}>
            <option value='Blanco'>Blanco</option>
            <option value='Negro'>Negro</option>
            <option value='Marron'>Marron</option>
            <option value='Gris'>Gris</option>
            <option value='Rubio'>Rubio</option>
          </SelectInput>
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Edad</div>
          <SelectInput
            onChange={e => {
              handleChange('age', e.target.value);
            }}>
            <option value='Cachorro'>Cachorro</option>
            <option value='Adulto'>Adulto</option>
            <option value='Anciano'>Anciano</option>
          </SelectInput>
        </div>
        <div>
          <div className='text-mainBlack text-sm font-semibold mb-2'>Description</div>
          <textarea
            placeholder='Ej. Tiene una mancha en la nariz'
            maxLength={500}
            onChange={e => {
              handleChange('description', e.target.value);
            }}
            className='bg-white border border-mainBlack/10 text-sm text-mainBlack/60 w-full rounded-lg py-3 px-4'
          />
        </div>
      </div>
    </div>
  );
};
export default InformacionStep;
