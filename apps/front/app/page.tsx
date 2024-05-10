'use client';

import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from '../assets/icons/logo.svg';
import { BurguerMenu } from '@/assets/icons';
import { TeamWork } from '@/assets/images';

export default function Home() {
  return (
    <div className='flex flex-col bg-mainGray px-6 py-5 gap-5'>
      <div className='bg-white rounded-full flex justify-between items-center h-20 px-6'>
        <div className='flex  items-center text-mainBlue'>
          <Image src={LogoIcon} width={182} height={22} alt='logo' />
        </div>
        <div>
          <div className='bg-mainGray h-12 w-12 flex items-center justify-center rounded-full'>
            <Image src={BurguerMenu} width={17.5} height={11.5} alt='logo' />
          </div>
        </div>
      </div>
      <div className='bg-white flex flex-col rounded-3xl py-12 px-8'>
        <div className=' flex items-center text-center'>
          <span className='text-mainBlack text-3xl font-semibold'>¡Te ayudamos a encontrar a tu mejor amigo!</span>
        </div>
        <div className='mt-3'>
          <span className='text-mainBlack/60'>
            Sabemos que el valor tu mascota no tiene precio, por eso, nuestro servicio es completamente <b>gratis</b>
          </span>
        </div>
        <div className='mt-8 border-b pb-8'>
          <Image src={TeamWork} width={267} alt='' />
        </div>
        <div className='mt-8'>
          <Link href='/perdidas'>
            <button type='button' className='bg-mainBlue text-white rounded-full h-12 w-full'>
              Perdí a mi mascota
            </button>
          </Link>
          <Link href='/encontradas'>
            <button
              type='button'
              className='bg-white text-mainBlue rounded-full h-12 w-full mt-4 border border-mainBlue'>
              Encontré una mascota
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
