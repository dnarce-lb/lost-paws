import Image from 'next/image';
import { getReportById } from '@/app/services/reports';
import Header from '@/components/Header';
import Layout from '@/components/Layout';

interface PageParams {
  params: {
    id: number;
  };
}

const DataItem = ({ label, data }: { label: string; data?: string }) => (
  <p className='flex justify-between font-semibold'>
    <span className='font-normal'>{label}</span> {data ?? '-'}
  </p>
);

export default async function Page({ params }: PageParams) {
  const report = await getReportById(params.id);

  const status = report?.type === 'lost' ? 'Perdido' : 'Encontrado';
  const titleColor = report?.type === 'lost' ? 'text-red-500' : 'text-green-500';

  const images = [report.pictureUrl1, report.pictureUrl2, report.pictureUrl3].filter(Boolean) as string[];

  return (
    <Layout>
      <Header />
      <div className='bg-white text-mainBlack rounded-3xl p-8 flex flex-col gap-6'>
        <div className='w-full h-[161px] relative overflow-hidden'>
          <Image alt='Pet' src={images[0]} layout='fill' objectFit='cover' className='rounded-2xl' />
        </div>
        <h1 className={`font-bold text-3xl ${titleColor}`}>
          {report?.animal} {status}
        </h1>
        <section>
          <DataItem label='Lugar' data={report.formattedAddress} />
          <DataItem label='Fecha' data={report.date?.toLocaleDateString()} />
          <DataItem label='Raza' data={report.breed} />
          <DataItem label='Género' data={report.gender} />
          <DataItem label='Tamaño' data={report.size} />
          <DataItem label='Color' data={report.color} />
          <DataItem label='Edad' data={report.age} />
        </section>
        <p className='flex flex-col font-semibold'>
          <span className='font-normal'>Descripción:</span> {report.description}
        </p>
        <hr className='border-mainBlack/10' />
        <button type='button' className='bg-mainBlue text-white rounded-full h-12 w-full disabled:opacity-50'>
          Contactar
        </button>
      </div>
    </Layout>
  );
}
