import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import RadioInput from '@/components/RadioInput';
import SelectInput from '@/components/SelectInput';

const InformacionStep: React.FC = () => {
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
        <div className='overflow-auto'>
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
        <div className='overflow-auto'>
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
export default InformacionStep;
