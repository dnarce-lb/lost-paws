import Image from 'next/image';
import { FormData, useFormDataContext } from '@/hooks/useFormData';

type Props = {
  context: {
    formData: FormData;
    submit: () => Promise<void>;
  };
};

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const ConfirmarStep: React.FC<Props> = ({ context }) => {
  const { formData } = context;
  return (
    <div className='bg-white text-mainBlack rounded-3xl p-8 flex flex-col'>
      <div>
        <span className='text-lg font-semibold'>Revisá y confirmá</span>
      </div>
      <div className='text-mainBlack/60'>
        <div>Revisá la información y confirmá para poder publicar la alerta en nuestra base.</div>
        {formData.type === 'lost' && (
          <span className='text-lg font-semibold'>
            Perdí a <span className=' text-mainBlue font-bold'>{formData.name ?? ''}</span>
          </span>
        )}
      </div>

      <div className='mt-6 flex gap-2 '>
        {[1, 2, 3].map(
          i =>
            !!(formData[`pictureUrl${i}` as keyof typeof formData] as string | undefined) && (
              <div key={`step4-picture-${i}`} className='relative'>
                <Image
                  style={{
                    objectFit: 'cover',
                    borderRadius: '12px',
                  }}
                  src={formData[`pictureUrl${i}` as keyof typeof formData] as string}
                  alt=''
                  className='object-cover w-20 h-20'
                  width={80}
                  height={80}
                />
              </div>
            )
        )}
      </div>
      <div className='mt-6 flex flex-row items-center justify-between '>
        <div>Fecha:</div>
        <div>{formData?.date ? formatDate(formData?.date) : ' - '}</div>
      </div>
      <div className='mt-6 flex flex-row items-center justify-between '>
        <div>Tipo:</div>
        <div>{formData?.animal ?? ' - '}</div>
      </div>
      <div className='mt-6 flex flex-row items-center justify-between '>
        <div>Género:</div>
        <div>{formData?.gender ?? ' - '}</div>
      </div>
      <div className='mt-6 flex flex-row items-center justify-between '>
        <div>Raza:</div>
        <div>{formData?.breed ?? ' - '}</div>
      </div>
      <div className='mt-6 flex flex-row items-center justify-between '>
        <div>Tamaño:</div>
        <div>{formData?.size ?? ' - '}</div>
      </div>
      <div className='mt-6 flex flex-row items-center justify-between '>
        <div>Color:</div>
        <div>{formData?.color ?? ' - '}</div>
      </div>
      <div className='mt-6 flex flex-row items-center justify-between '>
        <div>Edad:</div>
        <div>{formData?.age ?? ' - '}</div>
      </div>
    </div>
  );
};
export default ConfirmarStep;
