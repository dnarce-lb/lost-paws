import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return <div className='flex flex-col bg-mainGray px-6 py-5 gap-5'>{children}</div>;
};

export default Layout;
