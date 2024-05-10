import React from 'react';
import Image from 'next/image';
import { BurguerMenu, LogoIcon } from '@/assets/icons';

const Header: React.FC = () => {
  return (
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
  );
};

export default Header;
