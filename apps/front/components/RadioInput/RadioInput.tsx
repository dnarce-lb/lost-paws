import { Tab, TabGroup, TabList } from '@headlessui/react';
import React from 'react';

const RadioInput = ({ options, value, onChange }: { options: string[], value: string, onChange: (newVal: string) => void }) => {
  const [selectedOption, setSelectedOption] = React.useState('');
  const onChangeHandler = (index: number) => {
    setSelectedOption(options[index]);
    onChange(options[index]);
  }
  return (
    <div className='flex flex-col gap-2'>
      <TabGroup onChange={index => onChangeHandler(index)}>
        <TabList className='flex gap-1'>
          {options.map(option => (
            <Tab
              className={` rounded-[42px] text-sm p-4 capitalize focus:outline-none focus:ring-0 ${
                (value ?? selectedOption) === option
                  ? ' text-white bg-mainBlue'
                  : ' text-mainBlack border-solid border-2 border-mainGray bg-white'
              } `}>
              {option}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  );
};

export default RadioInput;
