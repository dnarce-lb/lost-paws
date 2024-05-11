'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FamiliesStats, Footer, HowItWorks, TeamWork } from '@/assets/images';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { FormDataProvider } from '@/hooks/useFormData';

export default function Home() {
  return (
    <FormDataProvider>
      <Layout>
        <Header />
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
            <Link href='/reportar/perdida'>
              <button type='button' className='bg-mainBlue text-white rounded-full h-12 w-full'>
                Perdí a mi mascota
              </button>
            </Link>
            <Link href='/reportar/encontrada'>
              <button
                type='button'
                className='bg-white text-mainBlue rounded-full h-12 w-full mt-4 border border-mainBlue'>
                Encontré una mascota
              </button>
            </Link>
          </div>
        </div>
        <Image src={FamiliesStats} alt='Stats' />
        <Image src={HowItWorks} alt='How it works' />
        <Image src={Footer} alt='Footer' />
      </Layout>
    </FormDataProvider>
  );
}
