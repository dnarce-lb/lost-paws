import Image from 'next/image';
import { getAllReports } from '@/app/services/reports';

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

interface PetCardProps {
  name?: string;
  imageUrl?: string;
  formattedAddress?: string;
  date: string;
}

const PetCard = ({ name, imageUrl, formattedAddress, date }: PetCardProps) => {
  return (
    <div className='flex flex-row w-full gap-3 py-[18px]'>
      <div>
        {imageUrl && (
          <Image
            className='h-[112px] w-[118px] rounded-[16px] object-cover'
            src={imageUrl}
            alt='Pet Image'
            width={118}
            height={110}
          />
        )}
      </div>
      <div className='flex-grow'>
        <h3 className='font-semibold text-[18px] leading-[25.2px] text-mainBlack mb-2'>{name}</h3>
        <p className='text-mainBlack text-[12px] leading-[16.8px]'>{formattedAddress}</p>
        <p className='text-mainBlack text-[12px] leading-[16.8px]'>{date}</p>
        <button
          type='button'
          className='border border-mainBlue text-mainBlue bg-white rounded-full h-[40px] w-full mt-2'>
          Ver Perfil
        </button>
      </div>
    </div>
  );
};

export const LostPets = async () => {
  const reports = await getAllReports();

  console.log(reports);

  return (
    <div className='bg-white flex flex-col items-center rounded-3xl p-[30px]'>
      <h2 className='font-semibold text-[18px] leading-[25.2px] text-mainBlack text-center mb-2'>
        Otras Mascotas Perdidas
      </h2>
      <p className='text-center font-normal text-[14px] leading-[19.6px] text-mainBlack/60'>
        Te mostramos el listado de mascotas perdidas en LostPaws
      </p>

      <div className='flex flex-col w-full'>
        {reports.map(report => (
          <PetCard
            key={report.id}
            name={report.name || 'Sin Nombre'}
            imageUrl={report.pictureUrl1}
            formattedAddress={report.formattedAddress}
            date={formatDate(report.date || new Date())}
          />
        ))}
      </div>
    </div>
  );
};
