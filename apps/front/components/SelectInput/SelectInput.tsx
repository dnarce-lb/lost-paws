import React, { ChangeEvent } from 'react';
import { Field, Select } from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import { ArrowDown } from '@/assets/icons';

const SelectInput = React.forwardRef<HTMLSelectElement, { children: React.ReactNode | React.ReactNode[], onChange: React.ChangeEventHandler<HTMLSelectElement>  }>(
  (props, ref) => {
    return (
      <div className='flex flex-col gap-2'>
        <Field>
          <div className='relative'>
            <Select
              {...props}
              ref={ref}
              className={clsx(
                'bg-white border rounded-full py-3 px-4 text-mainBlack/60 w-full',
                'block w-full appearance-none border-color-mainBlack/10',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}>
              {props.children}
            </Select>
            <Image
              src={ArrowDown}
              alt='Arrow down icon'
              className='group pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2'
              aria-hidden='true'
            />
          </div>
        </Field>
      </div>
    );
  }
);

export default SelectInput;
